import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import * as Types from '../../utils/types';

import { chatStore, uiStore, userStore } from '../../stores';

import NamePlate from './NamePlate';

interface IUserListProps {
    channel: Types.Channel;
    style?: any;
}

@observer
export default class UserList extends React.Component<IUserListProps, {}> {

    render(){
        let characters = this.props.channel.characters.sort((a, b) => {
            let aIsOp: boolean = this.props.channel.opList.indexOf(a.name) != -1;
            let bIsOp: boolean = this.props.channel.opList.indexOf(b.name) != -1;
            if(aIsOp && !bIsOp) return -1;
            if(bIsOp && !aIsOp) return 1;

            let aIsFriend: boolean = userStore.friendsList.indexOf(a.name) != -1;
            let bIsFriend: boolean = userStore.friendsList.indexOf(b.name) != -1;
            if(aIsFriend && !bIsFriend) return -1;
            if(bIsFriend && !aIsFriend) return 1;

            let aIsBookmark: boolean = userStore.bookmarksList.indexOf(a.name) != -1;
            let bIsBookmark: boolean = userStore.bookmarksList.indexOf(b.name) != -1;
            if(aIsBookmark && !bIsBookmark) return -1;
            if(bIsBookmark && !aIsBookmark) return 1;

            if(a.name < b.name) return -1;
            if(b.name < a.name) return 1;
            return 0;
        });

        return <div className={css(STYLES.main, this.props.style)}>
            {characters.map((result, i) => {
                return <NamePlate key={i} styles={[STYLES.nameplate]} characterName={result.name} gender={result.gender} status={result.status} statusMessage={result.statusMessage}/>;
            })}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        backgroundColor: '#111111',
        padding: '5px',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    nameplate: {
        marginBottom: '5px'
    }
});