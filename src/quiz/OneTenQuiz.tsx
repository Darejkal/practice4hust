import * as React from 'react';
import NormalButton from '../component/NormalButton';
import QuestionType1 from '../component/QuestionType1';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { GlobalState } from '../global/GlobalState';
import { QuizViews } from '../view/HomeView';
import { PollPrepare, QuestionPrepare, QuizPrepare } from './QuizPrepare';
import QuizTopBar from './QuizTopBar';

interface OneTenQuizProps {
    poll:PollPrepare|string;
    changeView:Function
}

const OneTenQuiz: React.FC<OneTenQuizProps> = props => {
    const loading=React.useState(true);
    const currentQuestArr=React.useState<QuestionPrepare[]>();
    const needToSelect=React.useState(10);
    React.useEffect(()=>{
        if (!GlobalState.quizPrepare) {
            GlobalState.quizPrepare=new QuizPrepare(props.poll)
            GlobalState.quizPrepare.shuffle()
        }        
      GlobalState.HomeView.childUpdate=()=>{
        currentQuestArr[1](GlobalState.quizPrepare?.getCurrentArr());    
        console.log("updated")  
      }
        currentQuestArr[1](GlobalState.quizPrepare.getCurrentArr());
        loading[1](false);
    },[])
  return (
    <div
      className="OneTenQuiz"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <QuizTopBar>
      <div>{`Need To Select: ${needToSelect[0]}`}</div>
      </QuizTopBar>
      <div
        style={{
          paddingTop: "50px",
          paddingBottom: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {currentQuestArr[0]?.map((v, i) => (
          <QuestionType1
            style={{
              width: "",
              height: "",
              padding: "20px 0 20px 0",
              borderBottom: "0.1px dashed black",
              borderTop: i == 0 ? "0.1px dashed black" : undefined,
            }}
            key={i}
            id={i + GlobalState.quizPrepare!.getCurrentIndex() + 1}
            q={v}
            moveWillOn={() => {needToSelect[1](t=>t-1)}}
            hideSubmitButton={true}
          />
        ))}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* <div>
            <NormalButton
              style={{ padding: "5px 40px 5px 40px", marginTop: "10px" }}
              onClick={() => {
                currentQuestArr[1](GlobalState.quizPrepare?.leapOn(-10));
              }}
              _active={true}
              disabled={GlobalState.quizPrepare&&GlobalState.quizPrepare.getCurrentIndex() === 0}
            >
              {"<<< Back"}
            </NormalButton>
          </div> */}
          <div>
            <NormalButton
              style={{ padding: "5px 40px 5px 40px", marginTop: "10px" }}
              onClick={() => {
                currentQuestArr[1](GlobalState.quizPrepare?.leapOn());
                needToSelect[1](10)
                window.scrollTo(0,0)
              }}
              _active={true}
              disabled={
                needToSelect[0]>0||
                GlobalState.quizPrepare&&GlobalState.quizPrepare.getCurrentIndex() ===
                GlobalState.quizPrepare.getPollLength() - 1
              }
            >
              {"Next >>>"}
            </NormalButton>
          </div>
        </div>
        {GlobalState.quizPrepare&&GlobalState.quizPrepare?.getCurrentIndex() ===
              GlobalState.quizPrepare!.getPollLength() - 1 && (
              <div style={{margin:"5px auto 5px auto"}}>
                <NormalButton onClick={()=>{
                    GlobalState.quizPrepare?.shuffle()
                    currentQuestArr[1](GlobalState.quizPrepare?.getCurrentArr());
                    needToSelect[1](10)
                    window.scrollTo(0,0)
                }} disabled={needToSelect[0]>0} _active={true}>{`Submit&Restart`}</NormalButton>
              </div>
            )}
      </div>
    </div>
  );
};

export default OneTenQuiz;
