import React, {CSSProperties} from 'react'
import {Button, Row, theme} from "antd"
import SocialMedia from "./SocialMedia"


const FooterContent = () => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        // color: token.colorText,
        // width: "100%",
    }
    return (
        <Row
            align="bottom"
            justify="space-evenly"
            style={{
                height: "100%"
            }}
        >
            <SocialMedia
                props={{
                    style: {
                        minWidth: 300,
                        maxWidth: 700,
                        width: "100%",
                        height: 140,
                    },
                    justify: "space-evenly",
                    align: "bottom",
                }}
            />
            {/*<Row style={styles}>*/}
            {/*    <Col >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut consequatur earum eveniet excepturi explicabo harum ipsa ipsam iusto temporibus!*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Row
                style={{
                    minWidth: 300,
                    maxWidth: 700,
                    width: "100%",
                    height: 50,
                }}
                justify="center"
                align="bottom"
            >
                <Row style={styles}>
                    <Button type={"link"} className="custom">About Us</Button>
                </Row>
                <Row>
                    <Button type={"link"}>Rules</Button>
                </Row>
                <Row>
                    <Button type={"link"}>Payment concept</Button>
                </Row>
                <Row>
                    <Button type={"link"}>Cooperation</Button>
                </Row>
            </Row>

        </Row>
    );
};

export default FooterContent