import {Button, ButtonProps, Col, Radio, RadioChangeEvent, RadioGroupProps, Row, theme} from "antd"
import React, {ChangeEvent, CSSProperties, FC, ReactNode, TransitionStartFunction, useRef, useState,} from "react"
import {useTournament} from "../../store/useTournament"
import {ITournamentNameType, ITournamentType} from "./Tournament"
import {useLogger} from "../../hook/useLogger"
import Search from "antd/es/input/Search"
import {SearchProps} from "antd/lib/input"
import {LoginOutlined} from "@ant-design/icons"
import TournamentCreate from "./TournamentCreate";
import {useModalDrawer} from "../../store/useModalDrawer";


export interface IFilterOptions {
    name: ITournamentNameType | "all"
    type: ITournamentType | "all"
}

interface ITournamentControlPanel {
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}

interface ITournamentSortByName {
    props: RadioGroupProps
}

interface ITournamentSortByType {
    props: RadioGroupProps
}

interface ITournamentSearch {
    props: SearchProps
}

interface ITournamentControlItem {
    children: ReactNode
}

interface ITournamentCreate {
    props: ButtonProps
}

const TournamentSortByName: FC<ITournamentSortByName> = ({props}) => {
    return (
        <Radio.Group
            defaultValue="all"
            size="small"
            name="tournament_name"
            {...props}
        >
            <Radio.Button value="all">all</Radio.Button>
            <Radio.Button value="daily">daily</Radio.Button>
            <Radio.Button value="custom">custom</Radio.Button>
            <Radio.Button value="sponsorship">sponsorship</Radio.Button>
        </Radio.Group>
    )
}

const TournamentSortByType: FC<ITournamentSortByType> = ({props}) => {
    return (
        <Radio.Group
            defaultValue="all"
            size="small"
            name="tournament_type"
            {...props}
        >
            <Radio.Button value="all">all</Radio.Button>
            <Radio.Button value="solo">solo</Radio.Button>
            <Radio.Button value="duo">duo</Radio.Button>
            <Radio.Button value="squad">squad</Radio.Button>
        </Radio.Group>
    )
}

const TournamentSearch: FC<ITournamentSearch> = ({props}) => {
    const styles: CSSProperties = {
        width: 225
    }

    return (
        <Search
            placeholder="Tournament search by ID:"
            size="small"
            style={styles}
            enterButton
            {...props}
        />
    )
}

const TournamentControlItem: FC<ITournamentControlItem> = ({children}) => {
    const styles: CSSProperties = {
        marginTop: 10
    }

    return (
        <Col
            style={styles}
            xs={{offset: 1}}
        >
            {children}
        </Col>
    )
}

const TournamentCreateButton: FC<ITournamentCreate> = ({props}) => {

    return (
        <>
            <Button
                style={{background: "orange"}}
                icon={<LoginOutlined/>}
                size="small"
                {...props}
            >
                <span>
                    create tournament
                </span>
            </Button>
        </>
    )
}


const TournamentControlPanel: FC<ITournamentControlPanel> = ({transition}) => {
    useLogger("Render control panel")

    const {token: {borderRadius, colorBorder}} = theme.useToken()
    const tournament = useTournament()
    const modalDrawer = useModalDrawer()
    const {isPending, startTransition} = transition
    const [searchValue, setSearchValue] = useState<string>("")
    const filterOptionsRef = useRef<IFilterOptions>({name: "all", type: "all"})

    const onChangeFilterOption = (e: RadioChangeEvent) => {
        if (e.target.name === "tournament_name") filterOptionsRef.current.name = e.target.value
        if (e.target.name === "tournament_type") filterOptionsRef.current.type = e.target.value
        setSearchValue(() => "")
        startTransition(() => {
            tournament.tournamentFilter(filterOptionsRef.current)
        })
    }

    const onSearch = (value: string) => {
        filterOptionsRef.current.name = "all"
        filterOptionsRef.current.type = "all"
        setSearchValue(() => value)
        startTransition(() => {
            tournament.tournamentSearch(value)
        })
    }

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(() => e.target.value)
        if (e.target.value === "")
            startTransition(() => {
                tournament.tournamentSearch(e.target.value)
            })
    }

    const onTournamentCreate = () => {
        console.log("Create tournament")
        modalDrawer.setOpenDrawer(() => ({
            openDrawer: true,
            children: <></>
        }))
    }

    const stylesRow: CSSProperties = {
        width: "99%",
        margin: "10px auto",
        padding: "5px 0px 15px 0px",
        border: "2px solid",
        borderColor: colorBorder,
        borderRadius: borderRadius,
        zIndex: 0
    }

    return (
        <Row wrap>
            <Row justify="space-around" style={{...stylesRow}}>
                <TournamentControlItem>
                    <TournamentSortByName
                        props={{
                            disabled: isPending,
                            value: filterOptionsRef.current.name.toLowerCase(),
                            onChange: onChangeFilterOption,
                        }}
                    />
                </TournamentControlItem>
                <TournamentControlItem>
                    <TournamentSortByType
                        props={{
                            disabled: isPending,
                            value: filterOptionsRef.current.type.toLowerCase(),
                            onChange: onChangeFilterOption,
                        }}
                    />
                </TournamentControlItem>
                <TournamentControlItem>
                    <TournamentCreateButton
                        props={{
                            onClick: onTournamentCreate
                        }}
                    />
                </TournamentControlItem>
                <TournamentControlItem>
                    <TournamentSearch
                        props={{
                            disabled: isPending,
                            loading: isPending,
                            value: searchValue,
                            onInput,
                            onSearch,
                        }}
                    />
                </TournamentControlItem>
            </Row>
        </Row>
    )
}

export default TournamentControlPanel