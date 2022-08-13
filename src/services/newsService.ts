import * as repository from '../repositories/newsRepository.js'
import {requestNews} from '../services/requestNewsService.js'
import {getVotes} from "../services/votesService.js";
import {Category, News} from "@prisma/client";


export type createNewsData = Omit<News,"id"|"score"|"createdAt">;
export type createCategoryData = Omit<Category,"id"|"createdAt">;

export async function getCategories(id:number){
    const categories = await repository.getCategories(id);
    console.log(categories);
    if(categories){
        return categories;
    }
    return [];
}

export async function getAllCategories(){
    const categories = await repository.getAllCategories();
    if(categories){
        return categories;
    }
    throw { type: "not_found", message: ""}
}

export async function getCategory(id:number){
    const category = await repository.getCategory(id);
    if(category){
        return category;
    }
    throw {type:"not_found", message:""}
}

export async function getNews(id:number){
    const categories = await getCategories(id);
    const result = {};
    for(let i of categories){
        const news = await repository.getNews(i.category.id);
        if(news.length === 0){ await requestNews(i.category.id);}
        else{
            const diff = Math.abs(new Date().getTime() - news[0].createdAt.getTime());
            if(Math.ceil(diff / (1000 * 60 * 60 * 24))>1){
                await requestNews(i.category.id);
            }
            const newsVotes = await getVotesByNews(news);
            result[i.category.name] = newsVotes;
        }
        
    }
    return result;
}

export async function insertNews(createNewsData:createNewsData){
    await repository.insertNews(createNewsData);

}

export async function getVotesByNews(news:any){
    const result = [];
    for(let i of Object.keys(news)){
        const votes = await getVotes(news[i].id);
        const aux = {...news[i], votes};
        result.push(aux);
    }
    console.log(result)
    return result;
}

export async function getTops(){
    const news = await repository.getTops();
    if(news){
        return news;
    }
    throw {type:"not_found", message:""}
}