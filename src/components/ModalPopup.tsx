import React from 'react'
import {Modal} from "antd"
import {useModalPopup} from "../store/useModelPopup";

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
        >{children}
        </Modal>
    )
}

export default ModalPopup