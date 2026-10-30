import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');let pages=0;
function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,f.name);if(f.isDirectory())walk(file);else if(f.name.endsWith('.html')){
 pages++;const html=fs.readFileSync(file,'utf8');
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
  const target=path.join(root,match[1]);assert(fs.existsSync(target)||fs.existsSync(path.join(target,'index.html')),`Missing local target ${match[1]} in ${file}`);
 }
}}
}walk(root);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(home.includes('data-world-video="still"'),'Hero must remain still');
for(const id of ['imagination','intelligence-world','experience-world'])assert(home.includes(`id="${id}"`),`Missing world ${id}`);
assert(!fs.existsSync(path.join(root,'.env')));
assert(!fs.existsSync(path.join(root,'package.json')));
console.log(`Checked ${pages} pages: local links/assets exist and all three future worlds are present.`);
