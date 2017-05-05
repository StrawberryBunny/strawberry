import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import * as Types from '../../utils/types';

interface IOpenListEntryProps {
    small: boolean;
    channel?: Types.Channel;
    character?: Types.Character;
    style?: any;
}

export default class OpenListEntry extends React.Component<IOpenListEntryProps, {}> {

    render(){
        let content: JSX.Element = null;
        let bigContent: JSX.Element = null;
        let title: string = null;

        if(this.props.channel != null){
            content = <span className={`fa ${this.props.channel.official ? 'fa-th' : 'fa-key'} ${css(STYLES.icon)}`}/>;
            bigContent = <span>{this.props.channel.title}</span>;
            title = this.props.channel.title;
        }
        else if(this.props.character != null){
            content = <img className={css(STYLES.icon)} src={`https://static.f-list.net/images/avatar/${encodeURI(this.props.character.name.toLowerCase())}.png`}/>;
            bigContent = <span>{this.props.character.name}</span>;
            title = this.props.character.name;
        }
        else {
            content = <span>Error</span>;
        }

        return <div className={css(STYLES.main, this.props.style)} title={title} alt={title}>
            {content}
            {!this.props.small && bigContent}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        fontSize: '14pt',
        cursor: 'pointer',
        ':hover': {
            color: '#ffffff'
        },
        ':active': {
            color: '#0F0F0F'
        }
    },
    selected: {
        backgroundColor: '#1e1e1e'
    },
    icon: {
        padding: '10px'
    }
});