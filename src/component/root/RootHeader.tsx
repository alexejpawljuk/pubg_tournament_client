import React, {CSSProperties, FC, ReactNode} from 'react'
import {Header} from "antd/es/layout/layout"

const RootHeader: FC<{ children: ReactNode }> = ({children}) => {
    const styles: CSSProperties = {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingInline: 0,

    }

    return (
        <Header style={styles}>
            {children}
        </Header>
    )
}

export default RootHeader