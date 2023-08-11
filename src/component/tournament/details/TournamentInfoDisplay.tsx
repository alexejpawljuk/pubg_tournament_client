import React, {Dispatch, FC, SetStateAction} from 'react'
import {ITournament} from "../Tournament";
import {Divider, Rate, theme} from "antd";
import Countdown from "antd/es/statistic/Countdown";
import {format} from "date-fns";
import {StarFilled} from "@ant-design/icons";

interface ITournamentInfoDisplay {
    tournament: ITournament
    setTournamentStarted: Dispatch<SetStateAction<boolean>>
}

const TournamentInfoDisplay: FC<ITournamentInfoDisplay> = ({tournament, setTournamentStarted}) => {
    const {token} = theme.useToken()
    const {type, id, name, date, condition, price, reward, members, donation} = tournament


    return (
        <div
            style={{
                height: 270,
                width: 200,
                // border: "1px solid",
                // borderColor: token.colorBorder,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{}}>
                <div style={{textAlign: "center"}}>
                    <Countdown value={date.getTime()} onFinish={() => setTournamentStarted(() => true)}/>
                </div>
                <div>
                    <Divider style={{margin: "3px 0px",}}
                    >{name.toUpperCase()}</Divider>
                </div>
                <div>Type: {type}</div>
                <div>ID: {id}</div>
                <div>
                    Date: {format(date, "dd.mm.yyyy")} {format(date, "HH:mm")}
                </div>
                <div>
                    <Rate
                        disabled
                        allowHalf
                        count={5}
                        value={condition.rank}
                        character={<StarFilled style={{width: "0.6em"}}/>}
                    />
                </div>
                <div>
                    Coin: {price.coin}
                </div>
                <div>
                    Ticket: {price.ticket}
                </div>
                <div>
                    Player: {members.alreadyRegistered} / {members.max}
                </div>
                <div>
                    Donation: {donation}
                </div>
                <div>
                    Reward for first place: {reward.coin + donation}
                </div>
            </div>
        </div>
    )
}

export default TournamentInfoDisplay