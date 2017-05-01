import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore, userStore } from '../../stores';

import * as Enums from '../../utils/enums';

import DefaultTitleBar from '../smart/DefaultTitleBar';

interface ILoginPageProps {
    style?: any;
}

@observer
export default class LoginPage extends React.Component<ILoginPageProps, {}> {

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
            <DefaultTitleBar style={STYLES.titleBar}/>
            <div className={css(STYLES.rest)}>
                <img src="images/logo-large.png"/>
                <input ref={c => { this.inputUsername = c }} className={`${css(STYLES.input)} form-control`} type="text" placeholder="Username"/>
                <input ref={c => { this.inputPassword = c }} className={`${css(STYLES.input)} form-control`} type="password" placeholder="Password"/>
                <button className="btn btn-primary" onClick={this.login.bind(this)}>Login</button>
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
    }
});