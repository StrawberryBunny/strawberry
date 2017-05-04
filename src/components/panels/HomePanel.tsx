import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { chatStore } from '../../stores';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';
import OpenChannelItem from '../dumb/OpenChannelItem';

interface IHomePanelProps {
    style?: any;
}

export default class HomePanel extends React.Component<IHomePanelProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <TitleBar styles={[STYLES.titleBar]}>
                <span>Home</span>
            </TitleBar>
            <div className={css(STYLES.rest)}>
                <div className={css(STYLES.header)}>Open Channels</div>
                <div className={css(STYLES.channels)}>
                    {chatStore.openChannels.map(result => {
                        return <OpenChannelItem key={result} style={STYLES.channelItem} channel={result}/>
                    })}
                </div>

                <div className={css(STYLES.header)}>Open PMs</div>
                <div className={css(STYLES.channels)}>
                    
                </div>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    titleBar: {
        flex: '0 0 auto',
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        paddingLeft: '10px'
    },
    rest: {
        flex: '1 1 auto'
    },
    header: {
        padding: '5px 10px 5px 10px',
        fontWeight: 'bold',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        color: '#e03e2f'
    },
    channels: {
        display: 'flex',
        flexFlow: 'column'
    },
    channelItem: {
        
    }
});