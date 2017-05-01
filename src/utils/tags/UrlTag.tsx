import * as React from 'react';

import { TagDef } from './TagDef';
import Link from '../../components/dumb/Link';

export default class UrlTag extends TagDef {

    constructor(){
        super('url');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        let noParam: boolean = param == undefined || param.length == 0;
        return <Link key={key} url={noParam ? bbString : param} content={content}/>
    }
}
