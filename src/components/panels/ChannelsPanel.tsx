import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';
import * as Enums from '../../utils/enums';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';

interface IChannelsPanelProps {
    style?: any;
}

@observer
export default class ChannelsPanel extends React.Component<IChannelsPanelProps, {}> {

    render(){
        let officialChannels: Array<string> = chatStore.officialChannels.sort(Enums.SORTING_METHOD_DATA[uiStore.channelsSortingMethod].sortingMethod);
        let unofficialChannels: Array<string> = chatStore.unofficialChannels.sort(Enums.SORTING_METHOD_DATA[uiStore.channelsSortingMethod].sortingMethod);

        return <div className={css(STYLES.main, this.props.style)}>
            <TitleBar style={STYLES.titleBar}>
                <span>Channels</span>
                <div>
                    <TitleBarButton 
                        title={Enums.SORTING_METHOD_DATA[uiStore.channelsSortingMethod].title} 
                        icon={Enums.SORTING_METHOD_DATA[uiStore.channelsSortingMethod].icon} 
                        onClick={ () => {
                            let index: number = uiStore.channelsSortingMethod;
                            index++;
                            if(index >= Enums.SORTING_METHOD_DATA.length) index = 0;
                            uiStore.channelsSortingMethod = Enums.SORTING_METHOD_DATA[index].enum;
                        } }/>
                    <TitleBarButton title="Refresh" icon="refresh" spinning={ chatStore.requestingChannels } onClick={ () => { chatStore.requestChannels() } }/>
                </div>
            </TitleBar>
            <div className={css(STYLES.rest)}>
                <div className={css(STYLES.header, STYLES.headerOfficial)}>
                    <span>Official</span>
                    <span>{officialChannels.length}</span>
                </div>
                <div>
                    {officialChannels.map(result => {
                        let channel: Types.Channel = chatStore.getChannel(result);
                        return <div className={css(STYLES.channel, STYLES.officialChannel)} key={result}>
                            <span>{channel.title}</span>
                            <span>{channel.characters == null ? channel.initialCharCount : channel.characters.length}</span>
                        </div>
                    })}
                </div>
                
                <div className={css(STYLES.header, STYLES.headerUnofficial)}>
                    <span>Unofficial</span>
                    <span>{unofficialChannels.length}</span>
                </div>
                <div>
                    {unofficialChannels.map(result => {
                        let channel: Types.Channel = chatStore.getChannel(result);
                        return <div className={css(STYLES.channel, STYLES.unofficialChannel)} key={result}>
                            <span>{channel.title}</span>
                            <span>{channel.characters == null ? channel.initialCharCount : channel.characters.length}</span>
                        </div>
                    })}
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
        justifyContent: 'space-between',
        fontWeight: 'bold',
        paddingLeft: '10px'
    },
    rest: {
        flex: '1 1 auto',
        overflowY: 'auto'
    },
    header: {
        padding: '5px 10px 5px 10px',
        fontWeight: 'bold',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between'        
    },
    headerOfficial: {
        color: '#f35118'
    },
    headerUnofficial: {
        color: '#aee141'
    },
    channel: {
        cursor: 'pointer',
        fontSize: '10pt',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 10px',
        color: '#1e1e1e'
    },
    officialChannel: {
        backgroundColor: '#bb3b2f',
        ':hover': {
            backgroundColor: '#f35118'
        },
        ':nth-child(even)': {
            backgroundColor: '#d05347',
            ':hover': {
                backgroundColor: '#f35118'
            },
        }
    },
    unofficialChannel: {
        backgroundColor: '#4c9447',
        ':hover': {
            backgroundColor: '#aee141'
        },
        ':nth-child(even)': {
            backgroundColor: '#66a662',
            ':hover': {
                backgroundColor: '#aee141'
            },
        }
    },
    openChannel: {
        backgroundColor: '#cd2f20',
        ':hover': {
            backgroundColor: '#e03e2f'
        },
        ':nth-child(even)': {
            backgroundColor: '#ee4434',
            ':hover': {
                backgroundColor: '#f45c4e'
            }
        }
    }
});