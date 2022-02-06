import * as React from "react";
import NormalButton from "../component/NormalButton";
import { GlobalState } from "../global/GlobalState";
import { QuizViews } from "../view/HomeView";
import { QuizPrepare } from "./QuizPrepare";

interface ImportExportProps {}

export const ImportExport: React.FC<ImportExportProps> = (props) => {
  return (
    <div
      className="ImportExport"
      key={"ImportExport"}
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ImportButton />
      <ExportButton />
      <div
        style={{
          marginLeft: "5px",
          paddingLeft: "5px",
          borderLeft: "0.5px dashed black",
        }}
      >
        <NormalButton
          key={QuizViews[0]}
          onClick={() => {
            //@ts-ignore
            GlobalState.HomeView.changeView(QuizViews[0]);
          }}
          _active={true}
          _onColor={"red"}
        >
          {QuizViews[0]}
        </NormalButton>
      </div>
    </div>
  );
};
interface EIButton {
  afterOnClick?: () => void;
  style?: React.CSSProperties;
}
export const ImportButton: React.FC<EIButton> = (props) => {
  return (
    <NormalButton
      key={"ImportButton"}
      onClick={() => {
        QuizPrepare.importLocalFromJson((v) => {
          GlobalState.quizPrepare = new QuizPrepare(v);
          GlobalState.HomeView?.childUpdate &&
            GlobalState.HomeView?.childUpdate();
          props.afterOnClick && props.afterOnClick();
        });
      }}
      style={props.style}
      _active={true}
    >
      {props.children ? props.children : "Import"}
    </NormalButton>
  );
};
export const ExportButton: React.FC<EIButton> = (props) => {
  return (
    <NormalButton
      key={"ExportButton"}
      onClick={() => {
        GlobalState.quizPrepare?.exportAsJson();
        props.afterOnClick && props.afterOnClick();
      }}
      style={props.style}
      _active={true}
      disabled={GlobalState.quizPrepare ? false : true}
    >
      {props.children ? props.children : "Export"}
    </NormalButton>
  );
};
export default ImportExport;
