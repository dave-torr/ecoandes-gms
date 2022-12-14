import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from "./../styles/components/navis.module.css"

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import Drawer from '@mui/material/Drawer';

import CondorLogo from "../public/assets/logos/condor1.png"
import ecoAndesTRU from "../public/assets/logos/ecoAndesTRU.png"
import EcoAndesFontFace from "./../public/assets/logos/fontFace.png"
import UsFlagIcon from '../public/assets/logos/usFlag.svg'
import SpainFlagIcon from '../public/assets/logos/spainFlag.svg'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// with english/spanish switcher

const contactNum1 = <><a target='_blank' href="tel:+593996406954"> <PhoneForwardedIcon fontSize="inherit" /></a> </> 
const contactNum2 = <>&nbsp;<a target='_blank' href="https://wa.me/593987298410"><WhatsAppIcon fontSize="inherit" /></a></> 
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

export function EcoAndesBar(props){
    return(<>
    <div className={styles.ecoAndesBarGenCont}> 
        {props.inTrip?<>
        <Link href="/tours">
        <a><ArrowBackIosIcon />itineraries</a>
        </Link>
        </>:<> <div /> </>}
        <div className={styles.ecoAndesBarLinks}> 
            {contactNum1} &nbsp; &nbsp; &nbsp; &nbsp;
            {contactNum2} &nbsp; &nbsp; &nbsp; &nbsp;
            {contactEmail} 
        </div>
    </div>
    </>)
}

export function Navi2(props){
    const [drawerToggle, setDrawerToggle] = useState(false)
    return(<>
    <div className={styles.navi2GenCont}>
        <div className={styles.naviLogo3}>
        <Image
            src={ecoAndesTRU}
            alt="EcoAndes Condor Logo"
            layout="responsive"
            blurDataURL="URL"
            placeholder="blur"
        /></div>
        {/* <div className={styles.naviHamburger} onClick={()=>setDrawerToggle(true)}>
            <span />
            <span />
            <span />
        </div> */}
        <Drawer anchor={"right"} open={drawerToggle} onClose={()=>setDrawerToggle(false)} >
            <div className={styles.rightDrawerNaviGenCont}> 
            
                <div style={{width: "100%", textAlign: "end", cursor:"pointer"}} onClick={()=>setDrawerToggle(false)}> 
                    <CloseIcon /> </div>
                <div className={styles.menuItemsCont}> 

{/* ////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// */}

{/* define WTF with these links once proposal is accepted */}





                    <div className={styles.eachMenuItem}>home</div>
                    <div className={styles.eachMenuItem}>about us</div>
                    <div className={styles.eachMenuItem}>
                        <Link href="/tours">
                            itineraries
                        </Link>
                    </div>
                    <div className={styles.eachMenuItem}>contact</div>







                </div>
                <div className={styles.ecoAndesBarLinks}> 
                    {contactNum1} &nbsp; &nbsp; &nbsp; &nbsp;
                    {contactNum2} &nbsp; &nbsp; &nbsp; &nbsp;
                    {contactEmail} 
                </div>
            </div>
        </Drawer>
    </div>
    </>)
}

export function GeneralFooter(props){

    return(<>
        <footer className={styles.footercont}>

        </footer>
    </>) 
}

export function GmsUserNavi(props){
    const [drawerToggle, setDrawerToggle] = useState(false)
    const router = useRouter()

    return(<>
        <div className={styles.gmsUserNavCont}> 
            <div className={styles.gmsUserNavBurger} onClick={()=>setDrawerToggle(true)}>
                <span />
                <span />
                <span />
            </div>
            <div className={styles.gmsUserProfilePic}  onClick={()=>setDrawerToggle(true)}>
                <Image 
                    src={props.user.profilePic}
                    alt={`${props.user.name}'s profile pic`}
                    width={55}
                    height={55}
                />
            </div>
        </div>
        <Drawer anchor={"right"} open={drawerToggle} onClose={()=>setDrawerToggle(false)} >

            {/* Change Spans to Link when operational */}

            <div className={styles.userNaviDrawer}>
                <h3> Hi {props.user.name} </h3>
                <div className={styles.userNaviDrawerBTNs}>
                    {router.pathname!="/tourCreator"&&<> <span> Tour Creator</span></>}
                    {router.pathname!="/tourExplorer"&&<> <span> Tour Explorer</span></>}
                    {router.pathname!="/operations"&&<> <span> Tour Creator</span></>}
                </div>
                {props.signOut}
            </div>
        </Drawer>
    </>)
}