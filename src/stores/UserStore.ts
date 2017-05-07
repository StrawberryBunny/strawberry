import Axios from 'axios';
import { observable, computed } from 'mobx';

import { uiStore } from './';

import * as Types from '../utils/types';
import * as Enums from '../utils/enums';

export default class UserStore {

    // Data
    public username: string;
    public password: string;
    public ticket: Types.ITicket;
    public ignoredCharacters: Array<string> = new Array<string>();
    public permissions: number;
    @observable public sentMessages: number = 0;
    @observable public sentPMs: number = 0;
    public logInTime: Date;
    public friendsList: Array<string>;
    public bookmarksList: Array<string>;

    @computed 
    public get onlineTime(): any {
        return new Date().getTime() - this.logInTime.getTime();
    }
    
    // Methods
    public fetchTicket(username: string, password: string){
        // Store the information
        this.username = username;
        this.password = password;

        // Switch to the loading state
        uiStore.connectionState = Enums.ConnectionState.fetchingTicket;
        uiStore.connectionInfo = "Fetching login ticket.";

        // Remove any existing error messages
        uiStore.connectionError = null;

        // Post for a ticket
        Axios.post(
            `https://www.f-list.net/json/getApiTicket.php?account=${this.username}&password=${this.password}`
        ).then(response => {
            // Process the data
            let ticketObj: Types.ITicket = response.data as Types.ITicket;

            // Check for errors
            if(ticketObj.error !== ''){
                // Process error
                console.log("Error with fetched login ticket.");
                uiStore.connectionError = ticketObj.error;
                uiStore.connectionState = Enums.ConnectionState.login;
                return;
            }

            // Sort the character lists
            ticketObj.characters.sort();
            ticketObj.friends.sort((a, b) => {
                if(a.dest_name < b.dest_name) return -1;
                if(a.dest_name > b.dest_name) return 1;
                if(a.source_name < b.source_name) return -1;
                if(a.source_name > b.source_name) return 1;
                return 0;
            });
            ticketObj.bookmarks.sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });

            this.friendsList = new Array<string>();
            for(let fr of ticketObj.friends){
                this.friendsList.push(fr.source_name);
            }

            this.bookmarksList = new Array<string>();
            for(let bm of ticketObj.bookmarks){
                this.bookmarksList.push(bm.name);
            }
            
            // Set as our ticket
            this.ticket = ticketObj;

            // Switch out of the loading state
            uiStore.connectionState = Enums.ConnectionState.charSelect;
        }).catch(error => {
            uiStore.connectionError = error.toString();
            uiStore.connectionState = Enums.ConnectionState.login;
        });
    }
}