import React from 'react'
import { Button, Result } from 'antd'
import MainLayout from "../components/MainLayout"

const NotFound: React.FC = () => (
    <MainLayout>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button href="/" type="primary">Back Home</Button>}
        />
    </MainLayout>
)

export default NotFound