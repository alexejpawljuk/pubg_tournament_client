import {useModalPopup} from "../../store/useModelPopup"
import {useThemeConfig} from "../../store/useThemeConfig"
import {useUserTheme} from "../../hook/useUserTheme"
import {UserAddOutlined, UserOutlined} from "@ant-design/icons"
import {AiOutlineLogin, AiOutlineSetting} from "react-icons/ai"
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import {Menu, MenuProps, theme} from "antd"
import AuthForm from "../AuthForm"
import RegisterForm from "../RegisterForm"
import React from "react"
import {getItem, MenuItem, RightMenuKey} from "./Navigation"
import {useIcon} from "../../hook/useIcon"
import {BiUserCheck} from "react-icons/bi"
import Profile from "../profile/Profile"
import {CiWallet} from "react-icons/ci"

const RightSide = () => {
    const modalPopup = useModalPopup()
    const {setThemeConfig} = useThemeConfig()
    const {setUserTheme} = useUserTheme()
    const icon = useIcon()


    const items: MenuItem[] = [
        getItem(<span style={{color: "gold"}}>10</span>, "balance", icon.get("token_currency"), [
            getItem("Add", "add_funds", <CiWallet color="gold"/>)
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
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    props: {
                        width: 800
                    },
                    children: <Profile/>
                }))
                break;

            case "add_funds":
                modalPopup.setOpenModal(prevState => ({
                    ...prevState,
                    openModal: true,
                    props: {
                        width: 500
                    },
                    children: <div>Тут будет инструкция как пополнить кошелек (крипта)</div>
                }))
                break;
        }
    }

    return <Menu onClick={onClick} style={styles} {...authProps}/>
}

export default RightSide