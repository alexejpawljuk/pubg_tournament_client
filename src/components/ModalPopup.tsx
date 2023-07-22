import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react'
import {Modal, ModalProps} from "antd"

interface IModalPopup {
    children?: ReactNode
    props?: ModalProps
}

const ModalPopup: FC<IModalPopup> = ({children, props}) => {
    const [open, setOpen] = useState<boolean>()

    useEffect(() => {
        console.log("Modal:", open)
        setTimeout(() => {
            setOpen(true)
        }, 2000)
    }, [])

    return (
        <Modal
            title="ModalPopup 1000px width"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            {...props}
        >
            {children}
        </Modal>
    )
}

export default ModalPopup