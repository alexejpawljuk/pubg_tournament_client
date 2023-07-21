import {Card} from 'antd'
import {UsergroupAddOutlined, LoginOutlined} from '@ant-design/icons'

const gridStyle: React.CSSProperties = {
    width: "25%",

    // height: 250,
    textAlign: 'center',
    // height: 300
    // background: "#001529"
    justifySelf: "center",
    // margin: 5
}



const CardTournament = () => {

    return (
        <Card >
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