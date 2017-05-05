import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';

import MessageArea from './MessageArea';

interface IChannelAreaProps {
    style?: any;
}

@observer
export default class ChannelArea extends React.Component<IChannelAreaProps, {}> {

    private textArea: HTMLTextAreaElement;    

    private onChangeFunction(event){
        let channel: Types.Channel = chatStore.getChannel(uiStore.selected);
        channel.currentMessage = event.target.value;
    }

    render(){
        let channel: Types.Channel = chatStore.getChannel(uiStore.selected);
        
        return <div className={css(STYLES.main, this.props.style)}>
            <MessageArea channel={uiStore.selected} style={STYLES.messageArea}/>
            <div className={css(STYLES.textAndButton)}>
                <textarea ref={c => { this.textArea = c; }} 
                    className={`form-control ${css(STYLES.textArea)}`} 
                    maxLength={chatStore.chatMax}
                    value={ channel.currentMessage }
                    onChange={this.onChangeFunction.bind(this)}/>
                <button className={`btn ${css(STYLES.button)}`} onClick={() => {
                    if(this.textArea.value.length > 0){
                        chatStore.sendMessage(uiStore.selected, this.textArea.value);
                        this.textArea.value = "";
                    }
                }}>Send</button>
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column',
        padding: '5px'
    },
    messageArea: {
        flex: '1 1 auto'
    },
    textAndButton: {
        flex: '0 0 auto',
        height: '15%',
        minHeight: '180px',
        display: 'flex',
        flexFlow: 'row'
    },
    textArea: {        
        resize: 'none',
        flex: '1 1 auto'
    },
    button: {
        flex: '0 0 auto',
        width: '20%',
        minWidth: '80px',
        maxWidth: '180px',
        marginLeft: '5px'
    }
});