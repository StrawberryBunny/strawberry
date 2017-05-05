import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import Message from '../dumb/Message';

interface IMessageArea {
    channel: string;
    pm: boolean;
    style?: any;
}

@observer
export default class MessageArea extends React.Component<IMessageArea, {}> {

    render(){
        let obj = null;
        if(this.props.pm){
            obj = chatStore.getCharacter(this.props.channel);
        }
        else {
            obj = chatStore.getChannel(this.props.channel);
        }

        return <div className={css(STYLES.main, this.props.style)}>
            {obj.messages != null && obj.messages.map((result, i) => {
                return <Message key={i} message={result}/>;
            })}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        overflowY: 'auto'
    }
});