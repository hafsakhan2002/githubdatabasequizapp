//.....................NAME..................//

let userName = prompt('Enter Your Name');
if(userName === ""|| userName == null || userName == undefined){
     alert(`Please Enter Your Name`)
     location.reload()
}


//.........................TIMER............//

let min = 5;
let mm = 0;
let sec = 0;
let second = document.getElementById('sec')
let minute = document.getElementById('min')
let timer;

let countDown=()=> {
     mm++
     if (mm == 100) {

          sec--
          mm = 0
          second.innerHTML = sec


     }

     else if (min > 0 && sec == 0) {
          min--
          sec = 59
          second.innerHTML = sec
          minute.innerHTML = min
     }
     else if (min == 0 && sec == 0) {
          result()
          clearInterval(timer)
          sec = 00
          min = 00
          sec.innerHTML = sec
          minute.innerHTML = min
     }
}





timer = setInterval(countDown, 10)

let count = 0;

let score = 0;

let correctAns = 0;


let questionCount = 1

let questionNumber = document.getElementById('q').innerHTML=questionCount



// Show Question 

window.onload = function () {
     showQues(count)
     firebase.database().ref("/").on("child_added",function(data){

          alert(`Ther are total ${data.val().length} Questions You have 5 mintues to complete it GOOD LUCK!!!`)
          alert(`You need at-least 6 correct answers in order to pass the test `)

     })
}



// ........................FUNCTIONS...................//



let enableBtn=()=> {     // Enable Button Function
     var btn = document.getElementById('btn')
     btn.disabled = false
}


let disBtn=()=> {        // Disable Button Function
     var btn = document.getElementById('btn')
     btn.disabled = true
}



let nextQues = () => {    // Next Question function
     let selectOpt = document.querySelector('input[type=radio]:checked')
     let answer = selectOpt.value 
     questionCount++
     questionNumber = document.getElementById('q').innerHTML=questionCount
     
     firebase.database().ref("/").on("child_added",function(data){
          
          if(answer == data.val()[count].answer){
                    
               score+=10
               correctAns ++
               // console.log(`score=====> ${score}`); //Checking if check answer is matching answer of database.. WORKING..// 
              
          }
          
          selectOpt.checked = false
          disBtn()
          count++
          
          if(count == data.val().length){
               result()
               return;
          }
          
          
          showQues(count) 
})
}


let showQues = (qnum) => {              //Main Function to render questions on DOM From DATABASE
     firebase.database().ref("/").on("child_added",function(data){
          
          let question = document.getElementById('question');
          question.innerHTML = data.val()[qnum].question;
          let op1 = document.getElementById('op1')
          op1.innerHTML = data.val()[qnum].option1;
          let op2 = document.getElementById('op2')
          op2.innerHTML = data.val()[qnum].option2;
          let op3 = document.getElementById('op3');
          op3.innerHTML = data.val()[qnum].option3;

         
          
     })
   
}









let result = ()=> { //RESULT FUNCTION
  
     var card = document.getElementById('r')
     if (score >= 60) {
          card.className = ('pass')
          card.innerHTML = `<div class="card1"> <h1> Congratulations ${userName} You have passed the test and Your Score is : ${score} <br/> Total Number of Correct Answers is ${correctAns}</h1> </div>`

     }
     else if (score < 60) {
          card.className = ('fail')
          card.innerHTML = `<div class="card2"> <h1> Sorry ${userName} you have failed the test your correct answers are less than 6! :'(<br/> Total Number of Correct Answers is ${correctAns}</h1> </div>`
     
     }


}
























//ADMIN ACCESS//

let admin = ()=>{
     document.getElementById('admin')
     let password = 'Hafsa123'
     let userPass = prompt('Enter Password to get admin access')
     if(userPass===password){
          window.location.replace("admin.html")
     }else{
          alert(`WRONG PASSWORD`)
     }
}