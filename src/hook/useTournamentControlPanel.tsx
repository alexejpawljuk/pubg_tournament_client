import {RadioChangeEvent} from "antd"
import React, {ChangeEvent, Dispatch, MutableRefObject, SetStateAction, TransitionStartFunction} from "react"
import {IFilterOptions} from "../component/tournament/controlPanel/TournamentControlPanel"
import {useTournament} from "../store/useTournament"
import TournamentCreate from "../component/tournament/create/TournamentCreate"
import TournamentCreateHeader from "../component/tournament/create/TournamentCreateHeader"
import {useModalDrawer} from "../store/useModalDrawer"
import {useModalPopup} from "../store/useModelPopup"


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
    const {setSearchValue, startTransition, filterOptionsRef} = props
    const modalDrawer = useModalDrawer()
    const modalPopup = useModalPopup()
    const tournament = useTournament()

    return {
        onChangeFilterOption(e) {
            if (e.target.name === "tournament_name") filterOptionsRef.current.name = e.target.value
            if (e.target.name === "tournament_type") filterOptionsRef.current.type = e.target.value
            setSearchValue(() => "")
            startTransition(() => {
                tournament.tournamentFilterByNameAndType(filterOptionsRef.current)
            })
        },
        onSearch(value) {
            if (!value) return
            filterOptionsRef.current.name = "all"
            filterOptionsRef.current.type = "all"
            setSearchValue(() => value)
            startTransition(() => {
                tournament.tournamentSearch(value)
            })
        },
        onInput(e: ChangeEvent<HTMLInputElement>) {
            setSearchValue(() => e.target.value)
            if (e.target.value === "")
                startTransition(() => {
                    tournament.tournamentSearch(e.target.value)
                })
        },
        onInputClear() {
            setSearchValue(() => "")
            startTransition(() => {
                tournament.tournamentSearch("")
            })
        },
        onTournamentCreate() {
            console.log("Create tournament")

            modalDrawer.setOpenDrawer(() => ({
                openDrawer: true,
                children: <TournamentCreate/>,
                props: {
                    extra: <TournamentCreateHeader modalPopup={modalPopup}/>
                }
            }))
        },
        onDate(e, date){
            console.log(date)
        }
    }
}