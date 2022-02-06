import * as React from "react";
import NormalButton from "../component/NormalButton";
import QuestionType1 from "../component/QuestionType1";
import TimeElapsed from "../component/TimeElapsed";
import TopBar from "../component/TopBar";
import { GlobalState } from "../global/GlobalState";
import { QuizViews } from "../view/HomeView";
import { PollPrepare, QuestionPrepare, QuizPrepare } from "./QuizPrepare";
import QuizTopBar from "./QuizTopBar";

interface OneOneQuizProps {
}

const OneOneQuiz: React.FC<OneOneQuizProps> = (props) => {
  const currentQuest = React.useState<QuestionPrepare>();
  const reload=React.useState(false)
  React.useEffect(() => {
    if(GlobalState.quizPrepare){
    GlobalState.HomeView.childUpdate = () => {
      currentQuest[1](GlobalState.quizPrepare?.getCurrent());
    };
    currentQuest[1](GlobalState.quizPrepare.getCurrent());
  } else {
    alert("Unknown Error occured. NL00001")
    GlobalState.HomeView.changeView("EnteringMenu")
  }
  }, []);
  return (
    <div
      className="OneOneQuiz"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <QuizTopBar />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentQuest[0] && (
          <QuestionType1
            q={currentQuest[0]}
            moveOn={() => {
              currentQuest[1](GlobalState.quizPrepare!.moveOn());
            }}
            hideSubmitButton={
              GlobalState.quizPrepare &&
              GlobalState.quizPrepare?.getCurrentIndex() >=
                GlobalState.quizPrepare!.getPollLength() - 1
            }
            reload={reload[0]}
          />
        )}
        {GlobalState.quizPrepare &&
          GlobalState.quizPrepare.getCurrentIndex() >=
            GlobalState.quizPrepare!.getPollLength() - 1 && (
            <div style={{ margin: "5px auto 5px auto" }}>
              <NormalButton
                onClick={() => {
                  GlobalState.quizPrepare?.shuffle(true);
                  currentQuest[1](GlobalState.quizPrepare?.getCurrent());
                  reload[1](t=>!t)
                }}
                _active={true}
              >{`Submit&Restart`}</NormalButton>
            </div>
          )}
      </div>
    </div>
  );
};

export default OneOneQuiz;
