import * as React from 'react';

import { ipcRenderer, remote } from 'electron';
import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';
import * as Enums from '../../utils/enums';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';
import ToolBar from '../smart/ToolBar';
import ChannelArea from '../smart/ChannelArea';
import NoChannelArea from '../dumb/NoChannelArea';
import OpenList from '../smart/OpenList';
import ChannelsPanel from '../panels/ChannelsPanel';
import StatusPanel from '../panels/StatusPanel';

interface IMainPageProps {
    style?: any;
}

@observer
export default class MainPage extends React.Component<IMainPageProps, {}> {

    render(){
        let toolPanel: JSX.Element = null;
        switch(uiStore.currentTool){
            case Enums.Tool.Channels:
                toolPanel = <ChannelsPanel style={STYLES.panel} open={false} includePMS={false}/>
                break;
            case Enums.Tool.Status:
                toolPanel = <StatusPanel style={STYLES.panel}/>
                break;
        }

        let obj = null;
        if(uiStore.selectedIsPM){
            obj = chatStore.getCharacter(uiStore.selected);
        }
        else {
            obj = chatStore.getChannel(uiStore.selected);
        }

        return <div className={css(STYLES.main, this.props.style)}>
            {toolPanel}
            <ToolBar style={STYLES.toolBar}/>
            <div className={css(STYLES.rightSide)}>
                <TitleBar styles={[STYLES.titleBar]}>
                    <span>{uiStore.selected != null && (uiStore.selectedIsPM ? obj.name : obj.title)}</span>
                    <div className={css(STYLES.sysIcons)}>
                        <TitleBarButton icon="window-minimize" title="Minimize" onClick={() => { remote.getCurrentWindow().minimize() }}/>
                        <TitleBarButton icon={uiStore.maximized ? "window-restore" : "window-maximize"} title={uiStore.maximized ? "Restore" : "Maximize"} onClick={() => {
                            uiStore.maximized ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize()
                        }}/>
                        <TitleBarButton icon="window-close" title="Close" warning={true} onClick={ () => { remote.getCurrentWindow().close() }}/>
                    </div>
                </TitleBar>
                <div className={css(STYLES.mainArea)}>
                    {uiStore.selected != null ? <ChannelArea style={STYLES.channelArea}/> : <NoChannelArea style={STYLES.channelArea}/>}
                    <OpenList small={true}/>
                </div>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'row'
    },
    titleBar: {
        width: '100%',
        flex: '0 0 auto',
        justifyContent: 'space-between'
    },
    sysIcons: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    },
    mainBottom: {
        display: 'flex',
        flexFlow: 'row',
        flex: '1 1 auto'
    },
    toolBar: {
        flex: '0 1 auto'
    },
    panel: {
        flex: '0 1 auto',
        minWidth: '30%',
        width: '30%'
    },
    rightSide: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    mainArea: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'row'
    },
    openList: {
        flex: '0 1 auto'
    },
    channelArea: {
        flex: '1 1 auto'
    }
});