import {Card} from 'antd'
import {CSSProperties} from "react"

const gridStyle: CSSProperties = {
    width: "20%",
    minWidth: 80,
    textAlign: 'center',
    justifySelf: "center",
    padding: 0,
    minHeight: 100,
}

const metaStyle: CSSProperties = {
    alignItems: "center", height: "100%"
}


const CardTournament = () => {

    return (
        <>
            <Card style={{margin: "15px 0 0 0", display: "flex"}}>
                <Card >
                    <Card.Meta  title={"Daily"}/>
                </Card>
                <Card >
                    <Card.Meta title={"Solo"}/>
                </Card>
                <Card >
                    <Card title={"Duo"}/>
                </Card>
                <Card >
                    <Card.Meta title={"Squad"}/>
                </Card>
                <Card >
                    <Card.Meta title={"Custom"}/>
                </Card>
            </Card>
        </>
    )
}

export default CardTournament