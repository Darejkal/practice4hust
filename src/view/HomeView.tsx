import * as React from "react";
import { LoadingGif } from "../art";
import LoadingDots from "../component/LoadingDots";
import NormalButton from "../component/NormalButton";
import TimeElapsed from "../component/TimeElapsed";
import TopBar from "../component/TopBar";
import { defaultQuiz } from "../default/defaultQuiz";
import { GlobalState } from "../global/GlobalState";
import EnteringMenu from "../quiz/EnteringMenu";
import { ImportButton } from "../quiz/ImportExport";
import OneOneQuiz from "../quiz/OneOneQuiz";
import OneTenQuiz from "../quiz/OneTenQuiz";
interface HomeViewProps {}
export const QuizViews = ["EnteringMenu","OneOneQuiz", "OneTenQuiz"] as const;
type ____QuizViews = typeof QuizViews;
export type QuizViewsType = ____QuizViews[number];
const HomeView: React.FC<HomeViewProps> = (props) => {
  const entering = React.useState(true);
  const currentView = React.useState<QuizViewsType>("EnteringMenu");
  const changeView = (s: QuizViewsType) => {
    currentView[1](s);
  };
  React.useEffect(() => {
    GlobalState.HomeView.changeView = currentView[1];
  }, []);
  React.useEffect(() => {
    GlobalState.HomeView.currentView = currentView[0];
  }, [currentView[0]]);
  return (
    <div
      className="HomeView"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {currentView[0] == "EnteringMenu" &&<EnteringMenu onDone={()=>{}}/>}
      {currentView[0] == "OneOneQuiz" && (
        <OneOneQuiz/>
      )}
      {currentView[0] == "OneTenQuiz" && (
        <OneTenQuiz/>
      )}
    </div>
  );
};

export default HomeView;
