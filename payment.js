const name_pattern = /^[\u0590-\u05FFa-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const city_pattern = /^[a-z\sA-Z]+$/;
const zip_pattern = /\b\d{5,10}\b/; 
const card_pattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const id_pattern = /\b\d{9}\b/;
const cvv_pattern = /\b\d{3}\b/;

function check_input() {
    console.log("clicked");
    let my_message = '';
    let problem = false;
    let f_name = document.getElementById("first_name").value;
    let l_name = document.getElementById("last_name").value;
    let n_phone = document.getElementById("phone").value;
    let a_email = document.getElementById("email").value;
    let a_city = document.getElementById("city").value;
    let c_zip = document.getElementById("zip").value;
    let n_card = document.getElementById("cardN").value;
    let n_id = document.getElementById("id").value;
    let n_cvv = document.getElementById("cvv").value;

    if (!name_pattern.test(f_name)) {
        problem = true;
        my_message = my_message + "השם הפרטי לא תקין\n";
    }
    if (!name_pattern.test(l_name)) {
        problem = true;
        my_message = my_message + "השם משפחה לא תקין\n";
    }
    if (!phone_pattern.test(n_phone)) {
        problem = true;
        my_message = my_message + "מספר הטלפון לא תקין\n";
    }
    if (!email_pattern.test(a_email)) {
        problem = true;
        my_message = my_message + "כתובת המייל לא תקינה\n";
    }
    if (!name_pattern.test(a_city)) {
        problem = true;
        my_message = my_message + "העיר לא תקינה\n";
    }
    if (!zip_pattern.test(c_zip)) {
        problem = true;
        my_message = my_message + "המיקוד לא תקין\n";
    }
    if (!card_pattern.test(n_card)) {
        problem = true;
        my_message = my_message + "מספר כרטיס האשראי לא תקין\n";
    }
    if (!id_pattern.test(n_id)) {
        problem = true;
        my_message = my_message + "תעודת הזהות לא תקינה\n";
    }
    if (!cvv_pattern.test(n_cvv)) {
        problem = true;
        my_message = my_message + "ה- CVV לא תקין\n";
    }
    if (problem) {
        alert(my_message);
    }
}