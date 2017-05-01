import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    textDecoration: 'line-through'
};

export default class StrikeThroughTag extends TagDef {

    constructor(){
        super('s');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
