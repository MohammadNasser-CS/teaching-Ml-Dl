import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// URL pathnames are not filesystem paths on Windows (drive letters, spaces).
const root=path.dirname(fileURLToPath(import.meta.url));

export function resolvePublicFile(pathname, base=root, paths=path) {
  const parts=(pathname==='/'?'/index.html':pathname).split(/[\\/]+/);
  if(parts.some(part=>part.startsWith('.'))) return null;
  const file=paths.resolve(base,...parts.filter(Boolean));
  const relative=paths.relative(base,file);
  if(!relative || relative==='..' || relative.startsWith('..'+paths.sep) || paths.isAbsolute(relative)) return null;
  return file;
}

export function createServer() {
  return http.createServer(async(req,res)=>{
    try {
      const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      const file=resolvePublicFile(pathname);
      if(!file){res.writeHead(403);return res.end('Forbidden');}
      const data=await readFile(file);
      res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json'})[path.extname(file)]||'application/octet-stream');
      res.end(data);
    } catch {res.writeHead(404);res.end('Not found');}
  });
}

if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const port=Number(process.env.PORT)||3000;
  createServer().listen(port,'0.0.0.0',()=>console.log('AI Learning Lab listening on port '+port));
}
