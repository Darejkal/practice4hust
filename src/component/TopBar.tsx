import * as React from 'react';
import { GlobalState } from '../global/GlobalState';
import NormalButton from './NormalButton';

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = props => {
  const hideChildren=React.useState(true);
  React.useEffect(()=>{
    hideChildren[1](GlobalState.topBarHideChildren)
  },[])
  return (
    <div
      className="TopBar"
      style={{
        position: "fixed",
        width: hideChildren ? "fit-content" : "100%",
        top: "0px",
        left: "0px",
        paddingTop: "5px",
        paddingBottom: "5px",
        backgroundColor: "#FF9F45",
        display: "flex",
        flexWrap:"wrap"
      }}
    >
      {!hideChildren[0] && props.children}
      <NormalButton
        key={"hideChildren"}
        onClick={() => {
          hideChildren[1]((t) => {
            GlobalState.topBarHideChildren=!t
            return !t;
          });
        }}
        _active={true}
      >
        ≡
      </NormalButton>
    </div>
  );
};

export default TopBar;
