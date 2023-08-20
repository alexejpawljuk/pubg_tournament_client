import {UserAddOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons"
import {AiOutlineLogin, AiOutlineSetting} from "react-icons/ai"
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import {Avatar, Badge, Menu, MenuProps, theme} from "antd"
import React from "react"
import {BiUserCheck} from "react-icons/bi"
import {CiWallet} from "react-icons/ci"
import {MenuItem, useNavigation} from "../../hook/useNavigation"
import coinSVG from "../../image/svg/coins.svg"


const RightSide = () => {
    const {token} = theme.useToken()
    const {rightSide, getItem} = useNavigation()

    const items: MenuItem[] = [
        getItem(
            <Badge size={"small"} offset={[6, -7]} overflowCount={999} color="gold" showZero count={1000}>
                <span style={{color: "gold"}}>
                    coins
                </span>
            </Badge>, "balance",
            <WalletOutlined style={{color: "gold"}} size={16}/>, [
                getItem("My wallet", "my_wallet", <CiWallet color="gold" size={16}/>),
                getItem("Buy coins", "buy_coins", <Avatar src={coinSVG} size={18}/>)
            ]),
        getItem("Account", "account", <UserOutlined/>, [
            getItem("Login", "login", <AiOutlineLogin/>),
            getItem("Register", "register", <UserAddOutlined/>),
            getItem("Profile", "profile", <BiUserCheck/>),
            getItem("Setting", "setting", <AiOutlineSetting/>, [
                getItem("Dark", "dark", <MdDarkMode/>),
                getItem("Light", "light", <MdOutlineDarkMode/>),
            ]),
        ]),
    ]

    const menuProps: MenuProps = {
        mode: "horizontal",
        items,
        selectable: false,
    }

    const styles = {
        width: "50%",
        justifyContent: "right",
        background: token.colorBgLayout
    }

    return <Menu onClick={rightSide.onClick} style={styles} {...menuProps}/>
}

export default RightSide