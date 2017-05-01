import * as React from 'react';

import { TagDef } from './TagDef';
import { chatStore } from '../../stores';

import Avatar from '../../components/dumb/Avatar';

export default class IconTag extends TagDef {

    constructor(){
        super('icon');
    }

    process(param: string, content: JSX.Element, bbString: string, key: number): JSX.Element {
        return <Avatar key={key} character={bbString}/>;
    }

}
