import {
    Col,
    Input,
    InputRef,
    Radio,
    RadioChangeEvent,
    Row, theme,
} from "antd"
import React, {
    CSSProperties,
    FC, TransitionStartFunction, useEffect,
    useRef,
} from "react"
import {useTournament} from "../../store/useTournament"
import {ITournamentNameType, ITournamentType} from "./Tournament"
import {useLogger} from "../../hook/useLogger"
import Search from "antd/es/input/Search";


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

const TournamentControlPanel: FC<ITournamentControlPanel> = ({transition}) => {
    useLogger("Render control panel")
    const {token: {borderRadius, colorBorder}} = theme.useToken()
    const tournament = useTournament()
    const {isPending, startTransition} = transition


    const searchRef = useRef<InputRef>(null)
    const filterOptionsRef = useRef<IFilterOptions>({name: "all", type: "all"})

    const onChangeFilterOption = (e: RadioChangeEvent) => {
        if (e.target.name === "tournament_name") filterOptionsRef.current.name = e.target.value
        if (e.target.name === "tournament_type") filterOptionsRef.current.type = e.target.value
        startTransition(() => {
            tournament.tournamentFilter(filterOptionsRef.current)
        })
    }

    const onSearch = (value: string) => {
        filterOptionsRef.current.name = "all"
        filterOptionsRef.current.type = "all"
        startTransition(() => {
            tournament.tournamentSearch(value)
        })
    }

    const stylesColumn: CSSProperties = {
        width: "30%",
        minWidth: 300,
        margin: "10px auto",
        padding: "10px 5px",
        height: 100,
        border: "2px solid",
        borderColor: colorBorder,
        borderRadius: borderRadius,
        zIndex: 0
    }

    return (
        <Row justify="center">
            <Col style={{...stylesColumn}}>
                <Input placeholder="Tournament search by ID: 1"/>
            </Col>
            <Col style={{...stylesColumn}}>
                <Input placeholder="Tournament search by ID: 2"/>
            </Col>
            <Col style={{...stylesColumn}}>
                <Row>
                    <Radio.Group
                        defaultValue="all"
                        size="small"
                        name="tournament_name"
                        value={filterOptionsRef.current.name.toLowerCase()}
                        onChange={onChangeFilterOption}
                    >
                        <Radio.Button value="all">all</Radio.Button>
                        <Radio.Button value="daily">daily</Radio.Button>
                        <Radio.Button value="custom">custom</Radio.Button>
                        <Radio.Button value="sponsorship">sponsorship</Radio.Button>
                    </Radio.Group>
                </Row>
                <Row>
                    <Radio.Group
                        defaultValue="all"
                        size="small"
                        name="tournament_type"
                        value={filterOptionsRef.current.type.toLowerCase()}
                        onChange={onChangeFilterOption}
                    >
                        <Radio.Button value="all">all</Radio.Button>
                        <Radio.Button value="solo">solo</Radio.Button>
                        <Radio.Button value="duo">duo</Radio.Button>
                        <Radio.Button value="squad">squad</Radio.Button>
                    </Radio.Group>
                </Row>
                <Row wrap>
                    <Search
                        placeholder="Tournament search by ID:"
                        loading={isPending}
                        enterButton
                        ref={searchRef}
                        onSearch={onSearch}
                    />
                </Row>
            </Col>
        </Row>
    )
}

export default TournamentControlPanel