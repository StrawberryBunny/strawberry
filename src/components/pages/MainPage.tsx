import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import ToolBar from '../smart/ToolBar';
import ChannelArea from '../smart/ChannelArea';
import HomePanel from '../panels/HomePanel';
import DefaultTitleBar from '../smart/DefaultTitleBar';

interface IMainPageProps {
    style?: any;
}

@observer
export default class MainPage extends React.Component<IMainPageProps, {}> {

    render(){
        let toolPanel: JSX.Element = null;
        switch(uiStore.currentTool){
            case Enums.Tool.Home:
                toolPanel = <HomePanel style={STYLES.panel}/>;
                break;
        }

        return <div className={css(STYLES.main, this.props.style)}>
            {toolPanel}
            <ToolBar style={STYLES.toolBar}/>
            <div className={css(STYLES.rightSide)}>
                <DefaultTitleBar style={STYLES.titleBar}/>
                <ChannelArea style={STYLES.channelArea}/>
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
        width: '100%'
    },
    toolBar: {
        flex: '0 1 auto'
    },
    rightSide: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    channelArea: {
        flex: '1 1 auto'
    },
    panel: {
        flex: '0 1 auto',
        width: '30%'
    }
});