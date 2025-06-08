if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}


import { RecipeStore } from "../database/RecipeStore";
import "fake-indexeddb/auto";
// require("fake-indexeddb/auto");


const db = new RecipeStore();
let index = 0;

// check if recipes are being added correctly
test('addValidRecipe', async () => {
    let data={Name: "Pie",
              CookTime:  "30"};
    index++;
    let ans=await db.addRecipe(data);
    expect(ans).toBe(index);
})

// delete recipe
test('DeleteRecipe', async () => {
    console.log(typeof index);
    let ans=await db.deleteRecipe(index);
    index--
    expect(ans).toBe(index);
})



