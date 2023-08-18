import React, {FC, ReactNode} from 'react'
import {Button, ButtonProps} from "antd"

interface ISocialMediaButton {
    props: ButtonProps
    children: ReactNode
}

const SocialMediaButton: FC<ISocialMediaButton> = ({props, children}) => {
    return (
        <Button
            {...props}
            style={{
                background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,99,121,0) 0%, rgba(0,212,255,0.2) 100%)",
                width: 120,
                // margin: "10px 0",
            }}
        >{children}</Button>
    );
};

export default SocialMediaButton