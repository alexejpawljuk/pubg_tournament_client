import { Footer } from 'antd/es/layout/layout'
import React, {FC, ReactNode} from 'react'
import {theme} from "antd";

const RootFooter: FC<{children: ReactNode}> = ({children}) => {
    const {token} = theme.useToken()

    return (
        <Footer
            style={{
                textAlign: 'center',
                minHeight: 260,
                padding: 0,
                paddingTop: 25,
        }}
        >
            {children}
        </Footer>
    )
}

export default RootFooter