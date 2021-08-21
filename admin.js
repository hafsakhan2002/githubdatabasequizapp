// let toQuiz = ()=>{
//      window.location.href="index.html"
// }



let questionsArr = []

let addQues = () =>{
     let question = document.getElementById('question')
     let op1 = document.getElementById('op1')
     let op2 = document.getElementById('op2')
     let op3 = document.getElementById('op3')
     let ans = document.getElementById('ans')
     let questions = {
          question : question.value,
          option1  : op1.value,
          option2  : op2.value,
          option3  : op3.value,
          answer   : ans.value
     }
     questionsArr.push(questions)
     console.log(questionsArr);
     firebase.database().ref("/questions").set(questionsArr);
     question.value = ""
     op1.value = ""
     op2.value = ""
     op3.value = ""
     ans.value = ""

     qBtn.disabled=false
}


let check = () => {
     firebase.database().ref("/").on("child_added",function(data){
          alert(`Total Number of Questions added : ${data.val().length}`)
     })
}

let qBtn = document.getElementById('addq');

let enableAddBtn = () =>{
     qBtn.disabled=false
}


let disAddBtn = () =>{
     qBtn.disabled=true
}