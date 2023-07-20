import React, {FC, ReactNode} from 'react'
import {theme, ThemeConfig} from "antd"
import {ConfigProvider} from "antd"
import Main from "./pages/Main";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import NoFound from "./pages/NotFound"

const appThemeConfig: ThemeConfig = {
    algorithm: theme.compactAlgorithm
}

const AppProvider: FC<{children: ReactNode}> = ({children}) => {
    return(
        <BrowserRouter>
            <ConfigProvider theme={appThemeConfig}>
                {children}
            </ConfigProvider>
        </BrowserRouter>
    )
}

function App() {
    return (
        <AppProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="*" element={<NoFound/>}/>
                </Routes>
            </div>
        </AppProvider>
    )
}

export default App
