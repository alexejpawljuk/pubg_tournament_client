import React, {FC, ReactNode, useEffect} from 'react'
import {ConfigProvider, ThemeConfig} from "antd"
import {BrowserRouter} from "react-router-dom"
import Root from "./component/root/Root"
import {useAppUserTheme} from "./store/useAppUserTheme"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";


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

    const breakpoint = useBreakpoint()

    useEffect(() => {
        console.log("Render App")
        console.log("Breakpoint:", breakpoint)
    })

    return (
        <div className="App" style={{minWidth: 380}}>
            <AppProvider appThemeConfig={appAlgorithm}>
                <Root/>
            </AppProvider>
        </div>
    )
}

export default App