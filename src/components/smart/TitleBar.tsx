import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { ipcRenderer, remote } from 'electron';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

interface ITitleBarProps {
    style?: any;
}

@observer
export default class TitleBar extends React.Component<ITitleBarProps, {}> {

    componentDidMount(){
        ipcRenderer.on('maximize', () => {
            uiStore.maximized = true;
        });
        ipcRenderer.on('unmaximize', () => {
            uiStore.maximized = false;
        });
    }

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <span className={`${css(STYLES.allIcons, STYLES.icon)} fa fa-window-minimize`}
                title="Minimize" alt="Minimize"
                onClick={() => { remote.getCurrentWindow().minimize() }}/>
            <span className={`${css(STYLES.allIcons, STYLES.icon)} fa ${uiStore.maximized ? 'fa-window-restore' : 'fa-window-maximize'}`}
                title={uiStore.maximized ? "Restore" : "Maximize"} alt={uiStore.maximized ? "Restore" : "Maximize"}
                onClick={() => { uiStore.maximized ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize() }}/>
            <span className={`${css(STYLES.allIcons, STYLES.closeIcon)} fa fa-window-close`}
                title="Close" alt="Close"
                onClick={() => { remote.getCurrentWindow().close() }}/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        '-webkit-app-region': 'drag',
        backgroundColor: '#252526',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: '15pt',
        padding: '5px',        
        paddingRight: '5px'
    },
    allIcons: {
        '-webkit-app-region': 'no-drag',
        cursor: 'pointer',
        color: '#414141',
        ':active': {
            color: '#0F0F0F'
        },
        marginLeft: '5px'
    },
    icon: {
        ':hover': {
            color: '#505050'
        }        
    },
    closeIcon: {
        ':hover': {
            color: '#CC2200'
        }
    }
});