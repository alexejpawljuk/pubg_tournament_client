import {useModalPopup} from "../../store/useModelPopup"
import {useAppUserTheme} from "../../store/useAppUserTheme"
import {UserAddOutlined, UserOutlined, WalletOutlined} from "@ant-design/icons"
import {AiOutlineLogin, AiOutlineSetting} from "react-icons/ai"
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import {Badge, Menu, MenuProps} from "antd"
import AuthForm from "../AuthForm"
import RegisterForm from "../RegisterForm"
import React from "react"
import {getItem, MenuItem, RightMenuKey} from "./Navigation"
import {BiUserCheck} from "react-icons/bi"
import {CiWallet} from "react-icons/ci"
import Wallet from "../Wallet"


const RightSide = () => {
    const modalPopup = useModalPopup()
    const {setAppUserTheme} = useAppUserTheme()
    // const {setUserTheme} = useUserTheme()


    const items: MenuItem[] = [
        getItem(
            <Badge size={"small"} offset={[6, -7]} overflowCount={999} color="gold" showZero count={1000}>
                <span style={{color: "gold"}}>
                    coins
                </span>
            </Badge>, "balance",
            <WalletOutlined style={{color: "gold"}} size={16}/>, [
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
                setAppUserTheme(() => "dark")
                break;

            case "light":
                setAppUserTheme(() => "light")
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