import React, {ChangeEvent, FC, useEffect, useState, useTransition} from "react"
import {IPlayer, IMatch} from "../Match"
import {Button, Col, Row, theme} from "antd"
import {MatchPlayerList} from "../playerList/MatchPlayerList"
import Search from "antd/es/input/Search"
import MatchInfoDisplay from "./MatchInfoDisplay"
import MatchJoinButton from "./MatchJoinButton"
import {PiChatCircleDots} from "react-icons/pi";

interface IMatchInfo {
    tournament: IMatch
}


const MatchDetails: FC<IMatchInfo> = ({tournament}) => {
    const {token} = theme.useToken()
    // const modalPopup = useModalPopup()
    const [isPending, startTransition] = useTransition()
    const [playerList, setPlayerList] = useState<IPlayer[]>([])
    const [tournamentStarted, setTournamentStarted] = useState(false)


    useEffect(() => {
        startTransition(() => {
            setPlayerList(() => [...tournament.meta.players])
        })
    }, [tournament.meta.players])

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setPlayerList(() => [...tournament.meta.players]
            .filter(({id, nickname}) => [nickname, id].join(" ").toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const onJoinConfirm = () => {
        console.log("Join confirm")
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

                <Col style={{marginBottom: 10,}}>
                    <MatchInfoDisplay
                        match={tournament}
                        setMatchStarted={setTournamentStarted}
                    />
                </Col>

                <Col style={{width: 270, marginBottom: 10,}}>
                    <Search
                        placeholder="search player by nickname or id:"
                        enterButton
                        onInput={onSearch}
                        style={{marginBottom: 10}}
                    />


                    <MatchPlayerList
                        players={playerList}
                        isPending={isPending}
                        startTransition={startTransition}
                        matchStarted={tournamentStarted}
                        match={tournament}
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
                                // background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.1) 100%)",
                                // borderColor: token.colorBorder,
                                // marginBottom: 5,
                                width: 270,
                                height: 45,
                                padding: "5px 0px",
                            }
                        }}
                    />
                </Col>

            </Row>



            <Row justify="space-between" style={{width: "100%"}}>
                <MatchJoinButton
                    buttonProps={{
                        disabled: tournamentStarted
                    }}
                    popconfirmProps={{
                        title: "Are you sure you want to join the game?",
                        onConfirm: onJoinConfirm,
                        disabled: tournamentStarted
                    }}
                />

                <Button size="small" icon={<PiChatCircleDots size={14}/>}>Chat</Button>
            </Row>
        </Row>
    )
}

export default MatchDetails