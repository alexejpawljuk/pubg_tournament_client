import {useModalPopup} from "../../store/useModelPopup"
import {AiOutlineHome} from "react-icons/ai"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {Menu, MenuProps} from "antd"
import React from "react"
import {getItem, LeftMenuKey, MenuItem} from "./Navigation"
import Shop from "../shop/Shop";

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
        width: "50%",
    }

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key as LeftMenuKey) {
            case "home":
                window.location.replace("/")
                break;

            case "shop":
                // window.location.replace("/shop")
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    props: {
                        width: 550,
                    },
                    children: <Shop/>
                }))
                break;
        }
    }

    return (
        <Menu onClick={onClick} style={styles} {...menuProps}/>
    )
}

export default LeftSide