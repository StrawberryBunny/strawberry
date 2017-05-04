import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { chatStore } from '../../stores';

import * as Enums from '../../utils/enums';
import * as Types from '../../utils/types';

interface INamePlateProps {
    style?: any;
    character: string;
}

@observer
export default class NamePlate extends React.Component<INamePlateProps, {}> {

    render(){
        let character: Types.Character = chatStore.getCharacter(this.props.character);
        let color: string = Enums.GENDER_DATA[character.gender].color;
        let genderStyle = StyleSheet.create({
            main: {
                color: Enums.GENDER_DATA[character.gender].color
            }
        });
        return <span className={css(STYLES.main, this.props.style, genderStyle.main)}>
            <img src={`images/status/status-small-${Enums.STATUS_DATA[character.status]}.png`}/>
            {character.name}
        </span>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    }
});