import {create} from "zustand"
import {theme, ThemeConfig} from "antd"
import {Dispatch, SetStateAction} from "react"
import {devtools} from "zustand/middleware"


interface IUseTheme {
    appThemeConfig: ThemeConfig
    setThemeConfig: Dispatch<SetStateAction<ThemeConfig>>
}

const defaultAppConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm
}

export const useThemeConfig = create<IUseTheme>()(
    devtools(
        (setState) => ({
            appThemeConfig: defaultAppConfig,
            setThemeConfig: value => {
                if (typeof value === "function") {
                    setState(state => ({
                        ...state,
                        appThemeConfig: value(state.appThemeConfig)
                    }))

                } else {
                    setState(state => ({
                        ...state,
                        theme: value
                    }))
                }
            }
        })
    )
)