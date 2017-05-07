import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import { chatStore } from '../../stores';
import { bbcode } from '../../utils/bbcode';

import NamePlate from '../smart/NamePlate';

interface IMessageProps {
    style?: any;
    message: Types.IMessage;
}

export default class Message extends React.Component<IMessageProps, {}> {
    
    render(){
        let msg: string = this.props.message.message;
        let isAction: boolean = msg.substr(0, 3) == '/me';
        let isOwned: boolean = msg.charAt(3) == "'";

        if(isAction){
            msg = "[i]" + msg.substr(3) + "[/i]";
        }
        else {
            msg = ": " + msg;
        }

        let title: JSX.Element = null;
        switch(this.props.message.type){
            case Enums.MessageType.Character:
            case Enums.MessageType.Private:
                title = <NamePlate styles={[STYLES.title, ((isAction && !isOwned) && STYLES.action)]} action={isAction} characterName={this.props.message.character.name}
                    gender={this.props.message.character.gender} status={this.props.message.character.status} statusMessage={this.props.message.character.statusMessage}/>;
                break;
            case Enums.MessageType.Broadcast:
                title = <div className={css(STYLES.title)}>Admin Broadcast</div>;
                break;
            case Enums.MessageType.Channel:
                title = <div className={css(STYLES.title)}>Description</div>;
                break;
        }

        return <div className={css(STYLES.main, this.props.style, chatStore.ignoredCharacters.indexOf(this.props.message.character.name.toLowerCase()) != -1 && STYLES.ignored)}>
            {title}
            <div className={css(STYLES.text)}>
                {bbcode.parse(msg)}
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        padding: '5px',
        backgroundColor: '#2A2A2A',
        margin: '5px',
        whiteSpace: 'pre-wrap'
    },
    title: {
        flex: '0 0 auto',
        float: 'left'
    },
    text: {
        flex: '1 1 auto'
    },
    action: {
        marginRight: '3px'
    },
    ignored: {
        display: 'none'
    }
});