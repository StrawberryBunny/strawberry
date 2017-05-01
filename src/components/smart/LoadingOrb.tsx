import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

interface ILoadingOrbProps {
    icon: string;
    size: number;
    text: string;
    spin?: boolean;
    style?: any;
}

@observer
export default class LoadingOrb extends React.Component<ILoadingOrbProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <span className={`${css(STYLES.orb)} fa ${this.props.spin && 'fa-spin'} fa-${this.props.icon} fa-${this.props.size}x`}/>
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