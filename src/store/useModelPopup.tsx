import {create} from "zustand"
import {Dispatch, ReactNode, SetStateAction} from "react"
import {devtools} from "zustand/middleware"

namespace UseModalPopup {
    type OpenModal = boolean
    export interface IStore {
        openModal: OpenModal
        children: ReactNode | null
        setOpenModal: Dispatch<SetStateAction<{ openModal: OpenModal, children: ReactNode }>>
    }
}

export const useModalPopup = create<UseModalPopup.IStore>()(
    devtools(
        (setState) => {
            return {
                openModal: false,
                children: null,
                setOpenModal: (value) => {
                    if (typeof value === "function") {
                        setState(state => ({
                            ...state,
                            openModal: value(state).openModal,
                            children: value(state).children,
                        }))
                    } else {
                        setState(state => ({
                            ...state,
                            openModal: value.openModal,
                            children: value.children,
                        }))
                    }
                }
            }
        }
    )
)