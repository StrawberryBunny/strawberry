import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

interface INamePlateProps {
    styles?: any[];
    character: string;
    action?: boolean;
}

@observer
export default class NamePlate extends React.Component<INamePlateProps, {}> {

    render(){
        let character: Types.Character = chatStore.getCharacter(this.props.character);
        let genderStyle = Enums.GENDER_DATA[character.gender].style;
        let statusStr: string = Enums.STATUS_DATA[character.status];
        
        return <div className={css(STYLES.main, this.props.styles, genderStyle, this.props.action && STYLES.action)}>
            <img className={css(STYLES.status)} src={`images/status/status-small-${statusStr}.png`} title={statusStr} alt={statusStr}/>
            <span title={character.statusMessage} alt={character.statusMessage}>{character.name}</span>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    },
    status: {
        marginRight: '3px'
    },
    action: {
        fontStyle: 'italic'
    }
});