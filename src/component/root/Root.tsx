import React, {useEffect} from 'react'
import {Layout, theme} from 'antd'
import {Route, Routes} from "react-router-dom"
import RootHeader from "./RootHeader"
import RootContent from './RootContent'
import RootFooter from "./RootFooter"
import Home from "../content/Home"
import NoFound from "../content/NotFound"
import Navigation from "../navigation/Navigation"
import Account from "../content/Account"
import ModalPopup from "../modal/ModalPopup"
import CommunityFloatButton from "../community/CommunityFloatButton"
import ModalDrawer from "../modal/ModalDrawer"
import FooterContent from "../footer/FooterContent"


const Root = () => {
    const {token} = theme.useToken()

    useEffect(() => {
        const bodyEl = document.querySelector("body")
        if (bodyEl) bodyEl.style.background = token.colorBgContainer
    }, [token.colorBgContainer])


    return (
        <Layout>
            <ModalPopup/>
            <ModalDrawer/>
            <CommunityFloatButton/>

            <RootHeader>
                <Navigation/>
            </RootHeader>

            <RootContent>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Account/>}/>
                    <Route path="*" element={<NoFound/>}/>
                </Routes>
            </RootContent>

            <RootFooter>
                <FooterContent/>
            </RootFooter>

        </Layout>
    )
}

export default Root