import {Card, Row} from "antd"
import React, {FC} from "react"
import PremiumDisplay from "./PremiumDisplay"
import {IPlayer} from "../../match/Match"
import {NicknameDisplay} from "./NicknameDisplay"
import {RankDisplay} from "./RankDisplay"
import {AvatarDisplay} from "./AvatarDisplay"
import {ExperienceDisplay} from "./ExperienceDisplay"
import {IdDisplay} from "./IdDisplay"

interface IProfileCard {
    player: IPlayer
}

const ProfileCard: FC<IProfileCard> = ({player}) => {
    const {nickname, id, rank, avatar, teamId, premium, experience} = player

    return (
        <Row justify="center">
            <PremiumDisplay isPremiumAccount={premium}>
                <Card
                    style={{height: 300, width: 270, textAlign: "center", paddingTop: 10, margin: 0}}
                    hoverable
                >
                    <NicknameDisplay nickname={nickname}/>
                    <RankDisplay rank={rank}/>
                    <AvatarDisplay avatar={avatar}/>
                    <ExperienceDisplay experience={experience}/>
                    <IdDisplay id={id}/>
                </Card>
            </PremiumDisplay>
        </Row>
    )
}

export default ProfileCard