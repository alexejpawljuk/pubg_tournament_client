import React, {FC, ReactNode} from 'react'
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, HomeOutlined} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd'
import {useMenu} from "../../hooks/useMenu";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import {TbTournament} from "react-icons/tb";
const {Header, Sider, Content, Footer} = Layout

interface IMainLayout {
    children: ReactNode
}

const onSelect = (item: MenuItemType) => {
    console.log("Selected menu item:", item)
    window.location.replace(item.key as unknown as URL)
}

const createMenuItem = (key: string, icon?: ReactNode, label?: string): MenuItemType => {
    return {key, icon, label}
}

const MainLayout: FC<IMainLayout> = ({children}) => {
    const {token: {colorBgContainer}, theme: {}} = theme.useToken()
    const menu = useMenu({
        theme: "dark",
        mode: "inline",
        defaultSelectedKeys: ["/"],
        defaultOpenKeys: ["/"],
        onSelect,
        items: [
            createMenuItem('/',<HomeOutlined />, "Home"),
            createMenuItem('/user',<UserOutlined/>, "User"),
            createMenuItem('/Tournament',<TbTournament/>,'Tournament'),
        ]
    })


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={menu.menuCollapse.collapsed}>
                <Menu {...menu.menuProps.menuProps}/>
            </Sider>
            <Layout style={{height: window.innerHeight}}>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={menu.menuCollapse.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => menu.menuCollapse.setCollapsed(prevState => !prevState)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 0',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        overflow: "scroll"
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        height: 100
                    }}>

                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout