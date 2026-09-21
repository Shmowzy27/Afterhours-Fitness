"""Extract only used energy/protein values from the official USDA SR Legacy CSV archive.
Source: https://fdc.nal.usda.gov/download-datasets/ (April 2018 SR Legacy release).
Download stored locally at .sites-runtime/usda-sr-legacy.zip; no API key needed.
"""
import csv,io,json,zipfile,hashlib
from pathlib import Path
archive=Path('.sites-runtime/usda-sr-legacy.zip')
z=zipfile.ZipFile(archive)
def table(name):
 return list(csv.DictReader(io.TextIOWrapper(z.open(next(n for n in z.namelist() if n.endswith('/'+name))))))
foods={r['fdc_id']:r for r in table('food.csv')}
ndb={r['fdc_id']:r['NDB_number'] for r in table('sr_legacy_food.csv')}
ids={'rice':'169756','oats':'173904','egg':'171287','chicken':'171077','tofu':'172475','mung':'174256','sardine':'175140','tuna':'173709','banana':'173944','cabbage':'169975','carrot':'170393','papaya':'169926','tomato':'170457','onion':'170000','garlic':'169230','ginger':'169231','oil':'172336','vinegar':'172237','soy':'174277'}
notes={'sardine':'Proxy: USDA record is drained sardines; this recipe includes sauce. Check your can label for the as-sold values.','papaya':'Proxy: USDA record does not specify green papaya ripeness; actual green papaya may differ.','vinegar':'Proxy: distilled vinegar is used for cane vinegar. Check the product label.','oil':'Canola oil reference; other cooking oils can differ.','tofu':'Firm calcium-set tofu reference; water content and local tokwa brands vary.'}
nutrients={}
for r in table('food_nutrient.csv'):
 if r['fdc_id'] in ids.values() and r['nutrient_id'] in ['1008','1003']:
  nutrients.setdefault(r['fdc_id'],{})[r['nutrient_id']]=float(r['amount'])
result={}
for key,ident in ids.items():
 result[key]={'fdcId':ident,'ndb':ndb[ident],'description':foods[ident]['description'],'kcal':nutrients[ident]['1008'],'protein':nutrients[ident]['1003'],'basis':'per 100 g edible portion','release':'SR Legacy · April 2018','checked':'2026-09-21','url':f'https://fdc.nal.usda.gov/food-details/{ident}/nutrients','note':notes.get(key,'Generic ingredient match; varieties, brands and cooking can change the actual values.')}
Path('dist/nutrition-data.js').write_text('// Extracted from the official USDA SR Legacy archive. Do not hand-edit nutrient values.\nexport const nutritionData = '+json.dumps(result,ensure_ascii=False,indent=2)+';\n')
Path('docs/nutrition-provenance.json').write_text(json.dumps({'source':'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip','archive_sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'fields':{'1008':'Energy, kcal per 100g','1003':'Protein, grams per 100g'},'records':result},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:{'kcal':v['kcal'],'protein':v['protein']} for k,v in result.items()}))
