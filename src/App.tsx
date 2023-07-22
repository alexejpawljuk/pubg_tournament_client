import React, {FC, ReactNode} from 'react'
import {theme, ThemeConfig} from "antd"
import {ConfigProvider} from "antd"
import {BrowserRouter} from "react-router-dom"

import Main from "./components/Main";
import ListTournament from "./components/ListTournament";
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
                <Main>
                    {/*<CardTournament/>*/}
                    <div style={{padding: 10}}>
                        <ListTournament/>

                    </div>
                </Main>
            </AppProvider>
        </div>
    )
}

export default App
