import React, {ChangeEvent, Dispatch, MutableRefObject, SetStateAction, TransitionStartFunction} from "react"
import {IFilterOptions} from "../component/tournament/controlPanel/TournamentControlPanel"
import TournamentCreateHeader from "../component/tournament/create/TournamentCreateHeader"
import TournamentCreate from "../component/tournament/create/TournamentCreate"
import {ModalDrawerService} from "../service/ModalDrawerService"
import {ModalPopupService} from "../service/ModelPopupService"
import {TournamentService} from "../service/TournamentService"
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

    onDate(e: any, date: string): void
}

export const useTournamentControlPanel = (props: IUseTournamentControlPanelProps): IUseTournamentControlPanelReturn => {
    const modalDrawerService = ModalDrawerService()
    const modalPopupService = ModalPopupService()
    const tournamentService = TournamentService()
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
                tournamentService.tournamentFilterByNameAndType(filterOptionsRef.current)
            })
        },
        onSearch(value) {
            if (!value) return
            filterOptionsRef.current.name = "all"
            filterOptionsRef.current.type = "all"
            setSearchValue(() => value)
            startTransition(() => {
                tournamentService.tournamentSearch(value)
            })
        },
        onInput(e: ChangeEvent<HTMLInputElement>) {
            setSearchValue(() => e.target.value)
            if (e.target.value === "")
                startTransition(() => {
                    tournamentService.tournamentToDefault()
                })
        },
        onInputClear() {
            setSearchValue(() => "")
            startTransition(() => {
                tournamentService.tournamentSearch("")
            })
        },
        onTournamentCreate() {
            console.log("Create tournamentService")

            modalDrawerService.setOpenDrawer(() => ({
                openDrawer: true,
                children: <TournamentCreate/>,
                props: {
                    extra: <TournamentCreateHeader modalPopup={modalPopupService}/>
                }
            }))
        },
        onDate(e, date) {
            filterOptionsRef.current.name = "all"
            filterOptionsRef.current.type = "all"
            setSearchValue(() => "")
            if (date === "") {
                startTransition(() => {
                    tournamentService.tournamentToDefault()
                })
            } else {
                startTransition(() => {
                    tournamentService.tournamentFilterByDate(new Date(date))
                })
            }
        }
    }
}