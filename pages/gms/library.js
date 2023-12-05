import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"

import { GMSNavii } from '../../components/navis';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Slider from '@mui/material/Slider';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LinearProgress from '@mui/material/LinearProgress';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Dialog, } from '@mui/material';

import GenDataTemplates from "./../../data/dataAndTemplates"

import styles from "../../styles/pages/library.module.css";
import { aDropdownPicker, anInputDisplayer } from '../../components/forms';
import { aHotelDisplayer } from '../../components/operations/providers';

let toDate = new Date()

function LibraryPage(){
    const { data: session } = useSession()
// library page will list elements of DB that should be accesible for Operations, Sales, Finance, etc.

// HOTELS
// Hotel DB (rates, contacts, services), Hotel Adder, Mistery Shopper Review

// Providers
// Guides, Transports, activities, restaurants, services, companies(partners), yachts, flights

// Templates
// activities, itin descriptions, 

    const [library, setLibrary] = useState([])
    const [libraryTab, setLibraryTab]=useState("main")

    const [hotelSchema, setHotelSchema]=useState({
        "submitionDate": toDate,
        "createdBy":{},
        "contactArr": [],
        "roomPriceArr":[]
    })
    const [contactSchema, setContactSchema]=useState({})
    const [hotelAdderTrig, setHotelAddTrig]= useState(false)
    const [roomPriceObj, setRoomPriceObj]=useState({
        "breakfastInc":true
    })
    const [tempObj, setTempObj]=useState({})
    const [hotelSubmition, setHotelSub]=useState(false)

    const marks = [
        {
            "value": 0,
            "label": `1 Star`,
        },
        {
            "value": 25,
            "label": '2 Star',
        },
        {
            "value": 50,
            "label": '3 Star',
        },
        {
            "value": 75,
            "label": '4 Star',
        },
        {
            "value": 100,
            "label": '5 Star',
        }
    ]
    useEffect(async()=>{
        // fetches itin autofill
        const res = await fetch("http://localhost:3000/api/gms/library", {
            method: "GET"
        })
        const posts = await res.json()
        if (res.status === 200){
            setLibrary(posts)
        }
    },[])

    let providerType=["hotel", "transportCompany", "guide", "restaurant", "services", "yacht", "flotel", "ariline"]

    function Categoryswitcher(categoryz){
        switch (categoryz){
            case 0:
            return 1 
            break;
            case 25:
            return 2 
            break;
            case 50:
            return 3 
            break;
            case 75:
            return 4
            break;
            case 100:
            return 5 
            break;
        }
    }
    const aContactDisplayer=(aContact, indx)=>{
        return(<>
            <div className={styles.spaceBetRow}>
                <div className={styles.aContactRow}>
                    <h4>{aContact.name&& <>{aContact.name}</>}</h4>
                    {aContact.role&& <>&nbsp; &nbsp;{aContact.role}</>}
                </div>
                <div className={styles.aContactRow}>
                    {aContact.email&& <>
                        <span><a target='_blank' href={`mailto:${aContact.email}`}> <MailOutlineIcon/> </a></span></>}
                    {aContact.phono&& <>
                        <span><a target='_blank' href={`tel:+593${aContact.phono}`}> <PhoneForwardedIcon/></a></span></>}
                    {aContact.wapp&& <>
                        <span><a target='_blank' href={`https://wa.me/593${aContact.wapp}`}> 
                        <WhatsAppIcon/></a></span></>}
                </div>
            <div className={styles.removeContactBTN} onClick={()=>{
                let tempSplicer = hotelSchema.contactArr.splice(indx, 1)
                setHotelSchema({...hotelSchema })
            }} ><CancelPresentationIcon/></div>
            </div>
        </>)
    }
    const aRoomRateDisp=(aRoomData, indx)=>{
        return(<>
            <div className={styles.hotelRoomDisp}>
                <div style={{ display:"flex", flexDirection:"column", width:"50%" }}> 
                    {aRoomData.roomDescription &&<>
                        <strong> ROOM TYPE </strong>
                        {aRoomData.roomDescription}
                    </>}
                    {aRoomData.roomAlias &&<>
                        <i>{aRoomData.roomAlias}</i>
                    </>}
                    <strong>Breakfast 
                    {aRoomData.breakfastInc &&<> Included </>}
                    {aRoomData.breakfastPrice &&<> ${aRoomData.breakfastPrice}</>}
                    </strong>

                </div>
                <div style={{ display:"flex", flexDirection:"column", width:"18%" }}>
                    {aRoomData.rackRates &&<>
                        <strong> RACK $</strong>
                        <span style={{ textTransform:"uppercase"}}>
                           ${aRoomData.rackRates}</span>
                    </>} 
                </div>
                <div style={{ display:"flex", flexDirection:"column", width:"18%" }}>
                    {aRoomData.ltcRates &&<>
                        <strong> LTC $</strong>
                        <span style={{ textTransform:"uppercase"}}>
                           ${aRoomData.ltcRates}</span>
                    </>} 
                </div>
                <div style={{ display:"flex", flexDirection:"column", width:"18%" }}>
                    {aRoomData.additionalBed &&<>
                        <strong> ADD. BED </strong>
                        <span style={{ textTransform:"uppercase"}}>
                           ${aRoomData.additionalBed}</span>
                    </>} 
                </div>
            <div className={styles.rmvHotelBTN} onClick={()=>{
                let tempSplicer = hotelSchema.roomPriceArr.splice(indx, 1)
                setHotelSchema({...hotelSchema })
            }} ><CancelPresentationIcon/></div>
            </div>
        </>)
    }
    const aNumInput=(InputLabel, inputId, numberType)=>{
        return(<>
        <div className={styles.aPriceInputcont}>
            <label htmlFor={inputId} className={styles.anInputLabel}>{InputLabel}:</label>
            <span>
                {numberType==="price"&&<>
                    $ &nbsp;
                </> }
            <input
                placeholder={numberType===undefined? undefined : numberType }
                step=".01"
                type="number"
                id={inputId}
                min={0}
                onChange={(e)=>{
                    setRoomPriceObj({
                        ...roomPriceObj,
                        [inputId]: e.target.value
                    })
                }}
                /></span>
            </div>
        </>)
    }
    const anAdditServiceDis=(theService, indx)=>{
        return(<>
            <div className={styles.hotelRoomDisp}>
                cucuu
            </div>
        </>)
    }
    const contactAdder=()=>{
        return(<>
            <div className={styles.spaceBetRow}>
                <span style={{width:"60%" }}>
                    {anInputDisplayer("Contact Name", "name", "text", false, contactSchema.name, contactSchema, setContactSchema, undefined, undefined, "Name of team member" )}
                </span>
                <span style={{width:"35%" }}>
                    {anInputDisplayer("role", "role", "text", false, contactSchema.role, contactSchema, setContactSchema, undefined, undefined, "ex: reservations" ) }
                </span>
            </div>
            <div className={styles.spaceBetRow}>
                <span style={{width:"52%" }}>
                    {anInputDisplayer("email", "email", "text", false, contactSchema.email, contactSchema, setContactSchema, undefined, undefined, "ex: info@ikalagalapagos.com" )}
                </span>
                <span style={{width:"43%" }}>
                    {anInputDisplayer("phono", "phono", "tel", false, contactSchema.phono, contactSchema, setContactSchema, undefined, undefined, "ex: 0986775422" ) }
                </span>
            </div>
            <div className={styles.spaceBetRow}>
                <span style={{width:"43%" }}>
                    {anInputDisplayer("whatsapp", "wapp", "tel", false, contactSchema.wapp, contactSchema, setContactSchema, undefined, undefined, "ex: 0986775422" ) }
                </span>
                <span style={{width:"50%", alignItems:"center" }} onClick={()=>{
                    let tempArr = hotelSchema.contactArr.concat(contactSchema)
                    setHotelSchema({
                        ...hotelSchema,
                        "contactArr": tempArr
                    })
                    setContactSchema({})
                    let wappVal = document.getElementById("wapp")
                    wappVal.value=''
                    let nameVal = document.getElementById("name")
                    nameVal.value=''
                    let emailVal = document.getElementById("email")
                    emailVal.value=''
                    let phonoVal = document.getElementById("phono")
                    phonoVal.value=''
                    let roleVal = document.getElementById("role")
                    roleVal.value=''
                }}>
                    <div className={styles.addRecordBTN} > Add to Contacts </div>
                </span>
            </div>
        </>)
    }
    const hotelAdderForm=()=>{
        return(<>
            <Dialog open={hotelAdderTrig} fullWidth maxWidth={"xl"} onClose={()=>setHotelAddTrig(false)} >
            <form className={styles.hotelAdderForm} 
            onSubmit={async(e)=>{
                    e.preventDefault()
                    setHotelSub(true)
                    let backEndHotelObj={
                        ...hotelSchema,
                        "createdBy":{
                            "name":session?.user.name,
                            "email":session?.user.email,
                            "phono":session?.user.phono,
                            },
                        "status": 1,

                        }
                    let res = await fetch("/api/gms/library",{
                        method: "POST",
                        body: JSON.stringify(backEndHotelObj)
                    })
                    let submitHotel = await res.json()
                    if(res.status===200){
                        window.alert("Hotel Added to Library!")
                        setHotelAddTrig(false)
                        setHotelSub(false)
                    }

                }}>
                <h1>Add hotel to Database</h1>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        {anInputDisplayer("hotel name", "hotelName", "text", true, hotelSchema.hotelName, hotelSchema, setHotelSchema, undefined, undefined, "Hotel Name" )}
                        {anInputDisplayer("Address", "hotelAddress", "text", true, hotelSchema.hotelAddress, hotelSchema, setHotelSchema, undefined, undefined, "Street Address" )}
                        {aDropdownPicker(GenDataTemplates.ecuadorCities, "City", "hotelCity", hotelSchema, setHotelSchema, )}
                        {aDropdownPicker(GenDataTemplates.ecuadorProvinces, "province", "hotelProvince", hotelSchema, setHotelSchema,)}
                        {anInputDisplayer("Location notes", "locNotes", "text", false, hotelSchema.locNotes, hotelSchema, setHotelSchema, undefined, undefined, "Notes, like how to get there" )}
                    </div>
                    <div className={styles.dataColumn}>
                        {aDropdownPicker(GenDataTemplates.hotelCategories, "category", "hotelCategory", hotelSchema, setHotelSchema )}
                        <span style={{ width:"97%"}}>
                        <Slider
                            aria-label="Always visible"
                            step={25}
                            marks={marks}
                            onChange={(e)=>{
                                setHotelSchema({
                                    ...hotelSchema,
                                    "accomodationCategory": Categoryswitcher(e.target.value)
                                })
                            }}
                        /></span>
                        {anInputDisplayer("website", "hotelWebsite", "text", false, hotelSchema.hotelWebsite, hotelSchema, setHotelSchema, undefined, undefined, "Hotel Website" )}
                    </div>
                </div>
                <div className={styles.sectionDivider}> 
                    Contacts
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        {contactAdder()}
                    </div>
                    <div className={styles.dataColumn}>
                        {hotelSchema.contactArr.length>0 && <>
                            <h3>Registered Contacts</h3>
                            {hotelSchema.contactArr.map((elem, i)=><React.Fragment key={i}>
                                {aContactDisplayer(elem, i)}
                            </React.Fragment> )}
                        </>}
                    </div>
                </div>
                <div className={styles.sectionDivider}> 
                    Rates
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        <div className={styles.spaceBetRow}>
                            <span style={{width:"60%" }}>
                                {anInputDisplayer("Room Description", "roomDescription", "text", false, undefined, roomPriceObj, setRoomPriceObj, undefined, undefined, "Ex: Single Room Standard" )}
                            </span>
                            <span style={{width:"33%" }}>
                                {anInputDisplayer("# rooms", "roomAmount", "number", false, undefined, roomPriceObj, setRoomPriceObj, undefined, undefined, "Ex: 5" ) }
                            </span>
                        </div>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch 
                                onChange={()=>{
                                    if(roomPriceObj.roomAlias){
                                        setRoomPriceObj({...roomPriceObj, "roomAlias":false })
                                    } else {
                                        setRoomPriceObj({...roomPriceObj, "roomAlias":true })
                                    }
                                }} />} label="Room Alias" />
                            {roomPriceObj.roomAlias&&<>
                                <span style={{width:"50%"}}>
                                {anInputDisplayer("Room Alias", "roomAlias", "text", false, undefined, roomPriceObj, setRoomPriceObj, undefined, undefined, "Ex: Casona Bungalow" )}
                                </span>
                            </>}
                        </div>
                        <div className={styles.spaceBetRow}>
                            {aNumInput("Rack Rates", "rackRates", "price" )}
                            {aNumInput("LTC Rates", "ltcRates", "price" )}
                        </div>
                        <br/>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch defaultChecked 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setRoomPriceObj({...roomPriceObj, "breakfastInc":false })
                                    } else {
                                        setRoomPriceObj({...roomPriceObj, "breakfastInc":true })
                                    }
                                }} />} label="Breakfast Included" />
                            {!roomPriceObj.breakfastInc&&<>
                                {aNumInput("Breakfast Price", "breakfastPrice", "price" )}
                            </>}
                        </div>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setRoomPriceObj({...roomPriceObj, "additionalBed":false })
                                    } else {
                                        setRoomPriceObj({...roomPriceObj, "additionalBed":true })
                                    }
                                }} />} label="Extra Bed" />
                            {roomPriceObj.additionalBed&&<>
                                {aNumInput("Extra Bed", "additionalBed", "price" )}
                            </>}
                        </div>
                        <div className={styles.addRecordBTN} onClick={()=>{
                            let tempArr = hotelSchema.roomPriceArr.concat(roomPriceObj)
                            setHotelSchema({
                                ...hotelSchema,
                                "roomPriceArr": tempArr
                            })
                            setRoomPriceObj({"breakfastInc":true})
                            let roomDescriptionVal = document.getElementById("roomDescription")
                            roomDescriptionVal.value=''
                            let roomAmountVal = document.getElementById("roomAmount")
                            roomAmountVal.value=''
                            if(roomPriceObj.roomAlias){
                                let roomAliasVal = document.getElementById("roomAlias")
                                roomAliasVal.value=''
                            }
                            let rackRatesVal = document.getElementById("rackRates")
                            rackRatesVal.value=0
                            let ltcRatesVal = document.getElementById("ltcRates")
                            ltcRatesVal.value=0
                            if(!roomPriceObj.breakfastInc){
                                let breakfastPriceVal = document.getElementById("breakfastPrice")
                                breakfastPriceVal.value=''
                            }
                            if(roomPriceObj.additionalBed){
                                let additionalBedVal = document.getElementById("additionalBed")
                                additionalBedVal.value=''
                            }
                        }} > Add room </div>
                    </div>
                    <div className={styles.dataColumn}>
                        {hotelSchema.roomPriceArr?.length>0 && <>
                            <h3>Registered Rooms</h3>
                            {hotelSchema.roomPriceArr.map((elem, i)=><React.Fragment key={i}>
                                {aRoomRateDisp(elem, i)}
                            </React.Fragment>)}
                        </>}
                    </div>
                </div>



                {/* <div className={styles.sectionDivider}> 
                    Additional Services
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        <div className={styles.spaceBetRow}>
                            <span style={{width:"100%" }}>
                                {anInputDisplayer("Service Description", "serviceDescription", "text", false, undefined, tempObj, setTempObj, undefined, undefined, "Ex: Standard Dinner Service" )}
                            </span>
                        </div>
                        <div className={styles.spaceBetRow}>
                            {aNumInput("Pax min", "guestMin" )}
                            {aNumInput("Pax max", "guestMax" )}
                        </div>



                        <div className={styles.addRecordBTN} onClick={()=>{
                            let tempArr 
                            if(hotelSchema.serviceArr){
                                tempArr = hotelSchema.serviceArr?.concat(tempObj)
                            } else {
                                tempArr=[tempObj]
                            }
                            setHotelSchema({
                                ...hotelSchema,
                                "serviceArr": tempArr
                            })
                            setTempObj({})
                            let serviceDescriptionVal = document.getElementById("serviceDescription")
                            serviceDescriptionVal.value=''
                            let guestMinVal = document.getElementById("guestMin")
                            guestMinVal.value=''
                            let guestMaxVal = document.getElementById("guestMax")
                            guestMaxVal.value=''

                            // per pax, per group

                        }} > Add Additional Service </div>
                    </div>
                    <div className={styles.dataColumn}>
                        {hotelSchema.serviceArr?.length>0 && <>
                            <h3>Additional Services</h3>
                            {hotelSchema.serviceArr.map((elem, i)=><React.Fragment key={i}>
                                {anAdditServiceDis(elem, i)}
                            </React.Fragment>)}
                        </>}
                    </div>
                </div> */}



                {hotelSubmition? <>
                    <LinearProgress color="secondary" />
                </>:<>
                    <input className={styles.submitHotelBTN} type="submit" value="Add to Library"/>
                </> }
            </form>
            </Dialog>
        </>)
    }


    const libraryDisplayer=()=>{

        return(<>
            {library.length>0 &&<>
                {library.map((elem, i)=><React.Fragment key={i}> 
                    {aHotelDisplayer(elem)}
                </React.Fragment>  )}
            </> }
        </>)

    }


                // {
                //     "priceKey":"additionalServices",
                //     "priceDescription":"standard dinner",
                //     "priceType":"per person",
                //     "price":20
                // },  






    // console.log(hotelSchema)

    return(<>
    {session && <>
        <GMSNavii user={session.user} /> 
        <div className={styles.generalPageCont}> 
            <LocalLibraryIcon fontSize="large" />
            <h2>Latin Travel Collection</h2>
            <h1>Library</h1>

            {libraryTab==="main"? <>
            <div className={styles.libraryMain}> 
                <div className={styles.libWelcome} > 

                    {/* Quick Links  */}
                    {/* yacht Anahi  */}
                    {/* Ikala UIO - GPS  */}
                    {library.length>0 && <>
                        <div className={styles.aQuickLink} onClick={()=>setLibraryTab("library")}>
                            Access Library
                        </div>
                    </>}
                </div>
                <div className={styles.libQuickLinks} > 
                    <div className={styles.aQuickLinkDES} >
                        LTC Team directory
                    </div>
                    <div className={styles.aQuickLinkDES} >
                        LTC product directory
                    </div>
                    <br/><br/>

                    <div className={styles.aQuickLink} onClick={()=>setHotelAddTrig(true)}>
                        Add Hotel to Library
                    </div>
                    <div className={styles.aQuickLinkDES} >
                        add provider to Library
                    </div>
                </div>
            </div>
            </> : libraryTab==="library"&& <> 
            
                {libraryDisplayer()}
            
            </>}
            
            {hotelAdderForm()}
        </div>
    </>}
    {/* log in form */}
    </>)
}


export default LibraryPage