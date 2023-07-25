import { Footer } from 'antd/es/layout/layout'
import React, {FC, ReactNode} from 'react'

const RootLayoutFooter: FC<{children: ReactNode}> = ({children}) => {
    return (
        <Footer style={{textAlign: 'center'}}>
            {children}
        </Footer>
    )
}

export default RootLayoutFooter