import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {Button, Divider, Space, Tour, TourProps} from "antd"
import {EllipsisOutlined} from "@ant-design/icons"
import {DonateButton} from "./UI/DonateButton";

interface IDonateTour {
    openTour?: boolean
}

const DonateTour: FC<IDonateTour> = ({openTour}) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);


    useEffect(() => {
        // setOpen(() => openTour)
    }, [openTour]);


    const steps: TourProps['steps'] = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref1.current,
            mask: {
                style: {
                    boxShadow: 'inset 0 0 15px #fff',
                },
                color: 'rgba(40, 0, 255, .4)',
            },
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref1.current,
            mask: false,
        },
    ];


    return (
        <>
            <Button ref={ref1} type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </Button>


            <Tour
                open={open}
                onClose={() => setOpen(false)}
                steps={steps}
                mask={{
                    style: {
                        boxShadow: 'inset 0 0 15px #333',
                    },
                    color: 'rgba(80, 255, 255, .4)',
                }}
            />
        </>
    )
}

export {DonateTour}