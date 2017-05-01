import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import TitleBar from './TitleBar';
import ToolBar from './ToolBar';
import LoginBox from './LoginBox';
import LoadingOrb from './LoadingOrb';
import CharSelect from './CharSelect';
import Main from './Main';

@observer
export default class App extends React.Component<{}, {}> {

    render(){
        let content: JSX.Element = null;
        switch(uiStore.connectionState){
            case Enums.ConnectionState.login:
                content = <div className={css(STYLES.main)}>
                    <TitleBar style={STYLES.titleBar}/>
                    <LoginBox/>
                </div>;
                break;
            case Enums.ConnectionState.fetchingTicket:
            case Enums.ConnectionState.connecting:
                content = <div className={css(STYLES.main)}>
                    <TitleBar style={STYLES.titleBar}/>
                    <LoadingOrb icon="spinner" size={5} spin={true} text={uiStore.connectionInfo}/>
                </div>;
                break;
            case Enums.ConnectionState.charSelect:
                content = <div className={css(STYLES.main)}>
                    <TitleBar style={STYLES.titleBar}/>
                    <CharSelect/>
                </div>;
                break;
            case Enums.ConnectionState.connected:
                content = <Main/>
                break;
        }

        return content;
    }
}

const STYLES = StyleSheet.create({
    main: {
        backgroundColor: '#1e1e1e',
        color: '#cccccc',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    titleBar: {
        height: '34px',
        width: '100%',
        position: 'absolute',
        top: '0px'
    },
    mainArea: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'row',
        width: '100%'
    }
});