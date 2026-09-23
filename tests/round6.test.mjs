import test from 'node:test';
import assert from 'node:assert/strict';
import {foodCatalog} from '../dist/food-catalog.js?v=20260923-15';
import {parseRecipeText,cleanRecipeText} from '../dist/recipe-import.js?v=20260923-15';
import {applyRegionalCatalog,defaultBudget,localCurrency,reviewed,shops} from '../dist/regional-food.js?v=20260923-15';
import {cityInfo,formatMoney,fresh,validateBackup} from '../dist/core.js?v=20260923-15';

const caption=`Ground Beef Gochujang Bulgogi
(Per Serving - 2 Total)
542 Calories
46gP | 45gC | 20gF
Ingredients:
400g Extra Lean Ground Beef (Raw Weight)
½ Tbsp Minced Garlic
2 Tbsp Soy Sauce
1 Tbsp Gochujang
1 Tbsp Sweetener of Choice
1 Tsp Salt
Cucumber Salad:
1 Large Cucumber
5ml Sesame Oil
5ml Soy Sauce
Pinch of Gochugaru or Chili powder
Green Onions
Salt and Pepper to taste
Toppings:
125g Rice/Serving
Sesame seeds
Instructions:
1. Into a small bowl combine the following ingredients: ...`;
const parserIngredients={...structuredClone(foodCatalog),pork:{name:'Pork'}};

test('imports the Gochujang caption without flattening its structure',()=>{
 const recipe=parseRecipeText(caption,parserIngredients);
 assert.equal(recipe.servings,2);
 assert.deepEqual(recipe.creatorNutrition,{kcal:542,protein:46,carbs:45,fat:20});
 const rice=recipe.rows.find(row=>row.item==='Rice');
 assert.equal(rice.grams,250);
 assert.equal(rice.group,'Toppings');
 assert.equal(rice.basis,'cooked');
 assert.ok(recipe.rows.some(row=>row.group==='Cucumber Salad'));
 assert.equal(recipe.rows.find(row=>row.item==='Sweetener of Choice').match,'');
 assert.deepEqual(recipe.steps,['Into a small bowl combine the following ingredients: ...']);
});

test('imports mixed English and Tagalog ingredients',()=>{
 const recipe=parseRecipeText(`Adobong baboy
Para sa 4
Sangkap:
1 kilo baboy
2 kutsara toyo
3 cloves bawang
Paraan:
1. Pakuluan ang baboy sa toyo at bawang.`,parserIngredients);
 assert.equal(recipe.servings,4);
 assert.equal(recipe.rows.find(row=>row.item==='baboy').match,'pork');
 assert.equal(recipe.rows.find(row=>row.item==='toyo').match,'soy');
 assert.equal(recipe.rows.find(row=>row.item==='bawang').grams,9);
});

test('drops social app chrome before parsing',()=>{
 const cleaned=cleanRecipeText(`cookwithme
1,234 likes
View all 56 comments
Follow
2d
Ingredients:
2 eggs`);
 assert.equal(cleaned.includes('likes'),false);
 assert.equal(cleaned.includes('comments'),false);
 assert.match(cleaned,/2 eggs/);
});

test('uses local packs, prices and round budgets',()=>{
 const manila=cityInfo({city:'manila'}),perth=cityInfo({city:'perth'}),singapore=cityInfo({city:'singapore'}),newYork=cityInfo({city:'new-york'});
 const localIngredients=structuredClone(foodCatalog);
 applyRegionalCatalog(localIngredients,[],{region:{city:'manila',shop:'Puregold'}},manila);
 assert.equal(localIngredients.rice.name,'Bigas');
 assert.equal(localIngredients.egg.packageLabel,'tray of 30');
 assert.equal(localIngredients.pork.name,'Baboy');
 assert.equal(localCurrency(manila),'PHP');
 assert.equal(defaultBudget(manila),4500);
 assert.equal(defaultBudget(perth),100);
 assert.equal(defaultBudget(singapore),120);
 assert.equal(defaultBudget(newYork),75);
 assert.equal(reviewed(manila),'Sep 2026');
 assert.ok(shops(manila).includes('Palengke'));
 assert.equal(formatMoney(100,{currency:'PHP',rate:1}),'₱100');
 assert.equal(formatMoney(10,{currency:'AUD',rate:1}),'A$10.00');
 assert.equal(formatMoney(10,{currency:'USD',rate:1}),'US$10.00');
 assert.equal(formatMoney(10,{currency:'SGD',rate:1}),'S$10.00');
});

test('keeps regional ingredients used by personal recipes after moving',()=>{
 const localIngredients=structuredClone(foodCatalog),recipes=[{id:'custom-adobo',items:{pork:400}}];
 applyRegionalCatalog(localIngredients,recipes,{region:{city:'manila',shop:'Puregold'}},cityInfo({city:'manila'}));
 assert.equal(localIngredients.pork.name,'Baboy');
 applyRegionalCatalog(localIngredients,recipes,{region:{city:'perth',shop:'Coles'}},cityInfo({city:'perth'}));
 assert.equal(localIngredients.pork.price,0);
 const state=fresh();
 state.customRecipes=[{id:'custom-adobo',name:'Adobo',items:{pork:400},servings:4,time:30,prep:10,cook:20,gear:[],mealType:'dinner',steps:['Cook'],tag:'My recipe'}];
 assert.doesNotThrow(()=>validateBackup(state));
});
