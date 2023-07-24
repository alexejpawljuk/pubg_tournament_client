import React from 'react'
import {TeamOutlined, UserOutlined, UserAddOutlined, createFromIconfontCN} from '@ant-design/icons'
import {AiOutlineHome, AiOutlineLogin} from "react-icons/ai"
import type {MenuProps} from 'antd'
import {Layout, Menu} from 'antd'
import {useModalPopup} from "../../store/useModelPopup"
import AuthForm from "../AuthForm"
import RegisterForm from "../RegisterForm"
import RootLayoutHeader from "./RootLayoutHeader"
import RootLayoutContent from "./RootLayoutContent"
import RootLayoutContentHeader from "./RootLayoutContentHeader"
import RootContent from './RootContent'
import RootLayoutFooter from "./RootLayoutFooter"
import {Route, Routes} from "react-router-dom"
import Home from "../content/Home"
import NoFound from "../content/NotFound"


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


const Login = () => {
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
        getItem('Tournament', 'tournaments', <TeamOutlined/>, [
            getItem('Type 1x1', 'tournament_1x1'),
            getItem('Type 2x2', 'tournament_2x2'),
            getItem('Type 3x3', 'tournament_3x3'),
            getItem('Type 4x4', 'tournament_4x4'),
        ])
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
    }

    return (
        <Menu onClick={onClick} style={styles} {...menuProps}/>
    )
}

const Root = () => {

    return (
        <Layout style={{minHeight: '100vh'}}>
            <RootLayoutHeader>
                <Nav/>
                <Login/>
            </RootLayoutHeader>
            <RootLayoutContent>
                <RootLayoutContentHeader>
                    LOGO
                </RootLayoutContentHeader>
                <RootContent>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NoFound/>}/>
                    </Routes>
                </RootContent>
            </RootLayoutContent>
            <RootLayoutFooter>
                Ant Design ©2023 Created by Ant UED
            </RootLayoutFooter>
        </Layout>
    )
}

export default Root