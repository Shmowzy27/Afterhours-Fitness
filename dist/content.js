import {nutritionData} from './nutrition-data.js';
// All prices are editable planning placeholders in PHP, not observed local prices.
// Nutrients are replaced below by the extracted USDA source records; recipe totals remain estimates.
export const ingredients={
 rice:{name:'Rice',kcal:365.0,protein:7.13,pack:1000,price:60,measure:'~½ cup per 90 g',allergens:[]},
 oats:{name:'Rolled oats',kcal:379.0,protein:13.15,pack:500,price:100,measure:'~½ cup per 40 g',allergens:['gluten'],cross:'May contain wheat'},
 egg:{name:'Egg',kcal:143.0,protein:12.56,pack:300,price:54,measure:'1 medium egg ≈ 50 g edible',allergens:['egg']},
 chicken:{name:'Chicken breast, boneless',kcal:120.0,protein:22.5,pack:500,price:130,measure:'1 small breast ≈ 150 g',allergens:[]},
 tofu:{name:'Firm tofu',kcal:144.0,protein:17.27,pack:250,price:40,measure:'1 block ≈ 250 g',allergens:['soy']},
 mung:{name:'Mung beans, dry',kcal:347.0,protein:23.86,pack:500,price:70,measure:'½ cup ≈ 100 g',allergens:['legume']},
 sardine:{name:'Sardines in tomato sauce',kcal:185.0,protein:20.86,pack:155,price:28,measure:'1 can = 155 g as sold',allergens:['fish']},
 tuna:{name:'Tuna in water, drained',kcal:86.0,protein:19.44,pack:120,price:55,measure:'1 drained can ≈ 120 g',allergens:['fish']},
 banana:{name:'Banana, peeled',kcal:89.0,protein:1.09,pack:500,price:45,measure:'1 medium ≈ 100 g edible',allergens:[]},
 cabbage:{name:'Cabbage',kcal:25.0,protein:1.28,pack:500,price:40,measure:'1 cup shredded ≈ 90 g',allergens:[]},
 carrot:{name:'Carrot',kcal:41.0,protein:0.93,pack:250,price:30,measure:'1 medium ≈ 60 g',allergens:[]},
 papaya:{name:'Green papaya, peeled',kcal:43.0,protein:0.47,pack:500,price:35,measure:'1 cup cubes ≈ 140 g',allergens:[]},
 tomato:{name:'Tomato',kcal:18.0,protein:0.88,pack:250,price:25,measure:'1 medium ≈ 100 g',allergens:[]},
 onion:{name:'Onion',kcal:40.0,protein:1.1,pack:250,price:35,measure:'1 small ≈ 70 g',allergens:[]},
 garlic:{name:'Garlic',kcal:149.0,protein:6.36,pack:100,price:25,measure:'1 clove ≈ 3 g',allergens:[]},
 ginger:{name:'Ginger',kcal:80.0,protein:1.82,pack:100,price:20,measure:'1 thumb ≈ 15 g',allergens:[]},
 oil:{name:'Cooking oil',kcal:884.0,protein:0.0,pack:500,price:80,measure:'1 tsp ≈ 5 g',allergens:[]},
 vinegar:{name:'Cane vinegar',kcal:18.0,protein:0.0,pack:350,price:25,measure:'1 tbsp ≈ 15 g',allergens:[]},
 soy:{name:'Soy sauce',kcal:53.0,protein:8.14,pack:350,price:30,measure:'1 tbsp ≈ 15 g',allergens:['soy','gluten']}
};
for(const [id,record] of Object.entries(nutritionData)){ingredients[id].kcal=record.kcal;ingredients[id].protein=record.protein;ingredients[id].nutritionSource=record;}
const storage='Refrigerate within 2 hours (1 hour above 32°C), in shallow sealed containers. Keep chilled up to 3–4 days or freeze portions promptly. Reheat leftovers to 74°C throughout. Cool rice promptly; never leave it on the counter overnight.';
export const recipes=[
{id:'silog',name:'Egg & tomato rice bowl',tag:'Breakfast staple',time:20,prep:5,cook:15,gear:['stove'],items:{rice:80,egg:100,tomato:100,oil:5},steps:['Rinse the raw rice. Cook with water according to its package instructions.','Dice the tomato. Heat oil in a pan; soften the tomato for 2 minutes.','Add beaten eggs and stir until fully set. Serve over the cooked rice.'],subs:'Swap tomato for cabbage by choosing another matching recipe. For egg allergy, choose the tofu bowl.',storage},
{id:'oats',name:'Banana oats & eggs',tag:'Easy prep',time:15,prep:3,cook:12,gear:['stove'],items:{oats:70,banana:100,egg:100},steps:['Cover eggs with water, bring to a boil, and simmer until yolks and whites are firm, about 10–12 minutes.','Simmer oats with 250 ml water for 5 minutes, stirring.','Peel and slice the banana over the oats. Serve the peeled eggs alongside.'],subs:'Use rice bowl instead if avoiding gluten. Check oats labels for cross-contact.',storage},
{id:'tinola',name:'Chicken tinola & rice',tag:'Batch-friendly',time:35,prep:10,cook:25,gear:['stove'],items:{chicken:180,rice:90,papaya:180,onion:30,ginger:10,garlic:6,oil:5},steps:['Cook raw rice separately according to the package. Cut chicken into bite-size pieces and papaya into cubes.','Heat oil in a pot. Soften onion, ginger, and garlic for 2 minutes. Add chicken; stir for 3 minutes.','Add 400 ml water. Simmer for 15 minutes, then add papaya and cook until tender.','Check chicken reaches 74°C internally. Season with a small pinch of salt if desired, then serve with rice.'],subs:'Cabbage can replace papaya by gram weight; nutritional estimates will differ. For a calculated alternative, swap to chicken sauté.',storage},
{id:'adobo',name:'Simple chicken adobo',tag:'Make ahead',time:35,prep:5,cook:30,gear:['stove'],items:{chicken:180,rice:90,cabbage:150,soy:15,vinegar:20,garlic:6,oil:5},steps:['Cook rice separately. Combine chicken, soy sauce, vinegar, garlic, and 150 ml water in a pot.','Bring to a boil, then simmer for 20–25 minutes until chicken reaches 74°C. Add water if needed.','Sauté shredded cabbage in oil for 5 minutes. Serve alongside chicken and rice.'],subs:'For soy or gluten restrictions choose tinola; do not substitute an unverified sauce.',storage},
{id:'monggo',name:'Ginisang monggo & rice',tag:'Pantry-friendly',time:45,prep:5,cook:40,gear:['stove'],items:{mung:90,rice:70,tomato:100,cabbage:100,onion:30,garlic:6,oil:5},steps:['Rinse dry mung beans. Simmer in 500 ml water for about 30–40 minutes until soft; add more water as needed.','Cook rice separately. In a pan, soften garlic, onion, and tomato in oil for 5 minutes.','Add the softened beans and cooking water, then cabbage. Simmer another 5 minutes and serve with rice.'],subs:'For legume restrictions choose chicken tinola. Batch-cook beans, then freeze extra portions.',storage},
{id:'tofu',name:'Tokwa vegetable rice bowl',tag:'Plant-powered',time:25,prep:8,cook:17,gear:['stove'],items:{tofu:250,rice:90,cabbage:150,carrot:60,garlic:6,oil:8,vinegar:10},steps:['Cook rice according to its package. Drain and pat tofu dry, then cube.','Pan-fry tofu in oil for 8–10 minutes, turning gently.','Add garlic, sliced carrot, cabbage, and 2 tbsp water. Cook 5–7 minutes until vegetables are tender. Finish with vinegar and serve over rice.'],subs:'For soy restriction choose chicken sauté. No soy sauce is required.',storage},
{id:'sardine',name:'Ginisang sardinas & rice',tag:'Budget favorite',time:20,prep:5,cook:15,gear:['stove'],items:{sardine:155,rice:90,cabbage:150,tomato:70,onion:30,oil:5},steps:['Cook rice. Dice the tomato and onion, then soften in oil for 3 minutes.','Add cabbage and 3 tbsp water; cook for 5 minutes.','Add the whole can of sardines with sauce and heat until piping hot. Serve with rice.'],subs:'Check can labels for additional allergens. For fish restriction choose monggo or chicken.',storage},
{id:'chicken',name:'Chicken & cabbage sauté',tag:'Weeknight simple',time:25,prep:8,cook:17,gear:['stove'],items:{chicken:180,rice:90,cabbage:180,carrot:60,garlic:6,oil:8},steps:['Cook rice. Thinly slice chicken on a separate board from the vegetables.','Heat oil. Add chicken and garlic; cook for 8–10 minutes, stirring.','Add sliced vegetables and 3 tbsp water. Cook 5–7 more minutes until chicken reaches 74°C. Serve with rice.'],subs:'Choose tofu bowl for a calculated meat-free alternative.',storage},
{id:'tuna',name:'Tuna, tomato & rice',tag:'Quick assembly',time:20,prep:5,cook:15,gear:['rice cooker'],items:{tuna:120,rice:90,tomato:150,carrot:60,oil:5},steps:['Cook raw rice in a rice cooker according to the rice instructions.','Wash and dice tomato; grate the carrot. Open and drain the tuna.','Combine tuna and vegetables with oil. Serve with freshly cooked rice.'],subs:'For fish allergy select a non-fish recipe. Use canned tuna with a compatible ingredient label.',storage},
{id:'overnight',name:'Banana overnight oats',tag:'No-cook option',time:5,prep:5,cook:0,gear:['fridge'],items:{oats:100,banana:150},steps:['Mix oats with 200 ml drinking water in a clean covered container.','Refrigerate overnight, at least 6 hours.','Slice banana over the oats just before eating. This is a lighter-protein meal; review the daily protein total.'],subs:'Do not use for gluten restrictions unless a separately verified gluten-free recipe is added.',storage:'Keep refrigerated and eat within 24 hours. Do not soak at room temperature.'}
];
export const exercises=[
{id:'squat',name:'Goblet squat',equipment:['dumbbell'],pattern:'squat',reps:[8,12],rest:90,cues:'Hold one dumbbell at your chest. Sit between your hips; keep the whole foot planted. Stand without bouncing.',limits:['knee'],unit:'one dumbbell'},
{id:'sit',name:'Bodyweight squat',equipment:[],pattern:'squat',reps:[8,15],rest:60,cues:'Stand with feet comfortably apart. Lower only as far as comfortable, then press through the whole foot.',limits:['knee'],unit:'bodyweight'},
{id:'rdl',name:'Dumbbell Romanian deadlift',equipment:['dumbbell'],pattern:'hinge',reps:[8,12],rest:90,cues:'Keep a soft bend in the knees. Move hips back with weights close to the legs. Stop before your back rounds.',limits:['back'],unit:'per dumbbell'},
{id:'bridge',name:'Glute bridge',equipment:[],pattern:'hinge',reps:[10,15],rest:60,cues:'Lie on your back, knees bent. Exhale and lift your hips without arching your lower back.',limits:['back'],unit:'bodyweight'},
{id:'floor',name:'Dumbbell floor press',equipment:['dumbbell'],pattern:'push',reps:[8,12],rest:90,cues:'Lie on the floor. Keep elbows about 45° from your sides. Pause gently when upper arms meet the floor; press up.',limits:['shoulder','wrist'],unit:'per dumbbell'},
{id:'bench',name:'Dumbbell bench press',equipment:['dumbbell','bench'],pattern:'push',reps:[8,12],rest:90,cues:'Keep feet grounded and shoulder blades stable. Lower with control. Use a manageable load you can safely set down.',limits:['shoulder','wrist'],unit:'per dumbbell'},
{id:'wall',name:'Wall push-up',equipment:[],pattern:'push',reps:[8,15],rest:60,cues:'Place hands on a stable wall at chest height. Keep your body straight; bend elbows to approach the wall, then push away.',limits:['shoulder','wrist'],unit:'bodyweight'},
{id:'row',name:'Bent-over dumbbell row',equipment:['dumbbell'],pattern:'pull',reps:[8,12],rest:90,cues:'Hinge at the hips with a neutral back. Pull weights toward your hips; lower slowly without jerking.',limits:['back','shoulder'],unit:'per dumbbell'},
{id:'prone',name:'Prone W raise',equipment:[],pattern:'pull',reps:[10,15],rest:60,cues:'Lie face down, arms in a W. Gently lift hands and elbows, squeezing shoulder blades without shrugging.',limits:['shoulder','back'],unit:'bodyweight'},
{id:'deadbug',name:'Dead bug',equipment:[],pattern:'core',reps:[6,10],rest:45,cues:'Lie on your back with knees above hips. Slowly extend opposite arm and leg; keep your lower back steady. Reps are per side.',limits:['back'],unit:'bodyweight'}
];
export const sources=[
['Resistance training evidence · ACSM 2026 position stand','https://pubmed.ncbi.nlm.nih.gov/41843416/'],
['USDA FoodData Central · source dataset','https://fdc.nal.usda.gov/download-datasets/'],
['Activity guidance · CDC','https://www.cdc.gov/physical-activity-basics/guidelines/adults.html'],
['Philippine food reference · DOST-FNRI PhilFCT','https://i.fnri.dost.gov.ph/fct/library'],
['Energy equation · Mifflin et al. (1990)','https://pubmed.ncbi.nlm.nih.gov/2305711/'],
['Protein & resistance training · Morton et al. (2018)','https://pubmed.ncbi.nlm.nih.gov/28698222/'],
['Leftover storage · USDA FSIS','https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety'],
['iPhone web notifications · WebKit','https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/'],
['Free push service researched · OneSignal','https://onesignal.com/pricing']
];

// Publisher pages and video identities checked 2026-09-21. External playback needs internet.
export const exerciseVideos={
 squat:{url:'https://www.muscleandstrength.com/exercises/dumbbell-goblet-squat',source:'Muscle & Strength'},
 sit:{url:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/squat/vid-20084663',source:'Mayo Clinic'},
 rdl:{url:'https://www.youtube.com/watch?v=MAa24xjE9kk',source:'Physique Development · YouTube'},
 bridge:{url:'https://www.muscleandstrength.com/exercises/bodyweight-glute-bridge',source:'Muscle & Strength'},
 floor:{url:'https://www.muscleandstrength.com/exercises/dumbbell-floor-press.html',source:'Muscle & Strength'},
 bench:{url:'https://www.muscleandstrength.com/exercises/dumbbell-bench-press.html',source:'Muscle & Strength'},
 wall:{url:'https://www.hybridcalisthenics.com/wall-pushups',source:'Hybrid Calisthenics · looping demonstration'},
 row:{url:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/bent-over-row/vid-20084680',source:'Mayo Clinic',note:'The demonstration uses one arm at a time. Apply the same controlled hinge and row to each side.'},
 prone:{url:'https://www.peak-physio.com.au/exercise/scapula-retraction-w/',source:'Peak Physio'},
 deadbug:{url:'https://www.muscleandstrength.com/exercises/dead-bug',source:'Muscle & Strength'}
};
export const cookingVideos={
 tinola:{url:'https://www.youtube.com/watch?v=6U7AkrbSBwk',source:'Panlasang Pinoy · YouTube',label:'Watch tinola cooking guide'},
 adobo:{url:'https://www.youtube.com/watch?v=FWjp0ieChzs',source:'Panlasang Pinoy · YouTube',label:'Watch adobo cooking guide'},
 monggo:{url:'https://panlasangpinoy.com/monggo-pinakbet/',source:'Panlasang Pinoy · recipe with video',label:'Watch a related monggo recipe'},
 sardine:{url:'https://panlasangpinoy.com/ginisang-sayote-at-sardinas/',source:'Panlasang Pinoy · recipe with video',label:'Watch a related sardine sauté'}
};
export function cookingSearch(r){const queries={silog:'tomato scrambled egg rice recipe tutorial',oats:'banana oatmeal boiled eggs preparation tutorial',tofu:'tofu cabbage carrot stir fry recipe tutorial',chicken:'chicken cabbage carrot stir fry tutorial',tuna:'canned tuna tomato rice bowl recipe',overnight:'banana overnight oats with water recipe'};return 'https://www.youtube.com/results?search_query='+encodeURIComponent(queries[r.id]||r.name+' cooking tutorial');}

// Embed IDs read from the publishers' own video links, checked 2026-09-21.
const exerciseEmbedIds={squat:'5Y3KW5rWMh4',sit:'X3Neqzn6XOI',rdl:'MAa24xjE9kk',bridge:'mm4wbmtDrUc',floor:'gaBOfLlIXjs',bench:'dGqI0Z5ul4k',wall:'ze4qofHM20k',row:'quzRjX0Pbs4',prone:'9flgfMgmwl4',deadbug:'eEhoSeBFoBk'};
for(const [id,youtube]of Object.entries(exerciseEmbedIds))exerciseVideos[id].youtube=youtube;
Object.assign(exerciseVideos.sit,{url:'https://www.southtees.nhs.uk/resources/sit-to-stand-from-chair-combined/',source:'South Tees Hospitals NHS Foundation Trust'});
Object.assign(exerciseVideos.row,{url:'https://www.youtube.com/watch?v=quzRjX0Pbs4',source:'Physique Development',note:'One-arm demonstration: train each side with support from a stable bench; keep your torso still.'});
Object.assign(exerciseVideos.wall,{url:'https://www.youtube.com/watch?v=ze4qofHM20k',source:'Hybrid Calisthenics',note:'Use the wall-pushup section only. Follow your app’s sets and reps; harder progressions are not prescribed.'});
Object.assign(cookingVideos,{
 silog:{youtube:'s9r-CxnCXkg',url:'https://www.youtube.com/watch?v=s9r-CxnCXkg',source:'Jamie Oliver',label:'Scrambling technique',note:'Demonstrates egg technique, not the complete tomato-and-rice dish. Butter and cooking texture differ; follow this recipe and cook eggs until set.'},
 tofu:{youtube:'joLbhsXuAVA',url:'https://panlasangpinoy.com/tofu-vegetable-stir-fry/',source:'Panlasang Pinoy',label:'Related tofu stir-fry',note:'Uses different vegetables, sauces, and more frying oil. Use the quantities in this app.'},
 chicken:{youtube:'j3kIj35AVdA',url:'https://panlasangpinoy.com/ginisang-repolyo-with-chicken-knr-cc/',source:'Panlasang Pinoy',label:'Related cabbage and chicken sauté',note:'Uses oyster sauce, stock cube, and peppers not in this recipe.'},
 oats:{youtube:'VZOHHCosuzY',url:'https://downshiftology.com/recipes/best-oatmeal-recipe/',source:'Downshiftology',label:'Basic oatmeal technique',note:'Toppings differ. Prepare the boiled eggs separately using the written recipe.'},
 overnight:{youtube:'Lkl9_3-jX6c',url:'https://downshiftology.com/recipes/overnight-oats/',source:'Downshiftology',label:'Overnight oats technique',note:'The video includes dairy, yogurt, and optional nuts. Follow this app’s ingredients, water ratio, refrigeration, and portions.'}
});
Object.assign(cookingVideos.tinola,{youtube:'6U7AkrbSBwk'});Object.assign(cookingVideos.adobo,{youtube:'FWjp0ieChzs'});
Object.assign(cookingVideos.monggo,{youtube:'Mz-pLV8IZfU',note:'This variation includes pork and shrimp paste; those are not ingredients in your app recipe.'});
Object.assign(cookingVideos.sardine,{youtube:'JFRy2fd7Hy0',note:'This variation uses chayote rather than cabbage.'});
cookingVideos.tuna={youtube:'Ez9mcEmY41I',url:'https://panlasangpinoy.com/tuna-in-can-sarciado/',source:'Panlasang Pinoy',label:'Related tuna and tomato sauté',note:'Sarciado adds egg and other seasonings; the app’s tuna bowl omits these. Use the written recipe’s ingredients and portions.'};
