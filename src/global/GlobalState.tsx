import { QuizPrepare } from "../quiz/QuizPrepare";
import { QuizViewsType } from "../view/HomeView";
// let CODE={
//     SUCCESS:"00001",
//     FAILED:"00002",
//     NULL:"00003",
//     INVALID:"00010",
//     OVERLOAD:"00020"
// }
export let GlobalState={
    time:Date.now(),
    topBarHideChildren:true,
    quizPrepare:undefined as QuizPrepare|undefined,
    HomeView:{
        changeView: ((v:QuizViewsType)=>{}) as ((v:QuizViewsType)=>void),
        currentView: undefined as QuizViewsType|undefined,
        childUpdate: undefined as undefined|(()=>void),
    }
}