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

test('built-in recipes include complete cooking methods',()=>{
  for(const recipe of recipes){
    assert.ok(recipe.steps.length>=5,`${recipe.id} has a complete method`);
    assert.match(recipe.steps[0],/^Measure all ingredients/);
    assert.match(recipe.steps.at(-1),/^For leftovers:/);
    if(/thickest (piece of poultry|chicken piece)|Chicken must/.test(recipe.steps.join(' ')))assert.ok(Object.hasOwn(recipe.items,'chicken'),`${recipe.id} only uses the chicken temperature when chicken is present`);
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
  assert.match(app,/tracking=false/);
  assert.doesNotMatch(app,/btn\('Share','copyrecipe'/);
  assert.doesNotMatch(app,/sheet-dismiss/);
  assert.match(app,/sheet-pull-zone/);
  assert.match(app,/atBottom=el.scrollTop\+el.clientHeight>=el.scrollHeight-16/);
  assert.match(app,/event\.target\.closest\('\.sheet-pull-zone'\)/);
  assert.match(app,/distance>=104/);
  assert.doesNotMatch(app,/fast=distance/);
  assert.doesNotMatch(app,/direction>0\?'110vh':'-110vh'/);
  assert.match(sw,/skipWaiting/);
  assert.match(sw,/clients\.claim/);
  assert.match(sw,/cache:'no-store'/);
  assert.match(sw,/keys\.filter\(key=>key!==CACHE\)/);
});
