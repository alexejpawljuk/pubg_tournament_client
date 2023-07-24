import React, {FC, ReactNode} from 'react'
import {theme, ThemeConfig} from "antd"
import {ConfigProvider} from "antd"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./content/Home"
import NoFound from "./content/NotFound"
import ModalPopup from "./components/ModalPopup";

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
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NoFound/>}/>
                </Routes>
            </AppProvider>
        </div>
    )
}

export default App
