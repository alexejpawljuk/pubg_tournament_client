import React, {CSSProperties, FC, ReactNode} from "react";
import {Col} from "antd"

interface ITournamentControlItemWrap {
    children: ReactNode
}

const TournamentControlItemWrap: FC<ITournamentControlItemWrap> = ({children}) => {
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

export {TournamentControlItemWrap}