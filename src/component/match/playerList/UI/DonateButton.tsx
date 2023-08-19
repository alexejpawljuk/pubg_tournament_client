import React, {FC, ReactNode} from 'react'
import {Avatar, Button, ButtonProps} from "antd"
import coinSVG from "../../../../image/svg/coins.svg"

interface IDonateButton {
    props: ButtonProps
    children: ReactNode
}

const DonateButton: FC<IDonateButton> = ({props, children}) => {
    return (
        <Button
            style={{fontSize: 9, width: 75}}
            size="small"
            icon={<Avatar style={{marginBottom: 3, padding: 0}} size={19} src={coinSVG}/>}
            {...props}
        >{children}</Button>
    )
}

export {DonateButton}