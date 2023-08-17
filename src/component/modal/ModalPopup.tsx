import React, {CSSProperties, FC, ReactNode} from 'react'
import {Modal} from "antd"
import {ModalPopupService} from "../../service/ModelPopupService"

interface IContent {
    children: ReactNode
}

const Content: FC<IContent> = ({children}) => {
    const styles: CSSProperties = {
        margin: "20px 0"
    }

    return (
        <div style={styles}>
            {children}
        </div>
    )
}

interface IModalPopup {

}

const ModalPopup: FC<IModalPopup> = () => {
    const {
        openModal,
        setOpenModal,
        children,
        props
    } = ModalPopupService()

    const close = () => {
        setOpenModal(prevState => ({...prevState, openModal: false}))
    }

    const toDefault = () => {
        setOpenModal(prevState => ({...prevState, children: null, props: {}}))
    }

    return (
        <Modal
            open={openModal}
            centered
            destroyOnClose
            keyboard
            footer={null}
            onCancel={close}
            afterClose={toDefault}
            {...props}
        ><Content>{children}</Content>
        </Modal>
    )
}

export default ModalPopup