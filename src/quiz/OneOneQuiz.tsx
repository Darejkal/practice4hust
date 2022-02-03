import * as React from 'react';
import NormalButton from '../component/NormalButton';
import QuestionType1 from '../component/QuestionType1';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { GlobalState } from '../global/GlobalState';
import { Poll, Question } from '../types/QuizType';
import { QuizViews } from '../view/HomeView';
import { QuizPrepare } from './QuizPrepare';

interface OneOneQuizProps {
    poll:Poll|string;
    changeView:Function;
}

const OneOneQuiz: React.FC<OneOneQuizProps> = props => {
    const loading=React.useState(true);
    const quizPrepare=React.useRef<QuizPrepare>();
    const currentQuest=React.useState<Question>();
    React.useEffect(()=>{
      if(!GlobalState.quizPrepare){
        GlobalState.quizPrepare=new QuizPrepare(props.poll)
        quizPrepare.current = GlobalState.quizPrepare;
        quizPrepare.current.shuffle()
      } else {
        quizPrepare.current = GlobalState.quizPrepare;
      }
      currentQuest[1](quizPrepare.current.getCurrent())
      loading[1](false)
    },[])
  return (
    <div
      className="OneOneQuiz"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TopBar>
        <TimeElapsed />
        <div>
          {quizPrepare.current &&
            `Question: ${
              quizPrepare.current.getCurrentIndex() + 1
            }/${quizPrepare.current.getPollLength()}`}
        </div>
        <div>
          {QuizViews.map((v, i) => (
            <NormalButton
              onClick={() => {
                props.changeView(v);
              }}
              _active={true}
            >
              {v}
            </NormalButton>
          ))}
        </div>
      </TopBar>
      <div style={{ width: "100%", height: "100%",display:"flex",justifyContent:"center",alignItems:"center" }}>
        {currentQuest[0] && (
          <QuestionType1
            q={currentQuest[0]}
            moveOn={() => {
              currentQuest[1](quizPrepare.current!.moveOn());
            }}
          />
        )}
      </div>
      {quizPrepare.current&&quizPrepare.current?.getCurrentIndex() ===
              quizPrepare.current!.getPollLength() - 1 && (
              <div style={{margin:"5px auto 5px auto"}}>
                <NormalButton onClick={()=>{
                    quizPrepare.current?.shuffle()
                    currentQuest[1](quizPrepare.current?.getCurrent());
                }} _active={true}>{`Submit&Restart`}</NormalButton>
              </div>
            )}
    </div>
  );
};

export default OneOneQuiz;
