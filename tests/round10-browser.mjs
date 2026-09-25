import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:375,height:812},isMobile:true,hasTouch:true});
const page=await context.newPage();
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await page.goto('http://localhost:4173',{waitUntil:'domcontentloaded'});
await page.evaluate(()=>{localStorage.clear();sessionStorage.clear()});
await page.reload({waitUntil:'domcontentloaded'});
assert.equal(await page.locator('.mobile-pager').count(),1);
const setupScroll=await page.locator('.pager-page[data-page=today]').evaluate(node=>{node.scrollTop=node.scrollHeight;return {top:node.scrollTop,height:node.scrollHeight,client:node.clientHeight}});
assert.ok(setupScroll.height>setupScroll.client&&setupScroll.top>0,JSON.stringify(setupScroll));
await page.locator('.pager-page[data-page=today]').evaluate(node=>node.scrollTop=0);
await page.getByRole('button',{name:/Set up my plan/}).click();
for(let index=0;index<4;index++){
  const scroll=await page.locator('#modal').evaluate(node=>{node.scrollTop=node.scrollHeight;return {top:node.scrollTop,height:node.scrollHeight,client:node.clientHeight}});
  if(scroll.height>scroll.client)assert.ok(scroll.top>0);
  await page.getByRole('button',{name:'Continue'}).click();
}
await page.getByRole('button',{name:'Review my plan'}).click();
await page.getByRole('button',{name:'Save plan'}).click();
await page.waitForTimeout(150);
const drag=async(selector,from,to,duration=160)=>page.locator(selector).evaluate((node,{from,to,duration})=>{
  const touch=(x,y)=>new Touch({identifier:1,target:node,clientX:x,clientY:y,pageX:x,pageY:y,screenX:x,screenY:y});
  node.dispatchEvent(new TouchEvent('touchstart',{touches:[touch(...from)],changedTouches:[touch(...from)],bubbles:true}));
  node.dispatchEvent(new TouchEvent('touchmove',{touches:[touch(...to)],changedTouches:[touch(...to)],bubbles:true,cancelable:true}));
  const start=performance.now();while(performance.now()-start<duration){}
  node.dispatchEvent(new TouchEvent('touchend',{touches:[],changedTouches:[touch(...to)],bubbles:true}));
},{from,to,duration});
assert.equal(await page.evaluate(()=>getComputedStyle(document.body).fontFamily),'Archivo, sans-serif');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),375);
assert.equal(await page.locator('.pager-page[data-page=today] img').count(),0);
const assertPage=async name=>{
  await page.waitForTimeout(300);
  assert.equal(page.url().split('#')[1],name);
  assert.equal(await page.locator('nav a.active').getAttribute('href'),`#${name}`);
  assert.equal(await page.locator('.mobile-pager').evaluate(node=>node.style.getPropertyValue('--page-drag')),'');
};
const views=['today','training','meals','progress','settings'];
for(let cycle=0;cycle<2;cycle++){
  await drag('.pager-page[data-page=today]',[330,300],[80,305]);
  await assertPage('training');
  for(const name of views.slice(2)){
    const selector=`.pager-page[data-page=${views[views.indexOf(name)-1]}]`;
    await drag(selector,[330,300],[80,305]);
    await assertPage(name);
  }
  for(const name of [...views].reverse().slice(1)){
    const current=views[views.indexOf(name)+1];
    await drag(`.pager-page[data-page=${current}]`,[45,300],[300,305]);
    await assertPage(name);
  }
}
await drag('.pager-page[data-page=today]',[330,300],[80,305]);
await assertPage('training');
await drag('.pager-page[data-page=training]',[200,250],[205,500]);
await page.waitForTimeout(100);
assert.equal(page.url().split('#')[1],'training');
await page.locator('nav a[href="#meals"]').click();await page.waitForTimeout(300);
assert.equal(page.url().split('#')[1],'meals');
assert.equal(await page.locator('.pager-page[data-page=meals] img').count(),0);
assert.ok(await page.locator('.pager-page[data-page=meals] button').count()<108);
assert.equal(await page.getByText('Within budget',{exact:true}).count(),0);
const suggestionLayout=await page.locator('.pager-page[data-page=meals] .meal-suggestions .recipe-photo-card').first().evaluate(node=>{const card=node.getBoundingClientRect(),title=node.querySelector('strong').getBoundingClientRect(),copy=getComputedStyle(node.querySelector('.recipe-photo-copy'));return {cardLeft:card.left,titleLeft:title.left,textAlign:copy.textAlign,justify:copy.justifyContent};});
assert.ok(suggestionLayout.titleLeft-suggestionLayout.cardLeft<=24,JSON.stringify(suggestionLayout));
assert.equal(suggestionLayout.textAlign,'left');
assert.equal(await page.locator('.pager-page[data-page=meals] .tabs').evaluate(node=>getComputedStyle(node).display),'grid');
await page.locator('.pager-page[data-page=meals] [data-action=meal-tab][data-tab=grocery]').tap();
assert.equal(await page.locator('.pager-page[data-page=meals] [data-action=meal-tab][data-tab=grocery]').getAttribute('aria-pressed'),'true');
await page.locator('.pager-page[data-page=meals] [data-action=meal-tab][data-tab=plan]').tap();
assert.equal(await page.locator('.pager-page[data-page=meals] [data-action=meal-tab][data-tab=plan]').getAttribute('aria-pressed'),'true');
const plannedCard=page.locator('.pager-page[data-page=meals] .meal-day[open] .menu-card').first();
const plannedLayout=await plannedCard.evaluate(node=>{const recipe=node.querySelector('.recipe-photo-card').getBoundingClientRect(),actions=node.querySelector('.meal-card-actions').getBoundingClientRect();return {recipeWidth:recipe.width,left:recipe.left,actionsRight:actions.right,viewport:innerWidth};});
assert.ok(plannedLayout.recipeWidth>=150,JSON.stringify(plannedLayout));
assert.ok(plannedLayout.left>=0&&plannedLayout.actionsRight<=plannedLayout.viewport,JSON.stringify(plannedLayout));
const mealSummary=page.locator('.pager-page[data-page=meals] .meal-day').first().locator('summary');
assert.equal(await mealSummary.locator('svg').count(),1);
assert.equal(await mealSummary.evaluate(node=>getComputedStyle(node,'::after').content),'none');
await page.locator('.pager-page[data-page=meals] [data-action=meal-tab][data-tab=recipes]').click();
assert.ok(await page.locator('.pager-page[data-page=meals] .recipe-photo-card').count()>0);
assert.equal(await page.locator('.pager-page[data-page=meals] img').count(),0);
await page.locator('.pager-page[data-page=meals] .recipe-photo-card').first().click();
assert.equal(await page.locator('#modal .recipe-hero img').count(),0);
assert.equal(await page.locator('#modal [data-action=copyrecipe]').count(),0);
assert.equal(await page.locator('#modal>.close').evaluate(node=>getComputedStyle(node).opacity),'0');
assert.equal(await page.locator('#modal>.close').getAttribute('aria-label'),'Close');
await page.locator('#modal [data-action=recipe-tab][data-tab=method]').click();
assert.ok(await page.locator('#modal .steps li').count()>=5);
await page.goBack();await page.waitForTimeout(100);assert.equal(await page.locator('#modal').getAttribute('open'),null);
await page.locator('nav a[href="#progress"]').click();await page.waitForTimeout(280);
await page.locator('.pager-page[data-page=progress] [data-action=tdee]').click();
const sheet=page.locator('#modal');assert.ok(await sheet.isVisible());
await drag('#modal .sheet-dismiss',[188,770],[188,830],220);await page.waitForTimeout(260);assert.ok(await sheet.isVisible());
await drag('#modal .sheet-dismiss',[188,770],[188,650],180);await page.waitForTimeout(260);assert.ok(await sheet.isVisible());
await drag('#modal .sheet-dismiss',[188,650],[188,790],180);await page.waitForTimeout(280);assert.equal(await sheet.getAttribute('open'),null);
await page.locator('.pager-page[data-page=progress] [data-action=tdee]').click();
await sheet.evaluate(node=>node.scrollTop=node.scrollHeight);
await drag('#modal .sheet-dismiss',[188,650],[188,790],180);await page.waitForTimeout(280);assert.equal(await sheet.getAttribute('open'),null);
await page.locator('nav a[href="#today"]').click();await page.waitForTimeout(280);
for(let index=0,count=await page.locator('.pager-page[data-page=today] .week button').count();index<count&&!await page.locator('.pager-page[data-page=today] [data-action=start]').count();index++)await page.locator('.pager-page[data-page=today] .week button').nth(index).click();
await page.locator('.pager-page[data-page=today] [data-action=start]').click();await page.locator('[data-action=ready]').click();
assert.match(await page.locator('#modal .session-top').innerText(),/1 of/);
await drag('#modal .workout-exercise h2',[320,180],[50,185],180);await page.waitForTimeout(120);
assert.match(await page.locator('#modal .session-top').innerText(),/2 of/);
await page.keyboard.press('Escape');
assert.equal(errors.length,0,errors.join('\n'));
await browser.close();
console.log(JSON.stringify({viewport:'375x812',pager:true,sheets:true,photoFree:true,errors}));
