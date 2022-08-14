var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import * as newsService from "./newsService.js";
const url = 'https://newscatcher.p.rapidapi.com/v1/search_enterprise', headers = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
};
export function requestNews(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield newsService.getCategory(id);
        const params = { q: category.name, lang: 'pt', sort_by: 'relevancy', page: '1', media: 'True', search_in: 'summary', from: 'yesterday 0:02 am', };
        const { data } = yield axios.get(url, { params: params, headers: headers });
        for (let i = 0; i < 10; i++) {
            const Element = data.articles[i];
            const newsFormat = {
                title: Element.title,
                description: Element.summary,
                image: Element.media,
                url: Element.link,
                categoryId: id,
                publicatedAt: Element.published_date
            };
            yield newsService.insertNews(newsFormat);
        }
    });
}
