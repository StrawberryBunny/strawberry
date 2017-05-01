import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    verticalAlign: 'super',
    fontSize: '.83em'
};

export default class SupTag extends TagDef {

    constructor(){
        super('sup');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
