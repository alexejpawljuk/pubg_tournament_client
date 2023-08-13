import React, {ChangeEvent, FC, TransitionStartFunction, useState} from 'react'
import {IDonate, IPlayer, ITournament} from "../Tournament"
import {Avatar, Col, InputProps, Row, RowProps, Skeleton, theme} from "antd"
import ListLoadMore from "../../ListLoadMore"
import {DonateButton} from "./UI/DonateButton"
import {PlayerRank} from "./UI/PlayerRank"
import {DonateValue} from "./UI/DonateValueInput"

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    tournament: ITournament
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
    tournamentStarted: boolean
}


const TournamentPlayerList: FC<ITournamentPlayerList> = (props) => {
    const {token} = theme.useToken()
    const {players, isPending, startTransition, containerProps, itemProps, tournamentStarted, tournament} = props

    const [donateInputValue, setDonateInputValue] = useState<string>("")
    const [donateInputStatus, setDonateInputStatus] = useState<InputProps["status"]>("")
    const [showDonate, setShowDonate] = useState<IPlayer | null>(null)
    const [donateLoading, setDonateLoading] = useState<boolean>(false)

    // const [] = useState()

    const fontSize = 11


    const onInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        const isInt = Number.isInteger(+target.value)

        if (isInt && target.value !== "0") {
            setDonateInputStatus(() => "")
            setDonateInputValue(() => target.value)
        } else {
            setDonateInputStatus(() => "error")
        }
    }

    const onInputClear = () => {
        setDonateInputStatus(() => "")
        setDonateInputValue(() => "")
        setShowDonate(() =>  null)
    }

    const onDonation = (player: IPlayer) => {
        setDonateInputStatus(() => "")
        setDonateInputValue(() => "")
        setShowDonate(prevState => prevState?.id === player.id ? null : player)
    }

    const onDonationConfirm = (player: IPlayer) => {
        if (+donateInputValue <= 0) return setShowDonate(() => null)


        setDonateLoading(() => true)
        const donate: IDonate = {
            amount: donateInputValue,
            player: player,
            from: {} as IPlayer,
            tournament,
            date: new Date()
        }
        console.log("Donate confirmed:", donate)

        // setShowDonate(() => null)
    }


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
                    <Row {...itemProps}>
                        <Col>
                            <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>
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
                                            value: donateInputValue,
                                            onInput: onInput,
                                            status: donateInputStatus,
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
                                            onClick: () => onDonationConfirm(player),
                                            loading: donateLoading,
                                        }}
                                    >Confirm</DonateButton> :
                                    <DonateButton
                                        props={{
                                            disabled: tournamentStarted,
                                            onClick: () => onDonation(player)
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