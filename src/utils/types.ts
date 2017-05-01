import * as Enums from './enums';
import { observable } from 'mobx';


export interface ITicket {
    characters: string[];
    default_character: string;
    ticket: string;
    friends: IFriend[];
    bookmarks: IBookmark[];
    error: string;
}

export interface IFriend {
    dest_name: string;
    source_name: string;
}

export interface IBookmark {
    name: string;
}

export interface IMessage {
    type: Enums.MessageType;
    character: string;
    message: string;
}

export class Character {
    name: string;
    gender: Enums.Gender;
    status: Enums.Status;
    statusMessage: string;
}

export class Channel {
    name: string;
    title: string;
    official: boolean;
    mode: Enums.ChannelMode;
    initialCharCount: number;
    opList: Array<string>;
    characters: Array<string>;
    description: string;
    @observable messages: Array<IMessage>;
    textAreaContents: string;
}

