const storage='Chill cooked food within 2 hours. Keep refrigerated for up to 3 days and reheat until steaming.';

const breakfast=[
 ['ginger-egg-rice','Ginger egg rice',{rice:70,egg:100,ginger:8,tomato:100,oil:5}],
 ['cabbage-egg-bowl','Cabbage egg bowl',{egg:120,cabbage:140,onion:30,oil:5}],
 ['banana-ginger-oats','Banana ginger oats',{oats:65,banana:120,ginger:3}],
 ['tomato-tofu-breakfast','Tomato tofu breakfast',{tofu:180,tomato:140,onion:30,oil:5}],
 ['savoury-carrot-oats','Savoury carrot oats',{oats:65,carrot:80,egg:50,onion:25}],
 ['cucumber-egg-rice','Cucumber egg rice',{rice:65,egg:100,cucumber:120,vinegar:10}],
 ['papaya-oat-bowl','Papaya oat bowl',{oats:65,papaya:160,banana:60}],
 ['tomato-egg-cup','Tomato egg cup',{egg:120,tomato:150,onion:25}],
 ['banana-oat-pancake','Banana oat pancake',{oats:60,banana:100,egg:100,oil:5}],
 ['tofu-carrot-scramble','Tofu carrot scramble',{tofu:180,carrot:70,onion:30,oil:5}],
 ['mung-breakfast-bowl','Mung breakfast bowl',{mung:65,egg:50,tomato:100}],
 ['oat-egg-porridge','Oat egg porridge',{oats:60,egg:100,ginger:4}],
 ['banana-rice-porridge','Banana rice porridge',{rice:65,banana:120}],
 ['cabbage-tomato-omelette','Cabbage tomato omelette',{egg:130,cabbage:80,tomato:80,oil:5}],
 ['papaya-banana-oats','Papaya banana oats',{oats:60,papaya:120,banana:80}],
 ['ginger-tofu-rice','Ginger tofu rice',{rice:65,tofu:150,ginger:7,soy:8}],
 ['carrot-tomato-eggs','Carrot tomato eggs',{egg:120,carrot:60,tomato:100,oil:5}],
 ['overnight-papaya-oats','Overnight papaya oats',{oats:65,papaya:150,banana:50}],
 ['banana-egg-oats','Banana egg oats',{oats:60,banana:100,egg:100}]
];

const lunch=[
 ['chicken-cucumber-bowl','Chicken cucumber bowl',{chicken:160,cucumber:140,tomato:100,rice:65,oil:5}],
 ['tofu-ginger-cabbage','Tofu ginger cabbage',{tofu:220,cabbage:160,ginger:8,soy:10,oil:5}],
 ['tuna-carrot-salad','Tuna carrot salad',{tuna:120,carrot:80,cucumber:120,vinegar:12}],
 ['mung-tomato-soup','Mung tomato soup',{mung:80,tomato:130,onion:35,garlic:5}],
 ['beef-cucumber-rice','Beef cucumber rice',{beef:150,cucumber:120,rice:70,soy:10,oil:5}],
 ['sardine-cabbage-bowl','Sardine cabbage bowl',{sardine:120,cabbage:160,tomato:90,onion:25}],
 ['chicken-papaya-salad','Chicken papaya salad',{chicken:150,papaya:150,cucumber:100,vinegar:12}],
 ['tofu-tomato-rice','Tofu tomato rice',{tofu:200,tomato:140,rice:65,garlic:5}],
 ['egg-mung-bowl','Egg mung bowl',{egg:100,mung:70,cabbage:100}],
 ['tuna-tomato-cucumber','Tuna tomato cucumber',{tuna:120,tomato:130,cucumber:130,vinegar:10}],
 ['beef-cabbage-skillet','Beef cabbage skillet',{beef:150,cabbage:180,onion:30,garlic:5,oil:5}],
 ['ginger-chicken-soup','Ginger chicken soup',{chicken:160,ginger:10,carrot:80,cabbage:100}],
 ['soy-tofu-cucumber','Soy tofu cucumber',{tofu:220,cucumber:150,soy:10,vinegar:8}],
 ['sardine-papaya-salad','Sardine papaya salad',{sardine:120,papaya:150,cucumber:90,vinegar:10}],
 ['mung-carrot-bowl','Mung carrot bowl',{mung:80,carrot:90,tomato:100,onion:30}],
 ['egg-cabbage-rice','Egg cabbage rice',{egg:110,cabbage:150,rice:65,oil:5}],
 ['chicken-tomato-cucumber','Chicken tomato cucumber',{chicken:160,tomato:120,cucumber:120,oil:5}],
 ['beef-papaya-bowl','Beef papaya bowl',{beef:150,papaya:140,cabbage:100,ginger:6}],
 ['tofu-cabbage-salad','Tofu cabbage salad',{tofu:210,cabbage:130,cucumber:100,vinegar:10}]
];

const dinner=[
 ['garlic-chicken-cabbage','Garlic chicken cabbage',{chicken:180,cabbage:190,garlic:7,carrot:70,oil:6}],
 ['ginger-beef-vegetables','Ginger beef vegetables',{beef:170,cabbage:130,carrot:80,ginger:9,oil:6}],
 ['tofu-papaya-stew','Tofu papaya stew',{tofu:230,papaya:180,tomato:100,ginger:7}],
 ['tuna-cabbage-pan','Tuna cabbage pan',{tuna:140,cabbage:190,tomato:100,onion:30}],
 ['mung-papaya-stew','Mung papaya stew',{mung:85,papaya:170,tomato:100,garlic:5}],
 ['sardine-carrot-skillet','Sardine carrot skillet',{sardine:140,carrot:100,tomato:120,onion:30}],
 ['chicken-tomato-stew','Chicken tomato stew',{chicken:180,tomato:180,onion:35,garlic:6}],
 ['beef-tomato-cabbage','Beef tomato cabbage',{beef:170,tomato:130,cabbage:150,oil:6}],
 ['tofu-cucumber-salad','Warm tofu cucumber salad',{tofu:230,cucumber:160,soy:10,vinegar:10}],
 ['egg-tofu-skillet','Egg tofu skillet',{egg:100,tofu:180,tomato:110,onion:25}],
 ['ginger-sardine-soup','Ginger sardine soup',{sardine:140,ginger:8,tomato:120,cabbage:120}],
 ['chicken-carrot-pan','Chicken carrot pan',{chicken:180,carrot:110,cucumber:100,oil:6}],
 ['mung-cabbage-soup','Mung cabbage soup',{mung:85,cabbage:180,tomato:100,garlic:5}],
 ['beef-cucumber-skillet','Beef cucumber skillet',{beef:170,cucumber:150,onion:30,soy:10}],
 ['tofu-carrot-tomato','Tofu carrot tomato',{tofu:230,carrot:90,tomato:140,oil:6}],
 ['tuna-papaya-bowl','Tuna papaya bowl',{tuna:140,papaya:170,cucumber:90,vinegar:10}],
 ['chicken-ginger-papaya','Chicken ginger papaya',{chicken:180,papaya:180,ginger:10,onion:30}],
 ['sardine-cucumber-tomato','Sardine cucumber tomato',{sardine:140,cucumber:130,tomato:130,vinegar:8}],
 ['beef-carrot-cabbage','Beef carrot cabbage',{beef:170,carrot:90,cabbage:150,garlic:5}]
];

function recipeSteps(id,items,noCook){
 const has=key=>Object.hasOwn(items,key),produce=Object.keys(items).filter(key=>!['rice','oats','egg','chicken','beef','tofu','tuna','sardine','mung','oil','soy','vinegar'].includes(key));
 if(noCook)return ['Put the oats in a covered container and stir in 2.5 times their weight in drinking water.','Cover and refrigerate for at least 6 hours.','Wash and cut the fruit just before eating.','Stir the oats, add a splash of water if they are too thick, then top with the fruit and serve cold.'];
 if(id==='banana-oat-pancake')return ['Mash the banana in a bowl. Beat in the eggs, then stir in the oats and rest the batter for 5 minutes.','Heat half the oil in a non-stick pan over medium-low heat.','Spoon in small pancakes and cook for 2 to 3 minutes until the edges set.','Turn carefully, add the remaining oil as needed, and cook for 1 to 2 minutes until the centres are firm.','Serve hot.'];
 if(id==='banana-rice-porridge')return ['Rinse the rice until the water is mostly clear.','Put the rice in a saucepan with 4 times its weight in water.','Bring to a boil, lower the heat, cover and simmer for 20 to 25 minutes, stirring twice, until very soft.','Mash half the banana and stir it through the porridge. Add water if needed for a spoonable texture.','Slice the remaining banana over the bowl and serve warm.'];
 if(has('oats')){
  const steps=['Put the oats in a saucepan with 3 times their weight in water.','Bring to a gentle simmer and cook for 5 to 7 minutes, stirring often so the oats do not catch.'];
  if(has('carrot')||has('onion')||has('ginger'))steps.splice(1,0,'Wash, peel and finely cut the vegetables, then add them to the saucepan with the oats.');
  if(has('egg'))steps.push('Beat the eggs, pour them slowly into the hot oats and stir over low heat until the eggs are fully set.');
  if(has('banana')||has('papaya'))steps.push('Wash, peel and cut the fruit. Stir in half and use the rest as a topping.');
  steps.push('Add a splash of water if the oats are too thick, then spoon into a bowl and serve warm.');
  return steps;
 }
 const steps=[];
 if(has('rice'))steps.push('Rinse the rice and cook it separately with water according to its package instructions. Keep covered.');
 if(has('mung'))steps.push('Rinse the mung beans, cover with plenty of water and simmer for 30 to 40 minutes until soft. Drain only if the dish is not a soup.');
 if(produce.length)steps.push(`Wash and cut the ${produce.join(', ')} into bite-size pieces.`);
 if(has('egg'))steps.push('Crack the eggs into a bowl and beat until combined.');
 if(has('tofu'))steps.push('Drain the tofu, pat it dry and cut it into bite-size pieces.');
 if(has('tuna')||has('sardine'))steps.push(`Open and drain the ${has('tuna')?'tuna':'sardines'} unless the canning liquid is needed for the sauce.`);
 const cold=/salad|cucumber-bowl|tomato-cucumber|papaya-bowl|soy-tofu-cucumber|tuna-papaya/.test(id);
 if(has('chicken')||has('beef')){
  const meat=has('chicken')?'chicken':'beef';
  steps.push(`Heat ${has('oil')?'the oil':'a splash of water'} in a pan over medium-high heat. Add the ${meat} in one layer and cook, turning, until browned.`);
  steps.push(has('chicken')?'Continue cooking until the thickest chicken piece reaches 74°C.':'Continue cooking until the beef is browned throughout, then remove it from the pan.');
 }
 if(has('tofu'))steps.push(`Heat ${has('oil')?'the oil':'a splash of water'} in a pan over medium heat. Cook the tofu for 6 to 8 minutes, turning until lightly golden.`);
 if(has('egg'))steps.push(`Heat ${has('oil')?'the oil':'a splash of water'} in a pan over medium heat. Add the eggs and cook gently until set.`);
 if(/soup|stew/.test(id))steps.push('Add the prepared vegetables and 350 ml water. Bring to a boil, lower the heat and simmer for 10 to 15 minutes until the vegetables are tender.');
 else if(cold)steps.push(`Combine the ${[has('chicken')?'cooked chicken':has('beef')?'cooked beef':has('tofu')?'cooked tofu':has('tuna')?'tuna':has('sardine')?'sardines':'cooked ingredients',...produce].join(', ')} in a bowl. Add the soy sauce or vinegar listed in the ingredients and toss well.`);
 else steps.push('Add the prepared vegetables to the pan and cook for 5 to 7 minutes, stirring, until tender but not mushy.');
 if(has('rice'))steps.push('Spoon the cooked rice into a bowl and add the cooked mixture.');
 steps.push(cold?'Taste, adjust the seasoning and serve.':'Taste, adjust the seasoning and serve hot.');
 return steps;
}

function recipe([id,name,items],mealType){
 const noCook=mealType==='breakfast'&&(/overnight|papaya-oat/.test(id));
 return {id:`var-${id}`,name,mealType,servings:1,tag:mealType[0].toUpperCase()+mealType.slice(1),time:noCook?5:hasLongCook(items)?45:25,prep:noCook?5:8,cook:noCook?0:hasLongCook(items)?37:17,gear:noCook?['fridge']:['stove'],items,steps:recipeSteps(id,items,noCook),subs:'Choose another meal from the same section',storage};
}

function hasLongCook(items){return Object.hasOwn(items,'mung');}

export const varietyRecipes=[...breakfast.map(item=>recipe(item,'breakfast')),...lunch.map(item=>recipe(item,'lunch')),...dinner.map(item=>recipe(item,'dinner'))];
