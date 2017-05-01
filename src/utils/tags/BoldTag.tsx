import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    fontWeight: 'bold'
};

export default class BoldTag extends TagDef {

    constructor(){
        super('b');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
