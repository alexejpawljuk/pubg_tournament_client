import {IMatch} from "../match/Match"
import React, {CSSProperties, FC} from "react"
import {Avatar, Badge, Card, Col, Divider, Row, Skeleton, Tag, theme} from "antd"
import Meta from "antd/es/card/Meta"
import {format, isToday} from "date-fns"
import coinSVG from "../../image/svg/coins.svg"

interface IHeaderFeedItem {
    match: IMatch
    index: number
}

interface IIsToday {
    date: Date | null
}

const IsToday: FC<IIsToday> = ({date}) => {

    if (date && isToday(date)) return (
        <Tag color={"green"}>Today</Tag>
    )

    else return (<></>)
}

const HeaderFeedItem: FC<IHeaderFeedItem> = ({match, index}) => {
    const {token} = theme.useToken()

    const styles: CSSProperties = {
        height: 155,
        width: 350,
        padding: 12,
        color: token.colorText,
        background: token.colorBgLayout,
        borderRadius: token.borderRadius,
    }

    if (!match.meta.winner) return null


    return (
        <div style={styles}>

            <Divider
                className="last_matches"
                style={{
                    width: 300,
                    marginBottom: 0
                }}
                orientation="right"
            >{match.name.toUpperCase()}</Divider>
            <Row style={{width: "100%",}}>
                <Row style={{width: "15%"}}>
                    <Avatar src={match.meta.winner?.avatar}/>
                </Row>
                <Row style={{width: "65%"}}>
                    <Row style={{width: "100%", fontSize: 9}}
                    >ID: {match.meta.winner.id}</Row>
                    <Row style={{width: "100%"}}
                    >{match.meta.winner.nickname}</Row>
                </Row>
                <Row justify="end" align="bottom" style={{width: "20%"}}>
                    <IsToday date={match.date.start}/>
                </Row>
            </Row>
            <Row align="bottom" justify="space-between" style={{width: "100%", height: 60}}>
                <Row style={{width: "80%", color: token.colorBorder}}>
                    <Row
                        style={{
                            width: "100%",
                            fontSize: 9
                        }}
                    >Match ID: {match.id}</Row>
                    <Row style={{width: "100%", fontSize: 12}}>
                        <Row style={{width: "100%"}}>
                            {match.date.start && format(match.date.start, "dd.MM.yyyy HH:mm")}
                        </Row>
                        <Row style={{width: "100%"}}>
                            {match.date.end && format(match.date.end, "dd.MM.yyyy HH:mm")}
                        </Row>
                    </Row>
                </Row>
                <Row justify="end" style={{width: "20%"}}>
                    <Col>
                        <Avatar
                            size={20}
                            src={coinSVG}
                            alt={"coin"}
                            style={{
                                marginTop: 5,
                            }}
                        />
                    </Col>
                    <Col
                        style={{
                            fontSize: 17,
                            paddingTop: 5,
                        }}
                    >{match.reward.coin}
                    </Col>
                </Row>
            </Row>
        </div>
    )

    // return (
    //
    //     <Card
    //         size="small"
    //         bordered={false}
    //         style={styles}
    //     >
    //         <Divider
    //             className="last_matches"
    //             style={{
    //                 width: 300,
    //                 marginBottom: 0
    //             }}
    //             orientation="right"
    //         >{match.name.toUpperCase()}</Divider>
    //
    //         <Skeleton loading={false} avatar active>
    //             <Meta
    //                 avatar={<Avatar src={match.meta.winner?.avatar}/>}
    //                 title={
    //                     <>
    //                         <Row>{match.meta.winner.nickname}</Row>
    //                         <Row style={{fontSize: 9}}>{match.id}</Row>
    //                     </>
    //                 }
    //                 description={
    //                     <Row justify="space-between">
    //                         <Row
    //                             style={{width: 120}}
    //                             justify={"space-between"}
    //                             align="bottom"
    //                         >
    //                             <Col style={{fontSize: 12}}>{format(match.date.start, "dd.MM.yyyy HH:mm")}</Col>
    //
    //                         </Row>
    //                         <Row
    //                             justify="space-between"
    //                             style={{
    //                                 minWidth: 70
    //                             }}
    //                         >
    //                             <Col>
    //                                 <Avatar
    //                                     size={25}
    //                                     src={coinSVG}
    //                                     alt={"coin"}
    //                                     style={{
    //                                         marginBottom: 3
    //                                     }}
    //                                 />
    //                             </Col>
    //                             <Col
    //                                 style={{
    //                                     fontSize: 17,
    //                                 }}
    //                             >{match.reward.coin}
    //                             </Col>
    //                         </Row>
    //                     </Row>
    //                 }
    //             />
    //         </Skeleton>
    //     </Card>
    // )
}

export {HeaderFeedItem}