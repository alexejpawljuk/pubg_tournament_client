import React, {ChangeEvent, FC, TransitionStartFunction, useState, useTransition} from 'react'
import {IPlayer, ITournament} from "./Tournament";
import {Avatar, Button, Col, Input, InputProps, Rate, Row, RowProps, Skeleton, theme} from "antd";
import {StarFilled, UserAddOutlined} from "@ant-design/icons";
import ListLoadMore from "../ListLoadMore";
import coinSVG from "../../image/svg/coins.svg";

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
    tournamentStarted: boolean
}


interface IDonate {
    player: IPlayer
    from: IPlayer
    amount: number
    date: Date
    tournament: ITournament
}

const DonateValue = () => {
    const [value, setValue] = useState<string>("")
    const [status, setStatus] = useState<InputProps["status"]>("")

    const onInput = ({target}: ChangeEvent<HTMLInputElement>) => {
        const isInt = Number.isInteger(+target.value)

        if (isInt && target.value !== "0") {
            setStatus(() => "")
            setValue(() => target.value)
        } else {
            setStatus(() => "error")
        }
    }

    return (
        <Input
            style={{width: 62}}
            size="small"
            placeholder="cion"
            onInput={onInput}
            value={value}
            status={status}
        />
    )
}

const TournamentPlayerList: FC<ITournamentPlayerList> = (props) => {
    const {token} = theme.useToken()
    const {players, isPending, startTransition, containerProps, itemProps, tournamentStarted} = props
    const [donate, setDonate] = useState<IDonate[]>([])
    const [showDonate, setShowDonate] = useState<IPlayer | null>(null)


    const fontSize = 11

    const onDonation = (player: IPlayer) => {
        console.log("Donation for player:", player)
        setShowDonate(prevState => player.id === prevState?.id ? null : player)
    }

    const onDonationConfirm = (player: IPlayer) => {
        console.log("Donation confirm for player:", player)
    }


    if (!players.length)
        return <Skeleton loading={true}/>

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
                            {showDonate?.id === player.id ?
                                <DonateValue/> :
                                <Rate
                                    disabled
                                    allowHalf
                                    count={5}
                                    value={player.rank}
                                    character={<StarFilled style={{width: "0.3em"}}/>}
                                />
                            }
                        </Col>
                        <Col>
                            {showDonate && showDonate?.id === player.id ?
                                <Button
                                    style={{fontSize: 9, width: 75}}
                                    size="small"
                                    className=""
                                    icon={<Avatar style={{marginBottom: 3, padding: 0}} size={19} src={coinSVG}/>}
                                    disabled={tournamentStarted}
                                    onClick={() => onDonationConfirm(player)}
                                >Confirm</Button>  :
                                <Button
                                style={{fontSize: 9, width: 75}}
                                size="small"
                                className=""
                                icon={<Avatar style={{marginBottom: 3, padding: 0}} size={19} src={coinSVG}/>}
                                disabled={tournamentStarted}
                                onClick={() => onDonation(player)}
                            >Donate</Button>
                            }
                        </Col>
                    </Row>
                )
            }}
        />
    )
}

export default TournamentPlayerList