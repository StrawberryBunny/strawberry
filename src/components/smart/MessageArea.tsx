import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import Message from '../dumb/Message';

interface IMessageArea {
    channel: string;
    style?: any;
}

@observer
export default class MessageArea extends React.Component<IMessageArea, {}> {

    render(){
        let channel: Types.Channel = chatStore.getChannel(this.props.channel);
        return <div className={css(STYLES.main, this.props.style)}>
            {channel.messages != null && channel.messages.map((result, i) => {
                return <Message key={i} message={result}/>;
            })}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        
    }
});