import * as React from 'react';
import NormalButton from '../component/NormalButton';
import QuestionType1 from '../component/QuestionType1';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { GlobalState } from '../global/GlobalState';
import { QuizViews } from '../view/HomeView';
import { PollPrepare, QuestionPrepare, QuizPrepare } from './QuizPrepare';
import QuizTopBar from './QuizTopBar';

interface OneOneQuizProps {
    poll:PollPrepare|string;
    changeView:Function;
}

const OneOneQuiz: React.FC<OneOneQuizProps> = props => {
    const loading=React.useState(false);
    const currentQuest=React.useState<QuestionPrepare>();
    React.useEffect(()=>{
      if(!GlobalState.quizPrepare){
        GlobalState.quizPrepare=new QuizPrepare(props.poll)
        GlobalState.quizPrepare.shuffle()
      }
      GlobalState.HomeView.childUpdate=()=>{currentQuest[1](GlobalState.quizPrepare?.getCurrent())}
      currentQuest[1](GlobalState.quizPrepare.getCurrent())
    },[])
  return (
    <div
      className="OneOneQuiz"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <QuizTopBar/>
      <div style={{ width: "100%", height: "100%",display:"flex",justifyContent:"center",alignItems:"center" }}>
        {currentQuest[0] && (
          <QuestionType1
            q={currentQuest[0]}
            moveOn={() => {
              currentQuest[1](GlobalState.quizPrepare!.moveOn());
            }}
          />
        )}
      </div>
      {GlobalState.quizPrepare&&GlobalState.quizPrepare?.getCurrentIndex() ===
              GlobalState.quizPrepare!.getPollLength() - 1 && (
              <div style={{margin:"5px auto 5px auto"}}>
                <NormalButton onClick={()=>{
                    GlobalState.quizPrepare?.shuffle()
                    currentQuest[1](GlobalState.quizPrepare?.getCurrent());
                }} _active={true}>{`Submit&Restart`}</NormalButton>
              </div>
            )}
    </div>
  );
};

export default OneOneQuiz;
