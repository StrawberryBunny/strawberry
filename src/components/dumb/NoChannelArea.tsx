import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface INoChannelArea {
    style?: any;
}

export default class NoChannelArea extends React.Component<INoChannelArea, {}> {
    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <img className={css(STYLES.image)} src="images/logo-large.png"/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        opacity: 0.1
    }
});