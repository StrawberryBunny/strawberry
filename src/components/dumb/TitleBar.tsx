import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import TitleBarButton from './TitleBarButton';

interface ITitleBarProps {
    styles?: any[];
}

@observer
export default class TitleBar extends React.Component<ITitleBarProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.styles)}>
            {this.props.children}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        '-webkit-app-region': 'drag',
        backgroundColor: '#333333',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        height: '34px',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        paddingLeft: '10px'
    }
});