import React, {FC, ReactNode, useEffect} from 'react'
import {ConfigProvider, ThemeConfig} from "antd"
import {BrowserRouter} from "react-router-dom"
import Root from "./component/root/Root"
import {useAppUserTheme} from "./store/useAppUserTheme"
import {useLogger} from "./hook/useLogger"

interface IAppProvider {
    children: ReactNode,
    appThemeConfig: ThemeConfig["algorithm"]
}

const AppProvider: FC<IAppProvider> = ({children, appThemeConfig}) => {
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
    useEffect(() => {
        console.log("Render App")
    })

    return (
        <div className="App">
            <AppProvider appThemeConfig={appAlgorithm}>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App