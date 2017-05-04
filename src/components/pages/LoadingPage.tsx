import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import LoadingOrb from '../dumb/LoadingOrb';

interface ILoadingPageProps {
    style?: any;
}

@observer
export default class LoadingPage extends React.Component<ILoadingPageProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <div className={css(STYLES.rest)}>
                <LoadingOrb icon="spinner" size={4} text={uiStore.connectionInfo}/>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
    },
    titleBar: {
        width: '100%'
    },
    rest: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});