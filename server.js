// Production server for Railway.
// Serves the built SPA, preserves client-side routes, and applies security headers.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const PORT = Number(process.env.PORT) || 8080;
const ROOT = resolve(process.env.STATIC_ROOT || "dist");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' blob: https://*.mux.com",
  "connect-src 'self' https://*.mux.com",
  "frame-src https://www.veed.io https://veed.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = {
  "Content-Security-Policy": CSP,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Cross-Origin-Opener-Policy": "same-origin",
};

const send = (req, res, status, headers, stream) => {
  res.writeHead(status, { ...securityHeaders, ...headers });
  if (req.method === "HEAD" || !stream) res.end();
  else stream.pipe(res);
};

const parseByteRange = (header, size) => {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;

  let start;
  let end;
  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
  }

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return null;
  }

  return { start, end: Math.min(end, size - 1) };
};

createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(req, res, 405, { Allow: "GET, HEAD" });
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return send(req, res, 400, { "Content-Type": "text/plain; charset=utf-8" });
  }

  const candidate = resolve(join(ROOT, normalize(pathname)));
  const inRoot = candidate === ROOT || candidate.startsWith(`${ROOT}/`);

  let file = null;
  if (inRoot && existsSync(candidate) && statSync(candidate).isFile()) {
    file = candidate;
  }

  const isAsset = file !== null;
  if (!isAsset) {
    if (extname(pathname)) {
      return send(req, res, 404, { "Content-Type": "text/plain; charset=utf-8" });
    }
    file = join(ROOT, "index.html");
  }

  if (!existsSync(file)) {
    return send(req, res, 404, { "Content-Type": "text/plain; charset=utf-8" });
  }

  const extension = extname(file).toLowerCase();
  const type = TYPES[extension] || "application/octet-stream";
  const cache = isAsset && /\/assets\//.test(file)
    ? "public, max-age=31536000, immutable"
    : "no-cache";
  const size = statSync(file).size;
  const headers = {
    "Content-Type": type,
    "Cache-Control": cache,
    "Content-Length": String(size),
  };

  if (extension === ".mp4") {
    headers["Accept-Ranges"] = "bytes";
    if (req.headers.range) {
      const range = parseByteRange(req.headers.range, size);
      if (!range) {
        return send(req, res, 416, {
          ...headers,
          "Content-Range": `bytes */${size}`,
          "Content-Length": "0",
        });
      }

      const length = range.end - range.start + 1;
      return send(
        req,
        res,
        206,
        {
          ...headers,
          "Content-Length": String(length),
          "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
        },
        createReadStream(file, { start: range.start, end: range.end }),
      );
    }
  }

  return send(req, res, 200, headers, createReadStream(file));
}).listen(PORT, () => console.log(`serving ${ROOT} on :${PORT}`));
