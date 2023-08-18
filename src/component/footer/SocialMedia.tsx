import React, {FC} from 'react'
import {Button, Row, RowProps, Tag} from "antd"
import {AiOutlineNotification, AiTwotoneNotification} from "react-icons/ai"
import {FacebookOutlined, LinkedinOutlined, YoutubeOutlined} from "@ant-design/icons"
import SocialMediaButton from "./UI/SocialMediaButton";
import {BsInstagram} from "react-icons/bs";

interface ISocialMedia {
    props: RowProps
}

const SocialMedia: FC<ISocialMedia> = ({props}) => {
    return (
        <Row {...props}>
            <Row style={{width: "100%"}} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <AiOutlineNotification/>,
                    }}
                >Telegram</SocialMediaButton>
            </Row>
            <Row style={{width: "100%"}} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <YoutubeOutlined/>
                    }}
                >Youtube</SocialMediaButton>
            </Row>
            <Row style={{width: "100%"}} justify="center">
                <SocialMediaButton
                    props={{
                        icon: <BsInstagram/>
                    }}
                >Instagram</SocialMediaButton>
            </Row>
        </Row>
    );
};

export default SocialMedia;