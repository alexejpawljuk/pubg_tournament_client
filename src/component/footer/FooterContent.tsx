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
                        // minWidth: 300,
                        // maxWidth: 400,
                        width: "50%",
                        height: 150,
                        gap: 15
                    },
                    justify: "center",
                    align: "bottom",
                }}
            />
            <Row
                style={{
                    // minWidth: 300,
                    maxWidth: 700,
                    width: "50%",
                    height: 150,
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