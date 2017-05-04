import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { chatStore } from '../../stores';

import * as Types from '../../utils/types';

interface IOpenChannelItemProps {
    channel: string;
    style?: any;
}

export default class OpenChannelItem extends React.Component<IOpenChannelItemProps, {}> {

    render(){
        let channel: Types.Channel = chatStore.getChannel(this.props.channel);
        return <div className={css(STYLES.main)}>
            <span>{channel.title}</span>
            <span className="fa fa-close"/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        cursor: 'pointer',
        fontSize: '10pt',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 10px',
        color: '#1e1e1e',
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
    }
});