import React, {ChangeEvent, Dispatch, SetStateAction, TransitionStartFunction} from "react"
import {TypeDonateInput} from "../component/tournament/playerList/TournamentPlayerList"
import {IDonate, IPlayer, ITournament} from "../component/tournament/Tournament"
import ProfileCard from "../component/profile/card/ProfileCard";
import {useModalPopup} from "../store/useModelPopup";


interface IUseTournamentControlPanelProps {
    setDonateInput: Dispatch<SetStateAction<TypeDonateInput>>
    setShowDonate: Dispatch<SetStateAction<IPlayer | null>>
    setDonateLoading: Dispatch<SetStateAction<boolean>>
    startTransition: TransitionStartFunction
    tournament: ITournament
    donateInput: TypeDonateInput
}

interface IUseTournamentControlPanelReturn {
    fontSize: number

    onInput(e: ChangeEvent<HTMLInputElement>): void

    onInputClear(): void

    onDonation(player: IPlayer): void

    onDonationConfirm(player: IPlayer): void

    onOpenProfile(player: IPlayer): void
}

export const useTournamentPlayerList = (props: IUseTournamentControlPanelProps): IUseTournamentControlPanelReturn => {
    const modalPopup = useModalPopup()
    const {
        setDonateInput,
        setShowDonate,
        setDonateLoading,
        startTransition,
        tournament,
        donateInput,
    } = props
    const fontSize = 11

    return {
        fontSize,
        onInput(event) {
            const isInt = Number.isInteger(+event.target.value)
            if (isInt && event.target.value !== "0") {
                setDonateInput(() => ({value: event.target.value, status: ""}))
            } else {
                setDonateInput(() => ({value: "", status: "error"}))
            }
        },
        onInputClear() {
            setDonateInput(() => ({value: "", status: ""}))
            setShowDonate(() => null)
        },
        onDonation(player) {
            setDonateInput(() => ({value: "", status: ""}))
            setShowDonate(prevState => player)
        },
        onDonationConfirm(player: IPlayer) {
            if (+donateInput.value <= 0) return setShowDonate(() => null)

            setDonateLoading(() => true)
            const donate: IDonate = {
                amount: donateInput.value,
                player: player,
                from: {} as IPlayer,
                tournament,
                date: new Date()
            }
            console.log("Donate confirmed:", donate)
        },
        onOpenProfile(player: IPlayer) {
            // startTransition(() => {
            modalPopup.setOpenModal(prevState => {
                return {
                    openModal: true,
                    props: {
                        ...prevState.props,
                        onCancel: () => {
                            modalPopup.setOpenModal(() => ({
                                openModal: false,
                                children: <></>
                            }))
                            modalPopup.setOpenModal(() => prevState)
                        },
                    },
                    children: <ProfileCard player={player}/>
                }
            })
            // })
        },
    }
}