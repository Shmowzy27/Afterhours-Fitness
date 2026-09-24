import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import * as C from '../dist/core.js';

const widths=[320,375,390,393,414,430];
const browser=await chromium.launch({headless:true});
for(const width of widths){
 const context=await browser.newContext({viewport:{width,height:812},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
 await context.route('https://open.er-api.com/**',route=>route.abort());
 page.on('pageerror',error=>errors.push(error.message));
 const state=C.fresh();state.profile={...structuredClone(C.defaults),kitchen:['stove','fridge','air fryer']};state.plan=C.buildPlan(state.profile,C.wakingDay(state.profile),null,[],[],{seed:'round9-browser'});state.plan.days[0].meals[0].recipe='chicken';
 await page.goto('http://127.0.0.1:4173');
 await page.evaluate(saved=>localStorage.setItem('afterhours.v1',JSON.stringify(saved)),state);
 await page.reload();
 await page.locator('#toast').evaluate(element=>element.classList.remove('show'));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Today overflow at ${width}`);
 const rankBottom=await page.locator('.today-rank').evaluate(element=>element.getBoundingClientRect().bottom),workoutTop=await page.locator('.today-workout').evaluate(element=>element.getBoundingClientRect().top);
 assert.ok(rankBottom<=workoutTop,`Rank placement at ${width}`);
 await page.locator('.today-meals [data-action=recipe][data-id=chicken]').click();
 const dialog=page.locator('#modal');
 assert.equal(await dialog.evaluate(element=>element.scrollWidth>element.clientWidth),false,`Recipe sheet overflow at ${width}`);
 assert.match(await dialog.innerText(),/About \d+ g per serving/);
 assert.match(await dialog.innerText(),/Nutrition from FSANZ AFCD/);
 await dialog.getByRole('button',{name:'Air fryer'}).click();
 assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem('afterhours.v1')).profile.recipeMethods.chicken)),'air-fryer');
 const closeBox=await dialog.getByRole('button',{name:'Close dialog'}).boundingBox();
 assert.ok(closeBox.x+closeBox.width<=width,`Close button at ${width}`);
 for(const button of await dialog.locator('button').all()){
  const style=await button.evaluate(element=>({height:element.getBoundingClientRect().height,scrollHeight:element.scrollHeight,lineHeight:parseFloat(getComputedStyle(element).lineHeight),wordBreak:getComputedStyle(element).wordBreak}));
  assert.ok(style.height>=44&&style.scrollHeight<=style.height+1,`Button clips at ${width}`);
  assert.equal(style.wordBreak,'normal');
 }
 assert.deepEqual(errors,[]);
 await context.close();
}
{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});await context.route('https://open.er-api.com/**',route=>route.abort());const page=await context.newPage(),state=C.fresh();state.profile=structuredClone(C.defaults);state.plan=C.buildPlan(state.profile,C.wakingDay(state.profile),null,[],[],{seed:'round9-desktop'});
 await page.goto('http://127.0.0.1:4173');await page.evaluate(saved=>localStorage.setItem('afterhours.v1',JSON.stringify(saved)),state);await page.reload();
 const rankBottom=await page.locator('.today-rank').evaluate(element=>element.getBoundingClientRect().bottom),workoutTop=await page.locator('.today-workout').evaluate(element=>element.getBoundingClientRect().top);
 assert.ok(rankBottom<=workoutTop,'Desktop rank placement');
 await context.close();
}
await browser.close();

for(const type of [chromium,webkit]){
 const engine=await type.launch({headless:true}),context=await engine.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,serviceWorkers:'block'}),page=await context.newPage();
 await context.route('https://open.er-api.com/**',route=>route.abort());
 await page.goto('http://127.0.0.1:4173');
 await page.evaluate(()=>localStorage.removeItem('afterhours.v1'));
 await page.reload();
 await page.getByRole('button',{name:/Set up my plan/}).click();
 const dialog=page.locator('#modal');
 assert.equal(await dialog.evaluate(element=>element.scrollWidth>element.clientWidth),false,`${type.name()} setup overflow`);
 assert.equal(await dialog.locator('input[type=time]').count(),0);
 await page.getByRole('button',{name:/Continue/}).click();
 await dialog.locator('input[type=time]').first().waitFor();
 for(const input of await dialog.locator('input[type=time]').all())assert.ok(await input.evaluate(element=>element.getBoundingClientRect().right<=document.documentElement.clientWidth));
 assert.equal(await dialog.evaluate(element=>element.scrollWidth>element.clientWidth),false,`${type.name()} time input overflow`);
 await page.keyboard.press('Tab');
 assert.equal(await page.locator(':focus-visible').evaluate(element=>getComputedStyle(element).outlineWidth),'2px');
 await engine.close();
}
