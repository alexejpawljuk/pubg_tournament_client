import {IMatch} from "../match/Match"
import React, {CSSProperties, FC} from "react"
import {Avatar, Card, Col, Divider, Row, theme} from "antd"
import Meta from "antd/es/card/Meta"
import {format} from "date-fns"
import coinSVG from "../../image/svg/coins.svg"

interface IHeaderFeedItem {
    match: IMatch
    index: number
}

const HeaderFeedItem: FC<IHeaderFeedItem> = ({match, index}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        width: 350,
        background: token.colorBgLayout
    }

    if (!match.meta.winner) return null

    return (

        <Card size="small" bordered={false} style={styles}>
            {/*<p>Card content Card content Card content Card content</p>*/}
            <Divider className="last_matches" style={{width: 300, marginBottom: 0}}
                     orientation="right">{match.name.toUpperCase()}</Divider>

            <Meta
                avatar={<Avatar src={match.meta.winner?.avatar}/>}
                title={
                    <>
                        <Row>{match.meta.winner.nickname}</Row>
                        <Row style={{fontSize: 9}}>{match.id}</Row>
                    </>
                }
                description={
                    <Row justify="space-between">
                        <Row
                            style={{width: 120}}
                            justify={"space-between"}
                            align="bottom"
                        >
                            <Col style={{fontSize: 12}}>{format(match.date.start, "dd.MM.yyyy HH:mm")}</Col>

                        </Row>
                        <Row
                            justify="space-between"
                            style={{
                                minWidth: 70
                                // width: 75,
                                // width: 75,
                        }}
                        >
                            <Col>
                                <Avatar
                                    size={25}
                                    src={coinSVG}
                                    alt={"coin"}
                                    style={{marginBottom: 3}}
                                />
                            </Col>
                            <Col
                                style={{
                                    fontSize: 17,
                                }}
                            >
                                {/*{9}*/}
                                {match.reward.coin}
                            </Col>
                        </Row>
                    </Row>
                }
            />
        </Card>
    )
}

export {HeaderFeedItem}