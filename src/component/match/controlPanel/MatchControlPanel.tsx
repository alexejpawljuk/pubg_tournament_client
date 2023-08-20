import {Row, theme} from "antd"
import React, {CSSProperties, FC, TransitionStartFunction, useRef, useState} from "react"
import {IMatchNameType, IMatchType} from "../Match"
import {useLogger} from "../../../hook/useLogger"
import {CloseCircleOutlined} from "@ant-design/icons"
import {MatchSortByName} from "./UI/MatchSortByName"
import {MatchCreateButton} from "./UI/MatchCreateButton"
import {MatchSearch} from "./UI/MatchSearch"
import {MatchSortByType} from "./UI/MatchSortByType"
import {useTournamentControlPanel} from "../../../hook/useTournamentControlPanel"

export interface IFilterOptions {
    name: IMatchNameType | "all"
    type: IMatchType | "all"
}

interface IMatchControlPanel {
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}

const MatchControlPanel: FC<IMatchControlPanel> = ({transition}) => {
    useLogger("Render control panel")
    const {token} = theme.useToken()

    // const breakpoint = useBreakpoint()
    // console.log("Breakpoint:", breakpoint)

    const {isPending, startTransition} = transition
    const [searchValue, setSearchValue] = useState<string>("")
    const [dateValue, setDateValue] = useState("")
    const filterOptionsRef = useRef<IFilterOptions>({name: "all", type: "all"})

    const {
        onChangeFilterOption,
        onSearch,
        onInput,
        onInputClear,
        onTournamentCreate,
        // onDate
    } = useTournamentControlPanel({startTransition, setSearchValue, filterOptionsRef})



    const stylesRow: CSSProperties = {
        width: "100%",
        padding: "5px 0px 15px 0px",
        background: token.colorBgLayout,
        zIndex: 0
    }

    return (
        <Row wrap>
            <Row justify="space-evenly" style={{...stylesRow}}>
                <MatchCreateButton
                    props={{
                        onClick: onTournamentCreate
                    }}/>
                <MatchSortByName props={{
                    disabled: isPending,
                    value: filterOptionsRef.current.name.toLowerCase(),
                    onChange: onChangeFilterOption,
                }}/>
                <MatchSortByType props={{
                    disabled: isPending,
                    value: filterOptionsRef.current.type.toLowerCase(),
                    onChange: onChangeFilterOption,
                }}/>
                <MatchSearch
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
                {/*<MatchSortByData*/}
                {/*    props={{*/}
                {/*        disabled: isPending,*/}
                {/*        onChange: onDate,*/}
                {/*    }}*/}
                {/*/>*/}
            </Row>
        </Row>
    )
}

export default MatchControlPanel