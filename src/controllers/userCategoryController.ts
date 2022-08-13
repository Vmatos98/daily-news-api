import{Request, Response} from "express";
import * as service from "../services/userCategoryService.js";

export async function updateCategoryController(req: Request, res: Response){
const {insert, remove} = req.body;
if(insert.length>0){ 
    await service.createManycategories(insert);
}
if (remove.length>0) {
    await service.revomeManyCategories(remove);
}
res.sendStatus(201);
}



/*{insert:[
    {userId: id, categoryId: id},
    {userId: id, categoryId: id}, 
    {userId: id, categoryId: id}
],
remove:[
    {userId: id, categoryId: id},
    {userId: id, categoryId: id}, 
    {userId: id, categoryId: id}
]}*/