import React, {useState} from 'react'
import {Card, Col, Divider, Row, theme} from "antd"
import ProfileCard from "./card/ProfileCard"

const Profile = () => {
    const {token} = theme.useToken()

    return (
        // <Space style={{display: "block", width: "100%"}}>
        <>

            <Row style={{background: token.colorBgLayout}}>
                <Col flex={"auto"}>
                    <Divider type="horizontal" orientation="right">
                        Profile
                    </Divider>
                </Col>
            </Row>
            <Row justify="space-evenly" gutter={[20, 0]} style={{padding: "24px", margin: 0}}>
                {/*<Col style={{width: 270, height: 350}} >*/}
                {/*    /!*<ProfileCard />*!/*/}
                {/*</Col>*/}
                {/*<Col>*/}
                    <Card style={{width: 300, height: 300}} extra="Inventar">

                    </Card>
                {/*</Col>*/}
                {/*<Col>*/}
                    <Card style={{width: 300, height: 300}} extra="Friend list">

                    </Card>
                {/*</Col>*/}

                {/*<Col>*/}
                    <Card style={{width: 300, height: 300}} extra="Statistic">

                    </Card>
                {/*</Col>*/}

                {/*<Col>*/}
                    <Card style={{width: 300, height: 300}} extra="Any">

                    </Card>
                {/*</Col>*/}
                <Divider ></Divider>
            </Row>
        </>
        // </Space>
    );
};

export default Profile;