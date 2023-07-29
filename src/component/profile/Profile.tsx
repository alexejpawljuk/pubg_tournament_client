import React from 'react'
import {Divider, Space, Card, Rate, Progress, Avatar, Tag, Tooltip, Badge} from "antd"
import UpCircleOutlined from "@ant-design/icons"


const Profile = () => {
    const avatar = "https://w0.peakpx.com/wallpaper/1011/420/HD-wallpaper-battleground-mobile-india-avatar-with-awm-gun-battleground-mobile-india-awm-gun-pubg.jpg"

    return (
        <Space style={{display: "block", width: "100%"}}>
            <Divider type="horizontal" orientation="right">
                Profile
            </Divider>


            <Space style={{display: "flex", justifyContent: "center"}}>
                <Badge.Ribbon text="Premium" color="gold" >
                    <Card
                        style={{width: 200, height: 300, textAlign: "center", padding: "15px 0", margin: 0}}
                        hoverable
                    >
                        <Space direction="vertical">
                            <Tag style={{margin: "0px 0px 0px 0px", padding: "5px ", fontSize: 16}}
                                 color="gold">Nickname</Tag>
                            <Tooltip
                                placement="left"
                                title="Your ID"
                            >
                                <Tag style={{margin: 0}}>ID: 1234567890</Tag>
                            </Tooltip>
                        </Space>
                        <Rate disabled value={2}/>
                        <Avatar style={{margin: "5px 20px"}} size={100} src={avatar}/>
                        <Tooltip
                            placement="leftTop"
                            title="In tournaments, you gain experience points for participation. If you win a tournament, you receive x5 experience points. However, you will also lose experience points if you haven't participated in tournaments for a long time."
                        >
                            <Progress percent={80} size={[187, 5]}/>
                        </Tooltip>
                    </Card>
                </Badge.Ribbon>
            </Space>


            {/*<Space>*/}
            {/*    <Card style={{width: "100%"}}>*/}
            {/*        <Card.Grid*/}
            {/*            style={{width: "25%", height: 260, textAlign: "center", padding: 0, margin: 0}}*/}
            {/*        >*/}
            {/*        </Card.Grid>*/}
            {/*    </Card>*/}
            {/*</Space>*/}

        </Space>
    );
};

export default Profile