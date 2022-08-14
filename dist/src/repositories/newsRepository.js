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
function getCategories(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        return yield prisma.userCategory.findMany({
            where: {
                userId: id
            },
            select: {
                category: { select: {
                        id: true,
                        name: true
                    } }
            }
        });
    });
}
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        });
    });
}
function getCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.category.findUnique({
            where: {
                id
            }
        });
    });
}
function getNews(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.news.findMany({
            take: 10,
            where: {
                categoryId: id
            },
            orderBy: {
                createdAt: "desc"
            },
        });
    });
}
function getTops() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.news.findMany({
            take: 20,
            orderBy: {
                score: "desc"
            }
        });
    });
}
function insertNews(news) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.news.create({
            data: news
        });
    });
}
export { getCategories, getCategory, getAllCategories, getNews, insertNews, getTops };
