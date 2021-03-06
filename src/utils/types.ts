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
    character: Character;
    message: string;
}

export class Character {
    public name: string;
    public gender: Enums.Gender;
    public status: Enums.Status;
    public statusMessage: string;
    @observable public currentMessage: string = "";
    @observable public messages: Array<IMessage>;
    public scrollState: number = null;

    public initLIS(data: string[]): Character {
        this.name = data[0];
        this.gender = Enums.GENDER_MAP[data[1].toLowerCase()];
        this.status = Enums.STATUS_MAP[data[2].toLowerCase()];
        this.statusMessage = data[3];
        return this;
    }

    public initNLN(name: string, gender: string, status: string): Character {
        this.name = name;
        this.gender = Enums.GENDER_MAP[gender.toLowerCase()];
        this.status = Enums.STATUS_MAP[status.toLowerCase()];
        this.statusMessage = "";
        return this;
    }
}

export class Channel {
    public name: string;
    public title: string;
    public official: boolean;
    public mode: Enums.ChannelMode;
    public initialCharCount: number;
    public opList: Array<string>;
    @observable public characters: Array<Character>;
    public description: string;
    @observable public messages: Array<IMessage>;
    @observable public currentMessage: string = "";
    public scrollState: number = null;

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

