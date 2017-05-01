import * as React from 'react';

import { TagDef } from './TagDef';
import { chatStore } from '../../stores';

import EIcon from '../../components/dumb/EIcon';

export default class EIconTag extends TagDef {

    constructor(){
        super('eicon');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <EIcon key={key} id={bbString}/>;
    }

}
