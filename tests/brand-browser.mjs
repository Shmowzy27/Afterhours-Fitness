import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const chrome=process.env.CHROME_PATH;
const browser=process.env.WEBKIT?await webkit.launch():await chromium.launch({headless:true,...(chrome?{executablePath:chrome}:{})});
const ctx=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
await ctx.addInitScript(()=>Object.defineProperty(navigator,'standalone',{value:true}));
const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4173');await page.getByRole('button',{name:'Set up my plan'}).click();
for(let i=0;i<2;i++)await page.getByRole('button',{name:'Continue'}).click();
await page.locator('.setup-place label').filter({hasText:'Gym'}).click();assert.equal(await page.locator('[name=trainingPlace]:checked').inputValue(),'gym');
await page.locator('.setup-place label').filter({hasText:'Home'}).click();
for(let i=0;i<2;i++)await page.getByRole('button',{name:'Continue'}).click();
await page.getByRole('button',{name:'Review my plan'}).click();await page.getByRole('button',{name:'Accept & save my plan'}).click();
await page.locator('.week button').first().click();await page.evaluate(()=>document.fonts.ready);
assert.equal(await page.locator('.brand').innerText(),'afterhours');
await page.waitForTimeout(250);await page.evaluate(()=>document.querySelector('#toast').classList.remove('show'));await page.screenshot({path:'artifacts/round3-today.png'});await page.screenshot({path:'artifacts/brand-today.png'});
await page.locator('[data-action=start]').click();await page.locator('[data-action=ready]').click();
let box=await page.locator('#modal').boundingBox();assert.equal(box.x,0);assert.equal(box.y,0);assert.equal(box.width,375);assert.equal(await page.locator('#modal [data-action=close]').count(),1);
assert.ok(!(await page.locator('#modal').innerText()).includes('Choose a weight'));
const demo=await page.locator('.watch-demo').boundingBox(),tech=await page.locator('label').filter({hasText:'Technique'}).boundingBox();assert.ok(tech.y-demo.y-demo.height>=20);
await page.screenshot({path:'artifacts/round3-workout.png'});
await page.getByRole('button',{name:'Set done',exact:true}).first().click();await page.getByRole('button',{name:'Skip',exact:true}).click();
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('afterhours.session')).exercises[0].sets[0].done),true);
await page.locator('#modal>.close').click();
await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);await page.waitForTimeout(500);if(!process.env.WEBKIT){await ctx.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});}
const fonts=await page.evaluate(async()=>{await document.fonts.load('600 24px "Bricolage Grotesque"');await document.fonts.load('600 24px "Barlow Condensed"');return [document.fonts.check('600 24px "Bricolage Grotesque"'),document.fonts.check('600 24px "Barlow Condensed"')];});assert.ok(fonts.every(Boolean));
for(const name of ['today','training','meals','progress','settings']){await page.locator(`nav a[href="#${name}"]`).click();if(name==='training'){await page.waitForTimeout(200);await page.screenshot({path:'artifacts/brand-training.png'});}assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),375);}
console.log(JSON.stringify({viewport:'375x812',standaloneSimulation:true,fullWidth:true,oneClose:true,fontLoads:fonts,offlineReload:!process.env.WEBKIT,immediateSetSave:true,errors}));assert.equal(errors.length,0);await browser.close();
