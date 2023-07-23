import React, {CSSProperties, FC, ReactNode} from 'react'
import {Modal} from "antd"
import {useModalPopup} from "../store/useModelPopup"

interface IContent {
    children: ReactNode
}

const Content: FC<IContent> = ({children}) => {
    const styles: CSSProperties = {
        margin: 20
    }

    return (
        <div style={styles}>
            {children}
        </div>
    )
}

const ModalPopup = () => {
    const {
        openModal,
        setOpenModal,
        children,
    } = useModalPopup()

    return (
        <Modal
            open={openModal}
            width={1000}
            centered
            destroyOnClose
            keyboard
            footer={null}
            onCancel={() => setOpenModal({openModal: false, children: null})}
        ><Content>{children}</Content>
        </Modal>
    )
}

export default ModalPopup