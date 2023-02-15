import React from 'react'
import { useState } from 'react'


import { SignInForm, SignOutBtn } from "./../components/authForms"
import { useSession, signOut } from "next-auth/react"


export default function PlaygroundPage(props){
    return(<>
        Cucu
        <br/>

        Make a universal Input maker
        <br/>
        Style it for LTC general Input
        <br/>
        Finish tourMaker - Displayer
        <br/>

    </>)
}