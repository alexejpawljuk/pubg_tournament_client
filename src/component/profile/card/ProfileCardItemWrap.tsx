import React, {CSSProperties, FC, ReactNode} from "react"
import {Row} from "antd"

interface IProfileCardItemWrap {
    children: ReactNode
}


const ProfileCardItemWrap: FC<IProfileCardItemWrap> = ({children}) => {
    const styles: CSSProperties = {
        width: "100%"
    }

    return (
        <Row style={styles} justify="center">
            {children}
        </Row>
    )
}

export {ProfileCardItemWrap}