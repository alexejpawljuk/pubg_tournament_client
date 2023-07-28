import {theme, ThemeConfig} from "antd"
import {useThemeConfig} from "../store/useThemeConfig"
import {useEffect} from "react"

interface IUseUserTheme {
    appThemeConfig: ThemeConfig
    setUserTheme: (theme: string) => void
    getUserTheme: () => string | null
}

export const useUserTheme = (): IUseUserTheme => {
    const {appThemeConfig, setThemeConfig} = useThemeConfig()

    const setUserTheme = (theme: string): void => localStorage.setItem("theme", theme)
    const getUserTheme = (): string | null => localStorage.getItem("theme")

    useEffect(() => {
        const userTheme = localStorage.getItem("theme")
        if (userTheme && userTheme === "light") setThemeConfig(prevState => ({
            ...prevState,
            algorithm: theme.defaultAlgorithm
        }))
        else setThemeConfig(prevState => ({
            ...prevState,
            algorithm: theme.darkAlgorithm
        }))
    }, [appThemeConfig.algorithm])

    return {
        appThemeConfig,
        setUserTheme,
        getUserTheme
    }
}