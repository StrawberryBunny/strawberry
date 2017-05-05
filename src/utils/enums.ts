import { StyleSheet } from 'aphrodite';

import { strEnum } from './EnumHelper';
import { chatStore } from '../stores';

import * as Types from './Types';

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

const GENDER_STYLES = StyleSheet.create({
    male: {         color: '#5584da' },
    female: {       color: '#f75e82' },
    herm: {         color: '#9f5df0' },
    shemale: {      color: '#eb4fb2' },
    cuntboy: {      color: '#88e381' },
    maleherm: {     color: '#69dff0' },
    transgender: {  color: '#eb7743' },
    none: {         color: '#efeeab' }
});

export const GENDER_DATA = [
    { enum: Gender.Male,            name: 'male',           style: GENDER_STYLES.male },
    { enum: Gender.Female,          name: 'female',         style: GENDER_STYLES.female },
    { enum: Gender.Herm,            name: 'herm',           style: GENDER_STYLES.herm },
    { enum: Gender.Shemale,         name: 'shemale',        style: GENDER_STYLES.shemale },
    { enum: Gender.Cuntboy,         name: 'cuntboy',        style: GENDER_STYLES.cuntboy },
    { enum: Gender.MaleHerm,        name: 'male-herm',      style: GENDER_STYLES.maleherm },
    { enum: Gender.Transgender,     name: 'transgender',    style: GENDER_STYLES.transgender },
    { enum: Gender.None,            name: 'none',           style: GENDER_STYLES.none }
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
    Log,
    Settings,
    SignOut
}

export const TOOL_DATA = [
    { enum: Tool.Home,          icon: 'home',           title: 'Home' },
    { enum: Tool.Status,        icon: 'id-card',        title: 'Status' },
    { enum: Tool.Channels,      icon: 'th',             title: 'Channels' },
    { enum: Tool.PMs,           icon: 'user-secret',    title: 'Private Messages' },
    { enum: Tool.Friends,       icon: 'users',          title: 'Friends & Bookmarks' },
    { enum: Tool.Log,           icon: 'bars',           title: 'Log' },
    { enum: Tool.Settings,      icon: 'cogs',           title: 'Settings' },
    { enum: Tool.SignOut,       icon: 'sign-out',       title: 'Sign Out' }
];

export enum SortingMethod {
    alphaAsc, alphaDesc, numericAsc, numericDesc
}

export const SORTING_METHOD_DATA = [
    { enum: SortingMethod.alphaAsc, icon: 'sort-alpha-asc', title: 'Name Ascending', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.alphaDesc, icon: 'sort-alpha-desc', title: 'Name Descending', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        if(chanB.title < chanA.title) return -1;
        if(chanA.title < chanB.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.numericAsc, icon: 'sort-numeric-asc', title: 'Character Count Ascending', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        let countA: number = chanA.characters == null ? chanA.initialCharCount : chanA.characters.length;
        let countB: number = chanB.characters == null ? chanB.initialCharCount : chanB.characters.length;
        if(countB > countA) return -1;
        if(countA > countB) return 1;
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    }},
    { enum: SortingMethod.numericDesc, icon: 'sort-numeric-desc', title: 'Character Count Descending', sortingMethod: function(a, b){
        let chanA: Types.Channel = chatStore.getChannel(a);
        let chanB: Types.Channel = chatStore.getChannel(b);
        let countA: number = chanA.characters == null ? chanA.initialCharCount : chanA.characters.length;
        let countB: number = chanB.characters == null ? chanB.initialCharCount : chanB.characters.length;
        if(countA > countB) return -1;
        if(countB > countA) return 1;
        if(chanA.title < chanB.title) return -1;
        if(chanB.title < chanA.title) return 1;
        return 0;
    } },
];

export function getSortingFunc(sortingMethod: SortingMethod){
    return SORTING_METHOD_DATA[sortingMethod].sortingMethod;
}

export enum MessageType {
    Character, Broadcast, Channel
}

const BBColorStr = strEnum([
    'red', 'blue', 'white', 'yellow', 'pink', 'gray', 'green', 'orange',
    'purple', 'black', 'brown', 'cyan'
]);
export type BBColor = keyof typeof BBColorStr;