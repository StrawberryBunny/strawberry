import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { observer } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';

import { uiStore } from '../../stores';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';

interface IDefaultTitleBarProps {
    style?: any;
}

@observer
export default class DefaultTitleBar extends React.Component<IDefaultTitleBarProps, {}> {
        
    componentWillMount(){
        ipcRenderer.on('maximize', () => {
            uiStore.maximized = true;
        });
        ipcRenderer.on('unmaximize', () => {
            uiStore.maximized = false;
        });
    }

    render(){
        return <TitleBar style={this.props.style}>
            <TitleBarButton
                icon="window-minimize"
                title="Minimize"
                onClick={ () => { remote.getCurrentWindow().minimize() } }/>
            <TitleBarButton 
                icon={uiStore.maximized ? "window-restore" : "window-maximize"}
                title={uiStore.maximized ? "Restore" : "Maximize"}
                onClick={ () => { uiStore.maximized ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize() } }/>
            <TitleBarButton 
                icon="window-close"
                title="Close"
                onClick={ () => { remote.getCurrentWindow().close() } }/>
        </TitleBar>;
    }
}