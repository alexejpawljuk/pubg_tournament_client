import React, {CSSProperties, FC, ReactNode} from "react";
import {Col} from "antd"

interface IMatchControlItemWrap {
    children: ReactNode
}

const MatchControlItemWrap: FC<IMatchControlItemWrap> = ({children}) => {
    const styles: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        minWidth: 240,
    }

    return (
        <Col style={styles}>{children}</Col>
    )
}

export {MatchControlItemWrap}