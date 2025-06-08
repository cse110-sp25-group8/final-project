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
    let data={  id: 1,
                Name: "Pie",
                CookTime:  "30"};
    index++;
    let ans=await db.addRecipe(data);
    expect(ans).toBe(index);
})

// delete recipe
test('DeleteRecipe', async () => {
     let data={ id: 1,
                Name: "Pie",
                CookTime:  "30"};
    await db.deleteRecipe(data);
    let ans=await db.getRecipe(1);
    index--
    expect(ans).toBeUndefined();
})

//edit - doesn't effect count, before vs after of the field we edited, other fields are the same 


//Valid getRecipe - does it return correct data, check the fields



//get all recipes 
test('Get all recipes in database', async()=>{
    let data={  id: 1,
                Name: "Pie",
                CookTime:  "30"};
    let data2={  id: 2,
                    Name: "Soup",
                    CookTime:  "40"};
    await db.addRecipe(data);
    await db.addRecipe(data2)
    let res=[   {
                    id: 1,
                    Name: "Pie",
                    CookTime:  "30",
                },
                {
                    id: 2,
                    Name: "Soup",
                    CookTime:  "40",
                }
            ]
    let ans=await db.getAllRecipes()
    expect(ans).toEqual(res);

})




