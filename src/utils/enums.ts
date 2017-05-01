import { strEnum } from './EnumHelper';
import { chatStore } from '../stores';

import * as Types from './Types';

import HomePanel from '../components/panels/HomePanel';

export enum ConnectionState {
    login, fetchingTicket, charSelect, connecting, connected
}

export enum ChannelMode {
    chat, ads, both
}

export const CHANNEL_MODE_DATA = [
    { enum: ChannelMode.chat, text: 'Chat' },
    { enum: ChannelMode.ads, text: 'Ads' },
    { enum: ChannelMode.both, text: 'Both' }
];

export const CHANNEL_MODE_MAP = {
    "chat": ChannelMode.chat,
    "ads": ChannelMode.ads,
    "both": ChannelMode.both
};

export enum Gender {
    Male = 0, 
    Female = 1, 
    Herm = 2, 
    Shemale = 3, 
    Cuntboy = 4,
    MaleHerm = 5, 
    Transgender = 6, 
    None = 7
}

export const GENDER_DATA = [
    { enum: Gender.Male,            color: '#5584da' },
    { enum: Gender.Female,          color: '#f75e82' },
    { enum: Gender.Herm,            color: '#9f5df0' },
    { enum: Gender.Shemale,         color: '#eb4fb2' },
    { enum: Gender.Cuntboy,         color: '#88e381' },
    { enum: Gender.MaleHerm,        color: '#69dff0' },
    { enum: Gender.Transgender,     color: '#eb7743' },
    { enum: Gender.None,            color: '#efeeab' },
];

export const GENDER_MAP = {
    "male": Gender.Male,
    "female": Gender.Female,
    "herm": Gender.Herm,
    "shemale": Gender.Shemale,
    "cunt-boy": Gender.Cuntboy,
    "male-herm": Gender.MaleHerm,
    "transgender": Gender.Transgender,
    "none": Gender.None
};

export enum Status {
    Online, Looking, Away, Busy, DnD, Idle, Offline
}

export const STATUS_DATA = [
    "online",
    "looking",
    "away",
    "busy",
    "dnd",
    "idle",
    "offline"
];

export const STATUS_MAP = {
    "online": Status.Online,
    "looking": Status.Looking,
    "away": Status.Away,
    "busy": Status.Busy,
    "dnd": Status.DnD,
    "idle": Status.Idle,
    "offline": Status.Offline
}

export enum Tool {
    Home,
    Status,
    Channels,
    PMs,
    Friends,
    Settings,
    SignOut
}

export const TOOL_DATA = [
    { enum: Tool.Home,          icon: 'home',           title: 'Home',                  panel: HomePanel },
    { enum: Tool.Status,        icon: 'id-card',        title: 'Status',                panel: null },
    { enum: Tool.Channels,      icon: 'th',             title: 'Channels',              panel: null },
    { enum: Tool.PMs,           icon: 'user-secret',    title: 'Private Messages',      panel: null },
    { enum: Tool.Friends,       icon: 'users',          title: 'Friends & Bookmarks',   panel: null },
    { enum: Tool.Settings,      icon: 'cogs',           title: 'Settings',              panel: null },
    { enum: Tool.SignOut,       icon: 'sign-out',       title: 'Sign Out',              panel: null }
];

export enum SortingMethod {
    alphaAsc, alphaDesc, numericAsc, numericDesc
}

export const SORTING_METHOD_DATA = [
    { enum: SortingMethod.alphaAsc, icon: 'sort-alpha-asc', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.alphaDesc, icon: 'sort-alpha-desc', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        if(chanB.title < chanA.title) return -1;
        if(chanA.title < chanB.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.numericAsc, icon: 'sort-numeric-asc', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        let countA: number = chanA.characters == null ? chanA.initialCharCount : chanA.characters.length;
        let countB: number = chanB.characters == null ? chanB.initialCharCount : chanB.characters.length;

        if(countA > countB) return -1;
        if(countB > countA) return 1;
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.numericDesc, icon: 'sort-numeric-desc', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        let countA: number = chanA.characters == null ? chanA.initialCharCount : chanA.characters.length;
        let countB: number = chanB.characters == null ? chanB.initialCharCount : chanB.characters.length;

        if(countB > countA) return -1;
        if(countA > countB) return 1;
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    } },
];

export enum MessageType {
    Character, Broadcast, Channel
}

const BBColorStr = strEnum([
    'red', 'blue', 'white', 'yellow', 'pink', 'gray', 'green', 'orange',
    'purple', 'black', 'brown', 'cyan'
]);
export type BBColor = keyof typeof BBColorStr;