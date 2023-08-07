import {
    Button,
    ButtonProps,
    Col,
    DatePicker,
    Radio,
    RadioChangeEvent,
    RadioGroupProps,
    Row,
    theme
} from "antd"
import React, {ChangeEvent, CSSProperties, FC, ReactNode, TransitionStartFunction, useRef, useState} from "react"
import {useTournament} from "../../store/useTournament"
import {ITournamentNameType, ITournamentType} from "./Tournament"
import {useLogger} from "../../hook/useLogger"
import Search from "antd/es/input/Search"
import {SearchProps} from "antd/lib/input"
import {LoginOutlined} from "@ant-design/icons"
import {useModalDrawer} from "../../store/useModalDrawer"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint"
import TournamentCreate, {TournamentCreateProps} from "./TournamentCreate"
import {useModalPopup} from "../../store/useModelPopup"

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

interface ITournamentControlItemWrap {
    children: ReactNode
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


interface ITournamentCreate {
    props: ButtonProps
}

const TournamentControlItemWrap: FC<ITournamentControlItemWrap> = ({children}) => {
    const styles: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        minWidth: 240,
    }

    return (
        <Col style={styles}>{children}</Col>
    )
}

const TournamentSortByName: FC<ITournamentSortByName> = ({props}) => {
    return (
        <TournamentControlItemWrap>
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
        </TournamentControlItemWrap>
    )
}

const TournamentSortByType: FC<ITournamentSortByType> = ({props}) => {
    return (
        <TournamentControlItemWrap>
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
        </TournamentControlItemWrap>
    )
}

const TournamentSearch: FC<ITournamentSearch> = ({props}) => {
    const styles: CSSProperties = {
        width: 230
    }

    return (
        <TournamentControlItemWrap>
            <Search
                placeholder="Tournament search by ID:"
                size="small"
                style={styles}
                enterButton
                {...props}
            />
        </TournamentControlItemWrap>
    )
}

const TournamentCreateButton: FC<ITournamentCreate> = ({props}) => {
    const {token: {colorBgContainer}} = theme.useToken()
    const styles: CSSProperties = {
        background: "orange",
        width: 164
    }

    return (
        <TournamentControlItemWrap>
            <Button
                style={styles}
                icon={<LoginOutlined style={{color: colorBgContainer}}/>}
                size="small"
                {...props}
            >
                <span style={{color: colorBgContainer}}>
                    create tournament
                </span>
            </Button>
        </TournamentControlItemWrap>
    )
}


const TournamentControlPanel: FC<ITournamentControlPanel> = ({transition}) => {
    useLogger("Render control panel")

    const {token: {borderRadius, colorBorder}} = theme.useToken()
    const tournament = useTournament()
    const modalDrawer = useModalDrawer()
    const modalPopup = useModalPopup()

    const breakpoint = useBreakpoint()
    console.log("Breakpoint:", breakpoint)

    const {isPending, startTransition} = transition
    const [searchValue, setSearchValue] = useState<string>("")
    const filterOptionsRef = useRef<IFilterOptions>({name: "all", type: "all"})


    const onChangeFilterOption = (e: RadioChangeEvent) => {
        if (e.target.name === "tournament_name") filterOptionsRef.current.name = e.target.value
        if (e.target.name === "tournament_type") filterOptionsRef.current.type = e.target.value
        setSearchValue(() => "")
        startTransition(() => {
            tournament.tournamentFilterByNameAndType(filterOptionsRef.current)
        })
    }

    const onSearch = (value: string) => {
        if (!value) return
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
            children: <TournamentCreate/>,
            props: {
                extra: <TournamentCreateProps modalPopup={modalPopup}/>
            }
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
            <Row justify="space-evenly" style={{...stylesRow}}>
                <TournamentCreateButton
                    props={{
                        onClick: onTournamentCreate
                    }}/>
                <TournamentSortByName props={{
                    disabled: isPending,
                    value: filterOptionsRef.current.name.toLowerCase(),
                    onChange: onChangeFilterOption,
                }}/>
                <TournamentSortByType props={{
                    disabled: isPending,
                    value: filterOptionsRef.current.type.toLowerCase(),
                    onChange: onChangeFilterOption,
                }}/>
                <TournamentSearch
                    props={{
                        disabled: isPending,
                        loading: isPending,
                        value: searchValue,
                        onInput,
                        onSearch
                    }}
                />
                <TournamentControlItemWrap>

                    <DatePicker
                        size="small"
                        disabled={isPending}
                        style={{
                            width: 223
                        }}
                        onChange={(e, date) => {
                            console.log(new Date(date))
                        }}/>

                </TournamentControlItemWrap>
            </Row>
        </Row>
    )
}

export default TournamentControlPanel