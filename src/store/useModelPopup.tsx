import {create} from "zustand"
import {Dispatch, ReactNode, SetStateAction} from "react"
import {devtools} from "zustand/middleware"
import {ModalProps} from "antd"

export namespace IUseModalPopup {
    type OpenModal = boolean

    export interface IStore {
        openModal: OpenModal
        children: ReactNode | null
        props: ModalProps
        setOpenModal: Dispatch<SetStateAction<{ openModal: OpenModal, children: ReactNode, props?: ModalProps }>>
    }
}

export const useModalPopup = create<IUseModalPopup.IStore>()(
    devtools(
        (setState) => {
            return {
                openModal: false,
                children: null,
                props: {},
                setOpenModal: (value) => {
                    if (typeof value === "function") {
                        setState(state => ({
                            ...state,
                            openModal: value(state).openModal,
                            children: value(state).children,
                            props: value(state).props
                        }))
                    } else {
                        setState(state => ({
                            ...state,
                            openModal: value.openModal,
                            children: value.children,
                            props: value.props
                        }))
                    }
                }
            }
        }
    )
)