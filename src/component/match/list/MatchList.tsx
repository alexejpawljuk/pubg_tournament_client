import React, {FC, TransitionStartFunction, useEffect, useRef, useState} from 'react'
import {Avatar, Col, Rate, Row, Tag, TagProps, theme} from 'antd'
import {IMatch} from "../Match"
import {format, isToday, isTomorrow} from "date-fns"
import coinSVG from "../../../image/svg/coins.svg"
import {StarFilled} from "@ant-design/icons"
import {FaPeopleGroup} from "react-icons/fa6"
import ticketSVG from "../../../image/svg/ticket.svg"
import MatchDetails from "../details/MatchDetails"
import {ModalPopupService} from "../../../service/ModelPopupService"
import ListLoadMore from "../../ListLoadMore"
import {ModalDrawerService} from "../../../service/ModalDrawerService"


interface IMatchScrollingList {
    matchList: IMatch[]
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
                {format(date, "HH:mm")}
            </Row>
        </Col>
    )
}

const RankDisplay: FC<IRankDisplay> = ({value}) => {
    const stylesIcon = {
        width: "0.6em"
    }

    return (
        <Rate
            disabled
            allowHalf
            count={5}
            value={value}
            character={<StarFilled style={stylesIcon}/>}
        />
    )
}

const MatchList: FC<IMatchScrollingList> = ({matchList, transition}) => {

    const iter = useRef(0)
    useEffect(() => {
        console.log("Render TournamentList:", iter.current)
        iter.current = iter.current + 1
    })

    const {token} = theme.useToken()
    const modalPopupService = ModalPopupService()
    const modalDrawerService = ModalDrawerService()

    const {isPending, startTransition} = transition

    const fontSize = 11
    const iconSize = 17


    const onSelectMatch = (match: IMatch) => {
        console.log("Select match:", match)
        modalPopupService.setOpenModal(prevState => ({
            openModal: true,
            children: <MatchDetails tournament={match}/>,
            props: {
                width: 700,
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
        borderColor: token.colorBorder,
        background: token.colorBgLayout,
        padding: "5px 0px",
    }


    return (
        <div
            style={{
                width: "100%",
                background: token.colorBgLayout,
                paddingBottom: 30,
            }}
        >
            <ListLoadMore<IMatch>
                transition={{isPending, startTransition}}
                data={matchList}
                listProps={{
                    renderItem: item => (
                        <Row
                            onClick={() => onSelectMatch(item)}
                            align="middle"
                            justify="space-around"
                            style={stylesRow}
                        >
                            <Col style={{...stylesCol, width: "22%"}}>
                                <Row style={{fontSize}} justify="center">{item.name.toUpperCase()}</Row>
                                <Row style={{fontSize: fontSize - 1}} justify="center">{item.type.toUpperCase()}</Row>
                                <Row style={{fontSize: fontSize - 3}} justify="center">ID: {item.id}</Row>
                            </Col>
                            <Col style={{...stylesCol, width: "15%"}}>
                                <Row justify="center">
                                    <DateDisplay date={item.date.start} fontSize={fontSize}/>
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
                                        <div style={{fontSize: 12}}>{item.price.ticket}</div>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Avatar size={iconSize} src={coinSVG} alt={"coin"}/>
                                    <Col xs={{span: 10}} sm={{span: 10}} lg={{span: 4}} md={{span: 6}}>
                                        <div style={{fontSize: 12}}>{item.price.coin}</div>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    )
                }}
            />
        </div>

    )
}

export default MatchList