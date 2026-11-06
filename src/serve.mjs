// Tiny static server for local preview: node src/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const PORT = +process.env.PORT || +process.argv[2] || 4321;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.glb': 'model/gltf-binary', '.json': 'application/json' };
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.includes('..')) { res.writeHead(400); return res.end(); }
  let f = join(ROOT, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch { f = join(ROOT, '404.html'); res.statusCode = 404; }
  try {
    const buf = await readFile(f);
    const range = req.headers.range;
    res.setHeader('Content-Type', T[extname(f)] || 'application/octet-stream');
    res.setHeader('Accept-Ranges', 'bytes');
    if (range) {
      const [s, e] = range.replace('bytes=', '').split('-').map(Number);
      const end = e || buf.length - 1;
      res.writeHead(206, { 'Content-Range': `bytes ${s}-${end}/${buf.length}`, 'Content-Length': end - s + 1 });
      return res.end(buf.subarray(s, end + 1));
    }
    res.end(buf);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(PORT, () => console.log("Serving on http://localhost:" + PORT));
