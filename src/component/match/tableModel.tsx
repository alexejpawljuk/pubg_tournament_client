import {ColumnsType} from "antd/es/table"
import {Avatar, Badge, BadgeProps, Button, Col, Rate, Row, Tag, TagProps, theme, Tooltip} from "antd"
import premiumSVG from "../../image/svg/high-quality.svg"
import coinSVG from "../../image/svg/coins.svg"
import {FaPeopleGroup} from "react-icons/fa6"
import ticketSVG from "../../image/svg/ticket.svg"
import React, {CSSProperties, FC, ReactNode} from "react"
import {LiteralUnion} from "antd/es/_util/type"
import {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors"
import {format, isToday, isTomorrow} from "date-fns"
import {LoginOutlined, StarFilled} from "@ant-design/icons"
import {IMatch} from "./Match";

interface IDateDisplay {
    props?: TagProps
    date: Date
}

interface IRankDisplay {
    value: number
}

interface IJoinGameButton {
    match: IMatch
    style?: CSSProperties
}

const iconSize = 20
const fontSize = 10

const DateDisplay: FC<IDateDisplay> = ({date, props}) => {
    let color: LiteralUnion<PresetColorType | PresetStatusColorType> = "default"
    if (isToday(date)) color = "green"
    if (isTomorrow(date)) color = "warning"
    return <Tag color={color} {...props}>{format(date, "dd.MM.yyyy hh:mm")}</Tag>
}

const JoinGameButton: FC<IJoinGameButton> = ({match, style}) => {
    const {token: {colorBgLayout}} = theme.useToken()

    return <Button
        size="small"
        icon={<LoginOutlined/>}
        style={{background: "orange", color: colorBgLayout, ...style}}
        type="default"
        onClick={e => {
            e.stopPropagation()
            console.log("Click on JOIN", match)
        }}
    >
        JOIN
    </Button>
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
                    <StarFilled style={{width: "0.6em"}}/>
                </Tooltip>
            }
        />
    )
}

const PremiumDisplay: FC<{ children: ReactNode }> = ({children}) => {

    const props: BadgeProps = {
        count: <Avatar
            size={iconSize}
            src={premiumSVG}
        />,
        offset: [6, -8]
    }

    return (
        <Badge {...props}>
            {children}
        </Badge>
    )
}

export const tournamentModel: ColumnsType<IMatch> = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        align: "center",
        width: 110,
        sorter: (a, b, sortOrder) => a.name.localeCompare(b.name),
        render: (value, record) => {
            if (record.condition.premium) {
                return (
                    <>
                        {/*<PremiumDisplay>*/}
                            <Row
                                justify="center"
                                style={{marginTop: 22}}
                            >
                               <PremiumDisplay>
                                   <span style={{fontSize}}>
                                       {record.name.toUpperCase()}
                                   </span>
                               </PremiumDisplay>
                            </Row>
                        {/*</PremiumDisplay>*/}
                        <Row
                            justify="center"
                            style={{fontSize: fontSize - 2, marginTop: 8}}
                        >
                            ID: {record.id}
                        </Row>
                    </>

                )
            } else {
                return (
                    <>
                        <Row
                            justify="center"
                            style={{fontSize, marginTop: 22}}
                        >
                            {record.name}
                        </Row>
                        <Row
                            justify="center"
                            style={{fontSize: fontSize - 2, marginTop: 2}}
                        >
                            ID: {record.id}
                        </Row>
                    </>
                )
            }
        }
    },
    {
        key: 'type',
        title: 'Type',
        dataIndex: 'type',
        align: "center",
        width: 60,
        sorter: (a, b, sortOrder) => a.type.localeCompare(b.type),
        render: (value, record) => <span style={{fontSize}}>{record.type.toUpperCase()}</span>
    },
    {
        key: "date",
        title: "Date",
        dataIndex: "date",
        align: "center",
        width: 110,
        sorter: (a, b, sortOrder) => a.date.start.getTime() - b.date.start.getTime(),
        render: (value, record) => <DateDisplay date={record.date.start} props={{style: {fontSize}}}/>
    },
    {
        key: "reward",
        title: "Reward",
        dataIndex: "reward",
        align: "center",
        width: 75,
        sorter: (a, b) => a.reward.coin - b.reward.coin,
        render: (value, record) =>
            <Tooltip placement="top"
                     title="For the victory in the tournament, the winner will receive coins as a reward.">
                <Avatar size={iconSize} src={coinSVG} alt={"coin"}/>
                <div style={{fontSize}}>{record.reward.coin}</div>
            </Tooltip>
    },
    {
        key: "rank",
        title: "Rank",
        dataIndex: "rank",
        align: "center",
        width: 115,
        sorter: (a, b) => a.condition.rank - b.condition.rank,
        render: (value, record) =>
            <RankDisplay value={record.condition.rank}/>,
    },
    {
        key: 'members',
        title: 'Members',
        dataIndex: 'members',
        align: "center",
        width: 90,
        sorter: (a, b) => a.members.alreadyRegistered - b.members.alreadyRegistered,
        render: (value, record) =>
            <div style={{fontSize}}>
                <FaPeopleGroup size={iconSize - 2}
                               color={record.members.max - record.members.alreadyRegistered ? "green" : "red"}/>
                <div>{record.members.alreadyRegistered} / {record.members.max}</div>
            </div>
    },
    {
        key: "price",
        title: "Price",
        dataIndex: "price",
        align: "center",
        width: 70,
        sorter: (a, b) => {
            if (a.price.ticket === b.price.ticket) return a.price.coin - b.price.coin
            else return a.price.ticket - b.price.ticket
        },
        render: (value, record) =>
            <Row justify="space-evenly">
                <Col>
                    <Avatar size={iconSize} src={ticketSVG} alt={"ticket"}/>
                    <div style={{fontSize}}>{record.price.ticket}</div>
                </Col>
                <Col>
                    <Avatar size={iconSize} src={coinSVG} alt={"coin"}/>
                    <div style={{fontSize}}>{record.price.coin}</div>
                </Col>
            </Row>
    },
    {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "center",
        width: 70,
        render: (value, record) => <JoinGameButton match={record} style={{fontSize}}/>
    }
]