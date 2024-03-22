import styles from "./Home.module.css"
import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import Loader from "../../components/Loader/Loader";
function Home (){

    const [articles,setArticles]= useState([]);
    const [activeIndex, setActiveIndex] =useState(-1)

    const handleEnter=(index)=>(e)=>setActiveIndex(index) 
    const handleLeave=(index)=>(e)=>setActiveIndex(-1)

    const photoStyle=url=>({
    border:'3px solid #3861fb',
    width:'100%',
    backgroundImage:`url(${url})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    height:'150px'
    })
    
    useEffect(() => {

        (async function (){
            const response = await getNews() 
            setArticles(response)
        })();
            // cleanup code
            setArticles([]);

    }, [])
    
const handleCardClick=(url)=>{
window.open(url,"_blank")
}

if (articles.length==0){
    return (
        <Loader text="homepage"/>
    )
}

    return ( 
<div>
    <div className={styles.header}> Latest Articles </div>
    <div className={styles.grid}>
    {
        articles.map((article,index)=> (
            <div key={article.url} onMouseEnter={handleEnter(index)} onMouseLeave={handleLeave()} className={styles.card} onClick={()=>handleCardClick(article.url)}>
            <div style={photoStyle(article.urlToImage)} className={`${styles.imageContainer}`}>
            </div>
            <h3 className={` ${index===activeIndex&&styles.activeCard}`}>{article.title.split("").slice(0,40).join('')+"..."}</h3>
            </div>
        ))
    }

    </div>
</div>
    )
}

export default Home;
