import { observable } from 'mobx';

import * as Enums from '../utils/enums';
import TitleBar from '../components/dumb/TitleBar';
import TitleBarButton from '../components/dumb/TitleBarButton';


export default class UiStore {

    @observable public connectionState: Enums.ConnectionState = Enums.ConnectionState.login;
    @observable public connectionError: string = null;
    @observable public connectionInfo: string = null;
    @observable public maximized: boolean = false;
    @observable public currentTool: Enums.Tool = null;
    @observable public selectedChannel: string = null;
    
    // Channels Panel
    @observable public channelsSortingMethod: Enums.SortingMethod = Enums.SortingMethod.alphaAsc;

}