import React, {FC, ReactNode} from 'react'
import {ConfigProvider, ThemeConfig} from "antd"
import {BrowserRouter} from "react-router-dom"
import ModalPopup from "./component/popup/ModalPopup"
import Root from "./component/root/Root"
import {useAppUserTheme} from "./store/useAppUserTheme";
import {useLogger} from "./hook/useLogger";

const AppProvider: FC<{ children: ReactNode, appThemeConfig: ThemeConfig["algorithm"] }> = ({children, appThemeConfig}) => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={{algorithm: appThemeConfig}}>
                {children}
            </ConfigProvider>
        </BrowserRouter>
    )
}

function App() {
    const {appAlgorithm} = useAppUserTheme()
    useLogger("App render")
    return (
        <div className="App">
            <AppProvider appThemeConfig={appAlgorithm}>
                <ModalPopup/>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App