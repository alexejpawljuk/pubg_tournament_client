import React, {FC, useEffect, useRef} from "react"
import {Input, InputProps, InputRef, theme} from "antd"
import {CloseCircleOutlined} from "@ant-design/icons"

interface IDonateValue {
    props: InputProps

    onClear(): void
}

const DonateValue: FC<IDonateValue> = ({props, onClear}) => {
    const {token} = theme.useToken()
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        inputRef.current?.focus()

    }, [])

    return (
        <Input
            allowClear={{
                clearIcon: <CloseCircleOutlined onClick={onClear}/>,
            }}
            style={{width: 62}}
            size="small"
            placeholder="coin"
            ref={inputRef}
            {...props}
        />
    )
}

export {DonateValue}