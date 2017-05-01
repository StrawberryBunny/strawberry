import * as React from 'react';

import { TagDef } from './TagDef';
import { BBColor } from '../enums';

export default class ColorTag extends TagDef {

    constructor(){
        super('color');
    }

    process(param: BBColor, content: JSX.Element, bbString: string, key: number): JSX.Element {
        let style: React.CSSProperties = {
            color: param.toLowerCase()
        };
        return <span style={style} key={key}>{content}</span>;
    }
}
