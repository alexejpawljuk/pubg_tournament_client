import React, {ChangeEvent, Dispatch, MutableRefObject, SetStateAction, TransitionStartFunction} from "react"
import {IFilterOptions} from "../component/match/controlPanel/MatchControlPanel"
import MatchCreateHeader from "../component/match/create/MatchCreateHeader"
import MatchCreate from "../component/match/create/MatchCreate"
import {ModalDrawerService} from "../service/ModalDrawerService"
import {ModalPopupService} from "../service/ModelPopupService"
import {MatchService} from "../service/MatchService"
import {RadioChangeEvent} from "antd"


interface IUseTournamentControlPanelProps {
    setSearchValue: Dispatch<SetStateAction<string>>
    startTransition: TransitionStartFunction
    filterOptionsRef: MutableRefObject<IFilterOptions>
}

interface IUseTournamentControlPanelReturn {
    onChangeFilterOption(e: RadioChangeEvent): void

    onSearch(value: string): void

    onInput(e: ChangeEvent<HTMLInputElement>): void

    onInputClear(): void

    onTournamentCreate(): void

    // onDate(e: any, date: string): void
}

export const useTournamentControlPanel = (props: IUseTournamentControlPanelProps): IUseTournamentControlPanelReturn => {
    const modalDrawerService = ModalDrawerService()
    const modalPopupService = ModalPopupService()
    const tournamentService = MatchService()
    const {
        setSearchValue,
        startTransition,
        filterOptionsRef
    } = props

    return {
        onChangeFilterOption(e) {
            if (e.target.name === "tournament_name") filterOptionsRef.current.name = e.target.value
            if (e.target.name === "tournament_type") filterOptionsRef.current.type = e.target.value
            setSearchValue(() => "")
            startTransition(() => {
                tournamentService.matchFilterByNameAndType(filterOptionsRef.current)
            })
        },
        onSearch(value) {
            if (!value) return
            filterOptionsRef.current.name = "all"
            filterOptionsRef.current.type = "all"
            setSearchValue(() => value)
            startTransition(() => {
                tournamentService.matchSearch(value)
            })
        },
        onInput(e: ChangeEvent<HTMLInputElement>) {
            setSearchValue(() => e.target.value)
            if (e.target.value === "")
                startTransition(() => {
                    tournamentService.matchToDefault()
                })
        },
        onInputClear() {
            setSearchValue(() => "")
            startTransition(() => {
                tournamentService.matchSearch("")
            })
        },
        onTournamentCreate() {
            console.log("Create tournamentService")

            modalDrawerService.setOpenDrawer(() => ({
                openDrawer: true,
                children: <MatchCreate/>,
                props: {
                    extra: <MatchCreateHeader modalPopup={modalPopupService}/>
                }
            }))
        },
        // onDate(e, date) {
        //     filterOptionsRef.current.name = "all"
        //     filterOptionsRef.current.type = "all"
        //     setSearchValue(() => "")
        //     if (date === "") {
        //         startTransition(() => {
        //             tournamentService.tournamentToDefault()
        //         })
        //     } else {
        //         startTransition(() => {
        //             tournamentService.tournamentFilterByDate(new Date(date))
        //         })
        //     }
        // }
    }
}