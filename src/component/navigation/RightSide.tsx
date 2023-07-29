import {useModalPopup} from "../../store/useModelPopup"
import {useThemeConfig} from "../../store/useThemeConfig"
import {useUserTheme} from "../../hook/useUserTheme"
import {UserAddOutlined, UserOutlined} from "@ant-design/icons"
import {AiOutlineLogin, AiOutlineSetting} from "react-icons/ai"
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import {Avatar, Badge, Image, Menu, MenuProps, theme} from "antd"
import AuthForm from "../AuthForm"
import RegisterForm from "../RegisterForm"
import React from "react"
import {getItem, MenuItem, RightMenuKey} from "./Navigation"
import {BiUserCheck} from "react-icons/bi"
import {CiWallet} from "react-icons/ci"
import coins from "../../image/svg/coins.svg"
import Wallet from "../Wallet";


const RightSide = () => {
    const modalPopup = useModalPopup()
    const {setThemeConfig} = useThemeConfig()
    const {setUserTheme} = useUserTheme()


    const items: MenuItem[] = [
        getItem(
            <Badge size={"small"} offset={[6, -7]} overflowCount={999} color="gold" showZero count={1000}>
                <span style={{color: "gold"}}>
                    coins
                </span>
            </Badge>, "balance",
            <CiWallet color="gold" size={16}/>, [
                getItem("My wallet", "my_wallet", <CiWallet color="gold" size={16}/>),
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

    const authProps: MenuProps = {
        mode: "horizontal",
        items,
        selectable: false,
    }

    const styles = {
        width: "50%",
        justifyContent: "right"
    }

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key as RightMenuKey) {
            case "login":
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    children: <AuthForm/>,
                    props: {width: 350}
                }))
                break;

            case "register":
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    props: {
                        width: 800
                    },
                    children: <RegisterForm/>
                }))
                break;

            case "dark":
                setThemeConfig(prevState => ({...prevState, algorithm: theme.darkAlgorithm}))
                setUserTheme(e.key)
                break;

            case "light":
                setThemeConfig(prevState => ({...prevState, algorithm: theme.defaultAlgorithm}))
                setUserTheme(e.key)
                break;

            case "profile":
                window.location.replace("/profile")
                break;

            case "buy_coins":
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    props: {
                        width: 500
                    },
                    children: <div>Тут будет инструкция как пополнить кошелек (крипта)</div>
                }))
                break;

            case "my_wallet":
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    children: <Wallet/>
                }))
                break;
        }
    }

    return <Menu onClick={onClick} style={styles} {...authProps}/>
}

export default RightSide