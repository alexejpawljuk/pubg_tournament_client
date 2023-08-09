import React, {FC, TransitionStartFunction, useTransition} from 'react'
import {IPlayer, ITournament} from "./Tournament";
import {Avatar, Col, Rate, Row, RowProps, Skeleton, theme} from "antd";
import {StarFilled, UserAddOutlined} from "@ant-design/icons";
import ListLoadMore from "../ListLoadMore";

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
}

const TournamentPlayerList: FC<ITournamentPlayerList> = (props) => {
    const {token} = theme.useToken()
    const {players, isPending, startTransition, containerProps, itemProps} = props

    const fontSize = 11

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
                            <Rate
                                disabled
                                allowHalf
                                count={5}
                                value={player.rank}
                                character={<StarFilled style={{width: "0.6em"}}/>}
                            />
                        </Col>
                    </Row>
                )
            }}
        />
    )
}

export default TournamentPlayerList