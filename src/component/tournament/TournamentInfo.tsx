import React, {ChangeEvent, FC, useEffect, useState, useTransition,} from "react"
import {IPlayer, ITournament} from "./Tournament"
import {Button, Col, Divider, Rate, Row, theme} from "antd"
import {LoginOutlined, StarFilled} from "@ant-design/icons"
import TournamentPlayerList from "./TournamentPlayerList"
import Search from "antd/es/input/Search"
import {format} from "date-fns"
import Countdown from "antd/es/statistic/Countdown"


interface ITournamentInfo {
    tournamentItem: ITournament
}

interface ITournamentInfoDisplay {
    tournament: ITournament
}

const TournamentInfoDisplay: FC<ITournamentInfoDisplay> = ({tournament}) => {
    const {token} = theme.useToken()
    const {type, id, name, date, condition, price, reward, members} = tournament


    return (
        <div
            style={{
                height: 270,
                width: 200,
                // border: "1px solid",
                // borderColor: token.colorBorder,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div style={{}}>
                <div>
                    <Countdown value={date.getTime()}/>
                </div>
                <div>
                    <Divider
                        style={{
                            margin: "7px 0px"
                        }}
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
                    Reward for first place: {reward.coin}
                </div>
            </div>
        </div>
    )
}


const TournamentInfo: FC<ITournamentInfo> = ({tournamentItem}) => {
    const {token} = theme.useToken()
    const [isPending, startTransition] = useTransition()
    const [playerList, setPlayerList] = useState<IPlayer[]>([])

    useEffect(() => {
        startTransition(() => {
            setPlayerList(() => [...tournamentItem.meta.players])
        })
    }, [tournamentItem.meta.players])

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setPlayerList(() => [...tournamentItem.meta.players]
            .filter(({id, nickname}) => [nickname, id].join(" ").includes(e.target.value)))
    }

    const addFriend = (player: IPlayer) => {
        console.log(player)
    }

    return (
        <Row>
            <Row
                justify="space-around"
                style={{
                    marginTop: 15,
                    width: "100%",
                    background: token.colorBgBase,
                    padding: 15,
                    marginBottom: 15,
                    borderRadius: token.borderRadius
                }}
            >

                <Col style={{marginBottom: 30,}}>
                    <TournamentInfoDisplay tournament={tournamentItem}/>
                </Col>

                <Col
                    style={{
                        width: 270,
                        marginBottom: 30,
                        // border: "1px solid",
                        // borderColor: token.colorBorder
                    }}

                >

                    <Search
                        placeholder="search player by nickname or id:"
                        enterButton
                        onInput={onSearch}
                        // size="small"
                        style={{
                            // width: 310,
                            marginBottom: 5
                            // margin: 10
                        }}
                    />


                    <TournamentPlayerList
                        players={playerList}
                        isPending={isPending}
                        startTransition={startTransition}
                        containerProps={{
                            style: {
                                height: 230,
                                overflowY: "scroll",
                            }
                        }}
                        itemProps={{
                            align: "middle",
                            justify: "space-around",
                            style: {
                                border: "0.5px solid",
                                borderColor: token.colorBorder,
                                // marginBottom: 5,
                                width: 270,
                                height: 45,
                                padding: "5px 0px",
                            }
                        }}
                    />

                </Col>

            </Row>

            <Row justify="end" style={{width: "100%", paddingRight: 50}}>
                <Button
                    style={{background: "orange", color: token.colorBgBase}}
                    icon={<LoginOutlined/>}
                >Join</Button>
            </Row>
        </Row>
    )
}

export default TournamentInfo