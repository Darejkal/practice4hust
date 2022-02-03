export type Poll={
    pollID:number;
    currentQues:number,
    poll:Question[]
}
export type Question={
    i:number;
    q:string;
    a:Answer[]
}
/** The AnswerType
 * @param i index of the answer
 * @param v value of the answer
 * @param s the number of time the answer is selected
 * @param c represent the correctness of the answer. The value can be any. Undefined or null value represents wrong answer by default
 * @param d the description of the answer (to explain why it is correct/false)
 */
export type Answer={
    i:number;
    v:string;
    s:number;
    c?:string;
    d?:string
}