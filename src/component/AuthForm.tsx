import React, {CSSProperties, FC, useState} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Form, FormProps, Input, Space} from 'antd'
import {ModalPopupService} from "../service/ModelPopupService"
import RegisterForm from "./RegisterForm"


interface IAuthFrom {
    props?: FormProps
}

const AuthFrom: FC<IAuthFrom> = ({props}) => {
    const modalPopupService = ModalPopupService()
    const [loading, setLoading] = useState<boolean>(false)

    const linkStyles: CSSProperties = {
        paddingLeft: 0,
    }

    const onFinish = (values: any) => {
        setLoading(() => true)
        console.log('Received values of form: ', values)
    }

    const onForgotPassword = () => {
        console.log("Forgot password")
    }

    const onRegisterNow = () => {
        console.log("Register now")
        modalPopupService.setOpenModal(prevState => ({
            ...prevState,
            openModal: true,
            props: {
                width: 800
            },
            children: <RegisterForm/>
        }))
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
            {...props}
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
                    <Button onClick={onForgotPassword} style={linkStyles} size="small" type="link">Forgot password?</Button>
                    <Button onClick={onRegisterNow} style={linkStyles} size="small" type={"link"}>Register now</Button>
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