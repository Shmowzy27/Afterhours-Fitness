const storage='Chill leftovers within 2 hours and use within 3 days';
const recipe=(id,name,cuisine,items,steps,gear=['stove'])=>({id,name,cuisine,regions:[],mealType:'dinner',servings:1,tag:cuisine,time:30,prep:10,cook:20,gear,items,steps,subs:'Swap through the meal picker',storage});
export const cuisineRecipes=[
 recipe('korean-beef-bowl','Korean beef and cabbage','Korean',{beef:160,'rice-cooked':180,cabbage:140,soy:15,garlic:6,ginger:6,oil:5},['Brown the beef with garlic and ginger','Add cabbage and soy sauce','Serve with cooked rice']),
 recipe('japanese-miso-chicken','Miso chicken and soba','Japanese',{chicken:170,'soba-cooked':170,'miso-yutaka':18,carrot:70,cabbage:100},['Boil the soba and drain','Cook chicken to 74°C with the vegetables','Stir miso through off the heat and serve']),
 recipe('chinese-tomato-eggs','Tomato eggs and rice','Chinese',{egg:140,tomato:180,'rice-cooked':180,oil:5,soy:8},['Cook the eggs until just set and remove','Cook tomato until soft','Return eggs, add soy sauce and serve with rice']),
 recipe('thai-coconut-chicken','Coconut chicken rice','Thai',{chicken:170,'coconut-milk-jardin':100,'rice-cooked':170,carrot:80,cabbage:100,ginger:6},['Cook chicken to 74°C','Add vegetables and coconut milk and simmer','Serve with cooked rice']),
 recipe('vietnamese-ginger-chicken','Ginger chicken rice bowl','Vietnamese',{chicken:170,'rice-cooked':180,cucumber:120,carrot:70,ginger:10,soy:10},['Cook chicken with ginger to 74°C','Slice the vegetables','Serve over cooked rice']),
 recipe('indian-chickpea-tomato','Chickpea tomato bowl','Indian',{'chickpea-cooked':220,tomato:170,onion:50,garlic:6,oil:5},['Soften onion and garlic in oil','Add tomato and chickpeas','Simmer until thick']),
 recipe('italian-ricotta-pasta','Ricotta tomato pasta','Italian',{'pasta-cooked':200,ricotta:90,tomato:180,garlic:5,oil:5},['Boil pasta and drain','Cook tomato and garlic in oil','Fold through ricotta and pasta']),
 recipe('middle-eastern-chickpea','Tahini chickpea bowl','Middle Eastern',{'chickpea-cooked':220,tahini:25,tomato:120,cucumber:120,lemon:12},['Whisk tahini with lemon and water','Combine chickpeas and vegetables','Spoon over the dressing'],[]),
 recipe('australian-chicken-veg','Chicken and roast vegetables','Australian',{chicken:180,carrot:100,cabbage:150,oil:5},['Cook chicken to 74°C','Cook vegetables until tender','Rest chicken and serve'],['oven']),
 recipe('singapore-soy-chicken','Soy chicken rice','Singaporean',{chicken:180,'rice-cooked':180,soy:15,ginger:8,cucumber:100},['Cook chicken with soy and ginger to 74°C','Slice the cucumber','Serve with cooked rice']),
];
