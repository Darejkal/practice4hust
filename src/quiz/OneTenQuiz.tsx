import * as React from 'react';
import NormalButton from '../component/NormalButton';
import QuestionType1 from '../component/QuestionType1';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { GlobalState } from '../global/GlobalState';
import { Poll, Question } from '../types/QuizType';
import { QuizViews } from '../view/HomeView';
import { QuizPrepare } from './QuizPrepare';

interface OneTenQuizProps {
    poll:Poll|string;
    changeView:Function
}

const OneTenQuiz: React.FC<OneTenQuizProps> = props => {
    const loading=React.useState(true);
    const quizPrepare=React.useRef<QuizPrepare>();
    const currentQuestArr=React.useState<Question[]>();
    const needToSelect=React.useState(10);
    React.useEffect(()=>{
        if (!GlobalState.quizPrepare) {
            GlobalState.quizPrepare=new QuizPrepare(props.poll)
            quizPrepare.current = GlobalState.quizPrepare;
            quizPrepare.current.shuffle();
        } else {
          quizPrepare.current = GlobalState.quizPrepare;
        }        
        currentQuestArr[1](quizPrepare.current.getCurrentArr());
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
      <TopBar>
        <TimeElapsed />
        <div>
          {quizPrepare.current &&
            `Question: ${quizPrepare.current.getCurrentIndex() + 1}-${
              quizPrepare.current.getCurrentIndex() + 10
            }/${quizPrepare.current.getPollLength()}`}
        </div>
        <div>{`Need To Select: ${needToSelect[0]}`}</div>
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
            id={i + quizPrepare.current!.getCurrentIndex() + 1}
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
                currentQuestArr[1](quizPrepare.current?.leapOn(-10));
              }}
              _active={true}
              disabled={quizPrepare.current&&quizPrepare.current.getCurrentIndex() === 0}
            >
              {"<<< Back"}
            </NormalButton>
          </div> */}
          <div>
            <NormalButton
              style={{ padding: "5px 40px 5px 40px", marginTop: "10px" }}
              onClick={() => {
                currentQuestArr[1](quizPrepare.current?.leapOn());
                needToSelect[1](10)
                window.scrollTo(0,0)
              }}
              _active={true}
              disabled={
                needToSelect[0]>0||
                quizPrepare.current&&quizPrepare.current.getCurrentIndex() ===
                quizPrepare.current.getPollLength() - 1
              }
            >
              {"Next >>>"}
            </NormalButton>
          </div>
        </div>
        {quizPrepare.current&&quizPrepare.current?.getCurrentIndex() ===
              quizPrepare.current!.getPollLength() - 1 && (
              <div style={{margin:"5px auto 5px auto"}}>
                <NormalButton onClick={()=>{
                    quizPrepare.current?.shuffle()
                    currentQuestArr[1](quizPrepare.current?.getCurrentArr());
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
