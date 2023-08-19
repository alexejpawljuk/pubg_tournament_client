import React, {FC} from "react"
import Shop from "../../shop/Shop"
import {Button, ButtonProps} from "antd"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {IModalPopupService} from "../../../service/ModelPopupService"


interface IMatchCreateProps {
    props?: ButtonProps
    modalPopup: IModalPopupService.IStore
}

const MatchCreateHeader: FC<IMatchCreateProps> = ({props, modalPopup}) => {

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

export default MatchCreateHeader