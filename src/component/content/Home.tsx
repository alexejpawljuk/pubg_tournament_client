import React from 'react'
import TournamentList from "../tournament/TournamentList"
import TournamentCreate from "../tournament/TournamentCreate";


const Home = () => {
    return (
        <div>
            <TournamentCreate/>
            <TournamentList/>
        </div>
    )
}

export default Home