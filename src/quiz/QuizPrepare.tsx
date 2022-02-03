import { Poll, Question } from "../types/QuizType";
/**Shuffle array (pseudo-randomly)
 */
export function arrShuffle(array:any[]):any[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
// class QuestionPrepare{
//     private q:Question
//     constructor(q:Question){
//         this.q=q
//     }

// }
export class QuizPrepare{
    private _pollID=-1;
    // _currentQues is index of current question
    private _currentQues=0;
    private _poll:Question[]=[]
    constructor(p:Poll|string){
        if(typeof p === "string"){
            fetch(p,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': "application/json",
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(
                    (respond:any)=>{
                        if(!respond.ok) throw new Error(respond.statusText)
                        let _p:Poll= respond.json()
                        this._pollID=_p.pollID;
                        this._currentQues=_p.currentQues;
                        this._poll=_p.poll
                    }
                ).catch((e)=>{
                    alert("Error while getting the question deck.\nPlease check if the link provided is valid.")
                })
        }
        else {
            this._pollID=p.pollID;
            this._currentQues=p.currentQues;
            this._poll=p.poll
        }
    }
    /**Shuffle the poll's order 
     * @param resetIndex :
     * - (Default behaviour) if true, set current question index to 0
     * - if false, the function only shuffle the deck
    */
    shuffle(resetIndex:boolean=true){
        this._poll=arrShuffle(this._poll)
        if(resetIndex) this._currentQues=0
    }
    private getIndex(i:number=this._currentQues){
        return this._poll[i]
    }
    private updateIndex(value:Question,i:number=this._currentQues){
        if(this._poll[i].q===value.q){
            this._poll[i]=value
            return true
        } else return false
    }
    private popIndex(){
        this._currentQues++;
        return this.getIndex()
    }
    /** return the current question*/
    getCurrent(){
        return this._poll[this._currentQues]
    }
    /** return an array of questions
     * @param startIndex index of first element of the returning array in question array
     * @param length length of the returning array
    */
    getCurrentArr(startIndex:number=this._currentQues,length:number=10){
        return this._poll.slice(startIndex,startIndex+length<this._poll.length?startIndex+length:undefined)
    }
    /** return the current questionID*/
    getCurrentIndex(){
        return this._currentQues
    }
    /** return the length of the poll*/
    getPollLength(){
        return this._poll.length
    }
    /** Either increment or decrement CurrentQuestionID and return the question at index afterwards
     * @param forward
     * - By default, forward is true and CurrenQuestionID increments
     * - If foward is false, CurrenQuestionID then derements
     * - If reached the end or returned to the beginning then no changes would be made
     */
    moveOn(forward:boolean=true){
        if(forward) {
            this._currentQues<this._poll.length&&this._currentQues++;
        }
        else {
            this._currentQues>0&&this._currentQues--;
        }
        return this._poll[this._currentQues]
    }
    /** add CurrentQuestionID by the value of length (default: 10) and then return an arrays of question at index using getCurrentArr 
     * @param length can be negative
     * The length of the returning array can be less than the specified value (length) if ID is out of deck's index.
     * - =>THEREFORE, ARRAY MIGHT BE EMPTY.
    */
    leapOn(length:number=10){
        this._currentQues+=(length);
        if(this._currentQues>=this._poll.length){
            this._currentQues=this._poll.length-1
        } else if(this._currentQues<0) {
            this._currentQues=0
        }
        return this.getCurrentArr(this._currentQues,Math.abs(length))
    }
    /** Increment the current question's answer selected state 
     * @param i index of the answer
     * @param ioq index of the question, is index of currentquestion by default 
    */
    selectAnswer(i:number,ioq:number=this._currentQues){
        this._poll[ioq].a[i].s++
    }
    /** Check if the answer isTrue or not
     * @param i index of the answer
     * @param ioq index of the question, is index of currentquestion by default 
     */
    isAnswerTrue(i:number,ioq:number=this._currentQues){
        return this._poll[ioq].a[i].c?true:false
    }
    /** Return the description about the correctness of the answer
     * @param i index of the answer
     * @param ioq index of the question, is index of currentquestion by default 
     */
    getAnswerDescription(i:number,ioq:number=this._currentQues){
        return this._poll[ioq].a[i].d?this._poll[this._currentQues].a[i].d:""
    }
}