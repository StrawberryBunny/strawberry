import * as React from 'react';

import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';

import { uiStore } from '../../stores';

import * as Enums from '../../utils/enums';

import ToolBarButton from '../dumb/ToolBarButton';

interface IToolBarProps {
    style?: any;
}

@observer
export default class ToolBar extends React.Component<IToolBarProps, {}> {

    render(){
        return <div className={css(STYLES.main, this.props.style)}>
            <img className={css(STYLES.image)} src="images/icons/icon24.png"/>
            {Enums.TOOL_DATA.map((result, i) => {
                return <ToolBarButton key={i} 
                    icon={result.icon} 
                    title={result.title} 
                    selected={uiStore.currentTool == result.enum}
                    style={STYLES.button}
                    onClick={() => { 
                        if(uiStore.currentTool == result.enum) uiStore.currentTool = null;
                        else uiStore.currentTool = result.enum 
                    }}/>;
            })}
        </div>;
    }
}
const STYLES = StyleSheet.create({
    main: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        backgroundColor: '#252526',
        fontSize: '14pt'
    },
    image: {
        paddingTop: '5px',
        paddingBottom: '5px',
        '-webkit-app-region': 'drag'
    },
    button: {
        width: '100%'
    }
});