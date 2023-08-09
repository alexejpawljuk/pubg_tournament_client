import React, {ChangeEvent, FC, useEffect, useState, useTransition,} from "react"
import {IPlayer, ITournament} from "./Tournament"
import {AutoComplete, Avatar, Button, Col, Input, List, Rate, Row, Space, theme} from "antd"
import ListLoadMore from "../ListLoadMore"
import {LoginOutlined, StarFilled, UserAddOutlined} from "@ant-design/icons"
import TournamentPlayerList from "./TournamentPlayerList"
import Search from "antd/es/input/Search"
import {Typography} from 'antd'
import {format} from "date-fns";
import tournamentList from "./TournamentList";

const {Title} = Typography;

interface ITournamentInfo {
    tournamentItem: ITournament
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
        console.log(e.target.value)
        setPlayerList(() => {
            return [...tournamentItem.meta.players]
                .filter(({id, nickname}) => [nickname, id].join(" ").includes(e.target.value))
        })
    }

    return (
        <Row>
            <Row justify="space-around" style={{width: "100%"}}>

                <Col
                    style={{
                        marginBottom: 30,
                    }}
                >
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
                            {/*<div>{tournamentItem.name}</div>*/}
                            <div>Type: {tournamentItem.type}</div>
                            <div>ID: {tournamentItem.id}</div>
                            <div>
                                Date: {format(tournamentItem.date, "dd.mm.yyyy")} {format(tournamentItem.date, "hh:mm")}
                            </div>
                            <div>
                                <Rate
                                    disabled
                                    allowHalf
                                    count={5}
                                    value={tournamentItem.condition.rank}
                                    character={<StarFilled style={{width: "0.6em"}}/>}
                                />
                            </div>
                            <div>
                                Coin: {tournamentItem.price.coin}
                            </div>
                            <div>
                                Ticket: {tournamentItem.price.ticket}
                            </div>
                            <div>
                                Reward for first place: {tournamentItem.reward.coin}
                            </div>
                            <div style={{fontSize: 11}}>{tournamentItem.name}</div>
                        </div>
                    </div>
                </Col>

                <Col
                    style={{
                        width: 320,
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
                        style={{marginBottom: 5}}
                    />
                    <TournamentPlayerList
                        players={playerList}
                        isPending={isPending}
                        startTransition={startTransition}
                    />

                </Col>

            </Row>

            <Row justify="end" style={{width: "100%", paddingRight: 30}}>
                <Button
                    style={{background: "orange", color: token.colorBgBase}}
                    icon={<LoginOutlined/>}
                >Join</Button>
            </Row>
        </Row>
    )
}

export default TournamentInfo