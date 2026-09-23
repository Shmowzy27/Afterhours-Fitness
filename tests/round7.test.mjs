import test from 'node:test';
import assert from 'node:assert/strict';
import * as F from '../dist/food-store.js';
import * as S from '../dist/storage.js';
import * as C from '../dist/core.js';

test('fractional recipe portions scale every known nutrient and cost',()=>{const perServing={kcal:410,kj:1715,protein:32,carbs:45,sugars:6,fat:12,saturatedFat:3,fibre:8,sodium:540,potassium:700,calcium:120,iron:4,magnesium:80,zinc:3,vitaminC:20,vitaminA:300,folate:140,cost:3.2};const scaled=F.scaleNutrition(perServing,1.5);for(const [key,value] of Object.entries(perServing))assert.equal(scaled[key],value*1.5);});

test('missing micronutrients stay unknown in diary totals',()=>{const total=F.totals([{nutrition:{kcal:200,protein:10,potassium:null,cost:2}},{nutrition:{kcal:300,protein:20,potassium:450,cost:3}}]);assert.equal(total.kcal,500);assert.equal(total.potassium,450);assert.equal(total.missing.potassium,1);assert.equal(total.missing.calcium,2);});

test('record export has stable ids and timestamps and imports old state',()=>{const state=C.fresh();state.foodEntries=[F.makeEntry({day:'2026-09-23',time:'08:00',meal:'breakfast',name:'Quick add',kind:'quick',amount:1,unit:'serving',nutrition:{...F.zero(),kcal:300,cost:0}})];const file=S.exportRecords(state);assert.equal(file.version,2);assert.ok(file.records.every(record=>record.id&&record.updatedAt));const restored=S.importRecords(file);assert.equal(restored.foodEntries[0].id,state.foodEntries[0].id);});

test('logging achievements recalculate after entries are removed',()=>{const state=C.fresh();state.profile=structuredClone(C.defaults);state.plan={targets:{kcal:2000,protein:100}};for(let day=1;day<=7;day++)for(const meal of ['breakfast','lunch','dinner'])state.foodEntries.push(F.makeEntry({day:`2026-09-0${day}`,time:'08:00',meal,name:meal,kind:'quick',amount:1,unit:'serving',nutrition:{...F.zero(),kcal:667,protein:34,cost:2}}));assert.ok(C.journey(state).achievements.find(item=>item.id==='diary-7').unlocked);state.foodEntries=state.foodEntries.filter(entry=>entry.day!=='2026-09-07');assert.equal(C.journey(state).achievements.find(item=>item.id==='diary-7').unlocked,false);});
