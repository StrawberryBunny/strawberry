import { observable } from 'mobx';
import * as Enums from './enums';
import * as Packets from '../utils/packets';

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
    public name: string;
    public title: string;
    public official: boolean;
    public mode: Enums.ChannelMode;
    public initialCharCount: number;
    public opList: Array<string>;
    public characters: Array<string>;
    public description: string;
    @observable public messages: Array<IMessage>;
    public textAreaContents: string;

    public initOfficial(data: Packets.IOfficialChannel): Channel {
        this.official = true;
        this.name = data.name;
        this.title = data.name;
        this.mode = Enums.CHANNEL_MODE_MAP[data.mode];
        this.initialCharCount = data.characters;
        return this;
    }

    public initUnofficial(data: Packets.IUnofficialChannel): Channel {
        this.official = false;
        this.name = data.name;
        this.title = data.title;
        this.initialCharCount = data.characters;
        return this;
    }
}

