import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore, uiStore } from '../../stores';

import * as Types from '../../utils/types';

import OpenListEntry from '../dumb/OpenListEntry';
import ToolBarButton from '../dumb/ToolBarButton';

interface IOpenListProps {
    small: boolean;
    style?: any;
}

@observer
export default class OpenList extends React.Component<IOpenListProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            {chatStore.openChannels.map(result => {
                let channel: Types.Channel = chatStore.getChannel(result);
                return <ToolBarButton key={result} icon={channel.official ? 'th' : 'key'} selected={!uiStore.selectedIsPM && uiStore.selected == channel.name} title={channel.title}
                    onClick={() => { 
                        uiStore.selectedIsPM = false;
                        uiStore.selected = channel.name;
                    }}/>;
            })}
            {chatStore.openPMs.map(result => {
                let character: Types.Character = chatStore.getCharacter(result);
                return <ToolBarButton key={result} image={character.name} selected={uiStore.selectedIsPM && uiStore.selected == character.name} title={character.name} 
                    onClick={() => {
                        uiStore.selectedIsPM = true;
                        uiStore.selected = character.name;
                    }}/>;
            })}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        backgroundColor: '#252526',
        fontSize: '14pt'
    }
});