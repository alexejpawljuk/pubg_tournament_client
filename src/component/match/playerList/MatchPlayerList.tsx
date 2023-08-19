import React, {FC, TransitionStartFunction, useEffect, useState} from 'react'
import {IPlayer, IMatch} from "../Match"
import {Divider, InputProps, Row, RowProps, Skeleton, Space} from "antd"
import ListLoadMore from "../../ListLoadMore"
import {useTournamentPlayerList} from "../../../hook/useTournamentPlayerList"
import {PlayerAvatarDisplay} from "./PlayerAvatarDisplay"
import {PlayerNicknameDisplay} from "./PlayerNicknameDisplay"
import {PlayerIdDisplay} from "./PlayerIdDisplay"
import {PlayerDisplayWrap} from "./PlayerDisplayWrap"
import {DonateValueOrRankDisplay} from "./DonateValueOrRankDisplay"
import {DonateAction} from "./UI/DonateAction"

interface IMatchPlayerList {
    players: IPlayer[]
    isPending: boolean
    match: IMatch
    startTransition: TransitionStartFunction
    containerProps: RowProps
    itemProps: RowProps
    matchStarted: boolean
}

export type TypeDonateInput = {
    value: string
    status: InputProps["status"]
}


const MatchPlayerList: FC<IMatchPlayerList> = (props) => {
    const {
        players,
        isPending,
        startTransition,
        containerProps,
        itemProps,
        matchStarted,
        match,
    } = props


    const [donateInput, setDonateInput] = useState<TypeDonateInput>({value: "", status: ""})
    const [showDonate, setShowDonate] = useState<IPlayer | null>(null)
    const [donateLoading, setDonateLoading] = useState<boolean>(false)
    const {fontSize, onInputClear, onInput, onDonation, onDonationConfirm, onOpenProfile} = useTournamentPlayerList({
        setShowDonate,
        setDonateInput,
        setDonateLoading,
        match,
        donateInput,
        startTransition,
    })

    useEffect(() => {
        console.log("Donate for player:", showDonate)
    }, [showDonate])


    if (!players.length)
        return (
            <>
                <Divider style={{fontSize: 10}}>player not found</Divider>
                <Skeleton active/>
            </>
        )

    else
        return (
            <ListLoadMore<IPlayer>
                transition={{isPending, startTransition}}
                data={players}
                listProps={{
                    ...containerProps,
                    renderItem: (player, index) => (
                        <Row {...itemProps}>
                            <Space wrap onClick={() => onOpenProfile(player)} >
                                <PlayerAvatarDisplay avatar={player.avatar}/>
                                <PlayerDisplayWrap>
                                    <PlayerNicknameDisplay nickname={player.nickname} fontSize={fontSize}/>
                                    <PlayerIdDisplay id={player.id} fontSize={fontSize}/>
                                </PlayerDisplayWrap>
                            </Space>

                            <DonateValueOrRankDisplay
                                rank={player.rank}
                                playerId={player.id}
                                showDonateId={showDonate?.id as string}
                                donateLoading={donateLoading}
                                donateInputValue={donateInput.value}
                                donateInputStatus={donateInput.status}
                                onInput={onInput}
                                onInputClear={onInputClear}
                            />

                            <DonateAction
                                showDonate={matchStarted || !!showDonate}
                                player={player}
                                tournamentStarted={matchStarted}
                                showDonateId={showDonate?.id as string}
                                donateLoading={donateLoading}
                                onDonation={onDonation}
                                onDonationConfirm={onDonationConfirm}
                            />

                        </Row>
                    )
                }}
            />
        )
}

export {MatchPlayerList}