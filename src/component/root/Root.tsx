import React, {useEffect} from 'react'
import {Layout, theme} from 'antd'
import {Route, Routes} from "react-router-dom"
import RootLayoutHeader from "./RootLayoutHeader"
import RootLayoutContent from "./RootLayoutContent"
import RootLayoutContentHeader from "./RootLayoutContentHeader"
import RootContent from './RootContent'
import RootLayoutFooter from "./RootLayoutFooter"
import Home from "../content/Home"
import NoFound from "../content/NotFound"
import Navigation from "../navigation/Navigation"
import Account from "../content/Account"
import ModalPopup from "../popup/ModalPopup"
import CommunityFloatButton from "../community/CommunityFloatButton"
import ModalDrawer from "../popup/ModalDrawer";


const Root = () => {
    const {token: {colorBgContainer}} = theme.useToken()

    useEffect(() => {
        const bodyEl = document.querySelector("body")
        if (bodyEl) bodyEl.style.background = colorBgContainer
    }, [colorBgContainer])


    return (
        <Layout style={{minHeight: '100vh'}}>
            <ModalPopup/>
            <ModalDrawer/>
            <CommunityFloatButton/>

            <RootLayoutHeader>
                <Navigation/>
            </RootLayoutHeader>
            <RootLayoutContent>
                <RootLayoutContentHeader>
                    LOGO
                </RootLayoutContentHeader>
                <RootContent>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<Account/>}/>
                        <Route path="*" element={<NoFound/>}/>
                    </Routes>
                </RootContent>
            </RootLayoutContent>
            <RootLayoutFooter>
                Ant Design ©2023 Created by Ant UED
            </RootLayoutFooter>
        </Layout>
    )
}

export default Root