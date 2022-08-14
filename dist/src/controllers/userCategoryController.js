var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as service from "../services/userCategoryService.js";
export function updateCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { insert, remove } = req.body;
        if (insert.length > 0) {
            yield service.createManycategories(insert);
        }
        if (remove.length > 0) {
            yield service.revomeManyCategories(remove);
        }
        res.sendStatus(201);
    });
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
