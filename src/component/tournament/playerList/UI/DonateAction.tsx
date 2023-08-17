import React, {FC} from 'react'
import {PlayerDisplayWrap} from "../PlayerDisplayWrap"
import {DonateButton} from "./DonateButton"
import {IPlayer} from "../../Tournament"

interface IDonateAction {
    showDonateId: string
    tournamentStarted: boolean
    donateLoading: boolean
    showDonate: boolean
    player: IPlayer

    onDonation(player: IPlayer): void

    onDonationConfirm(player: IPlayer): void
}

const DonateAction: FC<IDonateAction> = (props) => {
    const {
        showDonateId,
        tournamentStarted,
        showDonate,
        player,
        donateLoading,
        onDonation,
        onDonationConfirm,
    } = props

    if (showDonateId === player.id)
        return (
            <PlayerDisplayWrap>
                <DonateButton
                    props={{
                        disabled: tournamentStarted,
                        onClick: (event) => {
                            event.stopPropagation()
                            onDonationConfirm(player)
                        },
                        loading: donateLoading,
                    }}
                >Confirm</DonateButton>
            </PlayerDisplayWrap>
        )
    else
        return (
            <PlayerDisplayWrap>
                <DonateButton
                    props={{
                        disabled: tournamentStarted || showDonate,
                        onClick: (event) => {
                            event.stopPropagation()
                            onDonation(player)
                        }
                    }}
                >Donate</DonateButton>
            </PlayerDisplayWrap>
        )
}

export {DonateAction}