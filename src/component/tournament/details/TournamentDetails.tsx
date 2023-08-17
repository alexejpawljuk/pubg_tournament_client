import React, {ChangeEvent, FC, useEffect, useState, useTransition} from "react"
import {IPlayer, ITournament} from "../Tournament"
import {Col, Row, theme} from "antd"
import {TournamentPlayerList} from "../playerList/TournamentPlayerList"
import Search from "antd/es/input/Search"
import TournamentInfoDisplay from "./TournamentInfoDisplay"
import TournamentJoinButton from "./TournamentJoinButton"

interface ITournamentInfo {
    tournament: ITournament
}


const TournamentDetails: FC<ITournamentInfo> = ({tournament}) => {
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
                    <TournamentInfoDisplay
                        tournament={tournament}
                        setTournamentStarted={setTournamentStarted}
                    />
                </Col>

                <Col style={{width: 270, marginBottom: 10,}}>
                    <Search
                        placeholder="search player by nickname or id:"
                        enterButton
                        onInput={onSearch}
                        style={{marginBottom: 10}}
                    />


                    <TournamentPlayerList
                        players={playerList}
                        isPending={isPending}
                        startTransition={startTransition}
                        tournamentStarted={tournamentStarted}
                        tournament={tournament}
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

            <Row justify="space-between" style={{width: "100%"}}>
                <TournamentJoinButton
                    buttonProps={{
                        disabled: tournamentStarted
                    }}
                    popconfirmProps={{
                        title: "Are you sure you want to join the game?",
                        onConfirm: onJoinConfirm,
                        disabled: tournamentStarted
                    }}
                />
            </Row>
        </Row>
    )
}

export default TournamentDetails