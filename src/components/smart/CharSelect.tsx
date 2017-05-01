import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { userStore, uiStore, chatStore } from '../../stores';

import * as Enums from '../../utils/enums';

@observer
export default class CharSelect extends React.Component<{}, {}> {

    private image: HTMLImageElement;
    private select: HTMLSelectElement;

    private selectChanged(): void {
        this.image.src = `https://static.f-list.net/images/avatar/${encodeURI(this.select.value.toLowerCase())}.png`;
    }

    render(){
        return <div className={css(STYLES.main)}>
            <img ref={c => { this.image = c }} className={`${css(STYLES.image)} img-rounded`} src={`https://static.f-list.net/images/avatar/${encodeURI(userStore.ticket.default_character.toLowerCase())}.png`}/>
            <select ref={c => { this.select = c }} className={`${css(STYLES.select)} form-control`} onChange={this.selectChanged.bind(this)} defaultValue={userStore.ticket.default_character}>
                {userStore.ticket.characters.map((result, i) => {
                    return <option key={i}>{result}</option>
                })}
            </select>
            <div className={css(STYLES.buttons)}>
                <button className="btn btn-secondary" onClick={() => { uiStore.connectionState = Enums.ConnectionState.login; }}>Back</button>
                <button className="btn btn-primary" onClick={() => { uiStore.connectionError = null; chatStore.connect(this.select.value); }}>Connect</button>
            </div>
            <span className={css(STYLES.error)}>{uiStore.connectionError}</span>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
    },
    image: {
        marginBottom: '10px'
    },
    select: {
        marginBottom: '10px'
    },
    buttons: {
        display: 'flex',
        flexFlox: 'row',
        justifyContent: 'space-between'
    },
    error: {
        fontWeight: 'bold',
        color: '#CC2200',
        position: 'absolute',
        bottom: '3px',
        width: '100%',
        textAlign: 'center'
    }
});