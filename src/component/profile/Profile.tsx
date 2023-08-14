import React, {useState} from 'react'
import {Card, Col, Divider, Row, theme} from "antd"
import ProfileCard from "./card/ProfileCard"

const Profile = () => {
    const {token: {colorBgContainer}} = theme.useToken()

    return (
        // <Space style={{display: "block", width: "100%"}}>
        <>

            <Row>
                <Col flex={"auto"}>
                    <Divider type="horizontal" orientation="right">
                        Profile
                    </Divider>
                </Col>
            </Row>
            <Row justify="center" gutter={[20, 0]} style={{background: colorBgContainer, padding: "24px", margin: 0}}>
                <Col style={{width: 270, height: 350}} >
                    {/*<ProfileCard />*/}
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
        </>
        // </Space>
    );
};

export default Profile;