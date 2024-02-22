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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Dialog, } from '@mui/material';

import GenDataTemplates from "./../../data/dataAndTemplates"

import styles from "../../styles/pages/library.module.css";
import { aDropdownPicker, anInputDisplayer, inputToList, multiOptPicker } from '../../components/forms';
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
    let interestOptArr =[
        "Ecuador",  
        "Galapagos",  
        "Peru",  
        "Machu Picchu",  
        "Bolivia",  
        "Chile",  
        "Argentina",
        "Patagonia",
        "Colombia",
        "Antartica",
        ]
    let clientTypes=[
        "fit",
        "agency",
        "media",
        "gov",
    ]
    const additionalExpenseSchema={
        "ivaInc":true,
        "serviceChargeInc":true,
        "perPerson":true,
        "priceKey":"additionalServices",
    }
    const aHotelSchema={
        "submitionDate": toDate,
        "createdBy":{},
        "contactArr": [],
        "roomPriceArr":[]
    }
    const aClientSchema = {
        "clientType": "fit",
        "createdBy":{},
        "submitionDate": toDate,
        "clientName": String,
        "city": String,
        "phono": Number,
        "email": String,
        "interestArr": [],
        "notes":[],
    }

    const [library, setLibrary] = useState([])
    const [libraryTab, setLibraryTab]=useState("main")

    const [clientSchema, setClientSchema] = useState(aClientSchema)
    const [hotelSchema, setHotelSchema]=useState(aHotelSchema)
    const [contactSchema, setContactSchema]=useState({})
    const [hotelAdderTrig, setHotelAddTrig]= useState(false)
    const [roomPriceObj, setRoomPriceObj]=useState({
        "breakfastInc":true,
        "ivaInc": true,
        "serviceChargeInc": true,
    })
    const[interestTempArr, setInterestTempArr]=useState(interestOptArr)
    const [addClientTrig, setAddClientTrig] = useState(false)
    const [editingServiceObj, setEditingService]=useState(additionalExpenseSchema)
    const [hotelSubmition, setHotelSub]=useState(false)
    const [inputPlaceholder, setInputPlaceholder] = useState("")
    const [inputPlaceholder2, setInputPlaceholder2] = useState("")
    const [inputPlaceholder3, setInputPlaceholder3] = useState("")
    const [inputPlaceholder4, setInputPlaceholder4] = useState("")
    const [inputPlaceholder5, setInputPlaceholder5] = useState("")

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
    useEffect(()=>{
        const getAutofill=async()=>{
            const res = await fetch("http://localhost:3000/api/gms/library", {
                method: "GET"
            })
            const posts = await res.json()
            if (res.status === 200){
                setLibrary(posts)
            }
        }
        // fetches itin autofill
        getAutofill()
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
            <div className={styles.rmvEntryBTN} onClick={()=>{
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
        if(theService.serviceName){
            return(<>
                <div className={styles.serviceDetDisp}>


                    <div className={styles.rmvExpenseBTN}> 
                        <CancelPresentationIcon /> 
                    </div>


                    <div className={styles.spaceBetRow}>
                        <div className={styles.serviceColumn}>
                            <strong> {theService.serviceName} </strong>
                            <i> {theService.serviceDescription} </i>
                            <br/>
                            {theService.paxMin&&<>
                                <div className={styles.priceDetIncl}>
                                    {theService.paxMin} &nbsp; - &nbsp; Guest Minimum
                                </div>
                            </>}
                            {theService.paxMax&&<>
                                <div className={styles.priceDetIncl}>
                                    {theService.paxMax} &nbsp; - &nbsp; Guest Maximum
                                </div>
                            </>}
                        </div>
                        <div className={styles.aColumn}>
                            <div className={styles.priceDisp} > USD $ {theService.price}  </div>
                            {theService.perPerson&&<>
                                <div className={styles.priceDetIncl}>
                                <PersonAddIcon fontSize="small" /> &nbsp; - &nbsp; price per person
                                </div>
                            </> }
                            {theService.ivaInc&&<> 
                                <div className={styles.priceDetIncl}>
                                    <LocalOfferIcon fontSize="small" /> &nbsp; - &nbsp; 12% Iva Included
                                </div>
                            </>}
                            {theService.serviceChargeInc&&<> 
                                <div className={styles.priceDetIncl}>
                                    <RoomServiceIcon fontSize="small" />&nbsp; - &nbsp; 10% service included
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </>)
        }
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
            <Dialog open={hotelAdderTrig} fullWidth maxWidth={"xl"} onClose={()=>{
                setHotelAddTrig(false)
                setHotelSchema(aHotelSchema)
                }}>
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
                        let tempLibArr = [...library]
                        tempLibArr.push(backEndHotelObj)
                        setLibrary(tempLibArr)
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
                            <FormControlLabel control={<Switch defaultChecked 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setRoomPriceObj({...roomPriceObj, "serviceChargeInc":false })
                                    } else {
                                        setRoomPriceObj({...roomPriceObj, "serviceChargeInc":true })
                                    }
                                }} />} label="10% Service Charge Included" />
                        </div>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch defaultChecked 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setRoomPriceObj({...roomPriceObj, "ivaInc":false })
                                    } else {
                                        setRoomPriceObj({...roomPriceObj, "ivaInc":true })
                                    }
                                }} />} label="12% Iva Tax Included" />
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
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        {inputToList("Add price Conditions", "priceConditions", hotelSchema, setHotelSchema, hotelSchema.priceConditions, inputPlaceholder, setInputPlaceholder)}
                    </div>
                    <div className={styles.dataColumn}>
                        {inputToList("Add gratuities or discounts", "gratuitiesAndCond", hotelSchema, setHotelSchema, hotelSchema.gratuitiesAndCond, inputPlaceholder2, setInputPlaceholder2)}
                    </div>
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        {inputToList("Credit or Payment Policies", "creditConditions", hotelSchema, setHotelSchema, hotelSchema.creditConditions, inputPlaceholder3, setInputPlaceholder3)}
                    </div>
                    <div className={styles.dataColumn}>
                        {inputToList("Observations", "observations", hotelSchema, setHotelSchema, hotelSchema.observations, inputPlaceholder4, setInputPlaceholder4)}
                    </div>
                </div>
                <div className={styles.spaceBetRow}>
                </div>

                <div className={styles.sectionDivider}> 
                    Additional Services
                </div>
                <div className={styles.spaceBetRow}>
                    <div className={styles.dataColumn}>
                        <span style={{width:"100%" }}>
                            {anInputDisplayer("Service Name", "serviceName", "text", false, undefined, editingServiceObj, setEditingService, undefined, undefined, "Ex: Standard Dinner Service" )}
                        </span>
                        <span style={{width:"100%" }}>
                            {anInputDisplayer("Service Description", "serviceDescription", "text", false, undefined, editingServiceObj, setEditingService, undefined, undefined, "Ex: Menú almuerzo o cena incluyendo: ... " )}
                        </span>
                        <div className={styles.spaceBetRow}>
                            <span style={{width:"48%" }}>
                                {anInputDisplayer("Pax Min", "paxMin", "number", false, undefined, editingServiceObj, setEditingService, 0, undefined, "Guest Minimum" )}
                            </span>
                            <span style={{width:"48%" }}>
                                {anInputDisplayer("Pax Max", "paxMax", "number", false, undefined, editingServiceObj, setEditingService, 0, undefined, "Guest Maximum" )}
                            </span>
                        </div>
                        <span style={{width:"65" }}>
                            {anInputDisplayer("Price", "price", "number", false, undefined, editingServiceObj, setEditingService, 0, undefined, "Ex: 250" )}
                        </span>

                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch checked={editingServiceObj.perPerson} 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setEditingService({...editingServiceObj, "perPerson":false })
                                    } else {
                                        setEditingService({...editingServiceObj, "perPerson":true })
                                    }
                                }} />} label="Price is Per Person" />
                        </div>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch checked={editingServiceObj.serviceChargeInc} 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setEditingService({...editingServiceObj, "serviceChargeInc":false })
                                    } else {
                                        setEditingService({...editingServiceObj, "serviceChargeInc":true })
                                    }
                                }} />} label="10% Service Charge Included" />
                        </div>
                        <div className={styles.spaceBetRow}>
                            <FormControlLabel control={<Switch checked={editingServiceObj.ivaInc} 
                                onChange={(e)=>{
                                    if(!e.target.checked){
                                        setEditingService({...editingServiceObj, "ivaInc":false })
                                    } else {
                                        setEditingService({...editingServiceObj, "ivaInc":true })
                                    }
                                }} />} label="12% Iva Tax Included" />
                        </div>

                        <div className={styles.addRecordBTN} onClick={()=>{
                            let tempArr 
                            if(hotelSchema.serviceArr){
                                tempArr = hotelSchema.serviceArr?.concat(editingServiceObj)
                            } else {
                                tempArr=[editingServiceObj]
                            }
                            setHotelSchema({
                                ...hotelSchema,
                                "serviceArr": tempArr
                            })
                            setEditingService(additionalExpenseSchema)
                            let serviceNameVal = document.getElementById("serviceName")
                            serviceNameVal.value=''
                            let serviceDescriptionVal = document.getElementById("serviceDescription")
                            serviceDescriptionVal.value=''
                            let paxMinVal = document.getElementById("paxMin")
                            paxMinVal.value=''
                            let paxMaxVal = document.getElementById("paxMax")
                            paxMaxVal.value=''
                            let priceVal = document.getElementById("price")
                            priceVal.value=''

                            // per pax, per group

                        }} > Add Additional Service </div>
                    </div>
                    <div className={styles.dataColumn}>
                        {anAdditServiceDis(editingServiceObj)}
                        {hotelSchema.serviceArr?.length>0 && <>
                            <h3>Additional Services</h3>
                            {hotelSchema.serviceArr.map((elem, i)=><React.Fragment key={i}>
                                {anAdditServiceDis(elem, i)}
                            </React.Fragment>)}
                        </>}
                    </div>
                </div>
                {hotelSubmition? <>
                    <LinearProgress color="secondary" />
                </>:<>
                    <input className={styles.submitHotelBTN} type="submit" value="Add to Library"/>
                </> }
            </form>
            </Dialog>
        </>)
    }

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    // CLIENTS
    const aClientDisplayer=(aClient)=>{
        return(<>
            <div className={styles.aClientDisp}> 
                <div className={styles.spaceBetRow}> 
                    <h2>{aClient.name}</h2>
                    <h2>{aClient.clientType}</h2>
                </div>
                {aClient?.event&& <>{aClient.event} </>} 
                {aClient?.city&& <> | {aClient.city} </>}
                <br/>
                <br/>
                {aClient?.phono&& <><strong> {aClient.phono} </strong> </>}
                {aClient?.email&& <> <a  href={`mailto:${aClient.email}?subject=${aClient.city} contact`}> {aClient.email} </a></>}

                {aClient?.interestArr.length>0&& <>
                    <br/>
                    <strong>Interests:</strong> {aClient?.interestArr.map((elem,i)=><React.Fragment key={i}>
                        {i>0&&<>, </>} {elem}
                    </React.Fragment> )}
                </>}

                {aClient?.notes.length>0&& <>
                    <br/>
                    <br/>
                    <strong>NOTES:</strong> {aClient?.notes.map((elem,i)=><React.Fragment key={i}>
                        {i>0&&<>, </>} {elem}
                    </React.Fragment> )}
                </>}
            </div>
        </>)
    }
    const clientAdderForm=()=>{
        return(<>
        <Dialog open={addClientTrig} onClose={()=>setAddClientTrig(false)} fullWidth maxWidth={"xl"} >
            <form className={styles.hotelAdderForm} onSubmit={(e)=>{
                e.preventDefault()
                // Send package to Back end

                // if package is sucessfully written, alert, erase ClientSchema
                let tempObj = {
                    "name": session.user.name,
                    "email": session.user.email,
                }

            }} >
                <h1>Add client to Database</h1>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div className={styles.dataColumn}>
                        {anInputDisplayer("client name", "name", "text", true, clientSchema.clientName, clientSchema, setClientSchema, undefined, undefined, "Client Name" )}
                        {anInputDisplayer("City", "city", "text", true, clientSchema.city, clientSchema, setClientSchema, undefined, undefined, "Client city" )}
                        {anInputDisplayer("event", "event", "text", false, clientSchema.event, clientSchema, setClientSchema, undefined, undefined, "Client event" )}
                        {aDropdownPicker(clientTypes, "Client Type", "clientType", clientSchema, setClientSchema, )}
                        {anInputDisplayer("Email", "email", "email", true, clientSchema.email, clientSchema, setClientSchema, undefined, undefined, " Client email" )}
                        {anInputDisplayer("Phone", "phono", "number", false, clientSchema.phono, clientSchema, setClientSchema, undefined, undefined, " Client phone number" )}
                        {multiOptPicker(interestTempArr, "interests", "interestArr", clientSchema.interestArr, clientSchema, setClientSchema, setInterestTempArr )}
                        {inputToList("Notes:", "notes", clientSchema, setClientSchema, clientSchema.notes, inputPlaceholder5, setInputPlaceholder5 )}
                    </div>
                    <div className={styles.clientColumn}>
                        <input type="submit" className={styles.addRecordBTN} value="add client to Database +" style={{position:"sticky", top:"33px"}} />
                        <br/>
                        {aClientDisplayer(clientSchema)}
                    </div>
                </div>
            </form>
        </Dialog>
        </>)
    }


    // 
    const libraryDisplayer=()=>{

        return(<>
        <div className={styles.backBTN} onClick={()=>{
            setLibraryTab("main")
        }} ><ArrowBackIosNewIcon/> BACK </div>
            {library.length>0 &&<>
                {library.map((elem, i)=><React.Fragment key={i}> 
                    {aHotelDisplayer(elem)}
                </React.Fragment>  )}
            </> }
        </>)

    }

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
                    {(session?.user?.name==="David Torres" || session?.user?.name==="Anahi Torres" )&&<>
                        <div className={styles.aQuickLink} onClick={()=>setAddClientTrig(true)}>
                            Add Client to Library
                        </div>
                    </> }
                    <div className={styles.aQuickLinkDES} >
                        add provider to Library
                    </div>
                </div>
            </div>
            </> : libraryTab==="library"&& <> 
            
                {libraryDisplayer()}
            
            </>}
            
            {hotelAdderForm()}
            {clientAdderForm()}
        </div>
    </>}
    {/* log in form */}
    </>)
}


export default LibraryPage