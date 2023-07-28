import React from 'react'
import {Avatar, Divider, Space} from "antd"
import {UserOutlined} from "@ant-design/icons"

const Profile = () => {
    return (
        <div>
            <Divider type="horizontal" orientation="right">
                Profile
            </Divider>

           <Space style={{width: "100%", justifyContent: "end"}} >
               <Space >
                   <Avatar size={64} icon={<UserOutlined />} />
               </Space>
           </Space>
        </div>
    );
};

export default Profile