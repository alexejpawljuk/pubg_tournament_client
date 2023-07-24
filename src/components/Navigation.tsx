import React from 'react'
import {Menu, MenuProps} from "antd"
import {useModalPopup} from "../store/useModelPopup"
import {ShoppingCartOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons"
import {AiOutlineHome, AiOutlineLogin} from "react-icons/ai"
import AuthForm from "./AuthForm"
import RegisterForm from "./RegisterForm"

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

    const authProps: MenuProps = {
        theme: "dark",
        mode: "horizontal",
        items: [
            getItem("Account", "",  <UserOutlined/>, [
                getItem("Login", "login", <AiOutlineLogin/>),
                getItem("Register", "register", <UserAddOutlined />),
            ])
        ],
        selectable: false,
    }

    const styles = {
        width: "30%",
        justifyContent: "right"
    }

    const onClick: MenuProps["onClick"] = (e) => {
        if (e.key === "login") {
            modalPopup.setOpenModal(prevState => ({
                ...prevState,
                openModal: true,
                children: <AuthForm/>,
                props: {width: 350}
            }))
        }
        if (e.key === "register") {
            modalPopup.setOpenModal(prevState => ({
                ...prevState,
                openModal: true,
                props: {
                    width: 800
                },
                children: <RegisterForm/>
            }))
        }
    }

    return <Menu onClick={onClick} style={styles} {...authProps}/>
}

const Nav = () => {
    const items: MenuItem[] = [
        getItem("Home", "home", <AiOutlineHome/>),
        getItem('Shop', 'shop', <ShoppingCartOutlined />)
    ]

    const menuProps: MenuProps = {
        theme: "dark",
        mode: "horizontal",
        items,
        selectable: false,
    }

    const styles = {
        width: "70%"
    }

    const onClick: MenuProps["onClick"] = (e) => {
        const {key} = e
        if (key === "home") {
            window.location.replace("/")
        }
        if (key === "shop"){
            console.log("Click shop")
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