import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import ToolBar from './ToolBar';
import TitleBar from './TitleBar';
import ChannelArea from './ChannelArea';
import HomePanel from '../panels/HomePanel';

@observer
export default class Main extends React.Component<{}, {}> {

    render(){
        let toolPanel: JSX.Element = null;
        switch(uiStore.currentTool){
            case Enums.Tool.Home:
                toolPanel = <HomePanel style={STYLES.panel}/>;
                break;
        }

        return <div className={css(STYLES.main)}>
            {toolPanel}
            <ToolBar style={STYLES.toolBar}/>
            <div className={css(STYLES.rightSide)}>
                <TitleBar style={STYLES.titleBar}/>
                <ChannelArea style={STYLES.channelArea}/>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexFlow: 'row'
    },
    toolBar: {
        flex: '0 1 auto'
    },
    rightSide: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    titleBar: {
        flex: '0 1 auto',
        height: '34px'
    },
    channelArea: {
        flex: '1 1 auto'
    },
    panel: {
        flex: '0 1 auto',
        width: '30%'
    }
});