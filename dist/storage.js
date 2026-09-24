const PREFIX='afterhours.';

const readRaw=key=>localStorage.getItem(PREFIX+key);
const writeRaw=(key,value)=>localStorage.setItem(PREFIX+key,value);

export function get(key,fallback=null){
 const value=readRaw(key);
 if(value===null)return fallback;
 try{return JSON.parse(value);}catch{return value;}
}

export function set(key,value){writeRaw(key,JSON.stringify(value));return value;}
export function remove(key){localStorage.removeItem(PREFIX+key);}
export function id(prefix='record'){return `${prefix}-${crypto.randomUUID()}`;}
export function stamp(record,now=new Date().toISOString()){
 return {...record,id:record.id||id(record.type||'record'),updatedAt:now};
}

export function tombstone(record,now=new Date().toISOString()){
 return {...stamp(record,now),deletedAt:now};
}

export function active(records=[]){return records.filter(record=>!record.deletedAt);}

export function prune(records=[],now=Date.now()){
 const cutoff=now-30*86400000;
 return records.filter(record=>!record.deletedAt||Date.parse(record.deletedAt)>=cutoff);
}

const recordGroups=['foodEntries','customRecipes','customIngredients','savedMeals','foodCache','priceRecords','achievementRecords','workouts','mealLogs','foodLogs','checkins','journal','extraGroceries'];

export function migrateState(state){
 const now=new Date().toISOString();
 state.foodEntries??=[];
 state.customRecipes??=[];
 state.customIngredients??={};
 state.savedMeals??=[];
 state.foodCache??=[];
 state.achievementRecords??=[];
 state.priceRecords??=[];
 state.diaryNutrients??=['kcal','protein','carbs','fat'];
 state.photoConsent??='';
 state.recipePhotoConsent??='';
 state.recipeHistory??=[];
 state.blockedRecipes??={};
 const legacyCities=['new-york','los-angeles','chicago','houston','seattle','san-francisco','other'];if(state.region?.currency==='USD'||legacyCities.includes(state.region?.city)||legacyCities.includes(state.profile?.city)){state.region={city:'perth',currency:'AUD',rate:1};if(state.profile)state.profile.city='perth';}
 state.pantryHave??={};
 if(state.profile)state.profile.cookTwice??=false;
 for(const group of recordGroups)if(Array.isArray(state[group]))state[group]=prune(state[group]);
 state.customIngredients=Object.fromEntries(Object.entries(state.customIngredients).filter(([,record])=>!record.deletedAt||Date.parse(record.deletedAt)>=Date.now()-30*86400000));
 for(const entry of state.foodEntries){entry.id||=id('food');entry.updatedAt||=now;entry.meal||='snacks';entry.unit||=(entry.kind==='recipe'?'serving':entry.kind==='ingredient'?'g':'serving');}
 for(const recipe of state.customRecipes){recipe.id||=id('recipe');recipe.updatedAt||=now;}
 for(const [key,ingredient] of Object.entries(state.customIngredients)){ingredient.id||=key;ingredient.updatedAt||=now;}
 for(const meal of state.savedMeals){meal.id||=id('meal');meal.updatedAt||=now;}
 for(const group of ['foodCache','workouts','mealLogs','foodLogs','checkins','journal','extraGroceries'])for(const record of state[group]||[]){record.id||=id(group.slice(0,-1));record.updatedAt||=now;}
 if(!state.priceRecords.length&&state.profile?.prices)for(const [ingredient,price] of Object.entries(state.profile.prices))state.priceRecords.push(stamp({id:id('price'),ingredient,...price},now));
 state.schemaVersion=2;
 return state;
}

export function loadState(fallback){const state=get('v1',fallback);return migrateState(state);}
export function saveState(state){return set('v1',migrateState(state));}

export function exportRecords(state){
 const migrated=migrateState(structuredClone(state)),records=[];
 for(const group of recordGroups){
  const value=migrated[group];
  if(Array.isArray(value))for(const record of value)records.push({...record,type:group});
  else if(value&&typeof value==='object')for(const [key,record] of Object.entries(value))records.push({...record,id:record.id||key,type:group});
 }
 const settings=structuredClone(migrated);
 for(const group of recordGroups)delete settings[group];
 for(const [key,value] of Object.entries(settings))records.push(stamp({id:`setting-${key}`,type:'setting',key,value},migrated.updatedAt||new Date().toISOString()));
 return {format:'afterhours-records',version:2,exportedAt:new Date().toISOString(),records};
}

export function importRecords(file){
 if(file?.format!=='afterhours-records'||file.version!==2||!Array.isArray(file.records))return migrateState(file);
 const legacySettings=file.records.find(record=>record.type==='settings')?.value;
 const settings=legacySettings||Object.fromEntries(file.records.filter(record=>record.type==='setting').map(record=>[record.key,record.value]));
 const state=migrateState(structuredClone(settings));
 for(const group of recordGroups){const records=file.records.filter(record=>record.type===group);if(group==='customIngredients')state[group]=Object.fromEntries(records.map(record=>[record.id,record]));else state[group]=records;}
 return state;
}
