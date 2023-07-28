import React from 'react'
import {Menu, MenuProps, theme} from "antd"
import {useModalPopup} from "../../store/useModelPopup"
import {ShoppingCartOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons"
import {AiOutlineHome, AiOutlineLogin, AiOutlineSetting} from "react-icons/ai"
import AuthForm from "../AuthForm"
import RegisterForm from "../RegisterForm"
import Shop from "../Shop"
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import {useThemeConfig} from "../../store/useThemeConfig"
import {useUserTheme} from "../../hook/useUserTheme"
import piggyBank from "../../image/piggy-bank-money-svgrepo-com.svg"

import { createFromIconfontCN } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import {PiPiggyBankLight} from "react-icons/pi";
import {LiaPiggyBankSolid} from "react-icons/lia";

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}


const Account = () => {
    const modalPopup = useModalPopup()
    const {setThemeConfig} = useThemeConfig()
    const {setUserTheme} = useUserTheme()

    const items: MenuItem[] = [
        getItem(<span style={{color: "gold"}}>10</span>, "balance", <LiaPiggyBankSolid color={"gold"} title={"title"} size={18}/>),
        getItem("Account", "account", <UserOutlined/>, [
            getItem("Login", "login", <AiOutlineLogin/>),
            getItem("Register", "register", <UserAddOutlined/>),
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
        width: "40%",
        justifyContent: "right"
    }

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
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
        }
    }

    return <Menu onClick={onClick} style={styles} {...authProps}/>
}

const Nav = () => {
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
        width: "60%"
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

const Navigation = () => {
    return (
        <>
            <Nav/>
            <Account/>
        </>
    )
}

export default Navigation