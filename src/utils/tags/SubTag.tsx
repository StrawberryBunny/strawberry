import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    verticalAlign: 'sub',
    fontSize: '.83em'
};

export default class SubTag extends TagDef {

    constructor(){
        super('sub');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
