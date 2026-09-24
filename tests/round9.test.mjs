import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as C from '../dist/core.js';
import {ingredients,recipes,configureFood} from '../dist/content.js?v=20260923-19';
import {onRequestPost as readVision} from '../functions/api/vision.js';
import {onRequestGet as readBarcode} from '../functions/api/foods/barcode.js';

test('cooked foods keep their own nutrition and use raw purchase cost',()=>{
 configureFood({});
 const profile=structuredClone(C.defaults),recipe={id:'rice-check',servings:1,items:{'rice-cooked':300}};
 const total=C.nutrition(recipe,1,profile),cooked=ingredients['rice-cooked'],dry=ingredients.rice;
 assert.equal(total.kcal,cooked.kcal*3);
 assert.ok(Math.abs(total.cost-(100/(dry.pack*(dry.gramsPerUnit||1))*dry.price))<1e-9);
 assert.match(cooked.name,/boiled|cooked/i);
 assert.match(cooked.yieldNote,/100 g dry.*300 g cooked/);
});

test('air fryer method changes oil, nutrition and groceries',()=>{
 configureFood({});
 const recipe=recipes.find(item=>item.id==='chicken'),stove={...C.defaults,recipeMethods:{chicken:'stove'}},air={...C.defaults,recipeMethods:{chicken:'air-fryer'}};
 const stoveTotal=C.nutrition(recipe,1,stove),airTotal=C.nutrition(recipe,1,air);
 assert.ok(airTotal.kcal<stoveTotal.kcal);
 assert.ok(airTotal.fat<stoveTotal.fat);
 const stoveOil=C.groceries([{recipe:'chicken',servings:1}],stove).find(item=>item.id==='oil');
 const airOil=C.groceries([{recipe:'chicken',servings:1}],air).find(item=>item.id==='oil');
 assert.ok(airOil.grams<stoveOil.grams);
 assert.equal(recipes.find(item=>item.id==='tinola').methods,undefined);
});

test('recipe validation reports unknown nutrients and rejects missing macros',()=>{
 configureFood({});
 const report=C.validateRecipeLibrary(recipes);
 assert.equal(report.length,recipes.length);
 assert.ok(report.every(item=>item.complete));
 assert.ok(report.find(item=>item.id==='japanese-miso-chicken').missingByNutrient.sodium.includes('miso-yutaka'));
 const original=ingredients.rice.kcal;
 try{
  ingredients.rice.kcal=null;
  assert.throws(()=>C.validateRecipeLibrary(recipes),/Incomplete recipe nutrition/);
 }finally{ingredients.rice.kcal=original;}
});

test('cuisine library covers the requested regions',()=>{
 const cuisines=new Set(recipes.map(recipe=>recipe.cuisine));
 for(const cuisine of ['Korean','Japanese','Chinese','Thai','Vietnamese','Indian','Italian','Middle Eastern','Filipino','Australian','Singaporean'])assert.ok(cuisines.has(cuisine),cuisine);
});

test('nutrition panel reader keeps unknown values blank and converts kilojoules',async()=>{
 const form=new FormData();
 form.append('photo',new File(['photo'],'panel.jpg',{type:'image/jpeg'}));
 form.append('mode','nutrition');
 const payload={name:'Rice crackers',servingSize:25,servingsPerPack:4,nutrition:{kj:1680,kcal:null,protein:7,carbs:78,fat:2,sodium:1200}};
 const response=await readVision({request:new Request('https://example.test/api/vision',{method:'POST',body:form}),env:{VISION:{run:async()=>({result:{answer:JSON.stringify(payload)}})}}});
 const parsed=await response.json();
 assert.ok(Math.abs(parsed.nutrition.kcal-1680/4.184)<1e-9);
 assert.equal(parsed.nutrition.sodium,1200);
 assert.equal(parsed.nutrition.magnesium,null);
 assert.equal(parsed.servingSize,25);
});

test('barcode imports keep nutrients absent from the label unknown',async()=>{
 const oldFetch=globalThis.fetch,oldCaches=globalThis.caches;
 globalThis.caches={default:{match:async()=>null,put:async()=>{}}};
 globalThis.fetch=async()=>Response.json({product:{product_name:'Rice crackers',nutriments:{'energy-kcal_100g':400,proteins_100g:7,sugars_100g:null}}});
 try{
  const response=await readBarcode({request:new Request('https://example.test/api/foods/barcode?code=12345678')});
  const body=await response.json();
  assert.equal(body.product.nutrition.kcal,400);
  assert.equal(body.product.nutrition.sugars,null);
  assert.equal(body.product.nutrition.magnesium,null);
 }finally{globalThis.fetch=oldFetch;globalThis.caches=oldCaches;}
});

test('phone compatibility rules are present in the built app',async()=>{
 const [css,html,photo]=await Promise.all([
  readFile(new URL('../dist/style.css',import.meta.url),'utf8'),
  readFile(new URL('../dist/index.html',import.meta.url),'utf8'),
  readFile(new URL('../dist/recipe-import.js',import.meta.url),'utf8')
 ]);
 assert.doesNotMatch(css,/:has\(/);
 assert.match(css,/dialog\{overflow-x:hidden/);
 assert.match(css,/input\[type=time\]\{width:100%;min-width:0/);
 assert.match(css,/height:100vh;height:100dvh/);
 assert.match(css,/\[tabindex="-1"\]:focus\{outline:none\}/);
 assert.match(css,/:focus-visible\{outline:2px solid var\(--accent\)/);
 assert.match(html,/apple-mobile-web-app-status-bar-style" content="black"/);
 assert.match(html,/theme-color" content="#F4F1EA" media="\(prefers-color-scheme: light\)"/);
 assert.match(html,/theme-color" content="#141512" media="\(prefers-color-scheme: dark\)"/);
 assert.match(photo,/if\(dark\)gray=255-gray/);
});
