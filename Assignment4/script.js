//2019314704 Park Suyeon
$(document).ready(function(){

$('#loginTitle').click(function(){ //show LogIn page & hide SignUp page
  $('.signup').hide(); //hide SignUp page
  $('#signupTitle').css({color:'grey', backgroundColor:'lightgrey'});
  $('#signupTitleTH').css('background-color', 'lightgrey');
  $('.login').show(400); //show LogIn page
  $('#loginTitle').css({color:'black', backgroundColor:'#F0F0F0'});
  $('#loginTitleTH').css('background-color', '#2F558E');
  $('.test').css('visibility', 'hidden');
  $('.inputText').css('outline', 'solid white 1px');
});

$('#signupTitle').click(function(){ //show SignUp page & hide LogIn page
  $('.test').css('visibility', 'hidden');
  $('.inputText').css('outline', 'solid white 1px');
  $('.login').hide(); //hide LogIn page
  $('#loginTitle').css({color:'grey', backgroundColor:'lightgrey'});
  $('#loginTitleTH').css('background-color', 'lightgrey');
  $('.signup').show(400); //show SignUp page
  $('#signupTitle').css({color:'black', backgroundColor:'#F0F0F0'});
  $('#signupTitleTH').css('background-color', '#2F558E');
});

$('#login_pass_i').focus(function(){ //when click password input in login page
  $('#login_pass_i').css('outline', 'solid red 1px');
  $('#login_pass_t').css('visibility', 'visible');
});

}); //ready_end


function showMessage(tid, iid, msg){ //show the message in blue box
  let t_id = '#' + tid;
  let i_id = '#' + iid;
  $(t_id).css('visibility', 'visible'); //make the message box visible
  $(i_id).css('outline', 'solid red 1px'); //make the outline of input box red
  $(i_id).removeClass('check');
  $(t_id).text(msg);
}

function hideMessage(tid, iid){ //hide the message in blue box
  let t_id = '#' + tid;
  let i_id = '#' + iid;
  $(t_id).css('visibility', 'hidden'); //make the message box invisible
  $(i_id).css('outline', 'solid white 1px'); //make the outline of input box original
  $(i_id).addClass('check');
}


/* LOG IN */
var real_email; //email that user signed up
var real_password; //password that user signed up

function login_Email(){
  showMessage('login_email_t', 'login_email_i', 'Your email address is invalid!');

  let inputEmail = document.getElementById('login_email_i').value;
  let email_length = inputEmail.length;
  var email_rule = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; //I refer to this website(https://imivory.tistory.com/28)

  if (email_length > 0 && email_rule.test(inputEmail)){ //valid email address
    hideMessage('login_email_t', 'login_email_i');
  }
  else if (email_length > 0){ //invalid email address
    showMessage('login_email_t', 'login_email_i', 'Your email address is invalid!');
  }
}

function login_Password(){
  let inputPass = document.getElementById('login_pass_i').value;
  let pass_length = inputPass.length;
  if(pass_length == 0){ //no input
    showMessage('login_pass_t', 'login_pass_i', 'Please enter your password!');
  }
  if(pass_length > 0){ //any input
    hideMessage('login_pass_t', 'login_pass_i');
  }
}

function submit_Login(){ //check email & password before submit
  let inputE = $('#login_email_i').val();
  let inputP = $('#login_pass_i').val();
  if((inputE != real_email) || (inputP != real_password)){
    //if email or password that user enterd do not matched with email or password that user signed up
    $('#subtitle').text('Credential do not match!');
    $('#subtitle').css('color', 'red');
  }
  else{ //if matched correctly
    $('.login').html('<h3>You are logged in.</h3>');
  }
}


/* SIGN UP */
function valid_Name(t_text, i_text, message){ //test the validity of name
  let inputName = document.getElementById(i_text).value;
  let name_length = inputName.length;
  let n;

  if(name_length < 1){ //no input
    showMessage(t_text, i_text, 'Please enter your '+message+' name!');
  }
  else{
    hideMessage(t_text, i_text);
  }

  for(let i = 0; i < name_length; i++){
    n = inputName.charAt(i).charCodeAt(0);
    if ( (i==0) && (n < 65 || 90 < n)){ //start with a capital letter
      showMessage(t_text, i_text, message+' name should start with a capital letter!');
      break;
    }
    else if (47<n && n<58){ //no number
      showMessage(t_text, i_text, message+' name cannot contain numbers!');
    }
    else if ((i>0) && (n<97 || 122<n)){ //no special characters
      showMessage(t_text, i_text, message+' name cannot contain special characters!');
    }
    else{ //no error
      hideMessage(t_text, i_text);
    }
  }
}

function check_Gender(){ //check the gender selecting
  $('#gender_check').css('visibility', 'visible');
  $('#gender_t').css('visibility', 'hidden');
}

function valid_Email(){ //test the validity of email
  let inputEmail = document.getElementById('email_i').value;
  let email_length = inputEmail.length;
  var email_rule = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (email_length < 1){ //no input
    showMessage('email_t', 'email_i', 'Please enter your email!');
  }

  else if (email_length > 0 && email_rule.test(inputEmail)){ //valid email
    hideMessage('email_t', 'email_i');
    real_email = inputEmail; //backup the email
  }
  else if (email_length > 0){ //invalid email
    showMessage('email_t', 'email_i', 'Your email address is invalid!');
  }
}

function valid_Password(){ //test the validity of password
  let inputPass = document.getElementById('pass_i').value;
  let pass_length = inputPass.length;
  let p;
  let r_msg = 'Requirement: at least 6 characters, one capital letter, one lowercase letter, at least one digit, and one special character!'; //requirement message

  if(pass_length < 1){ //no input
    showMessage('pass_t', 'pass_i', 'Please enter your password!');
    $('#pass_t').removeClass('pass_condition');
    $('#cp_id').removeClass('c_p_up');
  }
  else if(pass_length < 6){ //at least 6 characters
    showMessage('pass_t', 'pass_i', r_msg);
    $('#pass_t').addClass('pass_condition');
    $('#cp_id').addClass('c_p_up');
    return;
  }
  else{
    let cap = 0; let low = 0; let dig = 0; let spe = 0;
    for(let i = 0; i < pass_length; i++){
      p = inputPass.charAt(i).charCodeAt(0);
      if(64<p && p<91){ cap = 1;} //one capital letter
      if(96<p && p<123){ low = 1;} //one lowercase letter
      if(47<p && p<58){ dig = 1;} //at least one digit
      if((32<p<48) || (57<p<65) || (90<p<97) || 122<p<127){ spe = 1;} //one special character

      if(cap&&low&&dig&&spe){ //satisfy all conditions
        hideMessage('pass_t', 'pass_i');
        $('#cp_id').addClass('c_p_up');
      }
      else{ //do not satisfy all conditions
        showMessage('pass_t', 'pass_i', r_msg);
        $('#pass_t').addClass('pass_condition');
        $('#cp_id').addClass('c_p_up');
      }
    }
  }
}

function confirm_Password(){ //confirm password again
  let c_inputPass = document.getElementById('c_pass_i').value; //password that user type
  var pswd = $('#pass_i').val(); //password that user make first
  real_password = pswd; //backup the password
  if(c_inputPass == pswd){ //when password matched
    hideMessage('c_pass_t', 'c_pass_i');
  }
  else{ //when do not matched
    showMessage('c_pass_t', 'c_pass_i', 'Password does not match!');
  }
}

function submit_Signup(){ //check the contents of form before submit
  let a = $('#firstName_i').val();
  let b = $('#lastName_i').val();
  let c = $('input:radio[name=gndr]').is(':checked');
  let d = $('#email_i').val();
  let e = $('#pass_i').val();
  let f = $('#c_pass_i').val();

  if(a==''){ //if user doesn't enter Firstname
    $('#firstName_t').css('visibility', 'visible'); //show the message
    $('#firstName_i').css('outline', 'solid red 1px'); //highlight the input box
  }
  if(b==''){ //if user doesn't enter Lastname
    $('#lastName_t').css('visibility', 'visible');
    $('#lastName_i').css('outline', 'solid red 1px');
  }
  if(!c){ //if user doesn't select Gender
    $('#gender_t').css('visibility', 'visible');
  }
  if(d==''){ //if user doesn't enter Email
    $('#email_t').css('visibility', 'visible');
    $('#email_i').css('outline', 'solid red 1px');
  }
  if(e==''){ //if user doesn't enter Password
    $('#pass_t').css('visibility', 'visible');
    $('#pass_i').css('outline', 'solid red 1px');
  }
  if(f==''){ //if user doesn't enter Confirm password
    $('#c_pass_t').css('visibility', 'visible');
    $('#c_pass_i').css('outline', 'solid red 1px');
  }

  if(!(a=='' || b=='' || !c || d=='' || e=='' || f=='')){ //if user fill all form
    $('.signup').html('<h3>You are signed up.</h3>');
  }
}
