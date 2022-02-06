import * as React from 'react';
import NormalButton from '../component/NormalButton';
import TimeElapsed from '../component/TimeElapsed';
import TopBar from '../component/TopBar';
import { GlobalState } from '../global/GlobalState';
import { QuizViews, QuizViewsType } from '../view/HomeView';
import ImportExport from './ImportExport';

interface QuizTopBarProps {}

const QuizTopBar: React.FC<QuizTopBarProps> = props => {
  return <div className="QuizTopBar">
      <TopBar>
        <TimeElapsed />
        <div key={"CurrentQuestion"}>
          {GlobalState.quizPrepare &&
            `Question: ${
              GlobalState.quizPrepare.getCurrentIndex() + 1
            }${GlobalState.HomeView.currentView=="OneTenQuiz"?`-${GlobalState.quizPrepare.getCurrentIndex() + GlobalState.quizPrepare.getCurrentArr().length}`:""}/${GlobalState.quizPrepare.getPollLength()}`}
        </div>
        {props.children}
        <div key={"ChangeView"}>
          {GlobalState.HomeView.changeView&&QuizViews.map((v, i) => (
            i!=0&&<NormalButton
              key={i}
              onClick={() => {
                  //@ts-ignore
                GlobalState.HomeView.changeView(v);
              }}
              disabled={v==GlobalState.HomeView.currentView}
              _active={true}
            >
              {v}
            </NormalButton>
          ))}
        </div>
        <ImportExport/>
      </TopBar>
  </div>;
};

export default QuizTopBar;
