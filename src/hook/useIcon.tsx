import {FaRegMoneyBill1} from "react-icons/fa6"
import React, {ReactNode} from "react"


interface Icons {
    token_currency: ReactNode
}

export const useIcon = () => {

    const icons: Icons = {
        token_currency: <FaRegMoneyBill1 color={"gold"} size={15}/>,
    }

    const get = (iconName: keyof Icons): ReactNode => {
        return icons[iconName]
    }

    return {
        get
    }
}

