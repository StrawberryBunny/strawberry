import { observable, ObservableMap, action } from 'mobx';

import * as Enums from '../utils/enums';
import * as Types from '../utils/types';
import * as Packets from '../utils/packets';
import * as Utils from '../utils/utils';

import { uiStore, userStore } from '.';

const URL_TEST_SERVER_ENCRYPTED: string = 'wss://chat.f-list.net:8799';
const URL_TEST_SERVER_UNENCRYPTED: string = 'ws://chat.f-list.net:8722';
const URL_SERVER_ENCRYPTED: string = 'wss://chat.f-list.net:9799';
const URL_SERVER_UNENCRYPTED: string = 'ws://chat.f-list.net:9722';

const LOG_RECEIVE_MESSAGES: boolean = false;
const LOG_SEND_MESSAGES: boolean = false;

export default class ChatStore {

    private socket: WebSocket = null;
    
    // Data
    public userCharacter: string = 'Random Dork';
    public globalOps: string[] = new Array<string>();
    public channels: ObservableMap<Types.Channel> = new ObservableMap<Types.Channel>();
    public characters: ObservableMap<Types.Character> = new ObservableMap<Types.Character>();
    @observable public openChannels: Array<string> = new Array<string>();
    @observable public officialChannels: Array<string> = new Array<string>();
    @observable public unofficialChannels: Array<string> = new Array<string>();
    @observable public openPMs: Array<string> = new Array<string>();

    public chatMax: number;
    public privMax: number;
    public lfrpMax: number;
    public lfrpFlood: number;
    public msgFlood: number;
    public iconBlacklist: Array<string> = new Array<string>();

    private initialUserCount: number;

    // State
    @observable public requestingChannels: boolean = false;
    @observable public requestingStatusUpdate: boolean = false;

    public connect(character: string){
        // Store the character the user logged in as
        this.userCharacter = character;

        // Change the loading page
        uiStore.connectionState = Enums.ConnectionState.connecting;
        uiStore.connectionInfo = "Connecting to F-Chat.";

        // Start connecting
        this.socket = new WebSocket(URL_SERVER_ENCRYPTED);

        // Listeners
        this.socket.onopen = () => {
            // Attempt to identify
            uiStore.connectionInfo = "Attempting to identify.";

            let packet: Packets.ISendPacketIDN = {
                method: 'ticket',
                account: userStore.username,
                ticket: userStore.ticket.ticket,
                character: character,
                cname: 'strawberry',
                cversion: '0.0.0'
            };

            let msg: string = `IDN ${JSON.stringify(packet)}`;
            this.sendMsg(msg);
        };

        this.socket.onerror = (e) => {
            console.error(`WebSocket error: ${JSON.stringify(e)}`);
        };

        this.socket.onclose = (e) => {
            console.error(`WebSocket cloed: ${JSON.stringify(e)}`);
        };

        this.socket.onmessage = (message) => {
            // Snip the 3 character code from the beginning of the data
            let dataStr: string = message.data as string;
            let messageId: string = dataStr.substr(0, 3);
            let obj: Object;

            if(dataStr.length > 3){
                obj = JSON.parse(dataStr.substr(4));
            }

            if(LOG_RECEIVE_MESSAGES){
                console.log(dataStr);
            }

            switch(messageId){
                case 'ADL':
                    this.receiveADL(obj as Packets.IReceivePacketADL);
                    break;
                case 'AOP':
                    this.receiveAOP(obj as Packets.IReceivePacketAOP);
                    break;
                case 'BRO':
                    this.receiveBRO(obj as Packets.IReceivePacketBRO);
                    break;
                case 'CDS':
                    this.receiveCDS(obj as Packets.IReceivePacketCDS);
                    break;
                case 'CHA':
                    this.receiveCHA(obj as Packets.IReceivePacketCHA);
                    break;
                case 'CIU':
                    this.receiveCIU(obj as Packets.IReceivePacketCIU);
                    break;
                case 'COL':
                    this.receiveCOL(obj as Packets.IReceivePacketCOL);
                    break;
                case 'CON':
                    this.receiveCON(obj as Packets.IReceivePacketCON);
                    break;                
                case 'ERR':
                    this.receiveERR(obj as Packets.IReceivePacketERR);
                    break;
                case 'FLN':
                    this.receiveFLN(obj as Packets.IReceivePacketFLN);
                    break;
                case 'FRL':
                    // Unused in favour of friends from initial login ticket.
                    break;
                case 'HLO':
                    // Switch to chat page, (we should have identified and received all server VARs by now)
                    this.receiveHLO(obj as Packets.IReceivePacketHLO);
                    break;
                case 'ICH':
                    this.receiveICH(obj as Packets.IReceivePacketICH);
                    break;
                case 'IDN':
                    this.receiveIDN(obj as Packets.IReceivePacketIDN);
                    break;
                case 'IGN':
                    this.receiveIGN(obj as Packets.IReceivePacketIGN);
                    break;
                case 'JCH':
                    this.receiveJCH(obj as Packets.IReceivePacketJCH);
                    break;
                case 'LCH':
                    this.receiveLCH(obj as Packets.IReceivePacketLCH);
                    break;
                case 'LIS':
                    this.receiveLIS(obj as Packets.IReceivePacketLIS);
                    break;
                case 'MSG':
                    this.receiveMSG(obj as Packets.IReceivePacketMSG);
                    break;
                case 'ORS':
                    this.receiveORS(obj as Packets.IReceivePacketORS);
                    break;
                case 'NLN':
                    this.receiveNLN(obj as Packets.IReceivePacketNLN);
                    break;
                case 'PIN':
                    this.sendMsg('PIN');
                    break;
                case 'PRI':
                    this.receivePRI(obj as Packets.IReceivePacketPRI);
                    break;
                case 'STA':
                    this.receiveSTA(obj as Packets.IReceivePacketSTA);
                    break;
                case 'VAR':
                    this.receiveVAR(obj as Packets.IReceivePacketVAR);
                    break;
                default:
                    console.log("Unhandled server message: " + message.data);
            }
        };
    }

    private sendMsg(msg: string): void {
        this.socket.send(msg);
    }

    // Getters --------------------------------------------
    public getCharacter(name: string): Types.Character {
        return this.characters.get(name);
    }
    
    public getUserCharacter(): Types.Character {
        return this.characters.get(this.userCharacter);
    }

    public getChannel(name: string): Types.Channel {
        return this.channels.get(name);
    }

    public getChannelKeys(): string[] {
        return this.channels.keys();
    }

    // Interface

    public joinChannel(name: string): void {
        let packet: Packets.ISendPacketJCH = {
            channel: name
        };
        this.sendMsg(`JCH ${JSON.stringify(packet)}`);
        if(LOG_SEND_MESSAGES) console.log("sendJCH: " + packet.channel);
    }

    public leaveChannel(name: string): void {
        let packet: Packets.ISendPacketLCH = {
            channel: name
        };
        this.sendMsg(`LCH ${JSON.stringify(packet)}`);
        if(LOG_SEND_MESSAGES) console.log("sendLCH: " + packet.channel);
    }

    public requestChannels(): void {
        this.requestingChannels = true;
        this.sendMsg('CHA');
        this.officialChannels = new Array<string>();
        this.unofficialChannels = new Array<string>();
        if(LOG_SEND_MESSAGES) console.log("sendCHA");
    }

    // Senders ----------------------------------------------------------------------
    public sendStatusUpdate(status: string, statusMsg: string){
        let packet: Packets.ISendPacketSTA = {
            status: status,
            statusmsg: statusMsg
        };
        this.sendMsg(`STA ${JSON.stringify(packet)}`);
        this.requestingStatusUpdate = true;
        if(LOG_SEND_MESSAGES) console.log("sendSTA: " + packet.status + " - " + packet.statusmsg);
    }
    
    public sendMessage(channelName: string, message: string){
        let packet: Packets.ISendPacketMSG = {
            channel: channelName,
            message: message
        };
        this.sendMsg(`MSG ${JSON.stringify(packet)}`);
        if(LOG_SEND_MESSAGES) console.log("sendMSG: " + packet.channel + ", " + packet.message);

        // Add the message to our list
        let msg: Types.IMessage = {
            type: Enums.MessageType.Character,
            character: this.userCharacter,
            message: message
        };
        let channel: Types.Channel = this.channels.get(channelName);
        if(channel.messages == null){
            channel.messages = new Array<Types.IMessage>();
        }
        channel.messages.push(msg);

        // Stats
        userStore.sentMessages++;
    }

    // Receivers --------------------------------------------------------------------

    private receiveADL(obj: Packets.IReceivePacketADL){
        
    }

    private receiveAOP(obj: Packets.IReceivePacketAOP){
        
    }

    private receiveBRO(obj: Packets.IReceivePacketBRO){
        
    }
    
    private receiveCDS(obj: Packets.IReceivePacketCDS){
        // A channel's description has changed, sent in response to JCH
        let channel: Types.Channel = this.channels.get(obj.channel);
        channel.description = obj.description;
    }

    @action
    private receiveCHA(obj: Packets.IReceivePacketCHA) {
        for(let item of obj.channels){
            let chan: Types.Channel = new Types.Channel().initOfficial(item);
            this.channels.set(chan.name, chan);
            this.officialChannels.push(chan.name);
        }

        this.sendMsg('ORS');
        uiStore.connectionInfo = "Fetching unofficial channel list";
    }

    private receiveCIU(obj: Packets.IReceivePacketCIU){
        
    }

    private receiveCBU(obj: Packets.IReceivePacketCBU){
        
    }

    private receiveCOL(obj: Packets.IReceivePacketCOL){
        
    }

    private receiveCON(obj: Packets.IReceivePacketCON){
        this.initialUserCount = obj.count;
    }

    @action
    private receiveERR(obj: Packets.IReceivePacketERR) {
        switch(obj.number){
            case 4:
                // Identification failed.
                uiStore.connectionError = obj.message;
                uiStore.connectionState = Enums.ConnectionState.charSelect;
                break;
            default:
                console.log("Unhandled error: " + obj.number + ", " + obj.message);
                break;
        }
    }

    private receiveFLN(obj: Packets.IReceivePacketFLN){
        // user has gone offline
        let char: Types.Character = this.getCharacter(obj.character);
        char.status = Enums.Status.Offline;

        // TODO - Remove this user from any channels they are in?
    }

    private receiveHLO(obj: Packets.IReceivePacketHLO){
        console.log(obj.message);
    }

    private receiveICH(obj: Packets.IReceivePacketICH){
        
    }

    private receiveIDN(obj: Packets.IReceivePacketIDN){
        // Identification successful
        uiStore.connectionInfo = "Identification successful";
    }
    
    private receiveIGN(obj: Packets.IReceivePacketIGN){
        
    } 

    private receiveJCH(obj: Packets.IReceivePacketJCH){
        // A user has joined a channel
        let channel: Types.Channel = this.channels.get(obj.channel);
        if(channel.characters == null){
            channel.characters = new Array<string>();
        }
        channel.characters.push(obj.character.identity);

        // Was this our character?
        if(obj.character.identity == this.userCharacter){
            this.openChannels.push(obj.channel);
            // If this was the first channel to be opened
            if(this.openChannels.length == 1){
                uiStore.selected = obj.channel;
            }
        }
    }

    private receiveLCH(obj: Packets.IReceivePacketLCH){
        // A user has left a channel
        let channel: Types.Channel = this.channels.get(obj.channel);
        let index: number = channel.characters.indexOf(obj.character);
        channel.characters.splice(index, 1);

        // Was this our character?
        if(obj.character == this.userCharacter){
            index = this.openChannels.indexOf(obj.channel);
            this.openChannels.splice(index, 1);

            // If this was the last open channel
            if(this.openChannels.length == 0){
                uiStore.selected = null;
            }
        }
    }

    private receiveLIS(obj: Packets.IReceivePacketLIS){
        for(let item of obj.characters){
            let char: Types.Character = new Types.Character().initLIS(item);
            this.characters.set(char.name, char);
        }

        if(this.characters.size >= this.initialUserCount){
            uiStore.connectionInfo = this.characters.size + " characters received";
        }
    }

    private receiveMSG(obj: Packets.IReceivePacketMSG){
        // Received channel message
        let msg: Types.IMessage = {
            type: Enums.MessageType.Character,
            character: obj.character,
            message: obj.message
        };

        let chan: Types.Channel = this.getChannel(obj.channel);
        if(chan.messages == null) chan.messages = new Array<Types.IMessage>();
        chan.messages.push(msg);
    }

    private receiveNLN(obj: Packets.IReceivePacketNLN){
        if(obj.identity == this.userCharacter){
            uiStore.connectionInfo = "Fetching official channel list";
            this.requestChannels();       
        }
        else {
            // Add to character list 
            let char: Types.Character = new Types.Character().initNLN(obj.identity, obj.gender, obj.status);
            this.characters.set(char.name, char);
        }
    }

    @action
    private receiveORS(obj: Packets.IReceivePacketORS){
         for(let item of obj.channels){
            let chan: Types.Channel = new Types.Channel().initUnofficial(item);
            this.channels.set(chan.name, chan);
            this.unofficialChannels.push(chan.name);
        }

        // End requesting
        this.requestingChannels = false;

        // If this is the initial connection
        if(uiStore.connectionState == Enums.ConnectionState.connecting){
            uiStore.connectionInfo = "Connected";
            uiStore.connectionState = Enums.ConnectionState.connected;      
        }  
    }


    private receivePRI(obj: Packets.IReceivePacketPRI){
        // Received private message
        let msg: Types.IPrivateMessage = {
            character: obj.character,
            message: obj.message
        };

        let char: Types.Character = this.getCharacter(obj.character);
        if(char.messages == null) char.messages = new Array<Types.IPrivateMessage>();
        char.messages.push(msg);
    }

    private receiveSTA(obj: Packets.IReceivePacketSTA){
        // Receive status update
        let char: Types.Character = this.getCharacter(obj.character);
        char.status = Enums.STATUS_MAP[obj.status];
        char.statusMessage = obj.statusmsg;

        if(obj.character == this.userCharacter){
            // Our status has been updated
            this.requestingStatusUpdate = false;
        }
    }

    private receiveVAR(obj: Packets.IReceivePacketVAR){
        switch(obj.variable){
            case "chat_max":
                this.chatMax = obj.value as number;
                break;
            case "priv_max":
                this.privMax = obj.value as number;
                break;
            case "lfrp_max":
                this.lfrpMax = obj.value as number;
                break;
            case "lfrp_flood":
                this.lfrpFlood = obj.value as number;
                break;
            case "msg_flood":
                this.msgFlood = obj.value as number;
                break;
            case "permissions":
                userStore.permissions = obj.value as number;
                break;
            case "icon_blacklist":
                this.iconBlacklist = obj.value as string[];
                break;
            default:
                console.log("Received unhandled server var.");
        }
    }
}