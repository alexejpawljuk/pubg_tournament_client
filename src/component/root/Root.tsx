import React, {CSSProperties, useEffect} from 'react'
import {Button, Col, Layout, Row, Tag, theme} from 'antd'
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
import {FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined} from '@ant-design/icons'
import {IoNotificationsOutline} from "react-icons/io5";
import {AiTwotoneNotification} from "react-icons/ai";
import FooterContent from "../footer/FooterContent";

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