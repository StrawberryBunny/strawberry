import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import DefaultTitleBar from './DefaultTitleBar';
import LoginPage from '../pages/LoginPage';
import LoadingPage from '../pages/LoadingPage';
import CharSelectPage from '../pages/CharSelectPage';
import MainPage from '../pages/MainPage';

@observer
export default class App extends React.Component<{}, {}> {

    componentWillMount(){
        ipcRenderer.on('maximize', () => {
            uiStore.maximized = true;
        });
        ipcRenderer.on('unmaximize', () => {
            uiStore.maximized = false;
        });
    }

    render(){
        let titleBar: JSX.Element = null;

        let content: JSX.Element = null;
        switch(uiStore.connectionState){
            case Enums.ConnectionState.login:
                titleBar = <DefaultTitleBar style={STYLES.defaultTitleBar}/>;
                content = <LoginPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.fetchingTicket:
            case Enums.ConnectionState.connecting:
                titleBar = <DefaultTitleBar style={STYLES.defaultTitleBar}/>;
                content = <LoadingPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.charSelect:
                titleBar = <DefaultTitleBar style={STYLES.defaultTitleBar}/>;
                content = <CharSelectPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.connected:
                content = <MainPage style={STYLES.content}/>
                break;
        }

        return <div className={css(STYLES.main)}>
            {titleBar}
            {content}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#cccccc',
        display: 'flex',
        flexFlow: 'column'
    },
    withTitleBar: {
        display: 'flex',
        flexFlow: 'column'
    },
    defaultTitleBar: {
        flex: '0 0 auto'
    },
    content: {
        flex: '1 1 auto'
    }
});