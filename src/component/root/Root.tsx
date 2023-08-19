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
import ModalPopup from "../modal/ModalPopup"
import CommunityFloatButton from "../community/CommunityFloatButton"
import ModalDrawer from "../modal/ModalDrawer"
import {HeaderFeed} from "../header/HeaderFeed"
import FooterContent from "../footer/FooterContent"




const Root = () => {
    const {token} = theme.useToken()

    useEffect(() => {
        const bodyEl = document.querySelector("body")
        if (bodyEl) bodyEl.style.background = token.colorBgContainer
    }, [token.colorBgContainer])


    return (
        <Layout>
            {/*<ModalNotification />*/}
            <ModalPopup/>
            <ModalDrawer/>
            <CommunityFloatButton/>

            <RootLayoutHeader>
                <Navigation/>
            </RootLayoutHeader>

            <RootLayoutContent>
                <RootLayoutContentHeader>
                    <HeaderFeed/>
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
                <FooterContent/>
            </RootLayoutFooter>

        </Layout>
    )
}

export default Root