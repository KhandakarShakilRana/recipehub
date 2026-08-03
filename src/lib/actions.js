"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const createRecipe = async(newRecipeData)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipeData)
    });

    return res.json()
}