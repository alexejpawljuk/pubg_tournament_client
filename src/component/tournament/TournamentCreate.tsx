import React, {FC, useState} from 'react'
import {Button, ButtonProps, Col, Row} from "antd"
import {ShoppingCartOutlined} from "@ant-design/icons"
import Shop from "../shop/Shop"
import {IUseModalPopup} from "../../store/useModelPopup"
import AuthFrom from "../AuthForm";


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
    const [isAuth, setIsAuth] = useState<boolean>(false)


    if (isAuth)
        return (
            <>
                Create new tournament
            </>
        )

    else
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", }}>
                <AuthFrom props={{onFinish: () => {setIsAuth(true)}}}/>
            </div>
        )
}

export default TournamentCreate