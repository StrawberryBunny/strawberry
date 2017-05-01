import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    textDecoration: 'underline'
};

export default class UnderlineTag extends TagDef {

    constructor(){
        super('u');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
