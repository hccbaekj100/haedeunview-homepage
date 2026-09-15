import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const routes=JSON.parse(fs.readFileSync('routes.json'));let links=0;const titles=new Set();
for(const route of routes){const f=path.join('dist',route,'index.html'),html=fs.readFileSync(f,'utf8');assert(!/href=["'](?:#|)["']/.test(html),f+' empty link');assert(!html.includes('�'),f+' encoding');assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert(html.includes('name="description"'));assert(html.includes('lang="ko"'));assert(html.includes('tel:01038051937'));const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),'duplicate title');titles.add(title);for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){let u=m[1];links++;if(u.startsWith('/')&&!u.startsWith('//')){assert(fs.existsSync(path.join('dist',u,u.endsWith('/')?'index.html':'')),f+' missing '+u);}if(u.startsWith('tel:'))assert.equal(u,'tel:01038051937');}for(const m of html.matchAll(/<img\b[^>]*>/g)){assert(/alt="[^"]+"/.test(m[0]));assert(/loading="(lazy|eager)"/.test(m[0]));}for(const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert(m[0].includes('noopener noreferrer'));}
console.log(JSON.stringify({pages:routes.length,linksChecked:links,uniqueTitles:titles.size,missingLinks:0,encodingErrors:0}));
assert.equal(routes.length,20,'Existing twenty pages must remain');
const home=fs.readFileSync('dist/index.html','utf8');
const ordered=['benefits','recommended','compare','day','guest-stories','nearby','journal','find-us','reservation'];let previous=-1;
for(const id of ordered){const position=home.indexOf('id="'+id+'"');assert(position>previous,'Missing/out-of-order Home section '+id);previous=position;}
for(const href of home.matchAll(/href="#([^"]+)"/g))assert(home.includes('id="'+href[1]+'"'),'Broken anchor');
for(const id of ['201','301','302','303','304','401','402','403','404'])assert(home.includes('/rooms/'+id+'/'));
assert(home.includes('property="og:image"'));assert(home.includes('id="booking-dialog"'));assert(home.includes('class="mobile-booking"'));
assert.equal((home.match(/<h3>고객 후기 준비 중<\/h3>/g)||[]).length,3);
console.log('Home section order, nine room links, anchors, share image, booking dialog and honest review placeholders: PASS');
