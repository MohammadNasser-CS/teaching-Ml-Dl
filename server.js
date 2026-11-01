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
    res.setHeader('Cache-Control','no-store');
    res.setHeader('Content-Language','ar');
    try {
      const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      const file=resolvePublicFile(pathname);
      if(!file){res.writeHead(403);return res.end('الوصول إلى هذا المسار غير مسموح');}
      const data=await readFile(file);
      res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'})[path.extname(file)]||'application/octet-stream');
      res.end(data);
    } catch {res.writeHead(404);res.end('الملف غير موجود');}
  });
}

if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const port=Number(process.env.PORT)||3000;
  createServer().on('error',error=>{
    console.error(error.code==='EADDRINUSE'
      ? `المنفذ ${port} مستخدم بالفعل. أوقف الخادم القديم باستخدام Ctrl+C، ثم شغّل هذه النسخة مجددًا.`
      : `تعذّر تشغيل الخادم: ${error.message}`);
    process.exitCode=1;
  }).listen(port,'0.0.0.0',()=>{
    console.log(`النسخة العربية · الإصدار AR-2\nافتح: http://localhost:${port}\nمجلد الموقع: ${root}\nأبقِ هذه النافذة مفتوحة أثناء استخدام الموقع.`);
  });
}
