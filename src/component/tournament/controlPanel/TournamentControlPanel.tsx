import {Row, theme} from "antd"
import React, {CSSProperties, FC, TransitionStartFunction, useRef, useState} from "react"
import {ITournamentNameType, ITournamentType} from "../Tournament"
import {useLogger} from "../../../hook/useLogger"
import {CloseCircleOutlined} from "@ant-design/icons"
import {TournamentSortByName} from "./UI/TournamentSortByName"
import {TournamentCreateButton} from "./UI/TournamentCreateButton"
import {TournamentSearch} from "./UI/TournamentSearch"
import {TournamentSortByType} from "./UI/TournamentSortByType"
import TournamentSortByData from "./UI/TournamentSortByData"
import {useTournamentControlPanel} from "../../../hook/useTournamentControlPanel"

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

    // const breakpoint = useBreakpoint()
    // console.log("Breakpoint:", breakpoint)

    const {isPending, startTransition} = transition
    const [searchValue, setSearchValue] = useState<string>("")
    const filterOptionsRef = useRef<IFilterOptions>({name: "all", type: "all"})

    const {
        onChangeFilterOption,
        onSearch,
        onInput,
        onInputClear,
        onTournamentCreate,
        onDate
    } = useTournamentControlPanel({startTransition, setSearchValue, filterOptionsRef})



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
                        allowClear: {
                            clearIcon: <CloseCircleOutlined onClick={onInputClear}/>,
                        },
                        disabled: isPending,
                        loading: isPending,
                        value: searchValue,
                        onInput,
                        onSearch
                    }}
                />
                <TournamentSortByData
                    props={{
                        disabled: isPending,
                        onChange: onDate
                    }}
                />
            </Row>
        </Row>
    )
}

export default TournamentControlPanel