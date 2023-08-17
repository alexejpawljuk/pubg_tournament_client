import {Content} from 'antd/es/layout/layout'
import React, {FC, ReactNode} from 'react'
import {theme} from "antd"

const RootContent: FC<{ children: ReactNode }> = ({children}) => {
    const {token} = theme.useToken()

    return (

        <Content style={{margin: '0 0'}}>
            <div style={{padding: 0, margin: 0, minHeight: 360, backgroundImage: token.colorBgContainer}}>
                {children}
            </div>
        </Content>

    )
}

export default RootContent