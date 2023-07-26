import {create} from "zustand"
import {MenuProps} from "antd"
import {Dispatch, SetStateAction} from "react"


interface UseTheme {
    theme: MenuProps["theme"]
    setTheme: Dispatch<SetStateAction<MenuProps["theme"]>>
}

export const useTheme = create<UseTheme>(setState => ({
    theme: "dark",
    setTheme: value => {
        if (typeof value === "function"){
            setState(state => ({
                ...state,
                theme: value(state.theme)
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