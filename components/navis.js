import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {SignOutBtn} from "./../components/authForms"

import styles from "./../styles/components/navis.module.css"

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import Drawer from '@mui/material/Drawer';

import CondorLogo from "../public/assets/logos/condor1.png"

import EcoAndesFontFace from "./../public/assets/logos/fontFace.png"
import UsFlagIcon from '../public/assets/logos/usFlag.svg'
import SpainFlagIcon from '../public/assets/logos/spainFlag.svg'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const contactNum1 = <><a target='_blank' href="tel:+17862963950"> <PhoneForwardedIcon fontSize="inherit" /></a> </> 
//  --> to DTorres US numb
const contactNum2 = <>&nbsp;<a target='_blank' href="https://wa.me/593979469989"><WhatsAppIcon fontSize="inherit" /></a></> 
//  --> to Juan Orozco EC Numb
const contactEmail = <><a target='_blank' href="mailto:info@ecoandestravel.com"><MailOutlineIcon fontSize="inherit" /></a></>



// home menu
// FFR Flagged for rename
export function GeneralDataBar(props){
    const flagSwitcher =(langCont)=>{
        if (langCont==="engl"){
            return(<>
                <div className={styles.langSwitcherCont}>
                    <div className={styles.activeLang}> <div className={styles.flagIcon}> <Image src={UsFlagIcon} alt="US Flag Icon" layout='responsive'/> </div> EN </div>
                    <div className={styles.inActiveLang} onClick={()=>props.setCurrentLang("span")}> <div className={styles.flagIcon}><Image src={SpainFlagIcon} alt="Spain Flag Icon" layout='responsive'/></div>  ES </div>
                </div>
            </>)
        } else if (langCont==="span"){
            return(<>
                <div className={styles.langSwitcherCont}>
                    <div className={styles.inActiveLang} onClick={()=>props.setCurrentLang("engl")}> <div className={styles.flagIcon}><Image src={UsFlagIcon} alt="US Flag Icon" layout='responsive'/></div>EN </div>
                    <div className={styles.activeLang} > <div className={styles.flagIcon}><Image src={SpainFlagIcon} alt="Spain Flag Icon" layout='responsive'/> </div>ES </div>
                </div>
            </>)
        }
    }
     

    let eachMenuItem=props.navBTNS.map((elem,i)=><React.Fragment key={i}>
        <Link href={props.navLinks[i]}><div className={styles.menuItems}>{elem}</div></Link>
    </React.Fragment>)

    return(<>
        <div className={styles.generalNavBar}>
            <div className={styles.navTop}>
                <div className={styles.naviSection}>
                <div className={styles.naviLogo}>
                <Image
                    src={CondorLogo}
                    alt="EcoAndes Condor Logo"
                    layout="responsive"
                /></div>
                <div className={styles.naviLogo2}>
                <Image
                    src={EcoAndesFontFace}
                    alt="EcoAndes Text Logo"
                    layout="responsive"
                    priority={true}
                /></div>
                </div>
                <div style={{display: "flex", justifyContent: "center", width: "33%"}}>
                    {contactNum1} &nbsp; | &nbsp;
                    {contactNum2} &nbsp; | &nbsp;
                    {contactEmail}
                </div>

                {flagSwitcher(props.currentLang)}

            </div>
            <nav className={styles.navBtm}>
                {eachMenuItem}
            </nav>
        </div>
    </>)
}

// Applied on Tours
// Applied on Tours
export function LTCNaviBar(props){
    return(<>
    <div className={styles.LTCNaviGenCont}> 
        {props.inTrip?<>
        <Link href="/tours">
            <ArrowBackIosIcon />itineraries
        </Link>
        </>:<> <div /> </>}
        <div className={styles.LTCNaviLinks}> 
            {contactNum1} &nbsp; &nbsp; &nbsp; &nbsp;
            {contactNum2} &nbsp; &nbsp; &nbsp; &nbsp;
            {contactEmail} 
        </div>
    </div>
    </>)
}

export function GMSNavii(props){

    // userLogIn/SignOut options all here. can reuse Drawer to dosplay login Opts

    const [drawerToggle, setDrawerToggle] = useState(false)
    const router = useRouter()

    const menuOptArr = [
        {
            "restriction": "David Torres",
            "pathname": "/playground",
            "label": "Playground"
        },
        {
            "restriction": "David Torres",
            "pathname": "/gms/adminDash",
            "label": "Admin Dash"
        },
        {
            "restriction": "David Torres",
            "pathname": "/gms/pix",
            "label": "pix"
        },
        {
            "restriction": "David Torres",
            "pathname": "/gms/library",
            "label": "library"
        },
        {
            "restriction": "David Torres",
            "pathname": "/yacuma",
            "label": "yacuma"
        },
        {
            "pathname": "/gms/operations",
            "label": "operations"
        },
        {
            "pathname": "/gms/tourExplorer",
            "label": "tour Explorer"
        },
        {
            "pathname": "/gms/tourCreator",
            "label": "Tour Creator",
            "printDel": true
        },
    ]

    if (props.user){
    return(<>
        <div className={styles.GMSNaviCont} onClick={()=>setDrawerToggle(true)}> 

            <div className={styles.GMSsNaviTitle}>
                LTC{router.pathname}
            </div>

            {/* User icon and Burger */}
            <div style={{display: "flex", alignItems:"center", backgroundColor:"white"}}> 
                <div className={styles.GMSNaviBurger}>
                    <span />
                    <span />
                    <span />
                </div>
                <div className={styles.gmsUserProfilePic}>
                    {props.user.profilePic ? <> 
                        <img 
                            src={props.user.profilePic}
                            alt={`${props.user.name}'s profile pic`}
                            width={55}
                            height={55}
                        />
                    </>:<>
                    
                    </> }
                </div>
            </div>
        </div>
        <Drawer anchor={"right"} open={drawerToggle} onClose={()=>setDrawerToggle(false)} >
            <div className={styles.userNaviDrawer}>
                <h3> Hi {props.user.name} </h3>
                <div className={styles.userNaviDrawerBTNs}>
                    {menuOptArr.map((elem, i)=><React.Fragment key={i}>
                        {elem.printDel? <>
                            <div className={styles.mobileDEL}> 
                                {router.pathname!= elem.pathname &&<><Link href="/gms/tourCreator">  
                                Tour Creator
                            </Link></>}</div>
                        </>:<>
                            {props.user.name === elem.restriction && <>
                                {router.pathname!=elem.pathname&&<><Link href={elem.pathname}>  
                                {elem.label}
                                </Link></>}
                            </>}
                            {elem.restriction===undefined&&<>
                                {router.pathname!=elem.pathname&&<><Link href={elem.pathname}>  
                                {elem.label}
                                </Link></>}
                            </>}
                        </>}
                    </React.Fragment>)}                    
                </div>
                <SignOutBtn />
            </div>
        </Drawer>
    </>)
    }
}