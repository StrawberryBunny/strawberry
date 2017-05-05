import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';
import { remote } from 'electron';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';

interface IDefaultTitleBarProps {
    style?: any;
}

@observer
export default class DefaultTitleBar extends React.Component<IDefaultTitleBarProps, {}> {

    render(){
        let channel: Types.Channel = null;
        if(uiStore.selected != null){
            channel = chatStore.getChannel(uiStore.selected);
        }

        return <TitleBar styles={[this.props.style, STYLES.main]}>
            <div className={css(STYLES.icons)}>
                <TitleBarButton title="Minimize" icon="window-minimize" onClick={() => {
                    remote.getCurrentWindow().minimize();
                }}/>
                <TitleBarButton 
                    title={uiStore.maximized ? "Restore" : "Maximize"} 
                    icon={uiStore.maximized ? "window-restore" : "window-maximize"}
                    onClick={() => {
                        uiStore.maximized ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize();
                    }}/>
                <TitleBarButton title="Close" icon="window-close" warning={true} onClick={() => {
                    remote.getCurrentWindow().close();
                }}/>
            </div>
        </TitleBar>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        justifyContent: 'flex-end'
    },
    icons: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'center',        
    }
});