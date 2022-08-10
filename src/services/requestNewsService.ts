import axios from "axios";

const api = axios.create({
    baseURL: "https://newsapi.org/v2",
});

export async function getNews( category: string) {
    const API_KEY = process.env.API_KEY||"";
    const url= 'https://newscatcher.p.rapidapi.com/v1/search_enterprise',
    params= {q: category, lang: 'pt', sort_by: 'relevancy', page: '1', media: 'True'},
    headers= {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
    }

    const response = await axios.get(url, {params: params, headers: headers});
    return response.data;
}