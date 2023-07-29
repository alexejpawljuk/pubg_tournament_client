import React from 'react'
import TournamentList from "../ListTournament"
import CreateTournament from "../CreateTournament";


const Home = () => {
    return (
        <div>
            <CreateTournament/>
            <TournamentList/>
        </div>
    )
}

export default Home