import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { userStore, uiStore, chatStore } from '../../stores';

import * as Enums from '../../utils/enums';

import DefaultTitleBar from '../smart/DefaultTitleBar';

interface ICharSelectPageProps {
    style?: any;
}

@observer
export default class CharSelectPage extends React.Component<ICharSelectPageProps, {}> {

    private image: HTMLImageElement;
    private select: HTMLSelectElement;

    private selectChanged(): void {
        this.image.src = `https://static.f-list.net/images/avatar/${encodeURI(this.select.value.toLowerCase())}.png`;
    }

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <DefaultTitleBar style={STYLES.titleBar}/>
            <div className={css(STYLES.rest)}>
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
            </div>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
    },
    titleBar: {
        width: '100%'
    },
    rest: {
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginBottom: '10px',
        width: '100px',
        height: '100px'
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