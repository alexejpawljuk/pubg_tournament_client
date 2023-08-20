import React from 'react'
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"


export type LeftMenuKey = "home" | "shop"
export type RightMenuKey =
    "balance"
    | "buy_coins"
    | "my_wallet"
    | "account"
    | "login"
    | "register"
    | "profile"
    | "setting"
    | "dark"
    | "light"


const Navigation = () => {
    return (
        <>
            <LeftSide/>
            <RightSide/>
        </>
    )
}

export default Navigation