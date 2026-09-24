import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import * as C from '../dist/core.js';

const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const context=await browser.newContext({viewport:{width:375,height:812}});
const page=await context.newPage();
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
const state=C.fresh();
state.profile=structuredClone(C.defaults);
state.region={city:'perth',currency:'AUD',rate:1,shop:'Coles'};
state.plan=C.buildPlan(state.profile,C.wakingDay(state.profile));
await page.goto('http://localhost:4173');
await page.evaluate(saved=>localStorage.setItem('afterhours.v1',JSON.stringify(saved)),state);
await page.reload();

const phoneStyles=await page.evaluate(()=>({
 animation:getComputedStyle(document.querySelector('.page')).animationName,
 headerBackground:getComputedStyle(document.querySelector('.site-header')).backgroundColor,
 bodyBackground:getComputedStyle(document.body).backgroundColor,
 headerOpacity:getComputedStyle(document.querySelector('.site-header')).opacity
}));
assert.equal(phoneStyles.animation,'none');
assert.equal(phoneStyles.headerBackground,phoneStyles.bodyBackground);
assert.equal(phoneStyles.headerOpacity,'1');
assert.equal(await page.locator('.site-header').evaluate(node=>node.classList.contains('scrolled')),false);
await page.evaluate(()=>scrollTo(0,40));
await page.waitForFunction(()=>document.querySelector('.site-header').classList.contains('scrolled'));
await page.locator('nav a[href="#meals"]').click();
await page.locator('.meal-day').first().waitFor();
assert.equal(await page.locator('.meal-day').count(),7);
assert.equal(await page.locator('.meal-day[open]').count(),1);
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);

await page.locator('.schedule-button').click();
await page.selectOption('#region-form select[name=country]','Philippines');
await page.selectOption('#region-form select[name=city]','manila');
await page.getByRole('button',{name:'Save',exact:true}).click();
await page.getByRole('button',{name:'Use local prices'}).click();
await page.waitForFunction(()=>document.querySelector('.schedule-button small')?.textContent==='PHP');
const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('afterhours.v1')));
assert.equal(saved.profile.budget,4500);
await page.getByRole('button',{name:'My ingredients'}).click();
await page.getByText('Pack prices in PHP').waitFor();
await page.getByRole('heading',{name:'Bigas'}).waitFor();
assert.match(await page.locator('.ingredient-item').first().textContent(),/₱/);

await page.getByRole('button',{name:'Recipe library'}).click();
await page.getByRole('button',{name:'Add a recipe'}).click();
await page.locator('[name=recipeText]').fill(`Ground Beef Gochujang Bulgogi
(Per Serving - 2 Total)
542 Calories
46gP | 45gC | 20gF
Ingredients:
400g Extra Lean Ground Beef (Raw Weight)
1 Tbsp Sweetener of Choice
Cucumber Salad:
1 Large Cucumber
Toppings:
125g Rice/Serving
Instructions:
1. Into a small bowl combine the following ingredients: ...`);
await page.getByRole('button',{name:'Import'}).click();
assert.equal(await page.locator('[name=servings]').inputValue(),'2');
await page.getByRole('heading',{name:'Cucumber Salad',exact:true}).waitFor();
await page.getByRole('heading',{name:'Toppings'}).waitFor();
assert.match(await page.locator('.import-row').filter({hasText:'125g Rice/Serving'}).textContent(),/Cooked/);
assert.match(await page.locator('.import-row').filter({hasText:'Sweetener of Choice'}).textContent(),/Skip, not counted/);

await page.setViewportSize({width:1440,height:1000});
await page.getByRole('button',{name:'Close dialog'}).click();
await page.locator('nav a[href="#today"]').click();
await page.locator('.today-screen').waitFor();
const restIndex=state.plan.days.findIndex(entry=>!entry.workout);
await page.locator('.week button').nth(restIndex).click();
const desktop=await page.evaluate(()=>{
 const week=[...document.querySelectorAll('.week button')].map(node=>node.getBoundingClientRect());
 const screen=document.querySelector('.today-screen').getBoundingClientRect();
 const workout=document.querySelector('.today-workout').getBoundingClientRect();
 const action=document.querySelector('.today-workout .primary').getBoundingClientRect();
 const header=document.querySelector('.site-header .brand').getBoundingClientRect();
 const heading=document.querySelector('.today-heading').getBoundingClientRect();
 return {gaps:week.slice(1).map((box,index)=>Math.round(box.left-week[index].right)),screenWidth:screen.width,workoutWidth:workout.width,workoutHeight:workout.height,actionWidth:action.width,gutterDelta:Math.round(Math.abs(header.left-heading.left))};
});
assert.ok(desktop.gaps.every(gap=>gap===8));
assert.ok(desktop.workoutWidth>desktop.screenWidth*.55&&desktop.workoutWidth<desktop.screenWidth*.75);
assert.ok(desktop.actionWidth<desktop.workoutWidth/2);
assert.ok(desktop.workoutHeight>0);
assert.ok(desktop.gutterDelta<=1);
assert.deepEqual(errors,[]);
console.log(JSON.stringify({phoneNoFade:true,scrollEdge:true,collapsedWeek:true,manilaPrices:true,recipeImport:true,desktopColumns:true,errors}));
await browser.close();
