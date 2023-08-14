import React, {ChangeEvent, FC} from 'react';
import {PlayerDisplayWrap} from "./PlayerDisplayWrap";
import {DonateValue} from "./UI/DonateValueInput";
import {PlayerRankDisplay} from "./PlayerRankDisplay";
import {InputProps} from "antd";

interface IDonateValueOrRankDisplay {
    showDonateId: string
    playerId: string
    rank: number
    donateInputValue: string
    donateInputStatus: InputProps["status"]
    donateLoading: boolean
    onInputClear(): void
    onInput(e: ChangeEvent<HTMLInputElement>): void
}


const DonateValueOrRankDisplay: FC<IDonateValueOrRankDisplay> = (props) => {
    const {
        showDonateId,
        playerId,
        rank,
        donateInputValue,
        donateInputStatus,
        donateLoading,
        onInput,
        onInputClear
    } = props

    if (showDonateId === playerId)
        return (
            <PlayerDisplayWrap>
                <DonateValue
                    props={{
                        value: donateInputValue,
                        onInput,
                        onClick: event => {
                            event.stopPropagation()
                        },
                        status: donateInputStatus,
                        disabled: donateLoading,
                    }}
                    onClear={onInputClear}
                />
            </PlayerDisplayWrap>
        )
    else
        return (
            <PlayerDisplayWrap>
                <PlayerRankDisplay rank={rank}/>
            </PlayerDisplayWrap>
        )
};

export {DonateValueOrRankDisplay}