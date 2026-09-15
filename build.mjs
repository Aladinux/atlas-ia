import {rm,mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import './generate-data.mjs';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
const data=JSON.parse(await readFile('dist/data.json','utf8'));
const ids=new Set(data.nodes.map(n=>n.id));
if(ids.size!==data.nodes.length) throw Error('Duplicate IDs');
for(const n of data.nodes){if(n.parent&&!ids.has(n.parent))throw Error(`Unknown parent ${n.id}`);if(!n.summary||!n.use||!n.caution||!n.sources.length)throw Error(`Incomplete ${n.id}`);for(const s of n.sources)if(!data.sources[s])throw Error(`Unknown source ${s}`);let p=n;const visited=new Set();while(p){if(visited.has(p.id))throw Error('Hierarchy cycle');visited.add(p.id);p=data.nodes.find(x=>x.id===p.parent);}}
for(const e of data.edges)if(!ids.has(e.from)||!ids.has(e.to))throw Error(`Unknown endpoint ${e.from} ${e.to}`);
console.log(`Validated: ${data.nodes.length} concepts, ${data.edges.length} relations, ${Object.keys(data.sources).length} sources.`);
