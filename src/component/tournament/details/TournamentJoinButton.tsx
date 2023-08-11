import React, {FC} from 'react'
import {Button, ButtonProps, Popconfirm, PopconfirmProps, theme} from "antd"
import {LoginOutlined} from "@ant-design/icons"

interface ITournamentJoinButton {
    buttonProps: ButtonProps
    popconfirmProps: PopconfirmProps
}

const TournamentJoinButton: FC<ITournamentJoinButton> = ({popconfirmProps, buttonProps}) => {
    const {token} = theme.useToken()

    return (
        // <Popconfirm
        //     okText="Yes"
        //     cancelText="No"
        //     placement="topRight"
        //     {...popconfirmProps}
        // >
            <Button
                size="small"
                style={{background: "orange", color: token.colorBgBase}}
                icon={<LoginOutlined/>}
                {...buttonProps}
            >Join</Button>

        // </Popconfirm>
    )
}

export default TournamentJoinButton