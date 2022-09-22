import * as repository from "../repositories/userCategoryRepository.js";
import {UserCategory} from "@prisma/client";

export type manipulationUserCategoryData = Omit<UserCategory,"id"|"createdAt">;

export async function revomeManyCategories(data:any) {
    try {
        for(let i of data){
            const {userId, categoryId} = i;
            await removeUserCategory({userId, categoryId})
        }
    } catch (error) {
        throw { type: "bad_request"}
    }
    
}

export async function removeUserCategory(data:manipulationUserCategoryData){
    try {
        await repository.removeUserCategory(data);
    } catch (error) {
        throw { type: "bad_request", message:error.message}
    }
    
}

export async function createManycategories(data:any){
    
    try {
        for(let i of data){
            const {userId, categoryId} = i;
            await insertUserCategory({userId, categoryId})
        }
    } catch (error) {
        throw { type: "bad_request"}
    }
}

export async function insertUserCategory(data:manipulationUserCategoryData){
    try {
        await repository.insertUserCategory(data);
    } catch (error) {
        throw { type: "bad_request", message:error.message}
    }
}