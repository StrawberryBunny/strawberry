import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import NamePlate from '../smart/NamePlate';

interface IMessageProps {
    style?: any;
    message: Types.IMessage;
}

export default class Message extends React.Component<IMessageProps, {}> {
    
    render(){
        let title: JSX.Element = null;
        switch(this.props.message.type){
            case Enums.MessageType.Character:
                title = <NamePlate style={STYLES.title} character={this.props.message.character}/>;
                break;
            case Enums.MessageType.Broadcast:
                title = <div className={css(STYLES.title)}>Admin Broadcast</div>;
                break;
            case Enums.MessageType.Channel:
                title = <div className={css(STYLES.title)}>Description</div>;
                break;
        }

        return <div className={css(STYLES.main, this.props.style)}>
            {title}
            <div className={css(STYLES.text)}>{": " + this.props.message.message}</div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        padding: '5px',
        backgroundColor: '#2A2A2A'
    },
    title: {
        flex: '0 0 auto',
        float: 'left'
    },
    text: {
        flex: '1 1 auto'
    }
});