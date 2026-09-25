import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

globalThis.location={hostname:'localhost'};
const {recipes}=await import('../dist/content.js');
const root=new URL('../dist/',import.meta.url);

test('every built-in recipe has credited local card and hero photos',()=>{
  assert.equal(recipes.length,111);
  for(const recipe of recipes){
    for(const key of ['image','imageFallback','imageCard','imageCardFallback','imageCredit','imageLicence','imageSource'])assert.ok(recipe[key],`${recipe.id} ${key}`);
    for(const key of ['image','imageFallback','imageCard','imageCardFallback'])assert.ok(fs.existsSync(path.join(root.pathname,recipe[key])),`${recipe.id} ${key}`);
  }
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
