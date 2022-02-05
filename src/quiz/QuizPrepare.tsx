/**Shuffle array (pseudo-randomly)
 * Since array is passed by reference, this will change array **IN PLACE**
 */
export function arrShuffleInPlace(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
/**Shuffle array (pseudo-randomly)
 * This will create a **SHALLOW COPY** of the array and then shuffle it.
 */
export function arrShuffleShallowly(array: any[]): any[] {
  let newArr = [...array];
  let currentIndex = newArr.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArr[currentIndex], newArr[randomIndex]] = [
      newArr[randomIndex],
      newArr[currentIndex],
    ];
  }
  return newArr;
}
/** Download the specified data (actually string)
 * @param data string of data (Object should be JSON.stringfied)
 * @param filename name of the exported file (default is newfile)
 * @param type type of the exported file (default is txt)
 */
function fDownload(
  data: string,
  filename: string = "newfile",
  type: string = "text/plain"
) {
  filename = JSON.stringify(filename);
  var file = new Blob([data], { type: type });
  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
/**
 * Open a generic file
 * @param extension Extension to show in file explorer when user first open
 * @param callback Callback to open file
 * Eg: extension=json would only show json file when file explorer first appeared.
 */
function fOpen(
  extension: string = "",
  callback: (this: HTMLInputElement, ev: Event) => any
) {
  var input = document.createElement("input");
  input.setAttribute("id", "file-input");
  input.setAttribute("type", "file");
  input.setAttribute("name", "name");
  input.setAttribute("style", "display:none;");
  input.setAttribute("accept", extension);
  input.click();
  input.addEventListener("change", callback);
}
/**
 *
 * @param callback Function to call when Object is get. If callback return false, Error alert is called
 * @param errorHandle Function to call if error is caught
 * @param type Type of the receiving file
 */
function checkIfValid<T>(value: any, sample: T): boolean {
  if (typeof sample === "undefined") return true;
  if (sample instanceof Array) {
    if (value instanceof Array)
      return value.every((v) => checkIfValid(v, sample[0]));
    else {
      alert(JSON.stringify(value) + " | " + JSON.stringify(sample));
      return false;
    }
  } else if (sample instanceof Object) {
    if (value instanceof Object) {
      for (const prop in sample) {
        if (typeof value[prop] === typeof sample[prop]) {
          if (typeof sample[prop] === "object") {
            if (!checkIfValid(value[prop], sample[prop])) {
              {
                return false;
              }
            }
          }
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return typeof value === typeof sample;
  }
}
function importJsonFile<Type>(
  callback: (value: Type) => void,
  errorHandle: () => void,
  sampleOfResult: Type
) {
  fOpen(".json", (evt) => {
    try {
      //@ts-ignore
      var files = evt?.target?.files;
      if (!files || files.length == 0)
        throw "Something wrong happened. Please try again. (Code : N0012)";
      var file = files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (typeof e?.target?.result == "string") {
            let temp: any = JSON.parse(e.target.result);
            if (!temp || !checkIfValid<Type>(temp, sampleOfResult)) {
              throw "T0001";
            }
              callback(temp);
          } else {
            throw "E0000";
          }
        } catch (e) {
          alert(
            `Something wrong happened. Please try again. (Code : ${
              typeof e === "string" ? e : "E0001"
            })`
          );
          errorHandle();
        }
      };
      // Read in the image file as a data URL.
      reader.readAsText(file);
    } catch (e) {
      alert(
        `Something wrong happened. Please try again. (Code : ${
          typeof e === "string" ? e : "E0001"
        })`
      );
      errorHandle();
    }
  });
}
export const yyyymmdd = (date: Date) =>
  date.toISOString().slice(0, 10).replace(/-/g, "");
/**
 * Deshuffle array
 * @param orignalArr The orignal array of Objects containing i (which stands for id) to  *deshuffled*
 * @returns A shallow-coppied array that is *deshuffled*
 */
function getDeshuffledArrByID<T>(orignalArr: T[], ID: keyof T) {
  return [...orignalArr].sort((a, b) =>
    a[ID] > b[ID] ? 1 : a[ID] === b[ID] ? 0 : -1
  );
}

// class QuestionPrepare{
//     private q:Question
//     constructor(q:Question){
//         this.q=q
//     }

// }
export class QuizPrepare {
  private _pollID = -1;
  // _currentQues is index of current question
  private _currentQues = 0;
  private _poll: QuestionPrepare[] = [];
  constructor(p: PollPrepare | string) {
    this.initialize(p);
  }
  /**
   * QuizPrepare constructor call this function
   * Use this when QuizPrepare need reinitialized
   * @param p new Poll to (re)initialize from
   */
  private initialize(p: PollPrepare | string) {
    if (typeof p === "string") {
      fetch(p, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((respond: any) => {
          if (!respond.ok) throw new Error(respond.statusText);
          let _p: PollPrepare = respond.json();
          this._pollID = _p.pollID;
          this._currentQues = _p.currentQues;
          this._poll = _p.poll;
        })
        .catch((e) => {
          alert(
            "Error while getting the question deck.\nPlease check if the link provided is valid."
          );
        });
    } else {
      this._pollID = p.pollID;
      this._currentQues = p.currentQues;
      this._poll = p.poll;
    }
  }
  /**Shuffle the poll's order
   * @param resetIndex :
   * - (Default behaviour) if true, set current question index to 0
   * - if false, the function only shuffle the deck
   */
  shuffle(resetIndex: boolean = true) {
    arrShuffleInPlace(this._poll);
    if (resetIndex) this._currentQues = 0;
  }
  private getIndex(i: number = this._currentQues) {
    return this._poll[i];
  }
  private updateIndex(value: QuestionPrepare, i: number = this._currentQues) {
    if (this._poll[i].q === value.q) {
      this._poll[i] = value;
      return true;
    } else return false;
  }
  private popIndex() {
    this._currentQues++;
    return this.getIndex();
  }
  /** return the current question*/
  getCurrent() {
    return this._poll[this._currentQues];
  }
  /** return an array of questions
   * @param startIndex index of first element of the returning array in question array
   * @param length length of the returning array
   */
  getCurrentArr(startIndex: number = this._currentQues, length: number = 10) {
    return this._poll.slice(
      startIndex,
      startIndex + length < this._poll.length ? startIndex + length : undefined
    );
  }
  /** return the current questionID*/
  getCurrentIndex() {
    return this._currentQues;
  }
  /** return the length of the poll*/
  getPollLength() {
    return this._poll.length;
  }
  /** Either increment or decrement CurrentQuestionID and return the question at index afterwards
   * @param forward
   * - By default, forward is true and CurrenQuestionID increments
   * - If foward is false, CurrenQuestionID then derements
   * - If reached the end or returned to the beginning then no changes would be made
   */
  moveOn(forward: boolean = true) {
    if (forward) {
      this._currentQues < this._poll.length && this._currentQues++;
    } else {
      this._currentQues > 0 && this._currentQues--;
    }
    return this._poll[this._currentQues];
  }
  /** add CurrentQuestionID by the value of length (default: 10) and then return an arrays of question at index using getCurrentArr
   * @param length can be negative
   * The length of the returning array can be less than the specified value (length) if ID is out of deck's index.
   * - =>THEREFORE, ARRAY MIGHT BE EMPTY.
   */
  leapOn(length: number = 10) {
    this._currentQues += length;
    if (this._currentQues >= this._poll.length) {
      this._currentQues = this._poll.length - 1;
    } else if (this._currentQues < 0) {
      this._currentQues = 0;
    }
    return this.getCurrentArr(this._currentQues, Math.abs(length));
  }
  /** Increment the current question's answer selected state
   * @param i index of the answer
   * @param ioq index of the question, is index of currentquestion by default
   */
  selectAnswer(i: number, ioq: number = this._currentQues) {
    this._poll[ioq].a[i].s++;
  }
  /** Check if the answer isTrue or not
   * @param i index of the answer
   * @param ioq index of the question, is index of currentquestion by default
   */
  isAnswerTrue(i: number, ioq: number = this._currentQues) {
    return this._poll[ioq].a[i].c ? true : false;
  }
  /** Return the description about the correctness of the answer
   * @param i index of the answer
   * @param ioq index of the question, is index of currentquestion by default
   */
  getAnswerDescription(i: number, ioq: number = this._currentQues) {
    return this._poll[ioq].a[i].d ? this._poll[this._currentQues].a[i].d : "";
  }
  /**
   *
   * @returns The quiz deck (shallow-coppied) with the original order
   */
  getPollOriginalOrder() {
    return getDeshuffledArrByID<QuestionPrepare>(this._poll, "i");
  }
  /**
   *
   * @param name name of the exporting file, is the exporting date by default.
   */
  exportAsJson(name?: string) {
    let e: PollPrepare = {
      pollID: this._pollID,
      currentQues: this._currentQues,
      poll: this.getPollOriginalOrder(),
    };
    fDownload(
      JSON.stringify(e),
      "QuizExport" + (name ? name : yyyymmdd(new Date())) + ".json",
      "application/json"
    );
  }
  static importFromJson(callback: (v: PollPrepare) => void) {
    importJsonFile<PollPrepare>(callback
    , () => {}, SamplePoll);
  }
  private importFromJson() {
    let done = false;
    importJsonFile<PollPrepare>(
      (v) => {
        this.initialize(v);
        this.shuffle();
        done = true;
      },
      () => {},
      SamplePoll
    );
    return done;
  }
}
export class PollPrepare {
  pollID: number;
  currentQues: number;
  poll: QuestionPrepare[];
  constructor(pollID: number, currentQues: number, poll: QuestionPrepare[]) {
    this.pollID = pollID;
    this.currentQues = currentQues;
    this.poll = poll;
  }
}
//**QuestionsPrepare is actually property "poll" of PollPrepare */
export class QuestionPrepare {
  i: number;
  q: string;
  a: AnswerPrepare[];
  //**QuestionsPrepare is actually property "poll" of PollPrepare */
  constructor(i: number, q: string, a: AnswerPrepare[]) {
    this.i = i;
    this.q = q;
    this.a = a;
  }
}

export class AnswerPrepare {
  i: number;
  v: string;
  s: number;
  c?: string;
  d?: string;
  constructor(i: number, v: string, s: number, c?: string, d?: string) {
    this.i = i;
    this.v = v;
    this.s = s;
    this.c = c;
    this.d = d;
  }
}
export const SamplePoll: PollPrepare = {
  pollID: 0,
  currentQues: 0,
  poll: [
    {
      i: 0,
      q: "",
      a: [
        {
          i: 0,
          v: "",
          s: 0,
        },
      ],
    },
  ],
};
