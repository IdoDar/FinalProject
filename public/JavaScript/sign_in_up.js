const name_pattern = /^[a-z\sA-Z ,.'-]+$/;
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

function show_sign_up() {
    document.getElementById('sign_up_id').style.display = 'block';
}

function show_sign_in() {
    document.getElementById('sign_in_id').style.display = 'block';
}

function func_close_in() {
    document.getElementById('sign_in_id').style.display = 'none'
}
function func_close_up() {
    document.getElementById('sign_up_id').style.display = 'none';
}
function check_input_up() {
    console.log("clicked");
    let my_message = '';
    let problem = false;
    let f_name = document.getElementById("fname").value;
    let l_name = document.getElementById("lname").value;
    let a_email = document.getElementById("email").value;
    let n_phone = document.getElementById("phone").value;
    let pass1 = document.getElementById("password1").value;
    let pass2 = document.getElementById("password2").value;
    if (!name_pattern.test(f_name)) {
        problem = true;
        my_message = my_message + "First Name is Invalid\n";
    }
    if (!name_pattern.test(l_name)) {
        problem = true;
        my_message = my_message + "Last Name is Invalid\n";
    }
    if (!email_pattern.test(a_email)) {
        problem = true;
        my_message = my_message + "Email is Invalid\n";
    }
    if (!phone_pattern.test(n_phone)) {
        problem = true;
        my_message = my_message + "Phone Number is Invalid\n";
    }
    if (pass1 != pass2) {
        problem = true;
        my_message = my_message + "Passwords do not match\n";
    }
    if (problem) {
        alert(my_message);
    }
    if (!problem) {
        let m_gender = document.getElementById("gender").value;
        let b_date = document.getElementById("bdate").value;
        //send all the information to DB of customers
    }
}

function check_input_in() {
    console.log("clicked");
    let my_email = document.getElementById("email_id").value;
    if (!email_pattern.test(my_email)) {

        alert("Email is Invalid");
    }
    else {
        let pass = document.getElementById("password_id").value;
        //check password and email to DB of customers
    }
}

// Get the form
var sign_up = document.getElementById('sign_up_id');
var sign_in = document.getElementById('sign_in_id');

// When the user clicks anywhere outside of the form - close it
window.onclick = function (event) {
    if (event.target == sign_up) {
        sign_up.style.display = "none";
    }
    if (event.target == sign_in) {
        sign_in.style.display = "none";
    }
}