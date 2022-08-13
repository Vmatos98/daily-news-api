import prisma from "../config/database.js";

import {createNewsData} from "../services/newsService.js"

async function getCategories(id:number){
    console.log(id)
    return await prisma.userCategory.findMany({
        where: {
            userId: id
        },
        select: {
            category: {select:{
                id: true,
                name: true
            }}
        }
    });
}

async function getAllCategories(){
    return await prisma.category.findMany({
        select: {
            id: true,
            name: true
        }
    });
}

async function getCategory(id:number){
    return await prisma.category.findUnique({
        where:{
            id
        }
    })
}

async function getNews(id:number){
    return await prisma.news.findMany({
        take: 10,
        where: {
            categoryId: id
        },
        orderBy: {
            createdAt: "desc"
        },
    });
}

async function getTops(){
    return await prisma.news.findMany({
        take: 20,
        orderBy: {
            score: "desc"
        }
    });
}

async function insertNews(news:createNewsData){
    return await prisma.news.create({
        data: news
    });
}

export {
    getCategories,
    getCategory,
    getAllCategories,
    getNews,
    insertNews,
    getTops
}