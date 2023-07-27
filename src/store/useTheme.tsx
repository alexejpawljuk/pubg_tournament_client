import {create} from "zustand"
import {theme, ThemeConfig} from "antd"
import {Dispatch, SetStateAction} from "react"


interface UseTheme {
    appThemeConfig: ThemeConfig
    setTheme: Dispatch<SetStateAction<ThemeConfig>>
}

const defaultAppConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
}

export const useTheme = create<UseTheme>(setState => ({
    appThemeConfig: defaultAppConfig,
    setTheme: value => {
        if (typeof value === "function"){
            setState(state => ({
                ...state,
                appThemeConfig: value(state.appThemeConfig)
            }))
        }
        else {
            setState(state => ({
                ...state,
                theme: value
            }))
        }
    }
}))