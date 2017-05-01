import * as React from 'react';
import { TagDef } from './tags/TagDef';

import BoldTag from './tags/Boldtag';
import ColorTag from './tags/ColorTag';
import EIconTag from './tags/EIconTag';
import IconTag from './tags/IconTag';
import ItalicTag from './tags/ItalicTag';
import StrikeThroughTag from './tags/StrikeThroughTag';
import SubTag from './tags/SubTag';
import SupTag from './tags/SupTag';
import UnderlineTag from './tags/UnderlineTag';
import UrlTag from './tags/UrlTag';


const TOKEN_RE: RegExp = /(\[\/?.+?\])/;
const SPACE_RE: RegExp = /^\s*$/;

class Parser {

    private tags: {[name: string] : TagDef} = {};

    public registerTagDef(tagDef: TagDef){
        this.tags[tagDef.tag] = tagDef;
    }

    public parse(input: string): JSX.Element {
        // Create root elem
        let root: Elem = new Elem(input, true);
        let elem: JSX.Element = root.toReact(this.tags, 0);
        //console.log(root.toString());
        return elem;        
    }
}

class Elem {

    public isRoot: boolean;
    public bbString: string;
    public children: Elem[] = [];

    constructor(input: string, isRoot: boolean = false){
        this.isRoot = isRoot;
        
        if(isRoot){ 
            this.parse(input); 
        }
        else { 
            this.bbString = input; 
        }
    }

    public parse(input: string){
        let tokens: string[] = input.split(TOKEN_RE);
        while(tokens.length > 0){
            let token: string = tokens.shift();
            if(!token.length) continue;
            this.children.push(new Elem(token));
        }

        /*console.log("=======Start=========");
        for(let i = 0; i < this.children.length; i++){
            console.log(this.children[i].toString());
        }
        console.log("=====================");*/

        while(this.consolidatePass());
    }
    
    private consolidatePass(): boolean {
        let beforeChildren: Elem[] = [];
        let openTag: Elem = null;
        let kiddies: Elem[] = [];

        // Find the first closing tag
        while(this.children.length > 0){
            let child: Elem = this.children.shift();

            if(child.isTag() && child.isClosingTag()){
                // Do not add the closing tag back into a list

                // Loop through the back of the beforeChildren list to find the parent
                kiddies = [];
                while(beforeChildren.length > 0){
                    let kid: Elem = beforeChildren.pop();
                    if(kid.isTag() && !kid.isClosingTag() && kid.getStrippedTag() === child.getStrippedTag()){
                        openTag = kid;
                        break;
                    }
                    else {
                        kiddies.unshift(kid);
                    }
                }

                break;
            }
            else {
                beforeChildren.push(child);
            }
        }

        if(openTag != null){
            for(let i = 0; i < kiddies.length; i++){
                openTag.addChild(kiddies[i]);
            }

            beforeChildren.push(openTag);
            for(let i = 0; i < this.children.length; i++){
                beforeChildren.push(this.children[i]);
            }
            this.children = beforeChildren;
            return true;
        }
        else {
            this.children = beforeChildren;
            return false;
        }
    }

    public isTag(): boolean {
        return this.isRoot ? false : this.bbString.match(TOKEN_RE) != null;
    }

    public isClosingTag(): boolean {
        return this.isRoot ? false : this.isTag() ? this.bbString.charAt(1) === '/' : false;
    }

    public addChild(elem: Elem){
        this.children.push(elem);
    }

    public getParam(): string {
        let noBrackets = this.bbString.slice(this.isClosingTag() ? 2 : 1, -1);
        if(noBrackets.indexOf('=') == -1) return "";
        let splitArgs = noBrackets.split('=');
        return splitArgs[1];
    }

    public getStrippedTag(): string {
        if(!this.isTag){
            return null;
        }

        // Remove the brackets
        let noBrackets = this.bbString.slice(this.isClosingTag() ? 2 : 1, -1);
        let finalTag = noBrackets;
        if(noBrackets.indexOf('=') != -1){
            let splitArgs = noBrackets.split('=');
            finalTag = splitArgs[0];
        }
        
        return finalTag;
    }

    public getText(){
        let childText: string = "";
        if(!this.isRoot && !this.isTag()){
            childText += this.bbString;
        }
        for(let i = 0; i < this.children.length; i++){
            childText += this.children[i].getText();
        }
        return childText;
    }

    public toReact(tags: {[name: string] : TagDef}, key: number): JSX.Element {
        // Gather children
        let kids: JSX.Element[] = [];

        let i = 0;
        kids = this.children.map((child) => {
            return child.toReact(tags, i++);
        });

        let childrenElem: JSX.Element = <span key={key++}>{kids}</span>;

        // Convert to React
        if(this.isTag()){
            let tagDef: TagDef = tags[this.getStrippedTag()];    
            if(tagDef == undefined || tagDef == null){
                return null;
            }
            return tagDef.process(this.getParam(), childrenElem, this.getText(), key++);
        }
        else if(!this.isRoot){
            // Must just be a text node
            return <span key={key++}>{this.bbString}</span>;
        }
        else {
            return childrenElem;
        }
    }

    public toString(): string {
        let msg: string = "isRoot: " + this.isRoot;
        if(!this.isRoot){
            msg += ", " + this.bbString;
        }
        
        if(this.children.length > 0){
            msg += "\n " + this.children.length + " children. \n";
        }

        for(let i = 0; i < this.children.length; i++){
            msg += "    " + i + ": " + this.children[i].toString() + "\n";
        }

        return msg;
    }
}

export const bbcode: Parser = new Parser();
bbcode.registerTagDef(new BoldTag());
bbcode.registerTagDef(new ColorTag());
bbcode.registerTagDef(new EIconTag());
bbcode.registerTagDef(new IconTag());
bbcode.registerTagDef(new ItalicTag());
bbcode.registerTagDef(new StrikeThroughTag());
bbcode.registerTagDef(new SubTag());
bbcode.registerTagDef(new SupTag());
bbcode.registerTagDef(new UnderlineTag());
bbcode.registerTagDef(new UrlTag());
