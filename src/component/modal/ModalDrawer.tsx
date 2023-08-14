import React, {CSSProperties, FC, ReactNode, useEffect} from 'react'
import {Drawer} from "antd"
import {ModalDrawerService} from "../../service/ModalDrawerService"

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

const ModalDrawer = () => {
    const {
        openDrawer,
        setOpenDrawer,
        children,
        props
    } = ModalDrawerService()

    const onClose = () => {
        setOpenDrawer(prevState => ({...prevState, openDrawer: false}))
    }

    const toDefault = () => {
        setOpenDrawer(prevState => ({...prevState, children: null, props: {}}))
    }

    useEffect(() => {
        return () => {
            toDefault()
        }
    }, [])

    return (
        <Drawer
            open={openDrawer}
            destroyOnClose
            keyboard
            footer={null}
            placement="left"
            width={500}
            onClose={onClose}
            {...props}
        ><Content>{children}</Content></Drawer>
    )
}

export default ModalDrawer