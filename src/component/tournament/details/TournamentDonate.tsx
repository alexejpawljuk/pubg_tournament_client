import React, {ChangeEvent, FC, useMemo} from 'react'
import {AutoComplete, AutoCompleteProps, Col, Row, theme} from "antd"
import {IPlayer, ITournament} from "../Tournament"
import {Input} from 'antd/lib'
import Search from "antd/es/input/Search";

interface ITournamentDonation {
    show: boolean
    tournament: ITournament
}


interface ISearchAutoComplete {
    players: IPlayer[]
}


const SearchAutoComplete: FC<ISearchAutoComplete> = ({players}) => {
    const {token} = theme.useToken()


    const sortedPlayers = useMemo(() => {
        return players.sort((a, b) => a.nickname.localeCompare(b.nickname))
    }, [players])

    const options: AutoCompleteProps["options"] = useMemo(() => {
        return sortedPlayers.map(player => ({
            label: `${player.nickname}`,
            value: player.id
        }))
    }, [sortedPlayers])

    const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Select user donate", e)
    }

    const onSearch = (e: string) => {
        console.log("Search", e)
    }

    return (
        <AutoComplete
            style={{
                width: 150,
                background: token.colorBgBase
        }}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
        >
            <Search size="small" placeholder="serach player..." enterButton/>
        </AutoComplete>
    )
}


const TournamentDonate: FC<ITournamentDonation> = ({show, tournament}) => {
    const {token} = theme.useToken()

    const styles = {
        background: token.colorBgBase,
        borderRadius: token.borderRadius,
        width: "100%",
        padding: 15,
        marginBottom: 15
    }

    if (!show) return <></>

    return (
        <Row justify="space-around" style={styles}>
            <Col style={{minWidth: 270}}>
                part 1
            </Col>
            <Col style={{minWidth: 270}}>
                <Row justify="center">
                    Make a donation to the player
                </Row>
                <Row justify="center">
                    <SearchAutoComplete
                        players={tournament.meta.players}
                    />
                </Row>
            </Col>
        </Row>
    );
};

export default TournamentDonate