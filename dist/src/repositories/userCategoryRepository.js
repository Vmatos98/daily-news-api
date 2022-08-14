var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../config/database.js";
function removeUserCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.userCategory.delete({
            where: {
                user_category_unique: {
                    userId: data.userId,
                    categoryId: data.categoryId
                }
            }
        });
    });
}
function insertUserCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("insert", data);
        return yield prisma.userCategory.create({
            data: {
                userId: data.userId,
                categoryId: data.categoryId
            }
        });
    });
}
export { removeUserCategory, insertUserCategory };
