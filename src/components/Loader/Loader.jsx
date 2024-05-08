import { TailSpin } from "react-loader-spinner";
import styles from "./Loader.module.css"
function Loader({ text,color}) {
    


    return(
        <div className={styles.loaderWrapper}>
            <h2 className={styles.header}>Loading {text}</h2>
            <TailSpin height={80} width={80} radius={1} color={color||"#3861fb"} />
        </div>
    )
}

export default Loader;