import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
// Only public files and the content needed by the generators enter the output.
for(const f of fs.readdirSync(root,{withFileTypes:true})){
 if(f.isFile()&&(/\.(css|js|html)$/.test(f.name)||['content.json','hero-art.fragment','favicon.svg','og.svg','robots.txt','sitemap.xml'].includes(f.name)))fs.copyFileSync(path.join(root,f.name),path.join(out,f.name));
}
for(const dir of ['assets','vendor','about','accessibility','contact','creative','intelligence','insights','solutions','work']){
 if(fs.existsSync(path.join(root,dir)))fs.cpSync(path.join(root,dir),path.join(out,dir),{recursive:true});
}
for(const script of ['build.mjs','redesign.mjs'])execFileSync(process.execPath,[path.join(root,script)],{cwd:out,stdio:'inherit'});
for(const name of ['content.json','hero-art.fragment'])fs.unlinkSync(path.join(out,name));
console.log('Static site ready in dist/.');
