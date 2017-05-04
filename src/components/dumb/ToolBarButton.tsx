import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface IToolBarButtonProps {
    icon: string;
    title: string;
    selected: boolean;
    onClick?: any;
    style?: any;
}

export default class ToolBarButton extends React.Component<IToolBarButtonProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style, this.props.selected && STYLES.selected)}>
            <span className={`${css(STYLES.span)} fa fa-${this.props.icon}`} 
                title={this.props.title}
                alt={this.props.title}
                onClick={this.props.onClick}/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        cursor: 'pointer',
        color: '#adadad',        
        ':hover': {
            color: '#ffffff'
        },
        ':active': {
            color: '#0F0F0F'
        },
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center'              
    },
    span: {
        padding: '10px'
    },
    selected: {
        backgroundColor: '#1e1e1e'
    }
});