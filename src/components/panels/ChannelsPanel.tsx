import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';
import * as Enums from '../../utils/enums';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';
import {ListEntryChannel, ListEntryPM} from '../dumb/ListEntry';

interface IChannelsPanelProps {
    open: boolean;
    includePMS: boolean;
    style?: any;
}

@observer
export default class ChannelsPanel extends React.Component<IChannelsPanelProps, {}> {

    private createSection(title: string, channels: Array<string>, open: boolean): JSX.Element {
        return <div>
            <div className={css(STYLES.header)}>
                <span>{title}</span>
                <span>{channels.length}</span>
            </div>
            <div>
                {channels.map(result => {
                    let channel: Types.Channel = chatStore.getChannel(result);
                    let isOpen: boolean = chatStore.openChannels.indexOf(result) != -1;
                    
                    if((open && isOpen) || (!open && !isOpen)){
                        return <ListEntryChannel key={result} channel={channel} isOpen={isOpen}/>;
                    }
                })}
            </div>
        </div>;
    }

    private createPMSection(): JSX.Element {
        return <div>
            <div className={css(STYLES.header, STYLES.headerPM)}>
                <span>PMs</span>
                <span>{chatStore.openPMs.length}</span>
            </div>
            <div>
                {chatStore.openPMs.map(result => {
                    let character: Types.Character = chatStore.getCharacter(result);
                    return <ListEntryPM key={result} character={character}/>;
                })}
            </div>
        </div>;
    }

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <TitleBar styles={[STYLES.titleBar]}> 
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
                {this.createSection("Official Channels", chatStore.officialChannels.sort(Enums.getSortingFunc(uiStore.channelsSortingMethod)), this.props.open)}
                {this.createSection("Unofficial Channels", chatStore.unofficialChannels.sort(Enums.getSortingFunc(uiStore.channelsSortingMethod)), this.props.open)}
                {this.props.includePMS && this.createPMSection()}
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
        flex: '0 0 auto'        
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
    headerOpen: {
        color: '#e03e2f'
    },
    headerOfficial: {
        color: '#f35118'
    },
    headerUnofficial: {
        color: '#aee141'
    },
    headerPM: {
        color: '#34c0ee'
    },
    entry: {
        cursor: 'pointer',
        fontSize: '10pt',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 10px'
    },
    entryOfficial: {
        backgroundColor: '#302828',
        ':hover': {
            backgroundColor: '#b1674c'
        },
        ':nth-child(even)': {
            backgroundColor: '#473f3f',
            ':hover': {
                backgroundColor: '#b1674c'
            },
        }
    },
    entryUnofficial: {
        backgroundColor: '#45493e',
        ':hover': {
            backgroundColor: '#748a43'
        },
        ':nth-child(even)': {
            backgroundColor: '#2e3227',
            ':hover': {
                backgroundColor: '#748a43'
            },
        }
    },
    entryPM: {
        backgroundColor: '#3c4549',
        ':hover': {
            backgroundColor: '#46798a'
        },
        ':nth-child(even)': {
            backgroundColor: '#272f33',
            ':hover': {
                backgroundColor: '#46798a'
            },
        }
    },
    closeIcon: {
        
    }
});