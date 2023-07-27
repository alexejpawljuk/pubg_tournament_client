import React, {FC, ReactNode} from 'react'
import {theme, ThemeConfig} from "antd"
import {ConfigProvider} from "antd"
import {BrowserRouter} from "react-router-dom"

import ModalPopup from "./component/popup/ModalPopup"
import Root from "./component/root/Root"
import {useTheme} from "./store/useTheme";


const AppProvider: FC<{ children: ReactNode }> = ({children}) => {
    const {appThemeConfig} = useTheme()

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