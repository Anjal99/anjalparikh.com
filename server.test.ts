// @vitest-environment node

import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let processHandle: ChildProcessWithoutNullStreams;
let root: string;
let origin: string;

const availablePort = () =>
  new Promise<number>((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not allocate test port"));
        return;
      }
      server.close(() => resolvePort(address.port));
    });
  });

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "anjal-site-server-"));
  await writeFile(join(root, "index.html"), "<h1>Fixture</h1>");
  await writeFile(join(root, "lesson.mp4"), Buffer.from("0123456789"));

  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;
  processHandle = spawn(process.execPath, [resolve("server.js")], {
    cwd: resolve("."),
    env: { ...process.env, PORT: String(port), STATIC_ROOT: root },
  });

  await new Promise<void>((resolveReady, reject) => {
    const timer = setTimeout(() => reject(new Error("Server did not start")), 5000);
    processHandle.stdout.on("data", (chunk) => {
      if (chunk.toString().includes("serving")) {
        clearTimeout(timer);
        resolveReady();
      }
    });
    processHandle.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Server exited before startup with code ${code}`));
    });
  });
});

afterAll(async () => {
  processHandle?.kill();
  await rm(root, { recursive: true, force: true });
});

describe("static video delivery", () => {
  it("serves MP4 byte ranges for browser seeking", async () => {
    const response = await fetch(`${origin}/lesson.mp4`, {
      headers: { Range: "bytes=2-5" },
    });

    expect(response.status).toBe(206);
    expect(response.headers.get("content-type")).toBe("video/mp4");
    expect(response.headers.get("accept-ranges")).toBe("bytes");
    expect(response.headers.get("content-range")).toBe("bytes 2-5/10");
    expect(response.headers.get("content-length")).toBe("4");
    expect(Buffer.from(await response.arrayBuffer()).toString()).toBe("2345");
  });

  it("returns a complete MP4 response when no range is requested", async () => {
    const response = await fetch(`${origin}/lesson.mp4`);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("video/mp4");
    expect(response.headers.get("accept-ranges")).toBe("bytes");
    expect(response.headers.get("content-length")).toBe("10");
  });
});
