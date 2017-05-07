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

    private mainDiv: HTMLDivElement = null;
    private shouldScroll: boolean;

    private scroll(event){
        let obj = null;
        if(this.props.pm){
            obj = chatStore.getCharacter(this.props.channel);
        }
        else {
            obj = chatStore.getChannel(this.props.channel);
        }

        let scrollTop: number = event.target.scrollTop;
        let scrollHeight: number = event.target.scrollHeight;
        let offsetHeight: number = event.target.offsetHeight;
        let atBottom: boolean = offsetHeight >= scrollHeight - scrollTop;

        //console.log("scrollTop: "+ scrollTop + ", scrollHeight: " + scrollHeight + ", offsetHeight: "+  offsetHeight + ", atBottom: " + atBottom);

        obj.scrollState = event.target.scrollTop;
    }

    componentDidMount(){
        this.mainDiv.scrollTop = this.mainDiv.scrollHeight;
        this.shouldScroll = false;
    }

    componentDidUpdate(){
        if(this.shouldScroll){
            this.mainDiv.scrollTop = this.mainDiv.scrollHeight;
            this.shouldScroll = false;
        }
    }

    componentWillUpdate(nextProps){
        this.shouldScroll = this.mainDiv.scrollTop + this.mainDiv.offsetHeight === this.mainDiv.scrollHeight;
    }

    render(){
        let obj = null;
        if(this.props.pm){
            obj = chatStore.getCharacter(this.props.channel);
        }
        else {
            obj = chatStore.getChannel(this.props.channel);
        }
        
        return <div ref={c => { this.mainDiv = c }}className={css(STYLES.main, this.props.style)} onScroll={this.scroll.bind(this)}>
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