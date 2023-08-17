import React, {CSSProperties} from 'react';
import {Button, Col, Row, Tag} from "antd";
import {AiTwotoneNotification} from "react-icons/ai";
import {FacebookOutlined, LinkedinOutlined, YoutubeOutlined} from "@ant-design/icons";
import SocialMedia from "./SocialMedia";



const FooterContent = () => {
    const styles: CSSProperties = {
        minWidth: 300,
        maxWidth: 700,
        width: "100%",
        // paddingTop: 20,
        // paddingBottom: 20,
    }
    return (
        <Row
            align="middle"
            justify="space-evenly"
            style={{
                height: "100%"
            }}
        >
            <SocialMedia
                props={{
                    style: styles
                }}
            />
            {/*<Row style={styles}>*/}
            {/*    <Col >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut consequatur earum eveniet excepturi explicabo harum ipsa ipsam iusto temporibus!*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Row style={styles} justify="center">
                <Button type={"link"} style={{color: "white", width: "100%"}}>About Us</Button>
                <Button type={"link"} style={{color: "white", width: "100%"}}>Rules</Button>
                <Button type={"link"} style={{color: "white", width: "100%"}}>Payment concept</Button>
                <Button type={"link"} style={{color: "white", width: "100%"}}>Cooperation</Button>
            </Row>

        </Row>
    );
};

export default FooterContent