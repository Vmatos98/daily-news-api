import axios from "axios";

import * as newsService from "./newsService.js";

const url= 'https://newscatcher.p.rapidapi.com/v1/search_enterprise',
    headers= {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
    };

export async function requestNews( id:number) {
    const category = await newsService.getCategory(id);
    const params= {q: category.name, lang: 'pt', sort_by: 'relevancy', page: '1', media: 'True', search_in: 'summary', from: 'yesterday 0:02 am',};
    const {data} = await axios.get(url, {params: params, headers: headers});
    for(let i = 9; i>=0; i--){
        const Element = data.articles[i];
        const newsFormat={
            title: Element.title,
            description: Element.summary,
            image: Element.media,
            url: Element.link,
            categoryId: id,
            publicatedAt: Element.published_date 
        }
        await newsService.insertNews(newsFormat);
    }
}

