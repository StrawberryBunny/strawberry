import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

interface INamePlateProps {
    styles?: any[];
    action?: boolean;
    characterName: string;
    gender: Enums.Gender;
    status: Enums.Status;
    statusMessage: string;
}

export default class NamePlate extends React.Component<INamePlateProps, {}> {

    render(){
        let genderStyle = Enums.GENDER_DATA[this.props.gender].style;
        let statusStr: string = Enums.STATUS_DATA[this.props.status];
        
        return <div className={css(STYLES.main, this.props.styles, genderStyle, this.props.action && STYLES.action)}>
            <img className={css(STYLES.status)} src={`images/status/status-small-${statusStr}.png`} title={statusStr} alt={statusStr}/>
            <span title={this.props.statusMessage} alt={this.props.statusMessage}>{this.props.characterName}</span>
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