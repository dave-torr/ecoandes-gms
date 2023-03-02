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
    // const [theImagesArr, setImagesArr]=useState(CurrentImageData)
    const [loadingStateTrig, setLoadState]=useState(false)
    const [ImgData, setImgStructure]= useState({})
    

    
    // utils
    // move to pix site and export to reuse as component
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

    const anImgDataForm=(imgSrc)=>{
        return(<>
            <div className={styles.imgDataForm} onClick={()=>{
                if(!ImgData.src){
                    setImgStructure({
                        ...ImgData,
                        "src": imgSrc
                    })
                }
            }}>


                {aDropdownPicker(LTCData.countryList, "Country", "imgCountry", ImgData, setImgStructure)}
                {aDropdownPicker(LTCData.regionList, "Region", "imgRegion", ImgData, setImgStructure)}
                {anInputDisplayer("Location Details", "locationDetails", "text", false, "ex: Inca Trail", ImgData, setImgStructure)}
                {anInputDisplayer("Image name", "imgName", "text", false, "The Name", ImgData, setImgStructure)}
                {anInputDisplayer("Image Author", "imgAuthor", "text", false, "The Author", ImgData, setImgStructure)}
                {anInputDisplayer("Image Alt Text", "imgAlt", "text", false, "Image Alt", ImgData, setImgStructure)}
            </div>
        </>)
    }



    const dataSubmitionDisp=(theImgData)=>{

        return(<>
            <div 
                className={styles.sendToDBBTN}
                onClick={async()=>{
                    // setLoadState(true)
                    let stringifiedImgData= JSON.stringify(ImgData)
                    const res = await fetch("/api/genToolkit/pixApi", {
                        method: "POST",
                        body: stringifiedImgData
                    })
                    const imgDataSubmition = await res.json()
                    console.log(imgDataSubmition)
                    if (res.status===201){
                        // setimgDataObj to empty
                        // setLoadState(false)
                        // nextImg

                    } else {
                        window.alert(`Error with Img data submition: ${imgDataSubmition.message}`)
                    }
                }}>
            
                Send to database 
            
            </div>
        </>)
    }



    const anImageDataEditor=(eachImg)=>{
        // have fields to fill in pic data: location, area, country, imgname, imgalt, author, year
        
        // How to read meta data from Images on Chrome??

        return(<>
            <div className={styles.eachImgEditor}>
                {anImageDisp(
                    
                    CurrentImageData[0], 
                    
                    400, "LTCWide", "cucu Alt")}
                {anImgDataForm(CurrentImageData[0])}
                {dataSubmitionDisp(ImgData)}
            </div>
        </>)
    }


    console.log(ImgData)


    return(<>
    {session&& <> 
        <GMSNavii user={session.user} />
    </>}
        
        {anImageDataEditor()}

    </>)
}