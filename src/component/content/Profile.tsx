import React, {useState} from 'react'
import {Divider, Card, Row, Col, theme} from "antd"
import ProfileCard from "../profile/ProfileCard"


const Profile = () => {
    const {token: {colorBgContainer}} = theme.useToken()
    const [isPremiumAccount, setIsPremiumAccount] = useState<boolean>(true)


    return (
        // <Space style={{display: "block", width: "100%"}}>
        <Col>
            <Row>
                <Col flex={"auto"}>
                    <Divider type="horizontal" orientation="right">
                        Profile
                    </Divider>
                </Col>
            </Row>
            <Row justify="center" gutter={[20, 0]} style={{background: colorBgContainer, padding: "24px", margin: 0}}>
                <Col style={{width: 270, height: 350}} >
                    <ProfileCard isPremiumAccount={isPremiumAccount}/>
                </Col>
                <Col>
                    <Card style={{width: 300, height: 300}} extra="Inventar">

                    </Card>
                </Col>
                <Col>
                    <Card style={{width: 300, height: 300}} extra="Friend list">

                    </Card>
                </Col>

                <Col>
                    <Card style={{width: 300, height: 300}} extra="Statistic">

                    </Card>
                </Col>

                <Col>
                    <Card style={{width: 300, height: 300}} extra="Any">

                    </Card>
                </Col>
            </Row>
        </Col>
        // </Space>
    );
};

export default Profile