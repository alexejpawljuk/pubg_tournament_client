import React, {FC} from 'react'
import {Button, ButtonProps} from "antd"
import {ShoppingCartOutlined} from "@ant-design/icons"
import Shop from "../shop/Shop"
import {IUseModalPopup} from "../../store/useModelPopup"


interface ITournamentCreate {

}

interface ITournamentCreateProps {
    props?: ButtonProps
    modalPopup: IUseModalPopup.IStore
}

export const TournamentCreateProps: FC<ITournamentCreateProps> = ({props, modalPopup}) => {

    const onShop = () => {
        modalPopup.setOpenModal(prevState => ({
            ...prevState,
            openModal: true,
            props: {
                width: 550
            },
            children: <Shop/>
        }))
    }

    return (
        <Button
            icon={<ShoppingCartOutlined/>}
            onClick={onShop}
            {...props}
        >Shop</Button>
    )
}

const TournamentCreate: FC<ITournamentCreate> = () => {

    return (
        <>
            Create new tournament
        </>
    )
}

export default TournamentCreate