import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

import TitleBar from '../dumb/TitleBar';
import TitleBarButton from '../dumb/TitleBarButton';
import Avatar from '../dumb/Avatar';

interface IStatusPanelProps {
    style?: any;
}

@observer
export default class StatusPanel extends React.Component<IStatusPanelProps, {}> {

    private selectStatus: HTMLSelectElement;
    private textAreaMessage: HTMLTextAreaElement;
    
    render(){
        let userChar: Types.Character = chatStore.getUserCharacter();
        return <div className={css(STYLES.main, this.props.style)}>
            <TitleBar styles={[STYLES.titleBar]}>
                <span>Status</span>
                <div>
                    <TitleBarButton title="Reset" icon="eraser" onClick={ () => { 
                        console.log("Setting status to: " + Enums.STATUS_DATA[userChar.status]);
                        this.selectStatus.value = Enums.STATUS_DATA[userChar.status];
                        this.textAreaMessage.value = userChar.statusMessage;
                    } }/>
                    <TitleBarButton title="Update" 
                        icon={chatStore.requestingChannels ? "spinner" : "check" } 
                        spinning={chatStore.requestingStatusUpdate} onClick={ () => { 
                            if(!chatStore.requestingStatusUpdate){
                                chatStore.sendStatusUpdate(this.selectStatus.value, this.textAreaMessage.value);
                            }
                        }}
                    />
                </div>
            </TitleBar>
            <div className={css(STYLES.rest)}>
                <Avatar character={chatStore.userCharacter} style={STYLES.avatar}/>
                <select ref={ c => { this.selectStatus = c }} 
                    className={`form-control ${css(STYLES.select)}`}
                    defaultValue={ userChar.status.toString() }>
                    <option value="online">Online</option>
                    <option value="looking">Looking</option>
                    <option value="away">Away</option>
                    <option value="busy">Busy</option>
                    <option value="dnd">DnD</option>
                </select>
                <textarea ref={ c => { this.textAreaMessage = c }} 
                    className={`form-control ${css(STYLES.textArea)}`} 
                    defaultValue={ userChar.statusMessage }/>
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
    titleBar: {
        flex: '0 0 auto',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        paddingLeft: '10px'
    },
    rest: {
        flex: '1 1 auto',
        padding: '10px',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avatar: {
        marginBottom: '10px',
        flex: '0 0 auto'
    },
    select: {
        maxWidth: '480px',
        marginBottom: '10px',
        flex: '0 0 auto'
    },
    textArea: {
        maxWidth: '480px',
        maxHeight: '480px',
        resize: 'none',
        flex: '1 1 auto'
    }
});