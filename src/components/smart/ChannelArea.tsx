import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface IChannelAreaProps {
    style?: any;
}

export default class ChannelArea extends React.Component<IChannelAreaProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        
    }
});