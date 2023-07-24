import React, {FC, ReactNode} from 'react'
import {theme, ThemeConfig} from "antd"
import {ConfigProvider} from "antd"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./components/content/Home"
import NoFound from "./components/content/NotFound"
import ModalPopup from "./components/ModalPopup"
import Root from "./components/Root/Root";

const appThemeConfig: ThemeConfig = {
    algorithm: theme.defaultAlgorithm
}

const AppProvider: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={appThemeConfig}>
                {children}
            </ConfigProvider>
        </BrowserRouter>
    )
}

function App() {

    return (
        <div className="App">
            <AppProvider>
                <ModalPopup/>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App