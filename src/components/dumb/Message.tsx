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
                title = <NamePlate character={this.props.message.character}/>;
                break;
            case Enums.MessageType.Broadcast:
                title = <span>Admin Broadcast</span>;
                break;
            case Enums.MessageType.Channel:
                title = <span>Description</span>;
                break;
        }

        return <div className={css(STYLES.main, this.props.style)}>
            {title}
            {this.props.message.message}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {

    }
});