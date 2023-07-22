import React, {FC, ReactNode} from 'react';
import {TeamOutlined} from '@ant-design/icons'
import {AiOutlineHome, AiOutlineLogin} from "react-icons/ai"
import type { MenuProps } from 'antd'
import {  Layout, Menu, theme } from 'antd'

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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
    } as MenuItem;
}





const Login = () =>{
    const authProps: MenuProps = {
        theme: "dark",
        mode: "horizontal",
        items: [getItem("Login", "login", <AiOutlineLogin />)],
        selectable: false
    }

    const styles = {
        width: "30%",
        justifyContent: "right"
    }

    return <Menu style={styles} {...authProps}/>
}

const Nav = () => {
    const items: MenuItem[] = [
        getItem("Home", "home", <AiOutlineHome/>),
        getItem('Tournament', 'tournaments', <TeamOutlined />, [
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

    return(
        <Menu style={styles} {...menuProps}/>
    )
}

const Main: FC<{children: ReactNode}> = ({children}) => {
    const {token: { colorBgContainer }} = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                paddingInline: 0
            }}>
                <Nav/>
                <Login/>
            </Header>
            <Layout >
                <Header style={{ padding: 0, background: colorBgContainer, height: 100 }}>
                    <div className={"gradient-background"} style={{width: "100%", height: "100%", textAlign: "center"}}>LOGO</div>
                </Header>
                <Content style={{ margin: '0 0' }}>
                    <div style={{ padding: 0, margin: 0, minHeight: 360, backgroundImage: colorBgContainer  }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Main