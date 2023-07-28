import React, {FC, ReactNode} from 'react'
import {ConfigProvider, ThemeConfig} from "antd"
import {BrowserRouter} from "react-router-dom"
import ModalPopup from "./component/popup/ModalPopup"
import Root from "./component/root/Root"
import {useUserTheme} from "./hook/useUserTheme"

const AppProvider: FC<{ children: ReactNode, appThemeConfig: ThemeConfig }> = ({children, appThemeConfig}) => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={appThemeConfig}>
                {children}
            </ConfigProvider>
        </BrowserRouter>
    )
}

function App() {
    const {appThemeConfig} = useUserTheme()

    return (
        <div className="App">
            <AppProvider appThemeConfig={appThemeConfig}>
                <ModalPopup/>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App