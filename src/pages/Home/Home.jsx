import styles from "./Home.module.css"
import { useState, useEffect } from "react";
import { getNews } from "../../api/external";
import Loader from "../../components/Loader/Loader";
import { TfiNewWindow } from "react-icons/tfi";
function Home (){

    const [articles,setArticles]= useState([]);
    const [activeIndex, setActiveIndex] =useState(-1)
    const [active, setActive]= useState(-1)

    const handleEnter=(index)=>(e)=>setActiveIndex(index) 
    const handleLeave=(index)=>(e)=>setActiveIndex(-1)

    const photoStyle=url=>({
    // border:'3px solid #3861fb',
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
            <div key={article.url}  className={styles.card} >
            <div style={photoStyle(article.urlToImage)} className={`${styles.imageContainer}`}>
            </div>
            <h3 className={`font-bold ${index===activeIndex&&styles.activeCard}`}>{article.title.split("").slice(0,40).join('')+"..."}</h3>
            

            <button onMouseEnter={()=>{
                setActive(index)

            }} onMouseLeave={()=>{
                setActive(-1)
            }}  
            onClick={()=>handleCardClick(article.url)}
            className="flex w-full text-center items-center justify-center items-center gap-3 border p-4 rounded-md border-blue-500 hover:text-white hover:bg-blue-500 text-blue-500 font-bold">
                Read More
                <TfiNewWindow className={`${index===active?"text-white":"text-blue-500"} font-bold `}/>
            </button>

            </div>
        ))
    }

    </div>
</div>
    )
}

export default Home;
