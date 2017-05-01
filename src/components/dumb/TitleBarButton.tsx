import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface ITitleBarButtonProps {
    icon: string;
    title: string;
    warning?: boolean;
    onClick?: any;
}

export default class TitleBarButton extends React.Component<ITitleBarButtonProps, {}> {

    render() {
        return <span className={`fa fa-${this.props.icon} ${css(STYLES.main, this.props.warning && STYLES.warning)}`}
            title={this.props.title}
            alt={this.props.title}
            onClick={this.props.onClick}/>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        '-webkit-app-region': 'no-drag',
        cursor: 'pointer',
        color: '#414141',
        marginLeft: '3px',
        marginRight: '3px',
        ':hover': {
            color: '#505050'
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