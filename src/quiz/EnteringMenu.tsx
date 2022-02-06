import * as React from "react";
import LoadingDots from "../component/LoadingDots";
import NormalButton from "../component/NormalButton";
import defaultQuiz from "../default/defaultQuiz";
import { GlobalState } from "../global/GlobalState";
import { QuizViews } from "../view/HomeView";
import { ExportButton, ImportButton } from "./ImportExport";
import { QuizPrepare } from "./QuizPrepare";

interface EnteringMenuProps {
  onDone: () => void;
}

const EnteringMenu: React.FC<EnteringMenuProps> = (props) => {
  const loading = React.useState(false);
  const textInput = React.useState("default");
  const onEnteringDone = () => {
    props.onDone();
    GlobalState.HomeView.changeView(QuizViews[1]);
  };
  return (
    <div
      className="EnteringMenu"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "10px 0 10px 0",
          padding: "10px 100px 10px 100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>Import from URL or by Name</div>
        {loading[0] && <LoadingDots />}
        <input
          style={{ margin: "10px" }}
          type="text"
          value={textInput[0]}
          onChange={(e) => {
            textInput[1](e.target.value);
          }}
          disabled={loading[0]}
        />
        <NormalButton
          style={{ padding: "2px" }}
          onClick={() => {
            QuizPrepare.initialize(
              textInput[0] === "default" ? defaultQuiz : textInput[0],
              (v)=>{
                if(v._pollID===-1){
                  alert("Something not quite right")
                  return
                }
                GlobalState.quizPrepare=v
                GlobalState.quizPrepare.shuffle();
                onEnteringDone();
              }
            );

          }}
          _active={true}
        >
          Get The Deck
        </NormalButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px 0 10px 0",
          padding: "10px 100px 10px 100px",
          borderTop: "1px dashed black",
        }}
      >
        <div style={{ padding: "0 10px 0 10px" }}>Import by file</div>
        <ImportButton
          afterOnClick={() => {
            onEnteringDone();
          }}
        />
      </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "10px 0 10px 0",
            padding: "10px 100px 10px 100px",
            borderTop: "1px dashed black",
          }}
        >
          <div style={{ padding: "0 10px 0 10px" }}>Or</div>
          <NormalButton
            onClick={() => GlobalState.HomeView.changeView(QuizViews[1])}
            _active={true}
            disabled={GlobalState.quizPrepare?false:true}
          >
            Continue Current Deck
          </NormalButton>
          <ExportButton style={{marginLeft:"5px"}}>Export Current Deck</ExportButton>
        </div>
    </div>
  );
};

export default EnteringMenu;
