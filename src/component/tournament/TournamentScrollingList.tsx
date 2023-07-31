import React, {CSSProperties, ReactNode, useEffect, useState} from 'react'
import {Avatar, Badge, Button, Col, Divider, List, message, Row, Tag, theme} from 'antd'
import VirtualList from 'rc-virtual-list'
import {ListItemProps} from "antd/es/list";
import {LoginOutlined} from "@ant-design/icons";

interface UserItem {
    email: string
    gender: string
    name: {
        first: string
        last: string
        title: string
    }
    nat: string
    picture: {
        large: string
        medium: string
        thumbnail: string
    }
}

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo'
const ContainerHeight = 300

const TournamentScrollingList = () => {
    const {token: {colorBgLayout}} = theme.useToken()
    const [data, setData] = useState<UserItem[]>([])

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results))
            })
    }

    useEffect(() => {
        appendData()
    }, [])

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData()
        }
    }

    const styleColumn: CSSProperties = {
        alignItems: "center"
    }

    const column: ReactNode[] = [
        <Col style={styleColumn}>Content</Col>,
        <Col style={styleColumn}>Content</Col>,
        <Col style={styleColumn}>Content</Col>,
        <Col style={styleColumn}>Content</Col>,
        <Col style={styleColumn}>Content</Col>,
    ]

    return (
        <List>
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={60}
                itemKey="email"
                onScroll={onScroll}

            >
                {(item: UserItem) => (

                    <List.Item key={item.email} style={{padding: 0}}>
                        <Row
                            justify="space-between"
                            wrap
                            style={{width: "100%"}}
                            onClick={() => console.log(item)}
                        >

                            <Col style={styleColumn}>Content</Col>

                            <Col style={styleColumn}>Content</Col>
                            <Col style={styleColumn}>Content</Col>
                            <Col style={styleColumn}>Content</Col>
                            <Col style={styleColumn}>
                                <Tag
                                    // size={"small"}
                                    // icon={<LoginOutlined/>}

                                    style={{background: "orange", color: colorBgLayout}}
                                    // type="default"
                                    onClick={e => {
                                        e.stopPropagation()
                                        console.log("Click on JOIN", item)
                                    }}
                                >
                                    JOIN
                                </Tag>
                            </Col>

                        </Row>
                        {/*</Badge.Ribbon>*/}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    )
}

export default TournamentScrollingList