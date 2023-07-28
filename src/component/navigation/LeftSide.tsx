import {useModalPopup} from "../../store/useModelPopup"
import {AiOutlineHome} from "react-icons/ai"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {Menu, MenuProps} from "antd"
import Shop from "../shop/Shop"
import React from "react"
import {getItem, MenuItem} from "./Navigation"

const LeftSide = () => {
    const modalPopup = useModalPopup()

    const items: MenuItem[] = [
        getItem("Home", "home", <AiOutlineHome/>),
        getItem('Shop', 'shop', <ShoppingCartOutlined/>)
    ]

    const menuProps: MenuProps = {
        mode: "horizontal",
        items,
        selectable: false,
    }

    const styles = {
        width: "50%"
    }

    const onClick: MenuProps["onClick"] = (e) => {
        const {key} = e
        if (key === "home") {
            window.location.replace("/")
        }
        if (key === "shop") {
            console.log("Click shop")
            modalPopup.setOpenModal(prevState => ({
                ...prevState,
                openModal: true,
                props: {
                    width: 550
                },
                children: <Shop/>
            }))
        }
    }

    return (
        <Menu onClick={onClick} style={styles} {...menuProps}/>
    )
}

export default LeftSide