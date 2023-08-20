import {create} from "zustand"
import {theme, ThemeConfig} from "antd"
import {Dispatch, SetStateAction} from "react"

type ThemeType = "dark" | "light"

interface IAppUserThemeService {
    appAlgorithm: ThemeConfig["algorithm"]
    appUserTheme: ThemeType
    setAppUserTheme: Dispatch<SetStateAction<ThemeType>>
}

const setThemeToLocalStorage = (theme: ThemeType) => localStorage.setItem("theme", theme)
const getThemeToLocalStorage = (): ThemeType | null => localStorage.getItem("theme") as ThemeType

export const AppUserThemeService = create<IAppUserThemeService>((setState) => {
        const userTheme = getThemeToLocalStorage()

        return {
            appUserTheme: userTheme && userTheme === "light" ? "light" : "dark",
            appAlgorithm: userTheme && userTheme === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
            setAppUserTheme: value => {
                if (typeof value === "function") {
                    setState(state => {
                        setThemeToLocalStorage(value(state.appUserTheme))
                        return {
                            ...state,
                            appUserTheme: value(state.appUserTheme),
                            appAlgorithm: value(state.appUserTheme) === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm
                        }
                    })
                } else {
                    setState(state => {
                        setThemeToLocalStorage(value)
                        return {
                            ...state,
                            appUserTheme: value,
                            appAlgorithm: value === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm
                        }
                    })
                }
            }
        }
    }
)