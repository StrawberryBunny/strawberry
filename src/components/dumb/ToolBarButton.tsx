import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface IToolBarButtonProps {
    title: string;
    selected: boolean;
    icon?: string;
    image?: string;
    onClick?: any;
    style?: any;
}

export default class ToolBarButton extends React.Component<IToolBarButtonProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style, this.props.selected && STYLES.selected)} title={this.props.title} alt={this.props.title} onClick={this.props.onClick}>
            {this.props.icon ? <span className={`${css(STYLES.icon)} fa fa-${this.props.icon}`}/> : 
                <img className={css(STYLES.image)} src={`https://static.f-list.net/images/avatar/${encodeURI(this.props.image.toLowerCase())}.png`}/>}
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        cursor: 'pointer',
        color: '#adadad',        
        ':hover': {
            color: '#ffffff',
            backgroundColor: '#444444'
        },
        ':active': {
            color: '#0F0F0F'
        },
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'              
    },
    icon: {
        padding: '10px'
    },
    image: {
        width: '20px',
        height: '20px'
    },
    selected: {
        backgroundColor: '#1e1e1e'
    }
});