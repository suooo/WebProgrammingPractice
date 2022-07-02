//2019314704 Park Suyeon
$(document).ready(function(){

  $('#addNew').click(function(){ //show modal window when click 'Add New' button
    $('.background').fadeIn(300);
    $('#popup_T').slideDown();
    $('.popup').css("display", "flex");
  });

  $('#exit').click(function(){ //remove modal window when click 'X' button
    $('#popup_T').slideUp();
    $('.background').fadeOut(300);
  });

  $('.close').click(function(){ //remove modal window when click 'close' button
    $('#popup_T').slideUp();
    $('.background').fadeOut(300);
  });

Get_LocalStorage(); //get the data of local storage at start

}); //end ready


let taskList = []; //array for tasks

function Submit_Task(){ //when click 'save changes' button
  event.preventDefault(); //prevent reloading when submitting the form
  //call Add_Task function to add the task values of form
  Add_Task($('.url_input').val(), $('.title_input').val(), $('.type_input').val(), $('.desc_input').val());
}


//for test the validity of url
let url_rule = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

function Add_Task(url, title, type, desc){ //add the task to taskList
  if (url_rule.test(url) == false){ //when invalid url
    alert("Invalid url!");
  }
  else if(title == ''){ //when do not input Task title
    alert("Fill the Task Title!");
  }
  else if(type == ''){ //when do not input Task type
    alert("Fill the Task Type!")
  }
  else if(desc == ''){ //when do not input Task description
    alert("Fill the Task Description!")
  }
  else{ //when all of the input is valid
    const task = {
      id: Date.now(), //id for distinguish tasks
      url: url,
      title: title,
      type: type,
      desc: desc
    };

    taskList.push(task); //push this task to taskList
    Add_LocalStorage(taskList); //call Add_LocalStorage function

    $('.url_input').val(''); //make the input clean
    $('.title_input').val('');
    $('.type_input').val('');
    $('.desc_input').val('');
  }
}


function Add_LocalStorage(taskList){ //add the task to local storage
  localStorage.setItem('taskList', JSON.stringify(taskList));
  Show_Card(taskList); //make the card of new task
}


function Get_LocalStorage(){ //function to get the tasks in local storage when start
  const storage = localStorage.getItem('taskList');
  if (storage){ //if not empty
    taskList = JSON.parse(storage);
    Show_Card(taskList); //show the tasks that is already in local strorage
  }
}


function Show_Card(taskList){ //make the task card
  $('#card_id').empty(); //delete all the cards that already exist

  taskList.forEach(function(tasks){ //for each task in taskList
    const card = document.createElement('table'); //create table
    card.setAttribute('class', 'card_table'); //set class of table
    card.setAttribute('id', tasks.id); //set id of table
    card.innerHTML= `
        <tr>
          <td>
            <button type="button" id=${tasks.id} onclick="Delete_Card(${tasks.id});"></button>
          </td>
        </tr>
        <tr class="test">
          <td><img class="card_img" src=${tasks.url}></td>
        </tr>
        <tr>
          <td>
            <h3>${tasks.title}</h3>
            <p>${tasks.desc}</p>
            <div class="blue">${tasks.type}</div>
          </td>
        </tr>
    `; //html code that make card

    $('#card_id').append(card); //append card in card div
    $('#popup_T').slideUp(); //remove modal window
    $('.background').fadeOut(300);
  });
}


function Delete_Card(id){ //when click the delete button of card
  let cnt = 0; //var for count the index
  let real_cnt; //var for index that want to delete
  taskList.forEach(function(tasks){ //for each task in taskList
    if(tasks.id == id){ //when the task ID is the same as the ID you want to erase
      real_cnt = cnt;
    }
    cnt++;
  });
  taskList.splice(real_cnt, 1); //delete the real_cnt-th task
  Add_LocalStorage(taskList); //update the local storage
}
