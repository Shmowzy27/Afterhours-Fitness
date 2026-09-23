import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as C from '../dist/core.js';

test('new plans start in Perth with native AUD prices',()=>{
  assert.deepEqual(C.regionDefaults,{city:'perth',currency:'AUD',rate:1});
  assert.deepEqual(C.currencyRates,{AUD:1,PHP:38,SGD:.85});
  assert.equal(C.cityInfo(C.defaults).zone,'Australia/Perth');
  assert.equal(C.defaults.budget,100);
});

test('home progression and gym equivalents preserve movement patterns',()=>{
  const home={...structuredClone(C.defaults),trainingPlace:'home'};
  const first=C.routine(home);
  assert.deepEqual(first.map(x=>x.pattern),['squat','hinge','push','pull','core']);
  assert.ok(first.every(x=>x.venue!=='gym'));
  const completed=[{exercises:first.filter(x=>x.id==='wall').map(x=>({id:x.id,formQuality:'controlled',sets:Array.from({length:x.sets},()=>({reps:15,rpe:7,weight:0}))}))}];
  assert.equal(C.routine(home,false,completed).find(x=>x.pattern==='push').id,'inclinepush');
  const gym=C.routine({...home,trainingPlace:'gym'});
  assert.equal(gym.find(x=>x.pattern==='squat').id,'barbellsquat');
  assert.equal(gym.find(x=>x.pattern==='push').id,'barbellbench');
  assert.equal(gym.find(x=>x.pattern==='pull').id,'latpull');
});

test('PWA manifest and cache list include phone install assets',()=>{
  const manifest=JSON.parse(fs.readFileSync(new URL('../dist/manifest.webmanifest',import.meta.url)));
  assert.equal(manifest.short_name,'Afterhours');
  assert.equal(manifest.orientation,'portrait');
  assert.equal(manifest.background_color,manifest.theme_color);
  assert.equal(manifest.screenshots.length,2);
  assert.ok(manifest.icons.some(x=>x.purpose==='maskable'));
  const sw=fs.readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8');
  for(const file of ['core.js?v=','content.js?v=','icon-180.png?v=','screenshots/today.png?v='])assert.match(sw,new RegExp(file.replace(/[.?]/g,'\\$&')));
});
