import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as C from '../dist/core.js';
import {configureFood} from '../dist/content.js';

function planFor(city,currency,budget,seed='round8',recent=[]){
 const state=C.fresh();
 state.profile={...structuredClone(C.defaults),city,budget};
 state.region={city,currency,rate:1};
 configureFood(state);
 return {profile:state.profile,plan:C.buildPlan(state.profile,'2026-09-23',null,[],[],{seed,recent})};
}

test('each supported region has a deep pool and a unique budgeted week',()=>{
 for(const [city,currency,budget] of [['perth','AUD',100],['manila','PHP',4500],['singapore','SGD',120]]){
  const {profile,plan}=planFor(city,currency,budget),meals=plan.days.flatMap(day=>day.meals),ids=meals.map(meal=>meal.recipe),dinners=plan.days.map(day=>C.recipe(day.meals[2]?.recipe)).filter(Boolean);
  assert.ok(plan.poolSize>=60,`${city} pool ${plan.poolSize}`);
  assert.equal(meals.length,21);
  assert.equal(new Set(ids).size,21);
  assert.equal(new Set(plan.days.map(day=>day.meals.map(meal=>meal.recipe).join('|'))).size,7);
  assert.ok(dinners.filter(recipe=>recipe.items.rice).length<=4);
  assert.ok(C.groceries(meals,profile).reduce((sum,item)=>sum+item.purchase,0)<=profile.budget);
 }
 configureFood({});
});

test('recent recipes fall out and leftovers are explicit',()=>{
 const first=planFor('perth','AUD',100,'first').plan,recent=first.days.flatMap(day=>day.meals.map(meal=>({day:day.day,recipe:meal.recipe}))),second=planFor('perth','AUD',100,'second',recent).plan;
 assert.ok(second.days.flatMap(day=>day.meals).filter(meal=>recent.some(item=>item.recipe===meal.recipe)).length<=3);
 const state=C.fresh();state.profile={...structuredClone(C.defaults),cookTwice:true};configureFood(state);const leftovers=C.buildPlan(state.profile,'2026-09-23',null,[],[],{seed:'leftovers'});
 for(const index of [1,3,5])for(const meal of leftovers.days[index].meals)assert.equal(meal.leftoverFrom,leftovers.days[index-1].day);
 configureFood({});
});

test('low budgets expose a tight pool without repeating recipes',()=>{
 const profile={...structuredClone(C.defaults),budget:10},plan=C.buildPlan(profile,'2026-09-23',null,[],[],{seed:'tight'}),ids=plan.days.flatMap(day=>day.meals.map(meal=>meal.recipe));
 assert.ok(plan.poolSize<49);
 assert.equal(new Set(ids).size,ids.length);
 assert.equal(plan.budgetTight,true);
});

test('built interface has no visual hover hooks',()=>{
 const css=readFileSync(new URL('../dist/style.css',import.meta.url),'utf8'),scripts=['app.js','food-ui.js'].map(file=>readFileSync(new URL('../dist/'+file,import.meta.url),'utf8')).join('\n');
 assert.match(css,/^\/\* Hover styling is not used in this app \*\//);
 assert.doesNotMatch(css,/:hover/);
 assert.doesNotMatch(scripts,/mouseenter|mouseover|mouseleave|is-hover/);
});
