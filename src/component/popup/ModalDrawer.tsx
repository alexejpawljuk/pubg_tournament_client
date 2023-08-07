import React, {CSSProperties, FC, ReactNode, useEffect} from 'react'
import {Button, Drawer, Space} from "antd"
import {useModalDrawer} from "../../store/useModalDrawer"
import {ShoppingCartOutlined} from "@ant-design/icons";

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
            width={500}
            onClose={onClose}
            {...props}

            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button icon={<ShoppingCartOutlined loop={true}/>} onClick={onClose}>
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