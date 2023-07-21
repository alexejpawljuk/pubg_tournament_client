import React, {FC, ReactNode, useEffect, useState} from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import {AiOutlineLogin} from "react-icons/ai"
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
        label,
    } as MenuItem;
}

const useWindowSize = () => {
    const [size, setSize] = useState({height: window.innerHeight, width: window.innerWidth})

    const resizeHandle = () => {
        setSize(() => ({height: window.innerHeight, width: window.innerWidth}))
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandle)

        return () => {
            window.removeEventListener("resize", resizeHandle)
        }
    }, [])

    return {
        size, setSize
    }
}



const Login = () =>{
    const authProps: MenuProps = {
        theme: "dark",
        mode: "horizontal",
        items: [getItem("Login", "login", <AiOutlineLogin />)],
        selectable: false
    }

    const styles = {
        width: "50%",
        justifyContent: "right"
    }

    return <Menu style={styles} {...authProps}/>
}

const Nav = () => {
    const {size, setSize} = useWindowSize()

    const items: MenuItem[] = [
        getItem('Tournament', 'sub2', <TeamOutlined />, [getItem('Type 1x1', '6'), getItem('Type 2x2', '8')]),
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
    ]

    const menuProps: MenuProps = {
        theme: "dark",
        mode: "horizontal",
        items,
        // defaultSelectedKeys: ["1"],
        selectable: false
    }

    const styles = {
        width: "50%"
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
                <Header style={{ padding: 0, background: colorBgContainer, height: 100 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 0, minHeight: 360, backgroundImage: colorBgContainer  }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Main