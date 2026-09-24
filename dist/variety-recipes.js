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

function recipe([id,name,items],mealType){
 const noCook=mealType==='breakfast'&&(/overnight|papaya oat/.test(id));
 return {id:`var-${id}`,name,mealType,servings:1,tag:mealType[0].toUpperCase()+mealType.slice(1),time:noCook?5:25,prep:noCook?5:8,cook:noCook?0:17,gear:noCook?['fridge']:['stove'],items,steps:noCook?['Combine the ingredients with drinking water in a covered container. Refrigerate overnight.']:['Prepare the vegetables and protein.','Cook the ingredients in a pan or pot until tender. Chicken must reach 74°C.','Season to taste and serve.'],subs:'Choose another meal from the same section',storage};
}

export const varietyRecipes=[...breakfast.map(item=>recipe(item,'breakfast')),...lunch.map(item=>recipe(item,'lunch')),...dinner.map(item=>recipe(item,'dinner'))];
