// WCAG relative luminance and contrast for actual visible text, including ancestor surfaces.
export async function auditContrast(page){return page.evaluate(()=>{
 const rgba=s=>{const m=s.match(/[\d.]+/g);return m?[+m[0],+m[1],+m[2],m[3]===undefined?1:+m[3]]:[0,0,0,0]};
 const blend=(a,b)=>[0,1,2].map(i=>a[i]*a[3]+b[i]*(1-a[3])).concat(1);
 const bg=el=>{const parents=[];for(let p=el;p;p=p.parentElement)parents.unshift(p);return parents.reduce((b,p)=>blend(rgba(getComputedStyle(p).backgroundColor),b),[244,241,234,1]);};
 const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((v,n,i)=>v+n*[.2126,.7152,.0722][i],0);
 const fail=[];const dialog=document.querySelector('dialog[open]'),root=dialog||document.body;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(walker.nextNode()){const node=walker.currentNode,el=node.parentElement;if(!node.textContent.trim()||['STYLE','SCRIPT','OPTION'].includes(el.tagName)||!el.getClientRects().length)continue;const r=el.getBoundingClientRect(),style=getComputedStyle(el);if(r.width===0||r.height===0||style.visibility==='hidden'||style.display==='none'||Number(style.opacity)===0)continue;const background=bg(el),fg=blend(rgba(style.color),background),a=lum(fg),b=lum(background),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),required=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&+style.fontWeight>=700)?3:4.5;if(ratio+.01<required)fail.push({text:node.textContent.trim().slice(0,70),ratio:+ratio.toFixed(2),required,color:style.color,bg:background,tag:el.tagName,cls:el.className});}
 return [...new Map(fail.map(x=>[x.text+x.color, x])).values()];
});}
