import React, {CSSProperties, FC} from "react";
import {Button, ButtonProps, theme} from "antd";
import {TournamentControlItemWrap} from "../TournamentControlItemWrap";
import {FormOutlined} from "@ant-design/icons"

interface ITournamentCreateButton {
    props: ButtonProps
}

const TournamentCreateButton: FC<ITournamentCreateButton> = ({props}) => {
    const {token: {colorBgContainer}} = theme.useToken()
    const styles: CSSProperties = {
        background: "orange",
        width: 164
    }

    return (
        <TournamentControlItemWrap>
            <Button
                style={styles}
                icon={<FormOutlined size={16} style={{color: colorBgContainer}}/>}
                size="small"
                {...props}
            >
                <span style={{color: colorBgContainer}}>
                    create tournament
                </span>
            </Button>
        </TournamentControlItemWrap>
    )
}

export {TournamentCreateButton}