import React, { FC, TransitionStartFunction, useEffect, useRef, useState} from 'react'
import {Avatar, Button, Col, List, Rate, Row, Tag, TagProps, theme} from 'antd'
import {ReloadOutlined} from "@ant-design/icons"
import {ITournament} from "./Tournament"

import {format, isToday, isTomorrow} from "date-fns"
import coinSVG from "../../image/svg/coins.svg"
import {StarFilled} from "@ant-design/icons"
import {FaPeopleGroup} from "react-icons/fa6"
import ticketSVG from "../../image/svg/ticket.svg"
import TournamentInfo from "./TournamentInfo"
import {useModalPopup} from "../../store/useModelPopup"


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
            <Row style={{fontSize, paddingTop: 3}} justify="center">
                {format(date, "hh:mm")}
            </Row>
        </Col>
    )
}

const RankDisplay: FC<IRankDisplay> = ({value}) => {
    const stylesIcon = {
        width: "0.6em"
    }

    return (<Rate
            disabled
            allowHalf
            count={5}
            value={value}
            character={<StarFilled style={stylesIcon}/>}
        />
    )
}

const TournamentScrollingList: FC<ITournamentScrollingList> = ({tournamentList, transition}) => {

    const iter = useRef(0)
    useEffect(() => {
        console.log("Render TournamentScrollingList:", iter.current)
        iter.current = iter.current + 1
    })

    const {
        token: {
            // colorBgLayout,
            // colorBgContainer,
            colorBorder
        }
    } = theme.useToken()
    const modalPopup = useModalPopup()

    const {isPending, startTransition} = transition
    const [list, setList] = useState<ITournament[]>([])

    const itemPortion = 9
    const fontSize = 11
    const iconSize = 17
    const containerHeight = 340;
    const itemHeight = 47

    useEffect(() => {
        startTransition(() => {
            loadMoreData()
        })
    }, [tournamentList])

    const loadMoreData = () => {
        startTransition(() => {
            const newLoadList = [...tournamentList].slice(0, list.length + itemPortion)
            setList(() => newLoadList)
        })
    }


    const onSelectTournament = (tournament: ITournament) => {
        console.log("Select tournament:", tournament)
        modalPopup.setOpenModal(prevState => ({
            openModal: true,
            children: <TournamentInfo tournamentItem={tournament}/>,
            props: {
                width: 1000,
            }
        }))
    }

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

    const loadMore =
        !isPending && list.length < tournamentList.length ? (<div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button disabled={isPending} onClick={loadMoreData} icon={<ReloadOutlined/>}>load more</Button>
        </div>) : null

    return (
        <Row justify="center">
            <List
                style={{height: 340, overflowY: "scroll", width: "99%"}}
                className="demo-loadmore-list"
                loading={isPending}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                size={"small"}
                renderItem={(item) => (
                    <Row
                        onClick={() => onSelectTournament(item)}
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
                            <Row justify="center"><Avatar src={coinSVG} size={iconSize} alt={"coin"}/></Row>
                            <Row justify="center">
                                <div style={{fontSize}}>{item.reward.coin}</div>
                            </Row>
                        </Col>
                        <Col style={{...stylesCol, width: "25%"}}>
                            <Row justify="center"><RankDisplay value={item.condition.rank}/></Row>
                        </Col>
                        <Col style={{...stylesCol, width: "12%"}}>
                            <Row justify="center">
                                <FaPeopleGroup size={iconSize}
                                               color={item.members.max - item.members.alreadyRegistered ? "green" : "red"}/>
                            </Row>
                            <Row justify="center">
                                <div style={{fontSize}}>{item.members.alreadyRegistered} / {item.members.max}</div>
                            </Row>
                        </Col>
                        <Col style={{...stylesCol, width: "14%"}}>

                            <Row justify="center">
                                <Avatar size={iconSize} src={ticketSVG} alt={"ticket"}/>
                                <Col xs={{span: 10}} sm={{span: 10}} lg={{span: 4}} md={{span: 6}}>
                                    <div style={{fontSize: 12}}>{999}</div>
                                </Col>
                            </Row>

                            <Row justify="center" align="middle">
                                <Avatar size={iconSize} src={coinSVG} alt={"coin"}/>
                                <Col xs={{span: 10}} sm={{span: 10}} lg={{span: 4}} md={{span: 6}}>
                                    <div style={{fontSize: 12}}>{7}</div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                )}
            />
        </Row>
    )
}

export default TournamentScrollingList