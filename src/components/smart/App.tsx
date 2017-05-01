import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import LoginPage from '../pages/LoginPage';
import LoadingPage from '../pages/LoadingPage';
import CharSelectPage from '../pages/CharSelectPage';
import MainPage from '../pages/MainPage';

@observer
export default class App extends React.Component<{}, {}> {

    render(){

        let content: JSX.Element = null;
        switch(uiStore.connectionState){
            case Enums.ConnectionState.login:
                content = <LoginPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.fetchingTicket:
            case Enums.ConnectionState.connecting:
                content = <LoadingPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.charSelect:
                content = <CharSelectPage style={STYLES.content}/>;
                break;
            case Enums.ConnectionState.connected:
                content = <MainPage style={STYLES.content}/>
                break;
        }

        return <div className={css(STYLES.main)}>{content}</div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#cccccc',
        display: 'flex'     
    },
    content: {
        flex: '1 1 auto'
    }
});