import styles from "./../styles/components/textComps.module.css"

export function loopingTextComponent(theText, ){
    if(theText.length>0){
        let repeatedText=[...theText, ...theText, ...theText]
        // console.log(repeatedText)
        return(<>
        <div style={{ "position":"relative", "width":"100%", "overflow":"hidden", "whiteSpace":"nowrap", "height":"auto", "backgroundColor": "white", "transform":"translateY(-15px)"  }} >  
            <div className={styles.loopText}>
                {repeatedText.map((e)=><>&nbsp; &nbsp; &nbsp; {e}&nbsp; &nbsp; &nbsp; </>)}
            </div>
        </div>
    </>)
    }
}