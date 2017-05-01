import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface ITitleBarProps {
    style?: any;
}

export default class TitleBar extends React.Component<ITitleBarProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            {this.props.children}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        '-webkit-app-region': 'drag',
        backgroundColor: '#252526',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',             
        padding: '5px',
        height: '34px'
    }
});