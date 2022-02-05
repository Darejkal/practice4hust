import * as React from 'react';
import { LoadingGif } from '../art';
import LoadingDots from '../component/LoadingDots';
import NormalButton from '../component/NormalButton';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { defaultQuiz } from '../default/defaultQuiz';
import { GlobalState } from '../global/GlobalState';
import OneOneQuiz from '../quiz/OneOneQuiz';
import OneTenQuiz from '../quiz/OneTenQuiz';
interface HomeViewProps {}
export const QuizViews=["OneOneQuiz","OneTenQuiz"] as const
type ____QuizViews=typeof QuizViews
export type QuizViewsType=____QuizViews[number]
const HomeView: React.FC<HomeViewProps> = props => {
  const textInput=React.useState("default")
  const entering=React.useState(true);
  const loading=React.useState(false);
  const currentView=React.useState<QuizViewsType>("OneTenQuiz");
  const changeView=(s:QuizViewsType)=>{
    currentView[1](s)
  }
  React.useEffect(()=>{
    GlobalState.HomeView.changeView=currentView[1]
  },[])
  React.useEffect(()=>{
    GlobalState.HomeView.currentView=currentView[0]
  },[currentView[0]])
  return (
    <div
      className="HomeView"
      style={{
        width: "100%",
        height: "100%",}}
    >
      {entering[0] && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
              entering[1](false)              
            }}
            _active={false}
          >
            Get The Deck
          </NormalButton>
        </div>
      )}
      {!entering[0]&&currentView[0]=="OneOneQuiz" && <OneOneQuiz changeView={changeView} poll={textInput[0]==="default"?defaultQuiz:textInput[0]} />}
      {!entering[0] && currentView[0]=="OneTenQuiz"&& <OneTenQuiz changeView={changeView} poll={textInput[0]==="default"?defaultQuiz:textInput[0]} />}
    </div>
  );
};

export default HomeView;
