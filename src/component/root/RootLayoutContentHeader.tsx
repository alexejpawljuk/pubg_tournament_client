import React, {FC, ReactNode} from 'react'
import {Header} from "antd/es/layout/layout"
import {theme} from "antd"

const RootLayoutContentHeader: FC<{children: ReactNode}> = ({children}) => {
    const {token: {colorBgContainer}} = theme.useToken()

    const styles = {padding: 0, background: colorBgContainer, height: 100}

    return (
        <Header style={styles}>
            <div className={"gradient-background"}
                 style={{width: "100%", height: "100%", textAlign: "center"}}
            >{children}
            </div>
        </Header>
    )
}


export default RootLayoutContentHeader