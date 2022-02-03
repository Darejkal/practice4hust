import * as React from 'react';

interface NormalButtonProps {
    onClick:Function;
    _active:boolean;
    _onColor?:string;
    _offColor?:string;
    style?:React.CSSProperties;
    /**This will use React/HTML normal disabled (which includes reducing Opacity)*/
    disabled?:boolean;
    /**This will disable onClick if being set to true (no Opacity changes)*/
    disabledWithOpacity?:boolean;
}

const NormalButton: React.FC<NormalButtonProps> = props => {
    const bOpacity = React.useState(1);
    const onColor= React.useState("#F76E11")
    const offColor= React.useState("#FF9F45")
    //Change Color based on on/off seted
    React.useEffect(()=>{
        props._onColor&&onColor[1](props._onColor)
    },[props._onColor])
    React.useEffect(()=>{
        props._offColor&&offColor[1](props._offColor)
    },[props._offColor])
    return (
        <button
        style={{
            opacity:bOpacity[0],
            backgroundColor:props._active?onColor[0]:offColor[0],
            padding:"5px",
            ...props.style
        }}
        onClick={()=>{
            !props.disabledWithOpacity&&props.onClick()
        }}
        onMouseEnter={()=>{
            bOpacity[1](0.8)
        }}
        onMouseLeave={()=>{
            bOpacity[1](1)
        }}
        disabled={props.disabled==undefined?false:props.disabled}
        >{props.children}</button>
    );
};

export default NormalButton;
