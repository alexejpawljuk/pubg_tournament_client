import React from 'react'
import {MenuProps} from "antd"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"


export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
    label: React.ReactNode,
    key: React.Key,
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