const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');
const tomatoCount = document.querySelector('.tomato-count');
const notiSound = document.querySelector('#notiSound');


'use strict';

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyUser() {
  alert("hi");
  notiSound.play();
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Buzzz!! Time\'s up', {
      icon: 'https://raw.githubusercontent.com/amitmerchant1990/pomolectron/master/res/tomato-big.png',
      body: "Hey there! You've been notified!"
    });

    

    //setTimeout( function () { notification.close(); }, 3000);

    // notification.onclose = function(){
    //   notiSound.pause();
      
    // }
  }
}

var timer, minutes = 0, seconds = 10,
    pomodoroIntervalId, pomodoroTime;

var display = document.querySelector('#time');
var display_short = document.querySelector('#time_short');
var display_long = document.querySelector('#time_long');

$('#start').click(() => {
  if(minutes == 25 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display);
  $('#stop').show();
  $('#start').hide();
})

$('#stop').click(() => {
  stopTimer();
  $('#start').show();
  $('#stop').hide();
});

$('#reset').click(() => {
  minutes = 25;
  seconds = 60;
  display.textContent = "25:00";
  resetTimer();
  
  $('#start').show();
  $('#stop').hide();
});

$('#short_start').click(() => {
  if(minutes == 5 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display_short);
  
  $('#short_stop').show();
  $('#short_start').hide();
})

$('#short_stop').click(() => {
  stopTimer();
  $('#short_start').show();
  $('#short_stop').hide();
});

$('#short_reset').click(() => {
  minutes = 5;
  seconds = 60;
  display_short.textContent = "05:00";
  resetTimer(display_short);
  $('#short_start').show();
  $('#short_stop').hide();
});

$('#long_start').click(() => {
  if(minutes == 10 && seconds == 60){
    pomodoroTime = minutes * seconds;
  }else{
    pomodoroTime = minutes * 60 + seconds;
  }

  startTimer(pomodoroTime, display_long);
  $('#long_stop').show();
  $('#long_start').hide();
})

$('#long_stop').click(() => {
  stopTimer();
  $('#long_start').show();
  $('#long_stop').hide();
});

$('#long_reset').click(() => {
  minutes = 10;
  seconds = 60;
  display_long.textContent = "10:00";
  resetTimer();
  $('#long_start').show();
  $('#long_stop').hide();
});

function startTimer(duration, display) {
  timer = duration;
  pomodoroIntervalId = setInterval(function(){
    if (--timer < 0) {
        timer = duration;
    }
    
    minutes = parseInt(timer/60, 10);
    seconds = parseInt(timer%60, 10);

    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    display.textContent = minutes+ ":" + seconds;

    if(minutes == 0 && seconds == 0){
      resetTimer();
      notifyUser();
    }
  }, 1000);
}

function stopTimer(){
  clearInterval(pomodoroIntervalId);
}

function resetTimer() {
  clearInterval(pomodoroIntervalId);
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    clearInterval(pomodoroIntervalId);

    let activeTab = e.target.toString();
    let nameActiveTab = activeTab.split('#');

    if(nameActiveTab[1]=='pomodoro'){
      minutes = 25, seconds = 60;
      document.querySelector('#time').textContent = "25:00";
    }else if(nameActiveTab[1]=='short'){
      minutes = 5, seconds = 60;
      document.querySelector('#time_short').textContent = "05:00";
    }else {
      minutes = 10, seconds = 60;
      document.querySelector('#time_long').textContent = "10:00";
    }
 })

const generateTemplate = todo => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <a class="tomato"> 🍅 </a>
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
    
  `;
  list.innerHTML += html;
};

const generateTemplate2 = todo => {
  // const htmli = `
  //   <li class="list-group-item d-flex justify-content-between align-items-center">
  //   <a class="tomato"> 🍅 </a>
  //     <span>${todo}</span>
  //     <i class="far fa-trash-alt delete"></i>
  //   </li>
    
  // `;
  tomatoCount.innerHTML += " 🍅";
};


// const filterTodos = term => {

//   // add filtered class
//   Array.from(list.children)
//     .filter(todo => !todo.textContent.toLowerCase().includes(term))
//     .forEach(todo => todo.classList.add('filtered'));

//   // remove filtered class
//   Array.from(list.children)
//     .filter(todo => todo.textContent.toLowerCase().includes(term))
//     .forEach(todo => todo.classList.remove('filtered'));

// };

// add todos event
addForm.addEventListener('submit', e => {
  
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if(todo.length){
    generateTemplate(todo);
    // generateTemplate2(todo);
    addForm.reset();
  }

});

// delete todos event
list.addEventListener('click', e => {

  if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();
  } if(e.target.classList.contains('tomato')){
    // e.target.parentElement.remove();
    alert("tomato");}
   

});

// // filter todos event
// search.addEventListener('keyup', () => {

//   const term = search.value.trim().toLowerCase();
//   filterTodos(term);

// });

