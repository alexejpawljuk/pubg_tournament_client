import {Card} from "antd"


const CardTournament = () => {

    const gridStyle: React.CSSProperties = {
        width: '25%',
        textAlign: 'center',
    }

    return (
        <>
            <Card title={"Title"} color={"red"}>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
        </>
    )
}

export default CardTournament