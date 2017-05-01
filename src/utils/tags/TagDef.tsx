import * as React from 'react';

export abstract class TagDef {

    public tag: string;

    constructor(tag: string){
        this.tag = tag;
    }

    public abstract process(param: string, content: JSX.Element, bbString: string, key:number): JSX.Element;
}
