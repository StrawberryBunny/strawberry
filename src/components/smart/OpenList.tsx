import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import OpenListEntrySmall from '../dumb/OpenListEntrySmall';

interface IOpenListProps {
    small: boolean;
    style?: any;
}

@observer
export default class OpenList extends React.Component<IOpenListProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style, this.props.small ? STYLES.mainSmall : STYLES.mainLarge)}>
            {chatStore.openChannels.map(result => {
                return <OpenListEntrySmall key={result} character={false} name={result} style={STYLES.entry} selected={false}/>;
            })}
            {chatStore.openPMs.map(result => {
                return <OpenListEntrySmall key={result} character={true} name={result} style={STYLES.entry} selected={false}/>;
            })}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        backgroundColor: '#252526'
    },
    mainSmall: {
        
    },
    mainLarge: {

    },
    entry: {

    }
});