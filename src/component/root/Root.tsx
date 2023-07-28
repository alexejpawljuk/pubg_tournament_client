import React from 'react'
import {Layout} from 'antd'
import {Route, Routes} from "react-router-dom"
import RootLayoutHeader from "./RootLayoutHeader"
import RootLayoutContent from "./RootLayoutContent"
import RootLayoutContentHeader from "./RootLayoutContentHeader"
import RootContent from './RootContent'
import RootLayoutFooter from "./RootLayoutFooter"
import Home from "../content/Home"
import NoFound from "../content/NotFound"
import Navigation from "../navigation/Navigation"


const Root = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
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