import{Request, Response} from "express";
import * as service from "../services/newsService.js";


export async function getNews(req: Request, res: Response){
    const id = res.locals.userId.userId;
    const news = await service.getNews(id);
    res.status(200).send(news);
}

export async function getTops(req: Request, res: Response){
    const tops = await service.getTops();
    res.status(200).send(tops);
}

export async function getAllCategories(req: Request, res: Response){
    const categories = await service.getAllCategories();
    res.status(200).send(categories);
}

export async function getUserCategories(req: Request, res: Response){
    const id = res.locals.userId.userId;
    const categories = await service.getCategories(id);
    res.status(200).send(categories);
}