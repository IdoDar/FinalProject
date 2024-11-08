
const name_pattern = /^[a-z\sA-Z ,.'-]+$/;
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

document.getElementById('inside_in').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior 
    check_input_in();

});

document.getElementById('inside_up').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior 
    check_input_up();

});


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
async function check_input_up() {

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
        const jsondata = {
            "FirstName": f_name,
            "LastName": l_name,
            "email": a_email,
            "phoneNumber": n_phone,
            "sex": m_gender,
            "Bdate": b_date,
            "password": pass1,
            "rpwd": pass2
        };
        registerUser(jsondata);

    }
}

function check_input_in() {
    let my_email = document.getElementById("email_id").value;
    if (!email_pattern.test(my_email)) {

        alert("Email is Invalid");
    }
    else {
        let pass = document.getElementById("password_id").value;
        //check password and email to DB of customers
        loginUser(my_email, pass)
    }
}


function registerUser(RegisterJson) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/auth/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('User registered successfully:', xhr.responseText);
            loginUser(RegisterJson.email, RegisterJson.password);
        } else {
            console.error('Request failed with status:', xhr.status);
            if (xhr.status == 409)
                alert("Invalid Credentials");
            else
                alert(`error ${xhr.status}: ${xhr.responseText}`)
        }

    };

    xhr.onerror = function () {
        console.error('Network error');
    };
    console.log(JSON.stringify(RegisterJson));
    xhr.send(JSON.stringify(RegisterJson));
}

async function loginUser(email, password) {
    const jsondata = {
        "email": email,
        "password": password
    };

    try {
        const response = await fetch('http://localhost/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(jsondata)

        });

        if (response.ok) {
            const responseData = await response.json();
            // Assuming the server sends the updated cookie in the response
            // You might need to handle cookie updates based on your server-side setup
            console.log('User logged in successfully:', responseData);
            alert("Success! You Redirect to home page");
            window.location.href = '/home';
        } else {
            // Handle error, e.g., display an error message to the user
            alert("Invalid credential")
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }

}




