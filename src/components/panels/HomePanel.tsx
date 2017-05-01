import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface IHomePanelProps {
    style?: any;
}

export default class HomePanel extends React.Component<IHomePanelProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        backgroundColor: '#2222BB'
    }
});