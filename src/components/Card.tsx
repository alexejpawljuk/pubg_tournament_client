import {Card, theme} from 'antd'
import {UsergroupAddOutlined, LoginOutlined} from '@ant-design/icons'

const gridStyle: React.CSSProperties = {
    width: "25%",
    minWidth: 100,
    textAlign: 'center',
    justifySelf: "center"
}



const CardTournament = () => {


    return (
        <Card style={{margin: "15px 0"}}>
            <Card.Grid style={gridStyle}>
                <Card.Meta title={"Daily"}/>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <Card.Meta title={"Solo"}/>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <Card.Meta title={"Duo"}/>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <Card.Meta title={"Squad"}/>
            </Card.Grid>
        </Card>
    )
}

export default CardTournament