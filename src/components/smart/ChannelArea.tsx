import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, chatStore } from '../../stores';

import * as Types from '../../utils/types';

import MessageArea from './MessageArea';
import UserList from './UserList';

interface IChannelAreaProps {
    style?: any;
}

@observer
export default class ChannelArea extends React.Component<IChannelAreaProps, {}> {

    private textArea: HTMLTextAreaElement;    

    private onChangeFunction(event){
        let obj = null;
        if(uiStore.selectedIsPM){
            obj = chatStore.getCharacter(uiStore.selected);
        }
        else {
            obj = chatStore.getChannel(uiStore.selected);
        }

        obj.currentMessage = event.target.value;
    }

    private onKeyPress(event){
        let obj = null;
        if(uiStore.selectedIsPM){
            obj = chatStore.getCharacter(uiStore.selected);
        }
        else {
            obj = chatStore.getChannel(uiStore.selected);
        }

        if(event.keyCode == 13 && !event.shiftKey){
            this.sendMessage(obj);
            event.preventDefault();
        }
    }

    private sendMessage(obj){
        if(uiStore.selectedIsPM){
            chatStore.sendPrivateMessage(uiStore.selected, this.textArea.value);
        }
        else {
            chatStore.sendMessage(uiStore.selected, this.textArea.value);
        }
        this.textArea.value = "";
        obj.currentMessage = "";
    }

    render(){
        let obj = null;
        if(uiStore.selectedIsPM){
            obj = chatStore.getCharacter(uiStore.selected);
        }
        else {
            obj = chatStore.getChannel(uiStore.selected);
        }
        
        return <div className={css(STYLES.main, this.props.style)}>
            <div className={css(STYLES.messageUserList)}>
                <MessageArea channel={uiStore.selected} pm={uiStore.selectedIsPM} style={STYLES.messageArea}/>
                {!uiStore.selectedIsPM && <UserList style={STYLES.userList} channel={obj}/>}
            </div>
            <div className={css(STYLES.textAndButton)}>
                <textarea ref={c => { this.textArea = c; }} 
                    className={`form-control ${css(STYLES.textArea)}`} 
                    maxLength={chatStore.chatMax}
                    value={ obj.currentMessage }
                    onChange={this.onChangeFunction.bind(this)}
                    onKeyDown={this.onKeyPress.bind(this)}/>
                <button className={`btn ${css(STYLES.button)}`} onClick={() => {
                    if(this.textArea.value.length > 0){
                        this.sendMessage(obj);
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
        flexFlow: 'column'
    },
    messageUserList: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'row'
    },
    messageArea: {
        flex: '1 1 auto'
    },    
    userList: {
        flex: '0 0 auto',
        width: '20%',
        minWidth: '80px',
        maxWidth: '180px',
        marginLeft: '5px'
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