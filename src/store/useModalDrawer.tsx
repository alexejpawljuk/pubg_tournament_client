import {Dispatch, ReactNode, SetStateAction} from "react"
import {DrawerProps} from "antd"
import {create} from "zustand"
import {devtools} from "zustand/middleware"

namespace IUseDrawer {
    type OpenDrawer = boolean

    export interface IStore {
        openDrawer: OpenDrawer
        children: ReactNode | null
        props: DrawerProps
        setOpenDrawer: Dispatch<SetStateAction<{ openDrawer: OpenDrawer, children: ReactNode, props?: DrawerProps }>>
    }
}

export const useModalDrawer = create<IUseDrawer.IStore>(
    (setState) => {
        return {
            openDrawer: false,
            children: null,
            props: {},
            setOpenDrawer: (value) => {
                if (typeof value === "function") {
                    setState(state => ({
                        ...state,
                        openDrawer: value(state).openDrawer,
                        children: value(state).children,
                        props: value(state).props
                    }))
                } else {
                    setState(state => ({
                        ...state,
                        openDrawer: value.openDrawer,
                        children: value.children,
                        props: value.props
                    }))
                }
            }
        }
    }
)