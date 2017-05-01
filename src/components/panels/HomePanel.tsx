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
                <h1>Home</h1>
            </TitleBar>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        backgroundColor: '#2222BB'
    },
    titleBar: {
        justifyContent: 'flex-start'
    }
});