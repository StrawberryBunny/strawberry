import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

interface ILoadingOrbProps {
    icon: string;
    size: number;
    text: string;
    style?: any;
}

export default class LoadingOrb extends React.Component<ILoadingOrbProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <span className={`${css(STYLES.orb)} fa fa-spin fa-${this.props.icon} fa-${this.props.size}x`}/>
            {this.props.text}
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
    orb: {
        marginBottom: '10px'
    }
});