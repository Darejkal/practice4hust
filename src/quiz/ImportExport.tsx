import * as React from 'react';
import NormalButton from '../component/NormalButton';
import { GlobalState } from '../global/GlobalState';
import { QuizPrepare } from './QuizPrepare';

interface ImportExportProps {}

const ImportExport: React.FC<ImportExportProps> = props => {
  return <div className="ImportExport" style={{
    display:"flex",
    flexDirection:"row"
  }}>
      <NormalButton onClick={()=>{
          QuizPrepare.importFromJson((v)=>{
            GlobalState.quizPrepare=new QuizPrepare(v)
            GlobalState.HomeView?.childUpdate&&GlobalState.HomeView?.childUpdate()
          })
          }} _active={true}>Import</NormalButton>
      <NormalButton onClick={()=>{
          GlobalState.quizPrepare?.exportAsJson()
          GlobalState.HomeView?.childUpdate&&GlobalState.HomeView?.childUpdate()
        }} _active={true}>Export</NormalButton></div>;
};

export default ImportExport;
