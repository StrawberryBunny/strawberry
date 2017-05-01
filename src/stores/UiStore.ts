import { observable } from 'mobx';

import * as Enums from '../utils/enums';



export default class UiStore {

    @observable public connectionState: Enums.ConnectionState = Enums.ConnectionState.login;
    @observable public connectionError: string = null;
    @observable public connectionInfo: string = null;
    @observable public maximized: boolean = false;
    @observable public currentTool: Enums.Tool = null;

}