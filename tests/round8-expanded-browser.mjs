import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import * as C from '../dist/core.js';

const executablePath=process.env.CHROME_PATH;
const browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
const errors=[];

async function load(width,height,withFood=false){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<600,hasTouch:width<600,serviceWorkers:'block'}),page=await context.newPage();
 page.on('pageerror',error=>errors.push(error.message));
 const state=C.fresh();state.profile=structuredClone(C.defaults);state.plan=C.buildPlan(state.profile,C.wakingDay(state.profile),null,[],[],{seed:'browser'});state.region={city:'perth',currency:'AUD',rate:1};
 if(withFood){const day=state.plan.start,recipe=C.recipe(state.plan.days[0].meals[0].recipe),nutrition=C.nutrition(recipe,1.5,state.profile);state.foodEntries=[{id:'food-round8',day,time:'20:00',meal:'breakfast',kind:'recipe',ref:recipe.id,name:recipe.name,amount:1.5,unit:'serving',nutrition}];state.diaryNutrients=['kcal','protein','fibre','sodium'];}
 await page.goto('http://localhost:4173');await page.evaluate(value=>localStorage.setItem('afterhours.v1',JSON.stringify(value)),state);await page.reload();
 return {context,page,state};
}

for(const [width,height] of [[375,812],[1450,900]]){
 const {context,page}=await load(width,height,false);
 await page.locator('.today-heading h1').waitFor();
 assert.match(await page.locator('.nutrition-empty').innerText(),/kcal goal/);
 assert.equal(await page.locator('.macro-summary').count(),0);
 assert.equal(await page.locator('.today-rank').count(),1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const card=page.locator('.today-workout'),before=await card.evaluate(element=>getComputedStyle(element).backgroundColor);await card.hover();assert.equal(await card.evaluate(element=>getComputedStyle(element).backgroundColor),before);
 await page.keyboard.press('Tab');const outline=await page.locator(':focus-visible').evaluate(element=>getComputedStyle(element).outlineWidth);assert.ok(parseFloat(outline)<=2&&parseFloat(outline)>0);
 await context.close();
}

const {context,page,state}=await load(375,812,true);
assert.match(await page.locator('.calorie-summary').innerText(),/eaten/);
assert.equal(await page.locator('.macro-summary>button').count(),3);
assert.equal(await page.locator('.pinned-summary>button').count(),2);
assert.match(await page.locator('.daily-cost').innerText(),/A\$/);
assert.match(await page.locator('.missing-line').allInnerTexts().then(lines=>lines.join(' ')),/missing (fibre|sodium)/i);
const goalBefore=await page.locator('.calorie-summary').innerText();
await page.evaluate(()=>{const saved=JSON.parse(localStorage.getItem('afterhours.v1')),day=saved.plan.start;saved.workouts=[{day,exercises:[{id:'sit',sets:[{reps:10,weight:0,rpe:7}]}],saved:new Date().toISOString()}];localStorage.setItem('afterhours.v1',JSON.stringify(saved));});await page.reload();assert.equal((await page.locator('.calorie-summary').innerText()).split('\n').at(-1),goalBefore.split('\n').at(-1));
await page.getByRole('button',{name:'Full nutrition'}).click();await page.getByRole('heading',{name:'Nutrition'}).waitFor();
assert.equal(await page.getByRole('button',{name:'Calories'}).count(),1);await page.getByRole('button',{name:'Nutrients'}).click();assert.ok(await page.locator('.nutrition-table>button').count()>=15);await page.getByRole('button',{name:'Macros'}).click();assert.equal(await page.locator('.macro-detail>div').count(),3);
await page.getByRole('button',{name:'Week'}).click();assert.match(await page.locator('.range-count').innerText(),/logged day/);
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
await context.close();
assert.deepEqual(errors,[]);
console.log('PASS: Round 8 nutrition, rank, responsive layout, focus and no hover changes');
await browser.close();
