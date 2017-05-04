import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface ITitleBarButtonProps {
    icon: string;
    title: string;
    warning?: boolean;
    onClick?: any;
    spinning?: boolean;
}

export default class TitleBarButton extends React.Component<ITitleBarButtonProps, {}> {

    render() {
        return <span className={`fa fa-${this.props.icon} ${this.props.spinning && 'fa-spin'} ${css(STYLES.main, this.props.warning && STYLES.warning)}`}
            title={this.props.title}
            alt={this.props.title}
            onClick={this.props.onClick}/>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        '-webkit-app-region': 'no-drag',
        cursor: 'pointer',
        color: '#adadad',
        fontSize: '15pt',
        marginLeft: '3px',
        marginRight: '3px',
        ':hover': {
            color: '#ffffff'
        },
        ':active': {
            color: '#0F0F0F'
        }
    },
    warning: {
        ':hover': {
            color: '#CC2200'
        }
    }
});