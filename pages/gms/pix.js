import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"

import { GMSNavii } from "../../components/navis";
import {anInputDisplayer, aDropdownPicker} from "../../components/forms"

import CurrentImageData from "./../../data/itinImages.json"
import LTCData from "../../data/dataAndTemplates.json"

import styles from "./../../styles/pages/pix.module.css"

// Pix page
// manage, organize and cataloge pictures. Images hosted on OneDrive, with 21.1 x 10 ratio

export default function PixPage(){
    const { data: session } = useSession()
    const [ImgData, setImgData]= useState({})
    const [loadingStateTrig, setLoadState]=useState(false)
    

    const [theImagesArr, setImagesArr]=useState(CurrentImageData)

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    // utils
    // utils
    // export to reuse as component, SET UP ltc RATIO sTANDARDS.
    const anImageDisp=(imgSrc, width, imgRatio, imgAlt)=>{
        // 'ltcWide' is the 21.1 x 10 widescreen ratio
        let theHeight
        if(imgRatio==="LTCWide"){theHeight = width * 0.575}
        return(<>
            <div><Image
                src={imgSrc}
                alt={imgAlt}
                width={width}
                height={theHeight}
            /></div>
        </>)
    }

    ///////////////////////////////////////
    ///////////////////////////////////////
    // IMG LOGISTIX
// join these two under IMG DATA editor funct
    const anImgDataForm=(imgSrc)=>{
        return(<>
            <div className={styles.imgDataForm} onClick={()=>{
                if(!ImgData.src){
                    setImgData({
                        ...ImgData,
                        "src": imgSrc
                    })
                }
            }}>
                {aDropdownPicker(LTCData.countryList, "Country", "imgCountry", ImgData, setImgData)}
                {aDropdownPicker(LTCData.regionList, "Region", "imgRegion", ImgData, setImgData)}
                {anInputDisplayer("Location Details", "locationDetails", "text", false, "ex: Inca Trail", ImgData, setImgData)}
                {anInputDisplayer("Image name", "imgName", "text", false, "The Name", ImgData, setImgData)}
                {anInputDisplayer("Image Author", "imgAuthor", "text", false, "The Author", ImgData, setImgData)}
                {anInputDisplayer("Image Alt Text", "imgAlt", "text", false, "Image Alt", ImgData, setImgData)}
            </div>
        </>)
    }












    const dataSubmitionDisp=(theImgData)=>{
        return(<>


            {/* OP with APiu route, need to check form updating, with placeholders, or useState */}
        
        
        {/* 
            <div 
                className={styles.sendToDBBTN}
                onClick={async()=>{
                    // setLoadState(true)
                    let stringifiedImgData= JSON.stringify(theImgData)
                    const res = await fetch("/api/genToolkit/pixApi", {
                        method: "POST",
                        body: stringifiedImgData
                    })
                    const imgDataSubmition = await res.json()
                    console.log(imgDataSubmition, "Img Submitions") 

                    if (res.status===201){
                        setBatchEditImgArr([...batchEditImgArr, theImgData])
                        setLoadState(false)
                        setImgIndex(imgBatchIndex+1)
                        setImgData({})
                        window.alert("Image Created and in DB")
                        window.scrollTo({top: 0, behavior: "smooth"})

                        // add returned obj from DB if possible || useIMG DaTA before erasing

                    } else if (res.status===201){
                        window.alert(`Error with Img data submition: ${imgDataSubmition.message}`)
                    }
                }}>
            

                Send to database 
            
            </div> */}


            <div className={styles.sendToDBBTN}> Placeholder BTN </div>


        </>)
    }











    const anImageDataEditor=(eachImg)=>{
        // have fields to fill in pic data: location, area, country, imgname, imgalt, author, year
        // How to read meta data from Images on Chrome??


        return(<>
            <div className={styles.eachImgEditor}>
                {anImageDisp(eachImg, 400, imgRatio, "cucu Alt")}
                {anImgDataForm(eachImg)}
                {dataSubmitionDisp(ImgData)}
            </div>
        </>)
    }
    // Batch Img Processing
    const theSpread=(imgArr, setImgArr)=>{

        let theImgSpread=imgArr.map((elem,i)=><React.Fragment key={i}>
            <div className={styles.eachImgSpreadCont}>
                <div className={styles.deleteFromSpreadBTN} onClick={()=>{
                    let tempArr=[...theImagesArr];
                    tempArr.splice(i, 1)
                    setImagesArr(tempArr)
                }}>X </div>
                {anImageDisp(elem, 250, "LTCWide", "someshtt")}
            </div>
        </React.Fragment>)

        return(<>
            <div className={styles.spreadContainer}>
                {theImgSpread}
            </div>
        </>)
    }
    const [batchSteps, setBatchSteps]=useState(0)
    const [batchEditImgArr, setBatchEditImgArr]=useState([])
    const [imgRatio, setImgRatio]=useState("LTCWide")
    const [imgBatchIndex, setImgIndex]= useState(13)

    const batchProcessSteps=()=>{
        // change to elems as props
        return(<> 
            {batchSteps===0? <>
                {/* Step One */}
                <div  style={{display:"flex", justifyContent:"space-between"}}>
                    <ul>
                        <li>{theImagesArr&&<>Image Count:{theImagesArr.length}</>}</li>
                        <li>Image Ratio: {imgRatio}</li>                        
                    </ul>
                    <div className={styles.nextSepBTN} onClick={()=>setBatchSteps(batchSteps+1)} > Next: Edit Image Data </div>
                </div>

                {/* Displays IMG Spread */}
                {theSpread(theImagesArr)}



            </>
            :batchSteps===1&& <>
                <div className={styles.editImgFormCont}> 
                    <div className={styles.statsCardDisp}> 
                        <h4>Session stats:</h4>
                        <span> count {batchEditImgArr&&<>{batchEditImgArr.length}</>}</span>

                        {/* <span> Countries: </span> */}

                    </div>

                    {anImageDataEditor(theImagesArr[imgBatchIndex])}

                    <div className={styles.statsCardDisp}> 
                        <h4>Batch Stats:</h4>
                        <span> unedited: {CurrentImageData&&<>{CurrentImageData.length}</>}</span>
                    </div>

                </div>
            </>}
        </>)
    }


    console.log(ImgData)


    return(<>
        {/* Add further session doors  */}
        {session&& <> 
            <GMSNavii user={session.user} />
        </>}
        
        {/* IMG Editor ready: */}

        {/* Spread and cuntionality is OP. Create editor steps. ReceiveArr, spread, editorperIMG, DB submition. */}

        {batchProcessSteps()}


    </>)
}