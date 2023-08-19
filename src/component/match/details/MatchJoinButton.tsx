import React, {FC} from 'react'
import {Button, ButtonProps, PopconfirmProps, theme} from "antd"
import {LoginOutlined} from "@ant-design/icons"

interface IMatchJoinButton {
    buttonProps: ButtonProps
    popconfirmProps: PopconfirmProps
}

const MatchJoinButton: FC<IMatchJoinButton> = ({popconfirmProps, buttonProps}) => {
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

export default MatchJoinButton