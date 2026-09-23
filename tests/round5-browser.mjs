import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import * as C from '../dist/core.js';

const browser=process.env.WEBKIT?await webkit.launch():await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true,serviceWorkers:'block'});
await context.route('https://open.er-api.com/**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({result:'success',base_code:'AUD',rates:{AUD:1,PHP:40,SGD:.8}})}));
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
const state=C.fresh();state.profile=structuredClone(C.defaults);state.plan=C.buildPlan(state.profile,C.wakingDay(state.profile));state.region={city:'perth',currency:'AUD',rate:1};
await page.goto('http://localhost:4173');
await page.evaluate(s=>{localStorage.setItem('afterhours.v1',JSON.stringify(s));localStorage.setItem('afterhours.theme','light');localStorage.removeItem('afterhours.fx.v1');},state);
await page.reload();
await page.waitForFunction(()=>localStorage.getItem('afterhours.fx.v1'));

const widths=async locator=>locator.evaluateAll(items=>items.map(item=>Math.round(item.getBoundingClientRect().width)));
const equal=values=>assert.ok(values.length>1&&new Set(values).size===1,`Uneven widths: ${values.join(', ')}`);
const tab=async name=>{await page.locator(`nav a[href="#${name}"]`).click();await page.waitForTimeout(50);};

const themeButton=page.locator('[data-action="toggle-theme"]');
assert.deepEqual(await themeButton.evaluate(el=>({w:el.offsetWidth,h:el.offsetHeight,label:el.ariaLabel})),{w:44,h:44,label:'Switch to dark mode'});
await themeButton.click();
assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'),'#141512');
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('afterhours.theme'))),'dark');
await page.reload();
assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
assert.equal(await themeButton.getAttribute('aria-label'),'Switch to light mode');
await tab('settings');
assert.match(await page.locator('[data-id="appearance"]').innerText(),/Dark/);
await page.locator('[data-id="appearance"]').click();
assert.deepEqual(await page.locator('select[name="theme"] option').allTextContents(),['System','Light','Dark']);
await page.locator('#modal>.close').click();

await tab('today');
equal(await widths(page.locator('.today-heading .button-row button')));
equal(await widths(page.locator('.today-workout .place-toggle button')));
await tab('training');
equal(await widths(page.locator('.training-place-row .place-toggle button')));
await tab('progress');
equal(await widths(page.locator('.simple-page-head .button-row button')));
const smallLinks=await page.locator('main a:visible, main summary:visible').evaluateAll(items=>items.map(el=>({text:el.textContent.trim(),height:Math.round(el.getBoundingClientRect().height)})).filter(item=>item.height<44));
assert.deepEqual(smallLinks,[]);

await tab('meals');
const mealsText=await page.locator('main').innerText();
assert.equal((mealsText.match(/Prices and nutrition are estimates/g)||[]).length,1);
const tabWidths=await widths(page.locator('.tabs button'));
equal(tabWidths.slice(0,3));equal(tabWidths.slice(3,6));
await page.locator('[data-tab="recipes"]').click();
if(await page.locator('[data-action="food-show-all-regions"]').count())await page.locator('[data-action="food-show-all-regions"]').click();
assert.equal(await page.locator('.recipe-grid>.card').count(),12);
assert.equal(await page.locator('.recipe-grid>.card').first().evaluate(el=>getComputedStyle(el).contentVisibility),'auto');
await page.locator('[data-action="food-show-more"]').click();
assert.equal(await page.locator('.recipe-grid>.card').count(),24);
await page.evaluate(()=>scrollTo(0,900));
const recipeScroll=await page.evaluate(()=>scrollY);
await page.evaluate(()=>document.querySelector('[data-tab="plan"]').click());
await page.waitForTimeout(75);
await page.evaluate(()=>document.querySelector('[data-tab="recipes"]').click());
await page.waitForTimeout(100);
assert.equal(await page.evaluate(()=>scrollY),recipeScroll);

await page.locator('[data-action="region"]').click();
assert.equal(await page.locator('#region-form [name="rate"]').count(),0);
await page.locator('#region-form [name="currency"]').selectOption('SGD');
await page.locator('#region-form button[type="submit"]').click();
await page.waitForFunction(()=>{const region=JSON.parse(localStorage.getItem('afterhours.v1')).region;return region.currency==='SGD'&&region.rate===.8;});
const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('afterhours.v1')));
assert.equal(saved.region.rate,.8);
assert.match(await page.locator('.schedule-button').innerText(),/SGD/);
assert.match(await page.locator('.budget-strip').innerText(),/\$/);

const navStyle=await page.locator('.site-header nav').evaluate(el=>({blur:getComputedStyle(el).backdropFilter,background:getComputedStyle(el).backgroundColor}));
assert.ok(navStyle.blur==='none'||navStyle.blur==='');
assert.notEqual(navStyle.background,'rgba(0, 0, 0, 0)');
assert.equal(await page.locator('.page').evaluate(el=>getComputedStyle(el).animationName),'none');
const iconData=await page.locator('.site-header nav svg').evaluateAll(items=>items.map(svg=>({viewBox:svg.getAttribute('viewBox'),stroke:svg.getAttribute('stroke-width'),size:[svg.getBoundingClientRect().width,svg.getBoundingClientRect().height],ink:[svg.getBBox().width,svg.getBBox().height]})));
for(const item of iconData){assert.equal(item.viewBox,'0 0 24 24');assert.equal(item.stroke,'1.75');assert.ok(Math.max(...item.ink)>=16);assert.deepEqual(item.size.map(Math.round),[24,24]);}
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),375);
assert.deepEqual(errors,[]);
console.log(JSON.stringify({engine:process.env.WEBKIT?'WebKit':'Chromium',viewport:'375x812',equalButtons:true,themePersists:true,currencyFetch:true,recipePagination:true,scrollRestored:true,uniformIcons:true,errors}));
await browser.close();
