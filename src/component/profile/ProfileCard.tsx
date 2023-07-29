import {Avatar, Card, Progress, Rate, Tag, Tooltip} from "antd"
import React, {FC} from "react"
import DisplayPremium from "./DisplayPremium"

interface IProfileCard {
    isPremiumAccount: boolean
}

const {Meta} = Card
const ProfileCard: FC<IProfileCard> = ({isPremiumAccount}) => {
    const avatar = "https://w0.peakpx.com/wallpaper/1011/420/HD-wallpaper-battleground-mobile-india-avatar-with-awm-gun-battleground-mobile-india-awm-gun-pubg.jpg"

    return (
        <DisplayPremium isPremiumAccount={isPremiumAccount}>
            <Card
                style={{height: 300, textAlign: "center", paddingTop: 10, margin: 0}}
                hoverable
            >

                <Tag style={{marginBottom: 10, padding: 5, fontSize: 16}}
                     color="gold">Nickname</Tag>

                <Rate disabled value={2} style={{marginBottom: 10}}/>
                <Avatar style={{margin: "5px 20px"}} size={100} src={avatar}/>
                <Tooltip
                    placement="leftTop"
                    title="In tournaments, you gain experience points for participation. If you win a tournament, you receive x5 experience points. However, you will also lose experience points if you haven't participated in tournaments for a long time."
                >
                    <Progress percent={80} size={[187, 5]}/>
                </Tooltip>
                <Meta title={
                    <Tooltip
                        placement="top"
                        title="Your ID"
                    >
                        <Tag style={{marginTop: 10}}>ID: 1234567890</Tag>
                    </Tooltip>
                }/>
            </Card>
        </DisplayPremium>
    )
}

export default ProfileCard