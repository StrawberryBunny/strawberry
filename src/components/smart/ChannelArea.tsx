import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';

import MessageArea from './MessageArea';

interface IChannelAreaProps {
    style?: any;
}

@observer
export default class ChannelArea extends React.Component<IChannelAreaProps, {}> {

    render(){
        let content: JSX.Element = null;
        if(uiStore.selectedChannel == null){
            content = <img className={css(STYLES.noimage)} src="images/logo-large.png"/>;
        }
        else {
            content = <MessageArea channel={uiStore.selectedChannel}/>;
        }
        return <div className={css(STYLES.main, this.props.style)}>
            {content}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noimage: {
        opacity: 0.1
    }
});