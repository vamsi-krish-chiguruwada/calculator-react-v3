import React from "react";
import "./Calculator.css";
import ButtonKeyboard from "../Button/Button";
import NumberPad from "../NumberPad/numberPad";
import ButtonBgKeyboard from "../Buttonbg/ButtonBg";
// import "./mathjs";

class Calculator extends React.Component {
  state = {
    curentCalc: "",
    solution: "",
  };

  keyboardClicked = (content) => {
    if (content === "ce") {
      this.clearScreen();
    } else if (content === "⌫") {
      this.backspace();
    } else if (content === "=") {
      // this.calculate();
      // this.setState()
      // this.checkIsSymbol("a");
    } else {
      if (
        !(
          this.checkIsSymbol(content) &&
          (this.checkIsSymbol(this.state.curentCalc.slice(-1)) ||
            this.state.curentCalc.length === 0)
        )
      ) {
        let temp = this.state.curentCalc + content;
        this.setState({ curentCalc: temp });
        this.calculate(this.evalAlternate(this.convertStrToArr(temp)));
      }
    }
  };
  handleInput = (event) => {
    let temp = event.target.value;
    console.log(temp[temp.length - 1], "handleInput", temp);
    if (temp === "") {
      this.setState({ curentCalc: temp, solution: "" });
      console.log("if", event.target.value);
    } else if (
      this.checkIsSymbol(temp[temp.length - 1]) ||
      parseInt(temp[temp.length - 1]) ||
      temp[temp.length - 1] == "0"
    ) {
      this.setState({ curentCalc: temp });
      this.calculate(this.evalAlternate(this.convertStrToArr(temp)));
      console.log("elif", event.target.value);
    }
  };
  checkIsSymbol = (per) => {
    try {
      let temp = per.charCodeAt(0);
      return (
        (temp >= 42 && temp <= 43) || (temp >= 45 && temp <= 47) || temp == 94
      );
    } catch {
      return false;
    }
  };
  // error here two seperate methods needed
  calculate = (per) => {
    console.log(per, "calc");
    // if (per) {
      try {
        this.setState({
          solution: per,
        });
      } catch {
        this.setState({
          solution: this.state.solution,
        });
      }
    // } else {
    //   try {
    //     this.setState({
    //       solution: this.evalAlternate(
    //         this.convertStrToArr(this.state.curentCalc)
    //       ),
    //     });
    //   } catch {
    //     this.setState({
    //       solution: this.state.solution,
    //     });
    //   }
    // }
  };
  clearScreen = () => {
    // const temp = this.state.calulations;
    // temp.push(this.state.curentCalc);
    this.setState({ curentCalc: "", solution: "" });
  };
  backspace = (per) => {
    this.setState({
      curentCalc: this.state.curentCalc.slice(0, -1),
      solution:""
    });
  };

  evalAlternate = (per) => {
    /*
    this function iterates through the array for avery symbol in order of precidence ["^", "*", "/", "+", "-"] 
    if searches for "*" and fond it then, "found" will be set to true. in next iteration 
    if condition satisfice will do the operation and sent to temp list    
    */

    let methods = {
      "^": (a, b) => Math.pow(a, b),
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
    };

    let operators = ["^", "*", "/", "+", "-"];
    let strArr = per;
    let temp = [];
    let i = 0;
    let j = 0;
    let found = false;

    for (i = 0; i < operators.length; i += 1) {
      for (j = 0; j < strArr.length; j++) {
        if (strArr[j] === operators[i]) {
          // if the specific operator found in the list found = true and
          //  in next iteration else if will run
          found = true;
        } else if (found) {
          // performs the operation and asigns to temp list
          // methods is an obj of arrow functions
          temp[temp.length - 1] = methods[operators[i]](
            temp[temp.length - 1],
            strArr[j]
          );
          found = false;
        } else {
          // if not a symbol push to temp
          temp.push(strArr[j]);
        }
        // console.log("strArr,temp,i,j", strArr, temp, i, j);
      }
      // clears temp ans asigns new list to strArr
      // continues untill only one num left inside the list
      strArr = temp;
      temp = [];
    }
    return strArr[0];
  };
  convertStrToArr = (per) => {
    // console.log("inside convertStrToArr clicked");

    // converts string to array => "55+9+58*5-6/5" = [55,"+",9,"+",58,"*",etc...]
    // initially start = 0 and end = 0. on every iteration end incriments if it finds the sumbol(+-*/)
    // pushes the parseInt(num) (str[start to end] and str[end] to arr)
    // start = end+1,end++ this cycle continues O(n) times
    let str = per;
    let arr = [];
    let start = 0;
    let end = 0;
    let i = 0;
    // let j = 0;
    // let symbols = ["*", "+", "-", "/", "^"];

    for (i = 0; i < str.length; i++) {
      if (this.checkIsSymbol(str[i])) {
        arr.push(parseInt(str.slice(start, end)));
        arr.push(str[end]);
        start = end + 1;
        end += 1;
        // console.log("if", start, " s----e", end, "  arr  ", arr);
      } else {
        end += 1;
        // console.log("else", start, " s----e", end);
      }
    }

    // i had to use the bellow lines for situations like list ends with symbol [11,"+",2,"+"]
    arr.push(parseInt(str.slice(start)));
    console.log(arr,"str to arr");
    if (this.checkIsSymbol(str[str.length - 1])) {
      console.log(arr," if str to arr",arr.slice(0, -1));

      return arr.slice(0, -1);
    } 
    // if (arr[arr.length - 1]==NaN) {
    //   console.log(arr," if str to arr",arr.slice(0, -1));

    //   return arr.slice(0, -1);
    // } 
    else {
      console.log(arr,"else str to arr");

      return arr;
    }
  };

  render = () => {
    return (
      <div className="calc-box-lv-1 unselectable">
        <div className="calc-screen">
          <div className="calc-screen1">
            {/* <p>{this.state.curentCalc}</p> */}
            <input
              type="text"
              placeholder = "type here"
              value={this.state.curentCalc}
              onChange={(e) => this.handleInput(e)}
            ></input>
          </div>
          <div className="calc-screen2">
            <h1>{this.state.solution}</h1>
          </div>
        </div>
        <div className="empty-space-bw-screen-key">
          {/* {["(", ")"].map((per) => (
            <p key={per} onClick={() => this.keyboardClicked(per)}>
              {per}
            </p>
          ))} */}
        </div>
        <div className="calc-keyboard">
          <div className="keyboard-numbers-holder">
            <div className="symbols-in-keyboard-numbers-holder">
              {["ce", "^", "⌫"].map((per) => (
                <ButtonKeyboard
                  key={per}
                  keyboardClicked={() => this.keyboardClicked(per)}
                  content={per}
                />
              ))}
            </div>
            <div className="numbers-in-keyboard-numbers-holder">
              <NumberPad keyboardClicked={this.keyboardClicked} />
            </div>
          </div>
          <div className="keyboard-symbols">
            {["/", "*", "-", "+", "="].map((per) => (
              <ButtonBgKeyboard
                key={per}
                content={per}
                keyboardClicked={this.keyboardClicked}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
}
export default Calculator;
