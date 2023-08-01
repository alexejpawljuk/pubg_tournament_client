import React from 'react'
import TournamentList from "../tournament/TournamentList"
import TournamentCreate from "../tournament/TournamentCreate"
import TournamentScrollingList from "../tournament/TournamentScrollingList";


const Home = () => {


    return (
        <div>
            {/*<TournamentCreate/>*/}

            <TournamentList/>
            {/*<TournamentScrollingList/>*/}
        </div>
    )
}

export default Home