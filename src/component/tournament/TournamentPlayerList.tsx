import React, {FC, TransitionStartFunction, useTransition} from 'react'
import {IPlayer, ITournament} from "./Tournament";
import {Avatar, Col, Row, RowProps, theme} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import ListLoadMore from "../ListLoadMore";

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
}

const TournamentPlayerList: FC<ITournamentPlayerList> = ({players, isPending, startTransition, containerProps, itemProps}) => {
    const {token} = theme.useToken()

    const fontSize = 11

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
                            <Row style={{fontSize: fontSize +1}}>
                                {player.nickname}
                            </Row>
                            <Row style={{fontSize}}>
                                {player.id}
                            </Row>
                        </Col>
                        <Col>
                            <UserAddOutlined/>
                        </Col>
                    </Row>
                )
            }}
        />
    );
};

export default TournamentPlayerList