import React, {FC, TransitionStartFunction, useTransition} from 'react'
import {IPlayer, ITournament} from "./Tournament";
import {Avatar, Col, Row, theme} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import ListLoadMore from "../ListLoadMore";

interface ITournamentPlayerList {
    players: IPlayer[]
    isPending: boolean
    startTransition: TransitionStartFunction
}

const TournamentPlayerList: FC<ITournamentPlayerList> = ({players, isPending, startTransition}) => {
    const {token} = theme.useToken()

    const fontSize = 11

    return (
        <ListLoadMore<IPlayer>
            transition={{isPending, startTransition}}
            data={players}

            listProps={{
                style: {
                    // width: "30%",
                    height: 235,
                    overflowY: "scroll",
                },
                renderItem: (player, index) => (
                    <Row
                        align="middle"
                        justify="space-around"
                        style={{
                            border: "0.5px solid",
                            borderColor: token.colorBorder,
                            // marginBottom: 5,
                            width: 320,
                            height: 45,
                            padding: "5px 0px",
                        }}
                    >
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