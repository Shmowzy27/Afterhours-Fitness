import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../dist/core.js';
import {migrateState} from '../dist/storage.js';
import {regionNames,defaultBudget} from '../dist/regional-food.js';
import {onRequestPost as readVision} from '../functions/api/vision.js';

test('only the three supported regions and currencies remain',()=>{
 assert.deepEqual(regionNames,['Australia','Philippines','Singapore']);
 assert.deepEqual(C.currencies,['AUD','PHP','SGD']);
 assert.equal(defaultBudget({country:'Australia'}),100);
 assert.equal(defaultBudget({country:'Philippines'}),4500);
 assert.equal(defaultBudget({country:'Singapore'}),120);
 assert.equal(C.formatMoney(10,{currency:'AUD',rate:1}),'A$10.00');
 assert.equal(C.formatMoney(10,{currency:'SGD',rate:1}),'S$10.00');
 assert.equal(C.formatMoney(10,{currency:'PHP',rate:1}),'₱10');
});

test('legacy US settings migrate silently to Perth and AUD',()=>{
 const state=C.fresh();state.region={city:'new-york',currency:'USD',rate:.66};state.profile={...C.defaults,city:'new-york'};
 migrateState(state);
 assert.deepEqual(state.region,{city:'perth',currency:'AUD',rate:1});
 assert.equal(state.profile.city,'perth');
});

test('photo reader preserves natural resolution and refuses weak OCR',async()=>{
 const source=await (await import('node:fs/promises')).readFile(new URL('../dist/recipe-import.js',import.meta.url),'utf8');
 assert.match(source,/naturalWidth=image\.naturalWidth/);
 assert.match(source,/long<1500/);
 assert.match(source,/tessedit_pageseg_mode:'6'/);
 assert.match(source,/preserve_interword_spaces:'1'/);
 const ui=await (await import('node:fs/promises')).readFile(new URL('../dist/food-ui.js',import.meta.url),'utf8');
 assert.match(ui,/confidence<70\|\|result\.junkShare>1\/3/);
 assert.match(ui,/Couldn’t read that clearly/);
});

test('server photo reader unwraps the Workers AI binding response',async()=>{
 const form=new FormData();
 form.append('photo',new File(['photo'], 'recipe.jpg',{type:'image/jpeg'}));
 form.append('mode','recipe');
 const response=await readVision({request:new Request('https://example.test/api/vision',{method:'POST',body:form}),env:{VISION:{run:async()=>({result:{answer:'2 eggs\n100 g rice'}})}}});
 assert.equal(response.status,200);
 assert.deepEqual(await response.json(),{text:'2 eggs\n100 g rice'});
});

test('server photo reader rejects malformed form data',async()=>{
 const response=await readVision({request:new Request('https://example.test/api/vision',{method:'POST',body:'bad'}),env:{VISION:{run:async()=>{throw Error('should not run');}}}});
 assert.equal(response.status,400);
});
