import {mkdir,writeFile} from 'node:fs/promises';
import * as C from '../dist/core.js';
import {configureFood,recipes} from '../dist/content.js';

configureFood({});
const recipesReport=C.validateRecipeLibrary(recipes);
const report={created:new Date().toISOString(),recipes:recipesReport.length,complete:recipesReport.filter(recipe=>recipe.complete).length,details:recipesReport};
await mkdir(new URL('../artifacts/',import.meta.url),{recursive:true});
await writeFile(new URL('../artifacts/recipe-nutrition.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
process.stdout.write(`Checked ${report.complete} recipes\n`);
