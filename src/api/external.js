import axios from "axios";

// const NEWS_API_ENDPOINT=`https://newsapi.org/v2/everything?q=business AND bitcoin&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
const CRYPTO_API_ENDPOINT="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const NEWS_API_ENDPOINT= "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"

export const getNews= async()=>{
let response;
try{
    response= await axios.get(NEWS_API_ENDPOINT);
    response= response.data.articles.slice(0,12);

}
catch(error){
   console.log(error)
}
return response
}
export const getCrypto=async()=>{
    let response=[];
    try{
        response=await axios.get(CRYPTO_API_ENDPOINT);
        response= response.data;
    }
    catch(error){
       console.log(error)
    }
    return response;
}
