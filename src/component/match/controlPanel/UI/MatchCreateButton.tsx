import React, {CSSProperties, FC} from "react"
import {Button, ButtonProps, theme} from "antd"
import {MatchControlItemWrap} from "../MatchControlItemWrap"
import {FormOutlined} from "@ant-design/icons"

interface IMatchCreateButton {
    props: ButtonProps
}

const MatchCreateButton: FC<IMatchCreateButton> = ({props}) => {
    const {token: {colorBgContainer}} = theme.useToken()
    const styles: CSSProperties = {
        background: "orange",
        width: 164
    }

    return (
        <MatchControlItemWrap>
            <Button
                style={styles}
                icon={<FormOutlined size={16} style={{color: colorBgContainer}}/>}
                size="small"
                {...props}
            >
                <span style={{color: colorBgContainer}}>
                    create match
                </span>
            </Button>
        </MatchControlItemWrap>
    )
}

export {MatchCreateButton}