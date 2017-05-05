import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import { chatStore } from '../../stores';

interface IListEntryProps {
    styles?: any[];
    onClick?: any;
}

class ListEntry extends React.Component<IListEntryProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.styles)} onClick={this.props.onClick}>
            {this.props.children}
        </div>;
    }
}


interface IListEntryChannelProps {
    channel: Types.Channel;
    isOpen: boolean;
    style?: any;
}

export class ListEntryChannel extends React.Component<IListEntryChannelProps, {}> {

    render(){
        let styles: any[] = [this.props.style];
        styles.push(this.props.channel.official ? STYLES.official : STYLES.unofficial);
        if(!this.props.isOpen){
            styles.push(this.props.channel.official ? STYLES.officialClosed : STYLES.unofficialClosed);
            styles.push(STYLES.closed);
        }

        return <ListEntry styles={styles} onClick={() => { !this.props.isOpen && chatStore.joinChannel(this.props.channel.name) }}>
            <span>{this.props.channel.title}</span>
            <div>
                {this.props.channel.characters == null ? this.props.channel.initialCharCount : this.props.channel.characters.length}
                {this.props.isOpen && <span className={css(STYLES.closeIcon)}/>}
            </div>
        </ListEntry>;
    }
}


interface IListEntryPMProps {
    character: Types.Character;
    style?: any;
}

export class ListEntryPM extends React.Component<IListEntryPMProps, {}> {

    render(){
        return <ListEntry styles={[this.props.style, STYLES.pm]}>
            <span>{this.props.character.name}</span>
            <span className={css(STYLES.closeIcon)}/>
        </ListEntry>;
    }
}


const STYLES = StyleSheet.create({
    main: {        
        fontSize: '10pt',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 10px'
    },
    closed: {
        cursor: 'pointer'
    },
    closeIcon: {
        marginLeft: '10px'
    },
    official: {
        backgroundColor: '#302828',
        ':nth-child(even)': {
            backgroundColor: '#473f3f',
            
        }
    },
    officialClosed: {
        ':hover': {
            backgroundColor: '#b1674c'
        },
        ':nth-child(even)': {
            ':hover': {
                backgroundColor: '#b1674c'
            }
        }
    },
    unofficial: {
        backgroundColor: '#45493e',
        ':nth-child(even)': {
            backgroundColor: '#2e3227',
        }
    },
    unofficialClosed: {
        ':hover': {
            backgroundColor: '#748a43'
        },
        ':nth-child(even)': {
            ':hover': {
                backgroundColor: '#748a43'
            }
        }
    },  
    pm: {
        backgroundColor: '#3c4549',
        ':hover': {
            backgroundColor: '#46798a'
        },
        ':nth-child(even)': {
            backgroundColor: '#272f33',
            ':hover': {
                backgroundColor: '#46798a'
            }
        }
    }
});