// Production server for Railway.
// Zero dependencies on purpose: fewer packages, smaller supply-chain surface.
// Does two jobs: serve the built SPA (with a history fallback so /resume and
// /projects/* survive a refresh) and set security headers a static host won't.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const PORT = Number(process.env.PORT) || 8080;
const ROOT = resolve("dist");

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
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

// Only the origins this site actually talks to.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  // GSAP and Framer Motion animate via inline style attributes.
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

const send = (res, status, headers, stream) => {
  res.writeHead(status, { ...securityHeaders, ...headers });
  if (stream) stream.pipe(res);
  else res.end();
};

createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, { Allow: "GET, HEAD" });
  }

  const url = new URL(req.url, "http://localhost");
  // normalize + prefix check keeps ../ traversal out of the filesystem
  const candidate = resolve(join(ROOT, normalize(decodeURIComponent(url.pathname))));
  const inRoot = candidate === ROOT || candidate.startsWith(ROOT + "/");

  let file = null;
  if (inRoot && existsSync(candidate) && statSync(candidate).isFile()) {
    file = candidate;
  }

  // A missing path WITH an extension is a real 404 (an image, a PDF). Falling
  // back to the shell there hands crawlers HTML in place of the asset, which
  // silently breaks link previews. Only extensionless paths are client routes.
  const isAsset = file !== null;
  if (!isAsset) {
    if (extname(url.pathname)) {
      return send(res, 404, { "Content-Type": "text/plain; charset=utf-8" });
    }
    file = join(ROOT, "index.html");
  }

  if (!existsSync(file)) return send(res, 404, { "Content-Type": "text/plain" });

  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  // Vite fingerprints assets, so they can be cached hard. The shell cannot.
  const cache = isAsset && /\/assets\//.test(file)
    ? "public, max-age=31536000, immutable"
    : "no-cache";

  send(res, 200, { "Content-Type": type, "Cache-Control": cache }, createReadStream(file));
}).listen(PORT, () => console.log(`serving dist/ on :${PORT}`));
