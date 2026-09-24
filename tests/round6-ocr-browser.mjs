import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage();
await page.goto('http://localhost:4173');
const reads=await page.evaluate(async()=>{
 const {recognizePhotos}=await import('/recipe-import.js?v=20260923-15');
 async function screenshot(dark){
  const canvas=document.createElement('canvas');
  canvas.width=1200;
  canvas.height=500;
  const paint=canvas.getContext('2d');
  paint.fillStyle=dark?'#151515':'#fff';
  paint.fillRect(0,0,canvas.width,canvas.height);
  paint.fillStyle=dark?'#fff':'#111';
  paint.font='48px Arial';
  ['cookwithme','1,234 likes','Ingredients:','2 eggs','1 cup rice','View all 56 comments'].forEach((line,index)=>paint.fillText(line,60,70+index*65));
  return new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
 }
 return {light:await recognizePhotos([await screenshot(false)]),dark:await recognizePhotos([await screenshot(true)])};
});
for(const text of Object.values(reads)){
 assert.match(text.text,/2 eggs/i);
 assert.match(text.text,/1 cup rice/i);
 assert.doesNotMatch(text.text,/likes|comments/i);
}
process.stdout.write(JSON.stringify({light:true,dark:true,chromeRemoved:true})+'\n');
await browser.close();
