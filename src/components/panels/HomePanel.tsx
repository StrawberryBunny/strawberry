import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';

interface IHomePanelProps {
    style?: any;
}

export default class HomePanel extends React.Component<IHomePanelProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <TitleBar style={STYLES.titleBar}>
                <span>Home</span>
            </TitleBar>
            <div className={css(STYLES.rest)}>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    titleBar: {
        flex: '0 0 auto',
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        paddingLeft: '10px'
    },
    rest: {
        flex: '1 1 auto'
    }
});