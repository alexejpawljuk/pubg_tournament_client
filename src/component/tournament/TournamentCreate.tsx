import React, {CSSProperties, FC, ReactNode, useEffect, useState} from 'react'
import {
    Badge,
    Button,
    ButtonProps,
    DatePicker, Rate,
    Row,
    Select, SelectProps, Slider, Steps,
    theme,
    Typography
} from "antd"
import {InfoCircleOutlined, ShoppingCartOutlined, StarFilled} from "@ant-design/icons"
import Shop from "../shop/Shop"
import {IUseModalPopup} from "../../store/useModelPopup"
import AuthFrom from "../AuthForm"
import {ITournament, ITournamentType} from "./Tournament"
import {IoCreateOutline} from "react-icons/io5";
import {GrNext} from "react-icons/gr";


interface ITournamentCreate {

}

type ITournamentProps = Omit<ITournament, "id" | "key" | "reward" | "name" | "members">

interface ITournamentCreateProps {
    props?: ButtonProps
    modalPopup: IUseModalPopup.IStore
}


function getSelectItem<ValueType>(value: ValueType, label: ReactNode) {
    return {value, label}
}

function getStepItem(title: string, content: ReactNode) {
    return {title, content}
}

export const TournamentCreateHeader: FC<ITournamentCreateProps> = ({props, modalPopup}) => {

    const onShop = () => {
        modalPopup.setOpenModal(prevState => ({
            ...prevState,
            openModal: true,
            props: {
                width: 550
            },
            children: <Shop/>
        }))
    }

    return (
        <Button
            icon={<ShoppingCartOutlined/>}
            onClick={onShop}
            {...props}
        >Shop</Button>
    )
}

const Title = () => {
    const {token: {colorText}} = theme.useToken()

    return (
        <Row justify="center">
            <Badge
                count={
                    <InfoCircleOutlined
                        onClick={() => {
                            console.log("Create tournament Info")
                        }}
                        style={{color: colorText}}
                    />
                }
                offset={[6, 0]}
                size="default"
            >
                <Typography.Title
                    level={3}
                    style={{margin: 0}}
                    type={"secondary"}
                >
                    Create Tournament
                </Typography.Title>
            </Badge>
        </Row>
    )
}

const TournamentCreateOptions = () => {
    const {token} = theme.useToken()
    const [rang, setRang] = useState<number>(0)
    const [props, setProps] = useState<ITournamentProps>({
        type: "solo",
        price: {
            coin: 10,
            ticket: 0
        },
        condition: {
            rank: 0,
            premium: false
        },
        date: new Date()
    })

    const [current, setCurrent] = useState(0)

    const onSelectTournamentType = (e: ITournamentType) => {
        setProps(prevState => ({...prevState, type: e}))
    }

    const onSelectDate = (e: any, date: string) => {
        setProps(prevState => ({...prevState, date: new Date(date)}))
    }

    const onSelectRang = (e: number) => {
        setProps(prevState => ({...prevState, condition: {rank: e, premium: false}}))
    }

    const SelectType = <Select
        defaultValue={props.type}
        size={"small"}
        style={{width: 120}}
        onChange={onSelectTournamentType}
        placeholder="select"
        options={[
            getSelectItem<ITournamentType>("solo", "solo"),
            getSelectItem<ITournamentType>("duo", "duo"),
            getSelectItem<ITournamentType>("squad", "squad"),
        ]}
    />

    const SelectDate =
        <DatePicker
            size="small"
            style={{
                width: 223
            }}
            onChange={onSelectDate}
        />

    const SelectRank =
        <Rate
            style={{margin: 0}}
            onChange={onSelectRang}
            count={5}
            value={props.condition.rank}
            character={<StarFilled style={{width: "0.8em"}}/>}
        />

    const Result =
        <>

        </>

    const steps = [
        getStepItem("Type", SelectType),
        getStepItem("Date", SelectDate),
        getStepItem("Rank", SelectRank),
        getStepItem("Players", <>Content</>),
        getStepItem("Price", <>Content</>),
        getStepItem("Finish", <>Content</>),
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const contentStyle: React.CSSProperties = {
        lineHeight: '80px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 10,
    };

    return (
        <>
            <Steps size="small" direction="vertical" style={{marginTop: 25}} current={current} items={steps}/>
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{marginTop: 24}}>
                {current < steps.length - 1 && (
                    <Button
                        type="primary"
                        size="small"
                        style={{
                            width: 100
                        }}
                        onClick={next}
                    >
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        size="small"
                        style={{
                            background: "orange",
                            color: token.colorText,
                            width: 100,
                        }}
                        icon={<IoCreateOutline color={token.colorText}/>}
                        onClick={() => console.log('Processing complete!')}
                    >
                        Complete
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        size="small"
                        style={{margin: '0 8px'}}
                        onClick={() => prev()}
                    >
                        Back
                    </Button>
                )}
            </div>
        </>
    )
}

const TournamentCreate: FC<ITournamentCreate> = () => {
    const {token: {colorBorder}} = theme.useToken()


    const [isAuth, setIsAuth] = useState<boolean>(true)


    if (isAuth)
        return (
            <>
                <Title/>
                <TournamentCreateOptions/>
            </>
        )

    else
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "60vh",}}>
                <AuthFrom props={{
                    onFinish: () => {
                        setIsAuth(true)
                    }
                }}/>
            </div>
        )
}

export default TournamentCreate