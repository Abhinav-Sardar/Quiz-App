var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
getQuestion();
function getQuestion() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, shuffled, question__count, randomNumber, question;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('./Questions.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    shuffled = [];
                    question__count = 0;
                    while (question__count !== 10) {
                        randomNumber = Math.floor(Math.random() * data.length);
                        question = data[randomNumber];
                        if (question) {
                            shuffled.push(question);
                            data.splice(randomNumber, 1);
                            question__count++;
                        }
                        if (question__count === 10) {
                            console.log(data);
                            // console.log(shuffled)
                            questions = shuffled;
                            setQuestion(question_index);
                            setTimer();
                            break;
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var returnStatus;
returnStatus = function () {
    if (score <= 300) {
        return falsy;
    }
    else if (score > 300 && score <= 600) {
        return 'gold';
    }
    else {
        return truthsy;
    }
};
var btns = document.querySelectorAll(".btn");
function hideElement(ElementList) {
    ElementList.forEach(function (element) { return element.style.display = "none"; });
}
var main_div = document.getElementById("main_cont");
var timer_Cont = document.getElementById("timer_cont");
var score_cont = document.getElementById("score");
var question_cont = document.getElementById("question_cont");
var count = 16;
var question_index = 0;
var btn1 = document.getElementById("opt1");
var btn2 = document.getElementById("opt2");
var btn3 = document.getElementById("opt3");
var btn4 = document.getElementById("opt4");
// grabbing elements from DOM 
var score = 0;
var SuccessSound = new Audio("./SuccessSound.mp3");
var ErrorSound = new Audio("./ErrorSound.mp3");
var questions;
var truthsy = "rgb(0, 253, 106)";
var falsy = "rgb(255, 16, 16)";
var primary = 'rgb(4, 133, 255)';
score_cont.innerHTML = "Score : " + score;
function IncrementScore() {
    score += 100;
    score_cont.innerText = "Score : " + score;
}
function setTimer() {
    var intervalSetter = setInterval(function () {
        timer_Cont.style.color = "white";
        if (count === 0) {
            clearInterval(intervalSetter);
            SetTheme(falsy);
            CreateMessage("Time Up");
            CreateNXTBTN();
            count = 15;
            ErrorSound.play();
        }
        else {
            count--;
            timer_Cont.innerText = "Time Remaining : " + count;
        }
    }, 1000);
    btn1.onclick = function () {
        var currentQuestionOBJ = questions[question_index - 1];
        //log(question_index)
        //log(btn1.innerText , currentQuestionOBJ.correctOpt)
        clearInterval(intervalSetter);
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if (btn1.innerHTML !== currentQuestionOBJ.correctOpt) {
            SetTheme(falsy);
            CreateMessage("Wrong Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            ErrorSound.play();
        }
        else {
            SetTheme(truthsy);
            CreateMessage("Correct Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            IncrementScore();
            SuccessSound.play();
        }
    };
    btn2.onclick = function () {
        var currentQuestionOBJ = questions[question_index - 1];
        //log(btn2.innerText , currentQuestionOBJ.correctOpt)
        clearInterval(intervalSetter);
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if (btn2.innerHTML !== currentQuestionOBJ.correctOpt) {
            SetTheme(falsy);
            CreateMessage("Wrong Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            ErrorSound.play();
        }
        else {
            SetTheme(truthsy);
            CreateMessage("Correct Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            IncrementScore();
            SuccessSound.play();
        }
    };
    btn3.onclick = function () {
        var currentQuestionOBJ = questions[question_index - 1];
        clearInterval(intervalSetter);
        if (btn3.innerText !== currentQuestionOBJ.correctOpt) {
            SetTheme(falsy);
            CreateMessage("Wrong Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            ErrorSound.play();
        }
        else {
            SetTheme(truthsy);
            CreateMessage("Correct Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            IncrementScore();
            SuccessSound.play();
        }
    };
    btn4.onclick = function () {
        var currentQuestionOBJ = questions[question_index - 1];
        clearInterval(intervalSetter);
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if (btn4.innerText !== currentQuestionOBJ.correctOpt) {
            SetTheme(falsy);
            CreateMessage("Wrong Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            ErrorSound.play();
        }
        else {
            SetTheme(truthsy);
            CreateMessage("Correct Answer");
            clearInterval(intervalSetter);
            CreateNXTBTN();
            IncrementScore();
            SuccessSound.play();
        }
        //log(btn4.innerText , currentQuestionOBJ.correctOpt)
    };
}
function SetTheme(status) {
    btns.forEach(function (btn) {
        btn.style.backgroundColor = status;
        btn.setAttribute("disabled", "disabled");
        document.body.style.backgroundColor = status;
    });
}
function setQuestion(index) {
    var currentQuestionOBJ = questions[index];
    if (currentQuestionOBJ === undefined) {
        document.body.classList.remove('preventScroll');
        document.body.classList.add('showScroll');
        hideElement([main_div, btn1, btn2, btn3, btn4, timer_Cont, score_cont]);
        document.body.style.backgroundColor = 'white';
        var status_1 = returnStatus();
        document.body.innerHTML = "\n        <center>\n        <h1 style = \"color:white ;background-color:" + status_1 + ";margin:0;padding:0;width:100%;\">Score:" + score + "/1000</h1>\n    </center>\n    <center><h2>Question And Answers</h2></center>\n        ";
        questions.forEach(function (ques) {
            document.body.innerHTML += "\n            <h1>Q." + ques.qq + "</h1>\n            <h2>i)" + ques.opt1 + "</h2>\n            <h2>ii)" + ques.opt2 + "</h2>\n            <h2>iii)" + ques.opt3 + "</h2>\n            <h2>iv)" + ques.opt4 + "</h2>\n            <h2>Correct Answer: " + ques.correctOpt + "</h2>\n            <hr color = \"black\"/>\n            ";
        });
        document.body.style.backgroundColor = 'white';
        document.body.innerHTML += "\n        <center>\n        <h1>Rate Us</h1>\n        <div class=\"starsconts\"><i class=\"fas fa-star grey\"></i></div>\n        <div class=\"starsconts\"><i class=\"fas fa-star grey\"></i></div>\n        <div class=\"starsconts\"><i class=\"fas fa-star grey\"></i></div>\n        <div class=\"starsconts\"><i class=\"fas fa-star grey\"></i></div>\n        <div class=\"starsconts\"><i class=\"fas fa-star grey\"></i></div><br>\n        <span>Click on the stars to rate.</span><br>\n        <h2>Your Name</h2><br>\n        <form  id = 'submit' autocomplete = 'off'>\n        <input type=\"text\" id=\"inp\">\n        <br>\n        <button type = 'submit'>\n            Submit\n        </button>\n        </form>\n\n        </form>\n    </center>";
        setInterval(function () {
            document.querySelectorAll('.grey').forEach(function (star) { return star.onclick = function () {
                star.classList.remove('grey');
                star.classList.add('gold');
            }; });
            document.querySelectorAll('.gold').forEach(function (star) { return star.onclick = function () {
                star.classList.remove('gold');
                star.classList.add('grey');
            }; });
        });
        var inp_1 = document.getElementById('inp');
        var submit = document.getElementById('submit');
        submit === null || submit === void 0 ? void 0 : submit.addEventListener("submit", function (e) {
            e.preventDefault();
            var goldies = document.querySelectorAll('.gold');
            var goldLen = goldies.length;
            var inpVal = inp_1 === null || inp_1 === void 0 ? void 0 : inp_1.value;
            fetch('./Scores.json', {
                method: "POST",
                body: JSON.stringify({
                    name: inpVal,
                    score: score,
                    rating: goldLen
                }),
                headers: {
                    'Accept': "application/json , */*, text/plain",
                    "Content-type": "application/json"
                }
            }).then(function (res) {
                console.log(res.status);
                return res.json().then(function (data) {
                    console.log(data);
                });
            });
            document.body.innerHTML = "\n        <center>\n        <h1>Your Response Was Recorded</h1><br/>\n        <h2>Thanks for giving the test</h2>\n    </center>\n        ";
        });
    }
    else {
        SetTheme(primary);
        btns.forEach(function (btn) { return btn.removeAttribute("disabled"); });
        btns[0].innerHTML = currentQuestionOBJ.opt1;
        btns[1].innerHTML = currentQuestionOBJ.opt2;
        btns[2].innerHTML = currentQuestionOBJ.opt3;
        btns[3].innerHTML = currentQuestionOBJ.opt4;
        if (currentQuestionOBJ.qq.length > 70) {
            question_cont === null || question_cont === void 0 ? void 0 : question_cont.style.width = '99%';
        }
        else if (currentQuestionOBJ.qq.length > 30 && currentQuestionOBJ.qq.length < 70) {
            question_cont === null || question_cont === void 0 ? void 0 : question_cont.style.width = '70%';
        }
        else {
            question_cont.style.width = '45%';
        }
        question_cont.innerText = currentQuestionOBJ.qq;
        question_index++;
    }
}
function CreateMessage(message) {
    var element = document.createElement("h2");
    element.innerHTML = message;
    element.setAttribute("class", "msg");
    main_div.appendChild(element);
}
function CreateNXTBTN() {
    var element = document.createElement("button");
    var parent = document.createElement('center');
    parent.appendChild(element);
    element.classList.add('msg');
    // parent.style.alignItems = 'center'
    element.classList.add("btn");
    element.innerText = "Next Question";
    element.style.backgroundColor = primary;
    element.addEventListener("click", function () {
        if (questions[question_index] !== undefined) {
            count = 15;
            timer_Cont.innerText = "Time Remaining : " + count;
            setTimer();
            setQuestion(question_index);
        }
        else {
            setQuestion(question_index);
        }
        // SetTheme("blue")
        var removed = [];
        var msgs = document.querySelectorAll(".msg");
        msgs.forEach(function (msg) { return removed.push(msg); });
        removed.push(element);
        hideElement(removed);
    });
    main_div.appendChild(parent);
}
;
function setUser(data) {
    fetch('./Scores.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json ; charset = UTF-8'
        },
        body: JSON.stringify(data)
    }).then(function (res) { return res.json().then(function (actualResponse) {
        console.log('Response Posted');
        console.log(actualResponse);
    }); });
}
