import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { chatStore } from '../../stores';

import * as Types from '../../utils/types';

interface IOpenListEntrySmallProps {
    style?: any;
    name: string;
    character: boolean;
    selected: boolean;
}

export default class OpenListEntrySmall extends React.Component<IOpenListEntrySmallProps, {}> {

    render(){
        let content: JSX.Element = null;
        if(this.props.character){
            let character: Types.Character = chatStore.getCharacter(this.props.name);
            content = <img className={`img-rounded ${css(STYLES.avatar)}`} 
                src={`https://static.f-list.net/images/avatar/${encodeURI(character.name.toLowerCase())}.png`}
                title={character.name}
                alt={character.name}/>;
        }
        else {
            let channel: Types.Channel = chatStore.getChannel(this.props.name);
            content = <span className={`fa fa-${channel.official ? 'th' : 'key'} ${css(STYLES.icon)}`} title={channel.title} alt={channel.title}/>;
        }

        return <div className={css(STYLES.main)}>{content}</div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
            color: '#505050'
        },
        ':active': {
            color: '#0F0F0F'
        },
        fontSize: '14pt'
    },
    selected: {
        backgroundColor: '#1e1e1e'
    },
    avatar: {
        width: '32px',
        height: '32px'
    },
    icon: {
        padding: '10px'
    }
});