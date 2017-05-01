import * as React from 'react';

import { TagDef } from './TagDef';

const style: React.CSSProperties = {
    fontStyle: 'italic'
};

export default class ItalicTag extends TagDef {

    constructor(){
        super('i');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <span style={style} key={key}>{content}</span>;
    }
}
