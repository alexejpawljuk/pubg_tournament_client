import React, {FC, ReactNode} from 'react';
import {Layout} from "antd";

const RootLayoutContent: FC<{children: ReactNode}> = ({children}) => {
    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default RootLayoutContent;