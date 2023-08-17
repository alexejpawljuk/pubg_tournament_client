import React, {ReactNode} from 'react'
import {Tabs, TabsProps} from 'antd'
import {NotificationOutlined, MessageOutlined} from "@ant-design/icons"


type Key = "notification" | "chat"

const getTabs = (
    label: ReactNode,
    key: Key,
    children?: ReactNode,
) => {
    return {
        label, key, children
    }
}

const communityModel: TabsProps["items"] = [
    getTabs(
        <span><MessageOutlined/>Chat</span>,
        "chat",
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, praesentium.</div>
    ),
    getTabs(
            <span><NotificationOutlined />Notification</span>,
        "notification",
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores commodi cum delectus enim fuga harum iusto nemo ratione ut vero!</div>
    ),
]

const Community: React.FC = () => (

    <Tabs
        defaultActiveKey="chat"
        items={communityModel}

    />
)

export default Community