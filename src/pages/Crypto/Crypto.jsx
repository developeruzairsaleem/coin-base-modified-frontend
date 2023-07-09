import {useState, useEffect} from "react"
import { getCrypto } from "../../api/external"
import Loader from "../../components/Loader/Loader"
import styles from "./Crypto.module.css"

function Crypto(){

    const changeView=(num)=>{
const newNum=num+""
 const array= newNum.split("")
//  array.splice(0,4)
let newArray= array.slice(0,4)
 return newArray.join("")

    }


    
    const [data,setData]= useState([])
useEffect(() => {
  
    // IIFE
    ( async _=>{
        const response = await getCrypto();
        setData(response)
    })();
    // Cleanup code
    setData([])

 
}, [])

if(data.length===0){
    return(
    <Loader text= "Crypto " />
    )
}

const negativeStyle={
    color:"#ea3943"

}
const positiveStyle={
    color:"#16c784"
}
    return(

        
        <table className={styles.table}>
            <thead className={styles.head}>
        <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
        </tr>

            </thead>
            <tbody className={styles.body} >
           { data.map((coin)=>(
                    <tr className={styles.tableRow} id={coin.id}>
                        <td>{coin.market_cap_rank}</td>
                        <td>
                        <div className={styles.logo}> 
                        <img src={coin.image} width={40} height={40} /> {coin.name}
                        </div>
                         </td>
                        <td>
                            <div className={styles.symbol}>
                                {coin.symbol}
                            </div>
                        </td>
                        <td>{coin.current_price}</td>
                        <td style={coin.price_change_percentage_24h<0?negativeStyle:positiveStyle}>{changeView(coin.price_change_percentage_24h)}%</td>
                    </tr>
            ))}
            </tbody>
        </table>

    )

}


export default Crypto;


