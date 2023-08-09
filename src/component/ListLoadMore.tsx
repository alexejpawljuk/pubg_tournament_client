import React, {CSSProperties, TransitionStartFunction, useEffect, useState} from 'react'
import {Button, List, Row} from "antd"
import {ListProps} from "antd/lib"
import {ReloadOutlined} from "@ant-design/icons"
import {uid} from "uid"


interface IListLoadMore<DataSourceType> {
    listProps: Omit<ListProps<DataSourceType>, "dataSource" | "loadMore" | "loading">
    data: DataSourceType[]
    transition: {
        startTransition: TransitionStartFunction
        isPending: boolean
    }
}


function ListLoadMore<DataSourceType>(props: IListLoadMore<DataSourceType>) {
    const {
        data,
        listProps,
        transition
    } = props

    const [dataSource, setDataSource] = useState<DataSourceType[]>([])
    const [list, setList] = useState<DataSourceType[]>([])


    const itemPortion = 7
    const listDefaultStyles: CSSProperties = {
        height: 340,
        overflowY: "scroll",
        width: "99%"
    }

    useEffect(() => {
        setDataSource(() => data)
    }, [data])

    useEffect(() => {
        loadMoreData()
    }, [dataSource])


    const loadMoreData = () => {
        transition.startTransition(() => {
            const moreLoadList = [...dataSource].slice(0, list.length + itemPortion)
            setList(() => moreLoadList)
        })
    }

    const loadMore =
        !transition.isPending && list.length < dataSource?.length ? (<div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        ><Button disabled={transition.isPending} onClick={loadMoreData} icon={<ReloadOutlined/>}>load more</Button>
        </div>) : null


    return (
        <Row justify="center">
            <List
                className={"demo-loadmore-list"}
                style={listDefaultStyles}
                itemLayout="horizontal"
                loadMore={loadMore}
                loading={transition.isPending}
                dataSource={list}
                size="small"
                key={uid()}
                {...listProps}
            />
        </Row>
    )
}


export default ListLoadMore