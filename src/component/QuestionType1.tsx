import { Answer, Question } from "../types/QuizType";
import NormalButton from "./NormalButton";
import * as React from 'react';
import { arrShuffle } from "../quiz/QuizPrepare";

interface QuestionType1Props {
    q:Question,
    /**Function to run after Submit Question, used for OneOneQuiz */
    moveOn?:Function,
    /**Function to run before Submit Question, used for OneTenQuiz */
    moveWillOn?:Function,
    hideSubmitButton?:boolean,
    style?:React.CSSProperties,
    id?:number
}

export const QuestionType1: React.FC<QuestionType1Props> = ({q,moveOn=()=>{},moveWillOn=()=>{},hideSubmitButton=false,style,id}) => {
    const showAnswerState=React.useState(false);
    const needToSelect=React.useRef(0);
    const selected=React.useState(0);
    const answers=React.useState<Answer[]>([]);
    /** Used for SubmitButton and other (to simulate SubmitButtonClick) */
    const handleSubmit=()=>{
      if (showAnswerState[0]) {
        moveOn();
        prepareDisplay()
      } else {
        moveWillOn()
      }
      showAnswerState[1](v=>!v);
    }
    /**Adjust the number of answers that need to be selected and shuffle the answer  */
    const prepareDisplay=()=>{
      needToSelect.current = q.a
      .map((v): number => {
        return v.c ? 1 : 0;
      })
      .reduce((p, c) => p + c);
      selected[1](0);
      answers[1](arrShuffle(q.a));
    }
    React.useEffect(()=>{
      prepareDisplay()
      showAnswerState[1](false);
    },[q])
    React.useEffect(()=>{
        if(selected[0]>=needToSelect.current){
            handleSubmit()
        }
        // console.log(`${selected[0]}/${needToSelect.current}`)
    },[selected[0]])
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          width: "100%",
          // height: "100%",
          ...style
        }}
      >
        <div style={{ marginLeft: "20%", marginRight: "20%" }}>
          <div style={{ marginBottom: "10px" }}>{`${id?`${id}.`:""} ${q.q}`}</div>
          <div style={{ marginLeft: "10%" }}>
            {answers[0].map((v, i) => {
              return (
                <QuestionButton
                  key={i}
                  a={v}
                  activeState={showAnswerState[0]}
                  onClick={() => {
                    selected[1]((s) => s + 1);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div
        hidden={hideSubmitButton}
        style={{
          marginLeft:"auto",
          marginRight:"auto"
        }}
        >
        <NormalButton
          _active={true}
          onClick={() => {
            handleSubmit()
          }}
          _onColor="#FC4F4F"
          style={{
            paddingLeft: "90px",
            paddingRight: "90px",
            marginTop: "10px",

          }}
        >
          {showAnswerState[0] ? "Next" : "Submit" }
        </NormalButton>
        </div>
      </div>
    );
};
export default QuestionType1

interface QuestionButtonProps {
    a:Answer,
    activeState:boolean,
    onClick:Function
}

const QuestionButton: React.FC<QuestionButtonProps> = ({a,activeState,onClick}) => {
    const pressed=React.useState(false);
    const opacity=React.useState(1);
    React.useEffect(()=>{
        pressed[1](false)
    },[a])
    React.useEffect(()=>{
        pressed[1](activeState)
    },[activeState])
    const onClickHandle=()=>{
        if(!pressed[0]){
            pressed[1](p=>!p)
            a.c?a.s++:a.s--
        }
        onClick()
    }
    return (
      <div style={{ display: "flex",opacity:opacity[0] }}>
        <NormalButton
          onClick={onClickHandle}
          _active={pressed[0]}
          disabledWithOpacity={pressed[0]}
          _onColor={a.c?"#91C483":"#FF6464"}
        >
          {a.v}
        </NormalButton>
        <div
          style={{
            padding: "5px",
          }}
        >
          {pressed[0]&&a.s}
        </div>
      </div>
    );
};

