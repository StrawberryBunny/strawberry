import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface IEIconProps {
    id: string;
}

export default class EIcon extends React.Component<IEIconProps, {}> {

    render(){
        return <img className={`${css(STYLES.main)} img-rounded`}
            src={`https://static.f-list.net/images/eicon/${encodeURI(this.props.id.toLowerCase())}.gif`}
            title={this.props.id}
            alt={this.props.id}/>
    }
}

const STYLES = StyleSheet.create({
    main: {
        width: '100px',
        height: '100px'
    }
});