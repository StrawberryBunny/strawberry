import * as React from 'react';

interface ILinkProps {
    content: any;
    url: string;
}

export default class Link extends React.Component<ILinkProps, {}> {

    render(){
        return <span>🔗<a href={this.props.url} target="_blank">{this.props.content}</a></span>;
    }
}