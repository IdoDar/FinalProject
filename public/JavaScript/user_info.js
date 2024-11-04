
const name_pattern = /^[a-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const user_email = 'yarden@lol.main';
let per_info_html = document.querySelector('.info');



//gets user info from db and puts it html
async function get_user_info() {
    var dburl = `http://localhost/API/users/${user_email}`
    await fetch(dburl, {
        method: "GET"
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        let my_usr = data[0];
        per_info_html.innerHTML = '';
        //create item in html
        let my_info = document.createElement('div');
        my_info.classList.add('me');
        let Bdate = my_usr.dateBirth.substring(0, 10)
        my_info.innerHTML =
            `
           <div >
                <label>First Name: </label> <small>${my_usr.name}</small>
                <!--get info from db and present it here-->
                <!-- 1 represent its first name-->
                <button onclick="change_info(1)" class="change_info"> Change Name </button>
            </div>
            <!--<div>
                <label>Last Name: </label>
                <!--get info from db and present it here-->
                <!-- 2 represent its last name-->
                <!--<button type="button" onclick="change_info(2)" class="change_info"> Change Last Name </button>
            </div>-->
            <div>
                <label>Email Address: </label><small>${my_usr.email}</small>
                <!--get info from db and present it here-->
            </div>
            <div>
                <label>Phone Number: </label><small>${my_usr.phoneNum}</small>
                <!--get info from db and present it here-->
                <!-- 3 represent its phone number-->
                <button type="button" onclick="change_info(3)" class="change_info"> Change Phone Number </button>
            </div>
            <div>
                <label>Birth Date: </label><small>${Bdate}</small>
                <!--get info from db and present it here-->
            </div>
            <div>
                <label>Gender: </label> <small>${my_usr.sex}</small>
                <!--get info from db and present it here-->
            </div>
        </div>
    </div>
        <div class="my_buttons">
        <div class="row">
            <div class="half">
                <button type="button" onclick='delete_user()' class="cancel_button">Delete User</button>
            `;
        per_info_html.appendChild(my_info);
    })
}
get_user_info();

//changes info - name or phone
async function editData(kind, change, data) {
    var dburl = "http://localhost/API/users"
    if (kind == 1) {
        alert('1');
        if (change != null) {
            await fetch(dburl, {
                method: "PUT",
                body: JSON.stringify({
                    fieldsearch: "email",
                    name: change,
                    email: data
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (response) {
                return response
            }).then(function () {
                alert(`Changed First Name Successfully`);
                location.reload()
            })
        }
        else { alert(`No Value`) }
    }
    /*else if (kind=2){
        if(change!=null){
        await fetch(dburl, {
            method: "PUT",
            body: JSON.stringify({
                fieldsearch:"email",
                phone:change,
                email:data
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then(function (response) {
            return response}).then(function () {
                alert(`Changed Last Name Successfully`);
                location.reload()
            })}
            else{alert(`No Value`)}
    }*/
    else if (kind == 3) {
        if (change != null) {
            alert("went");
            await fetch(dburl, {
                method: "PUT",
                body: JSON.stringify({
                    fieldsearch: "email",
                    phoneNum: change,
                    email: data
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (response) {
                return response
            }).then(function () {
                alert(`Changed phone number Successfully`);
                location.reload()
            })
        }
        else { alert(`No Value`) }
    }
}



//opens change info tab - 1 is name and 3 is phone number
function change_info(get_kind) {
    if (get_kind == 1) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('first_name_id').style.display = 'block';

    }
    /*if (get_kind == 2) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('last_name_id').style.display = 'block';
    }*/
    if (get_kind == 3) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('phone_id').style.display = 'block';
    }


}

//closes all change info 
function func_close_up() {
    document.getElementById('show_change_fname').style.display = 'none';
    document.getElementById('first_name_id').style.display = 'none';
    //document.getElementById('last_name_id').style.display = 'none';
    document.getElementById('phone_id').style.display = 'none';
}

//checks input with regex and add to db
function check_info() {
    let my_input;
    if (document.getElementById('first_name_id').style.display == 'block') {
        my_input = document.getElementById("my_input_first").value;
        if (!name_pattern.test(my_input)) {
            alert("Value is Invalid");
        }
        else {
            //add update to db
            editData(1, my_input, user_email);
            func_close_up();
            my_input = null;
        }
    }
    /*else if(document.getElementById('last_name_id').style.display == 'block'){
        my_input = document.getElementById("my_input_last").value;
        alert(my_input + 2);
        if (!name_pattern.test(my_input)) {
            alert("Value is Invalid");
        }
        else {
            //add update to db
            editData(2,my_input,user_email);
            func_close_up();
            my_input = null;
        }
    }*/
    else if (document.getElementById('phone_id').style.display == 'block') {
        my_input = document.getElementById("my_input_phone").value;
        if (!phone_pattern.test(my_input)) {
            alert("Value is Invalid");
        }
        else {
            //add update to db
            editData(3, my_input, user_email);
            func_close_up();
            my_input = null;
        }
    }

}

//delete user
async function delete_user() {
    var dburl = "http://localhost/API/users";
    let data = user_email;
    let confirmation = prompt('To Confirm The Deletion Enter Confirm:');
    if (confirmation.toLowerCase() == "confirm") {
        await fetch(dburl, {
            method: "DELETE",
            body: JSON.stringify({
                email: data
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            return response
        }).then(function () {
            alert(`Deleted ${data} Successfully`);
            location.reload()
        })
    }
    else {
        alert(`Did Not Delete`);
    }
}

