import React, {CSSProperties, FC, ReactNode} from 'react'
import {Header} from "antd/es/layout/layout"
import {Row, theme} from "antd"

const RootLayoutContentHeader: FC<{children: ReactNode}> = ({children}) => {
    const {token: {colorBgContainer}} = theme.useToken()

    const styles: CSSProperties = {
        background: colorBgContainer,
        height: 240,
        // height: 200,
        padding: 0,
    }

    return (
        <Header style={styles}>
            <Row
                align="middle"
                style={{width: "100%", height: "100%"}}
            >{children}</Row>
        </Header>
    )
}


export default RootLayoutContentHeader