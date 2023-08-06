import React, {CSSProperties, FC, ReactNode, useEffect} from 'react'
import {Button, Drawer, Space} from "antd"
import {useModalDrawer} from "../../store/useModalDrawer"

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
    } = useModalDrawer()

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
            title="Create new tournament"
            width={500}
            onClose={onClose}
            {...props}

            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            {/*<Content>{children}</Content>*/}
        </Drawer>
    )
}

export default ModalDrawer