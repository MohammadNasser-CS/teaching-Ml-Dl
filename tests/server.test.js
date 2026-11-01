import {test} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {createServer,resolvePublicFile} from '../server.js';

test('Windows paths serve the homepage and assets, including folders with spaces',()=>{
  const base='D:\\Projects\\ML Teaching\\teaching-Ml-Dl';
  assert.equal(resolvePublicFile('/',base,path.win32),path.win32.join(base,'index.html'));
  assert.equal(resolvePublicFile('/src/app.js',base,path.win32),path.win32.join(base,'src','app.js'));
});
test('both platforms reject traversal and hidden files',()=>{
  for(const [base,paths] of [['/workspace/site',path.posix],['D:\\Projects\\site',path.win32]]) {
    for(const input of ['/../secret','/src/../../secret','/.git/config','/src/.env','/..\\secret']) {
      assert.equal(resolvePublicFile(input,base,paths),null,input);
    }
  }
});
test('HTTP server returns the homepage and assets and rejects private paths',async()=>{
  const server=createServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    const base=`http://127.0.0.1:${server.address().port}`;
    const home=await fetch(base+'/');assert.equal(home.status,200);assert.match(await home.text(),/مختبر نجاح للذكاء الاصطناعي/);
    const js=await fetch(base+'/src/app.js');assert.equal(js.status,200);assert.match(js.headers.get('content-type'),/javascript/);
    assert.equal((await fetch(base+'/.git/config')).status,403);
    assert.equal((await fetch(base+'/missing-file')).status,404);
  } finally {await new Promise(resolve=>server.close(resolve));}
});
