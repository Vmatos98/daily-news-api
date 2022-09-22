import prisma from "../config/database.js";
import {manipulationUserCategoryData} from "../services/userCategoryService.js";

async function removeUserCategory(data:manipulationUserCategoryData){
    return await prisma.userCategory.delete({
        where: {
            user_category_unique: {
                userId: data.userId,
                categoryId: data.categoryId
            }
        }
    });
}

async function insertUserCategory(data:manipulationUserCategoryData){
    return await prisma.userCategory.create({
        data: {
            userId: data.userId,
            categoryId: data.categoryId
        }
    });
}

export{ 
    removeUserCategory,
    insertUserCategory
}