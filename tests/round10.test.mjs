import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

globalThis.location={hostname:'localhost'};
const {recipes}=await import('../dist/content.js');
test('built-in recipes use the compact photo-free layout',()=>{
  assert.equal(recipes.length,111);
  for(const recipe of recipes)for(const key of ['image','imageFallback','imageCard','imageCardFallback'])assert.equal(recipe[key],undefined,`${recipe.id} ${key}`);
  assert.equal(fs.existsSync(new URL('../dist/recipe-images.js',import.meta.url)),false);
});

test('round 10 shell uses chosen type, gestures and honest service worker',()=>{
  const css=fs.readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
  const app=fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
  const sw=fs.readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8');
  assert.match(css,/font-family:'Archivo'/);
  assert.doesNotMatch(css,/:hover|backdrop-filter|:has\(/);
  assert.match(app,/touchstart/);
  assert.match(app,/touchmove/);
  assert.match(app,/passive:false/);
  assert.match(app,/scrollTop<=0/);
  assert.match(app,/scrollHeight-1/);
  assert.match(app,/distance>=96/);
  assert.match(app,/\.5/);
  assert.match(sw,/skipWaiting/);
  assert.match(sw,/clients\.claim/);
  assert.match(sw,/cache:'no-store'/);
  assert.match(sw,/keys\.filter\(key=>key!==CACHE\)/);
});
