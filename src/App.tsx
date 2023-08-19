import React, {FC, ReactNode, useEffect} from 'react'
import {ConfigProvider, theme, ThemeConfig} from "antd"
import {BrowserRouter} from "react-router-dom"
import Root from "./component/root/Root"
import {AppUserThemeService} from "./service/AppUserThemeService"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint"


interface IAppProvider {
    children: ReactNode,
    appThemeConfig: ThemeConfig["algorithm"]
}

const AppProvider: FC<IAppProvider> = ({children, appThemeConfig}) => {

    return (
        <BrowserRouter>
            <ConfigProvider theme={{
                algorithm: appThemeConfig,
            }}
            >
                {children}
            </ConfigProvider>
        </BrowserRouter>
    )
}

function App() {
    const appUserThemeService = AppUserThemeService()

    const breakpoint = useBreakpoint()

    useEffect(() => {
        console.log("Render App")
        console.log("Breakpoint:", breakpoint)
    })


    return (
        <div className="App" style={{minWidth: 380}}>
            <AppProvider appThemeConfig={appUserThemeService.appAlgorithm}>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App