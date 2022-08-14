var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as repository from '../repositories/newsRepository.js';
import { requestNews } from '../services/requestNewsService.js';
import { getVotes } from "../services/votesService.js";
export function getCategories(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield repository.getCategories(id);
        console.log(categories);
        if (categories) {
            return categories;
        }
        return [];
    });
}
export function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield repository.getAllCategories();
        if (categories) {
            return categories;
        }
        throw { type: "not_found", message: "" };
    });
}
export function getCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield repository.getCategory(id);
        if (category) {
            return category;
        }
        throw { type: "not_found", message: "" };
    });
}
export function getNews(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield getCategories(id);
        const result = {};
        for (let i of categories) {
            const news = yield repository.getNews(i.category.id);
            if (news.length === 0) {
                yield requestNews(i.category.id);
            }
            else {
                const diff = Math.abs(new Date().getTime() - news[0].createdAt.getTime());
                if (Math.ceil(diff / (1000 * 60 * 60 * 24)) > 1) {
                    yield requestNews(i.category.id);
                }
                const newsVotes = yield getVotesByNews(news);
                result[i.category.name] = newsVotes;
            }
        }
        return result;
    });
}
export function insertNews(createNewsData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield repository.insertNews(createNewsData);
    });
}
export function getVotesByNews(news) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        for (let i of Object.keys(news)) {
            const votes = yield getVotes(news[i].id);
            const aux = Object.assign(Object.assign({}, news[i]), { votes });
            result.push(aux);
        }
        console.log(result);
        return result;
    });
}
export function getTops() {
    return __awaiter(this, void 0, void 0, function* () {
        const news = yield repository.getTops();
        if (news) {
            return news;
        }
        throw { type: "not_found", message: "" };
    });
}
