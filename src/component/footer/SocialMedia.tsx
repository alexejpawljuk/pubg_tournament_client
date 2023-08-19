import React, {CSSProperties, FC} from 'react'
import {Row, RowProps} from "antd"
import {AiOutlineNotification} from "react-icons/ai"
import {YoutubeOutlined} from "@ant-design/icons"
import SocialMediaButton from "./UI/SocialMediaButton"
import {BsInstagram} from "react-icons/bs"

interface ISocialMedia {
    props: RowProps
}

const SocialMedia: FC<ISocialMedia> = ({props}) => {
    const styles: CSSProperties = {
        padding: 0
    }


    return (
        <Row {...props}>
            <Row style={styles} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <AiOutlineNotification/>,
                    }}
                >Telegram</SocialMediaButton>
            </Row>
            <Row style={styles} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <YoutubeOutlined/>,
                        style: {
                            padding: "0 15px"
                        },
                    }}
                >Youtube</SocialMediaButton>
            </Row>
            <Row style={styles} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <BsInstagram/>
                    }}
                >Instagram</SocialMediaButton>
            </Row>
        </Row>
    );
};

export default SocialMedia