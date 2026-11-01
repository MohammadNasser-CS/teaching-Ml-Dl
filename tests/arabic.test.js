import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {textModel} from '../src/labs.js';
import {headlines} from '../src/engine.js';
test('Arabic classifier learns Arabic words, handles diacritics, and ignores unknown words',()=>{
 const model=textModel([{text:'اربح جائزة مجانية',label:1},{text:'عرض جائزة مجاني',label:1},{text:'اجتماع الجامعة غدا',label:0},{text:'تقرير الجامعة للمراجعة',label:0}]);
 assert.ok(model.predict('جائزة مجانية')>.7);
 assert.ok(model.predict('اجتماع الجامعة')<.3);
 assert.equal(model.predict('جَائِزَة'),model.predict('جائزة'));
 assert.equal(model.predict('كلمةغيرمعروفة'),.5);
 assert.match(model.explain(),/جائزة/);
});
test('document declares Arabic RTL and news examples use Arabic text',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 assert.match(html,/<html lang="ar" dir="rtl">/);
 assert.equal(headlines.length,18);
 assert.ok(headlines.every(h=>/[\u0600-\u06ff]/u.test(h)&&!/[a-z]/i.test(h)));
});
