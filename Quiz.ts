getQuestion() ; 
async function getQuestion(){
    let response = await fetch('./Questions.json') ; 
    let data = await response.json() ; 
    //log(data) ; 
    let shuffled:[]= [] ; 
    let question__count=0 ;
    while(question__count !== 10){
        let randomNumber = Math.floor(Math.random()*data.length) ; 
        let question  = data[randomNumber] ; 
        if(question){
            shuffled.push(question) ; 
            data.splice(randomNumber , 1) ; 
            question__count++ ; 
        }
        if(question__count === 10){
            console.log(data) ; 
            // console.log(shuffled)
            questions = shuffled ; 
            setQuestion(question_index) ;  
            setTimer() ;
            break ; 
        }
    }
}
let returnStatus:() => string ; 
returnStatus = () => {
    if(score<=300){
        return falsy;
    }
    else if(score >300&&score<=600){
        return 'gold' ; 
    }
    else{
        return truthsy ; 
    }
}
let btns = document.querySelectorAll(".btn") ; 
function hideElement (ElementList:HTMLElement[]){
    ElementList.forEach(element => element.style.display = "none") ; 
}
let main_div:HTMLElement = document.getElementById("main_cont") ;  
let timer_Cont = document.getElementById("timer_cont") ; 
let score_cont = document.getElementById("score") ; 
let question_cont = document.getElementById("question_cont") ; 
let count :number = 16 ;
let question_index:number = 0 ;  
let btn1 = document.getElementById("opt1") ; 
let btn2 = document.getElementById("opt2") ; 
let btn3 = document.getElementById("opt3") ; 
let btn4= document.getElementById("opt4") ; 
// grabbing elements from DOM 
let score  = 0 ; 
let SuccessSound = new Audio("./SuccessSound.mp3") ;
let ErrorSound = new Audio("./ErrorSound.mp3") ; 
let questions:{
    qq:string , 
    opt1:string , 
    opt2:string , 
    opt3:string , 
    opt4:string , 
    correctOpt:string , 
}[] ; 
let truthsy = "rgb(0, 253, 106)" ;
let falsy = "rgb(255, 16, 16)" ; 
let primary = 'rgb(4, 133, 255)' ; 
score_cont.innerHTML = `Score : ${score}` ; 
function IncrementScore() {
    score += 100 ; 
    score_cont.innerText = `Score : ${score}`  ; 
}
function setTimer () {
    let intervalSetter = setInterval( () => {  
        timer_Cont.style.color = "white" ; 
        if(count === 0){
            clearInterval(intervalSetter) ; 
            SetTheme(falsy) ; 
            CreateMessage("Time Up") ; 
            CreateNXTBTN()  ;
            count = 15 ; 
            ErrorSound.play() ;   
        }
        else{
            count-- ; 
            timer_Cont.innerText = `Time Remaining : ${count}`  ; 
        }
    }  , 1000)  ; 
    btn1.onclick = () => {
        let currentQuestionOBJ = questions[question_index - 1] ; 
        //log(question_index)
        //log(btn1.innerText , currentQuestionOBJ.correctOpt)
        clearInterval(intervalSetter) ; 
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if(btn1.innerHTML !== currentQuestionOBJ.correctOpt){
            SetTheme(falsy) ; 
            CreateMessage("Wrong Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            ErrorSound.play() ; 
            
        }
        else{
            SetTheme(truthsy) ; 
            CreateMessage("Correct Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            IncrementScore() ; 
            SuccessSound.play() ; 
        }
} ;    
    btn2.onclick = () =>  {
        let currentQuestionOBJ = questions[question_index - 1] ; 
        //log(btn2.innerText , currentQuestionOBJ.correctOpt)
        clearInterval(intervalSetter) ; 
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if(btn2.innerHTML !== currentQuestionOBJ.correctOpt){
            SetTheme(falsy) ; 
            CreateMessage("Wrong Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            ErrorSound.play() ; 
        }
        else{
            SetTheme(truthsy) ; 
            CreateMessage("Correct Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            IncrementScore() ; 
            SuccessSound.play() ; 
            
        }
    }
    btn3.onclick = () =>  {
        let currentQuestionOBJ = questions[question_index - 1] ;  
        clearInterval(intervalSetter) ; 
        if(btn3.innerText !== currentQuestionOBJ.correctOpt){
            SetTheme(falsy) ; 
            CreateMessage("Wrong Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            ErrorSound.play() ; 
        }
        else{
            SetTheme(truthsy) ; 
            CreateMessage("Correct Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ; 
            IncrementScore()
            SuccessSound.play() ; 
            
        }
    }
btn4.onclick = () =>  {
    let currentQuestionOBJ = questions[question_index - 1] ; 
        clearInterval(intervalSetter) ; 
        //error("Button Was Triggered.") ; 
        // //log(currentQuestionOBJ)
        if(btn4.innerText !== currentQuestionOBJ.correctOpt){
            SetTheme(falsy) ; 
            CreateMessage("Wrong Answer") ; 
            clearInterval(intervalSetter) ;
            CreateNXTBTN() ; 
            ErrorSound.play() ; 
        }
        else{
            SetTheme(truthsy) ; 
            CreateMessage("Correct Answer") ; 
            clearInterval(intervalSetter) ; 
            CreateNXTBTN() ;
            IncrementScore()
            SuccessSound.play() ; 
        }
        //log(btn4.innerText , currentQuestionOBJ.correctOpt)
    }
}

function SetTheme(status:string) {
    btns.forEach(btn => {
        btn.style.backgroundColor = status ; 
        btn.setAttribute("disabled" , "disabled") ; 
        document.body.style.backgroundColor = status; 
    })
}

function setQuestion (index:number) {
    let currentQuestionOBJ = questions[index] ; 
    
    if(currentQuestionOBJ === undefined){
        document.body.classList.remove('preventScroll') ; 
        document.body.classList.add('showScroll') ; 
        hideElement([main_div , btn1 , btn2 , btn3 , btn4 , timer_Cont , score_cont]) ; 
        document.body.style.backgroundColor = 'white' ; 
        let status = returnStatus() ; 
        document.body.innerHTML = `
        <center>
        <h1 style = "color:white ;background-color:${status};margin:0;padding:0;width:100%;">Score:${score}/1000</h1>
    </center>
    <center><h2>Question And Answers</h2></center>
        `
        questions.forEach(ques => {
            document.body.innerHTML += `
            <h1>Q.${ques.qq}</h1>
            <h2>i)${ques.opt1}</h2>
            <h2>ii)${ques.opt2}</h2>
            <h2>iii)${ques.opt3}</h2>
            <h2>iv)${ques.opt4}</h2>
            <h2>Correct Answer: ${ques.correctOpt}</h2>
            <hr color = "black"/>
            `
        

            
        })
        document.body.style.backgroundColor = 'white' ; 
        document.body.innerHTML += `
        <center>
        <h1>Rate Us</h1>
        <div class="starsconts"><i class="fas fa-star grey"></i></div>
        <div class="starsconts"><i class="fas fa-star grey"></i></div>
        <div class="starsconts"><i class="fas fa-star grey"></i></div>
        <div class="starsconts"><i class="fas fa-star grey"></i></div>
        <div class="starsconts"><i class="fas fa-star grey"></i></div><br>
        <span>Click on the stars to rate.</span><br>
        <h2>Your Name</h2><br>
        <form  id = 'submit' autocomplete = 'off'>
        <input type="text" id="inp">
        <br>
        <button type = 'submit'>
            Submit
        </button>
        </form>

        </form>
    </center>`
    setInterval(() => {
        document.querySelectorAll('.grey').forEach(star => star.onclick = () => {
            star.classList.remove('grey') ; 
            star.classList.add('gold') ; 
        })
        document.querySelectorAll('.gold').forEach(star => star.onclick = () => {
            star.classList.remove('gold') ; 
            star.classList.add('grey') ; 
            
        })
    } , )
    let inp = document.getElementById('inp') ; 
    let submit = document.getElementById('submit') ; 
    submit?.addEventListener("submit" , (e)=> {
        e.preventDefault() ; 
        let goldies = document.querySelectorAll('.gold') ; 
        let goldLen = goldies.length ; 
        let inpVal = inp?.value ;
        fetch('./Scores.json' , {
            method:"POST" , 
            body:JSON.stringify({
                name:inpVal , 
                score :score , 
                rating:goldLen
            }) , 
            headers:{
                'Accept':"application/json , */*, text/plain",
                "Content-type":"application/json"
            }
        }).then(res => {
            console.log(res.status) ; 
            return res.json().then(data => {
                console.log(data) ; 
            })
        })
        
        document.body.innerHTML = `
        <center>
        <h1>Your Response Was Recorded</h1><br/>
        <h2>Thanks for giving the test</h2>
    </center>
        ` 

    })

    
    }
    else{
        SetTheme(primary) ; 
        btns.forEach(btn => btn.removeAttribute("disabled")); 
        btns[0].innerHTML  = currentQuestionOBJ.opt1 ; 
        btns[1].innerHTML = currentQuestionOBJ.opt2 ; 
        btns[2].innerHTML = currentQuestionOBJ.opt3; 
        btns[3].innerHTML = currentQuestionOBJ.opt4; 
        if(currentQuestionOBJ.qq.length > 70){
            question_cont?.style.width = '99%' ; 
        }
        else if(currentQuestionOBJ.qq.length > 30 && currentQuestionOBJ.qq.length<70){
            question_cont?.style.width = '70%'
        }
        else{
            question_cont.style.width = '45%'
        }
        question_cont.innerText = currentQuestionOBJ.qq ; 
        question_index ++ ; 
    }
}
function CreateMessage(message :string) {
    let element = document.createElement("h2") ; 
    element.innerHTML =  message ; 
    element.setAttribute("class" , "msg") ; 
    main_div.appendChild(element) ; 
}


function CreateNXTBTN () {
    let element = document.createElement("button"); 
    let parent  = document.createElement('center') ; 
    parent.appendChild(element) ; 
    element.classList.add('msg') ; 
    // parent.style.alignItems = 'center'

    element.classList.add("btn")  
    element.innerText = "Next Question" ;
    element.style.backgroundColor = primary ; 
    element.addEventListener("click" , () => {
        if(questions[question_index] !== undefined){
            count = 15;
            timer_Cont.innerText = `Time Remaining : ${count}`  ; 
            setTimer() ; 
            setQuestion(question_index)
        }
        else{
            setQuestion(question_index)
        }
        // SetTheme("blue")
        let removed = [] ; 
        let msgs = document.querySelectorAll(".msg")
        msgs.forEach(msg => removed.push(msg)) ; 
        removed.push(element) ; 
        hideElement(removed) ; 
    }) ; 
    main_div.appendChild(parent)  ; 
} ;
function setUser(data:object){
    fetch('./Scores.json' , {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json ; charset = UTF-8',
        },
        body: JSON.stringify(data),
    }).then(res => res.json().then(actualResponse => {
        console.log('Response Posted') ; 
        console.log(actualResponse) ; 

    }))
}
