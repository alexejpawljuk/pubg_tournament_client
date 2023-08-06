import {
    Col, InputRef,
    Radio,
    RadioChangeEvent, RadioGroupProps,
    Row, theme,
} from "antd"
import React, {
    ChangeEvent,
    CSSProperties,
    FC, ReactNode, TransitionStartFunction, useEffect,
    useRef, useState,
} from "react"
import {useTournament} from "../../store/useTournament"
import {ITournamentNameType, ITournamentType} from "./Tournament"
import {useLogger} from "../../hook/useLogger"
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";


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
    const searchRef = useRef<InputRef>(null)

    useEffect(() => {
        searchRef.current?.focus()
    }, [props.value])

    return (
        <Search
            placeholder="Tournament search by ID:"
            size="small"
            enterButton
            ref={searchRef}
            {...props}
        />
    )
}

const TournamentControlItem: FC<ITournamentControlItem> = ({children}) => {
    const styles: CSSProperties = {
        // border: "1px solid",
        // borderColor: "white"
        marginTop: 5
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

const TournamentControlPanel: FC<ITournamentControlPanel> = ({transition}) => {
    useLogger("Render control panel")

    const {token: {borderRadius, colorBorder}} = theme.useToken()
    const tournament = useTournament()
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

    const stylesColumn: CSSProperties = {
        width: "99%",
        // minWidth: 300,
        margin: "10px auto",
        padding: "10px 5px",
        // height: 100,
        border: "2px solid",
        borderColor: colorBorder,
        borderRadius: borderRadius,
        zIndex: 0
    }

    return (
        <Row wrap>
            <Row justify="space-around" style={{...stylesColumn}}>
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