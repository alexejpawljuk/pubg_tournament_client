import React, {FC, TransitionStartFunction, useEffect, useRef, useState} from 'react'
import {Avatar, Button, Col, List, Rate, Row, Skeleton, Tag, TagProps, theme, Tooltip} from 'antd'
import tournament, {ITournament} from "./Tournament";
import {LiteralUnion} from "antd/es/_util/type";
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";
import {format, isToday, isTomorrow} from "date-fns";
import coinSVG from "../../image/svg/coins.svg";
import {StarFilled} from "@ant-design/icons";
import {FaPeopleGroup} from "react-icons/fa6";
import ticketSVG from "../../image/svg/ticket.svg";
import {uid} from "uid";


interface ITournamentScrollingList {
    tournamentList: ITournament[]
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}

interface IDateDisplay {
    props?: TagProps
    date: Date
    fontSize?: number
}

interface IRankDisplay {
    value: number
}

const DateDisplay: FC<IDateDisplay> = ({date, props, fontSize}) => {
    const [dataDisplayProps, setDataDisplayProps] = useState<TagProps>({
        style: {padding: 0, margin: 0, fontSize}, color: "default",
    })

    useEffect(() => {
        if (isToday(date)) setDataDisplayProps(prevState => ({...prevState, color: "green"}))
        if (isTomorrow(date)) setDataDisplayProps(prevState => ({...prevState, color: "warning"}))
    }, [])

    return (
        <Col>
            <Tag {...dataDisplayProps} {...props}>
                {format(date, "dd.MM.yy")}
            </Tag>
            <Row style={{fontSize}} justify="center">
                {format(date, "hh:mm")}
            </Row>
        </Col>
    )
}

const RankDisplay: FC<IRankDisplay> = ({value}) => {
    return (

        <Rate
            disabled
            allowHalf
            count={5}
            value={value}
            character={
                <Tooltip placement="top"
                         title="To participate in the tournament, you must have the corresponding rank or higher."
                >
                    <StarFilled
                        style={{width: "0.6em"}}
                    />
                </Tooltip>
            }
        />
    )
}

const TournamentScrollingList: FC<ITournamentScrollingList> = ({tournamentList, transition}) => {

    const {token: {colorBgLayout, colorBgContainer, colorBorder}} = theme.useToken()
    const {isPending, startTransition} = transition
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [list_, setList_] = useState<ITournament[]>([])

    useEffect(() => {
        startTransition(() => {
            setList_(() => tournamentList)
        })
    }, [tournamentList])

    const onLoadMore = () => {

    }

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null

    const stylesCol = {
        // border: "1px solid white",
        // margin: 10,
        // padding: 5,
        // width: `16%`,
        // fontSize: 14,
    }

    const stylesRow = {
        border: "0.5px solid",
        borderColor: colorBorder,
        // marginBottom: 5,
        padding: "5px 0px"
    }

    const fontSize = 11
    const iconSize = 15

    return (
        <List
            style={{height: 340, overflowY: "scroll"}}
            className="demo-loadmore-list"
            loading={isPending}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list_}
            // header={<div style={{ zIndex: 10, width: "100%", background: "red"}}>Header</div>}
            // rowKey="id"
            renderItem={(item) => (
                <Row
                    align="middle"
                    justify="space-around"
                    style={stylesRow}
                >
                    <Col style={{...stylesCol, width: "22%"}}>
                        <Row style={{fontSize}} justify="center">{item.name.toUpperCase()}</Row>
                        <Row style={{fontSize: fontSize - 1}} justify="center">{item.type.toUpperCase()}</Row>
                        <Row style={{fontSize: fontSize - 3}} justify="center">ID: {item.id}</Row>
                    </Col>
                    <Col style={stylesCol}>
                        <Row justify="center">
                            <DateDisplay date={item.date} fontSize={fontSize}/>
                        </Row>
                    </Col>
                    <Col style={{...stylesCol, width: "10%"}}>
                        <Row justify="center"><Avatar src={coinSVG} size={20} alt={"coin"}/></Row>
                        <Row justify="center">
                            <div style={{fontSize}}>{item.reward.coin}</div>
                        </Row>
                    </Col>
                    <Col style={{...stylesCol, width: "25%"}}>
                        <Row justify="center"><RankDisplay value={item.condition.rank}/></Row>
                    </Col>
                    <Col style={{...stylesCol, width: "12%"}}>
                        <Row justify="center">
                            <FaPeopleGroup size={18}
                                           color={item.members.max - item.members.alreadyRegistered ? "green" : "red"}/>
                        </Row>
                        <Row justify="center">
                            <div style={{fontSize}}>{item.members.alreadyRegistered} / {item.members.max}</div>
                        </Row>
                    </Col>
                    <Col style={{...stylesCol, width: "14%"}}>

                        <Row justify="center">
                            <Avatar size={18} src={ticketSVG} alt={"ticket"}/>
                            <Col xs={{span: 10}} sm={{span: 10}} lg={{span: 4}} md={{span: 6}}>
                                <div style={{fontSize: 12}}>{999}</div>
                            </Col>
                        </Row>

                        <Row justify="center" align="middle">
                            <Avatar size={18} src={coinSVG} alt={"coin"}/>
                            <Col xs={{span: 10}} sm={{span: 10}} lg={{span: 4}} md={{span: 6}}>
                                <div style={{fontSize: 12}}>{7}</div>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            )}
        />
    )
}

export default TournamentScrollingList