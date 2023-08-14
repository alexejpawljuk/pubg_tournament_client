import React, {FC, ReactNode} from "react"
import {Badge} from "antd"

interface IPremiumDisplay {
    children: ReactNode
    isPremiumAccount: boolean
}

const PremiumDisplay: FC<IPremiumDisplay> = ({children, isPremiumAccount}) => {

    if (isPremiumAccount) {
        return (
            <Badge.Ribbon
                text="premium"
                color="gold"
            >{children}</Badge.Ribbon>
        )
    } else {
        return <>{children}</>
    }
}

export default PremiumDisplay