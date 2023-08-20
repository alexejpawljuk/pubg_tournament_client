import {AiOutlineHome} from "react-icons/ai"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {Menu, MenuProps, theme} from "antd"
import React from "react"
import {MenuItem, useNavigation} from "../../hook/useNavigation"

const LeftSide = () => {
    const {token} = theme.useToken()
    const {leftSide, getItem} = useNavigation()

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
        background: token.colorBgLayout
    }

    return (
        <Menu onClick={leftSide.onClick} style={styles} {...menuProps}/>
    )
}

export default LeftSide