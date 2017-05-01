import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';

interface IAvatarProps {
    character: string;
}

export default class Avatar extends React.Component<IAvatarProps, {}> {

    render(){
        return <div className={css(STYLES.main)}>
            <img className={`img-rounded`}
                src={`https://static.f-list.net/images/avatar/${encodeURI(this.props.character.toLowerCase())}.png`}
                title={this.props.character}
                alt={this.props.character}/>
        </div>;
    }
}

const STYLES = StyleSheet.create({
    main: {
        width: '100px',
        height: '100px'
    }
});