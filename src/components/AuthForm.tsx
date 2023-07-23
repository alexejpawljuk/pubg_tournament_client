import React, {CSSProperties, useState} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Form, Input, Space} from 'antd'

const AuthFrom: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        setLoading(true)
        console.log('Received values of form: ', values)
    }

    const linkStyles: CSSProperties = {
        paddingLeft: 0
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
            size="small"
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Space wrap direction={"vertical"} size={[0, 0]}>
                    <Button href="" style={linkStyles} type="link">Forgot password</Button>
                    <Button href="" style={linkStyles} type={"link"}>Register now!</Button>
                </Space>
            </Form.Item>
            <Form.Item>
                <Button
                    disabled={loading}
                    loading={loading}
                    htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AuthFrom