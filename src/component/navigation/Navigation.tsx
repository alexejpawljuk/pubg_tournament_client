import React from 'react'
import {MenuProps} from "antd"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"


export type MenuItem = Required<MenuProps>['items'][number]

export type LeftMenuKey = "home" | "shop"
export type RightMenuKey =  "balance" | "buy_coins" | "my_wallet" | "account" | "login" | "register" | "profile" | "setting" | "dark" | "light"

export function getItem(
    label: React.ReactNode,
    key: RightMenuKey | LeftMenuKey,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

const Navigation = () => {


    return (
        <>
            <LeftSide/>
            <RightSide/>
        </>
    )
}

export default Navigation