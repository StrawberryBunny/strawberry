import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, userStore } from '../../stores';

import * as Enums from '../../utils/enums';

interface ILoginBoxProps {
    style?: any;
}

@observer
export default class LoginBox extends React.Component<ILoginBoxProps, {}> {

    private inputUsername: HTMLInputElement;
    private inputPassword: HTMLInputElement;

    private login(){
        uiStore.connectionError = "";
        if(this.inputUsername.value.length > 0 && this.inputPassword.value.length > 0){
            userStore.fetchTicket(this.inputUsername.value, this.inputPassword.value);
        }   
        else {
            uiStore.connectionError = "You must enter a username & password.";
        } 
    }

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <img src="images/logo-large.png"/>
            <input ref={c => { this.inputUsername = c }} className={`${css(STYLES.input)} form-control`} type="text" placeholder="Username"/>
            <input ref={c => { this.inputPassword = c }} className={`${css(STYLES.input)} form-control`} type="password" placeholder="Password"/>
            <button className="btn btn-primary" onClick={this.login.bind(this)}>Login</button>
            <span className={css(STYLES.error)}>{uiStore.connectionError}</span>
            <span className={`${css(STYLES.debug)} fa fa-user-secret`} onClick={ () => {uiStore.connectionState = Enums.ConnectionState.connected}}/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
    },
    input: {
        marginBottom: '5px'
    },
    error: {
        fontWeight: 'bold',
        color: '#CC2200',
        position: 'absolute',
        bottom: '3px',
        width: '100%',
        textAlign: 'center'
    },
    debug: {
        position: 'absolute',
        bottom: '2px',
        right: '4px'
    }
});