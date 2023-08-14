import React, {FC, TransitionStartFunction, useEffect, useState} from 'react'
import {IPlayer, ITournament} from "../Tournament"
import {Avatar, Col, InputProps, Row, RowProps, Skeleton} from "antd"
import ListLoadMore from "../../ListLoadMore"
import {DonateButton} from "./UI/DonateButton"
import {PlayerRank} from "./UI/PlayerRank"
import {DonateValue} from "./UI/DonateValueInput"
import {useTournamentPlayerList} from "../../../hook/useTournamentPlayerList"

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    tournament: ITournament
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
    tournamentStarted: boolean
}

export type TypeDonateInput = {
    value: string
    status: InputProps["status"]
}


const TournamentPlayerList: FC<ITournamentPlayerList> = (props) => {
    const {
        players,
        isPending,
        startTransition,
        containerProps,
        itemProps,
        tournamentStarted,
        tournament
    } = props


    const [donateInput, setDonateInput] = useState<TypeDonateInput>({value: "", status: ""})
    const [showDonate, setShowDonate] = useState<IPlayer | null>(null)
    const [donateLoading, setDonateLoading] = useState<boolean>(false)
    const {fontSize, onInputClear, onInput, onDonation, onDonationConfirm, onOpenProfile} = useTournamentPlayerList({
        setShowDonate,
        setDonateInput,
        setDonateLoading,
        tournament,
        donateInput,
        startTransition,

    })

    useEffect(() => {
        console.log("Donate for player:", showDonate)
    }, [showDonate])


    if (!players.length)
        return (
            <Skeleton active loading={true}/>
        )

    return (
        <ListLoadMore<IPlayer>
            transition={{isPending, startTransition}}
            data={players}
            listProps={{
                ...containerProps,
                renderItem: (player, index) => (
                    <Row {...itemProps} onClick={() => onOpenProfile(player)}>
                        <Col>
                            <Avatar src={player.avatar}/>
                        </Col>

                        <Col>
                            <Row style={{fontSize: fontSize + 1}}>
                                {player.nickname}
                            </Row>
                            <Row style={{fontSize}}>
                                {player.id}
                            </Row>
                        </Col>

                        <Col>
                            {
                                showDonate?.id === player.id ?
                                    <DonateValue
                                        props={{
                                            value: donateInput.value,
                                            onInput: onInput,
                                            onClick: event => {
                                                event.stopPropagation()
                                            },
                                            status: donateInput.status,
                                            disabled: donateLoading,
                                        }}
                                        onClear={onInputClear}
                                    /> :
                                    <PlayerRank rank={player.rank}/>
                            }
                        </Col>

                        <Col>
                            {
                                showDonate?.id === player.id ?
                                    <DonateButton
                                        props={{
                                            disabled: tournamentStarted,
                                            onClick: (event) => {
                                                event.stopPropagation()
                                                onDonationConfirm(player)
                                            },
                                            loading: donateLoading,
                                        }}
                                    >Confirm</DonateButton> :
                                    <DonateButton
                                        props={{
                                            disabled: tournamentStarted || !!showDonate,
                                            onClick: (event) => {
                                                event.stopPropagation()
                                                onDonation(player)
                                            }
                                        }}
                                    >Donate</DonateButton>
                            }
                        </Col>
                    </Row>
                )
            }}
        />
    )
}

export default TournamentPlayerList