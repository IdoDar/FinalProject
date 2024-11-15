
const name_pattern = /^[a-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

let per_info_html = document.querySelector('.info');


//gets user info from db and puts it html
$(document).ready(function () {
    async function get_user_info() {
        var user_email = ""
        await $.ajax({
            url: "http://localhost/API/users/CurrentUser",
            method: "GET",
            withCredentials: true,
            success: function (data) {
                user_email = data[0].email
            }
        })
        if (user_email) {
            var dburl = `http://localhost/API/users/${user_email}`
            await $.ajax({
                url: dburl,
                method: "GET",
                withCredentials: true,
                success: function (data) {
                    let my_usr = data[0];
                    per_info_html.innerHTML = '';
                    //create item in html
                    let my_info = document.createElement('div');
                    my_info.classList.add('me');
                    let Bdate = my_usr.dateBirth.substring(0, 10)
                    my_info.innerHTML =
                        `
            &nbsp;
           <div >
                <label>First Name: </label> <small>${my_usr.name}</small>
                <!--get info from db and present it here-->
                <!-- 1 represent its first name-->
                <button onclick="change_info(1)" class="change_info"> Change Name </button>
            </div>
            &nbsp;
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
            &nbsp;
            <div>
                <label>Phone Number: </label><small>${my_usr.phoneNum}</small>
                <!--get info from db and present it here-->
                <!-- 3 represent its phone number-->
                <button type="button" onclick="change_info(3)" class="change_info"> Change Phone Number </button>
            </div>
            &nbsp;
            <div>
                <label>Birth Date: </label><small>${Bdate}</small>
                <!--get info from db and present it here-->
            </div>
            &nbsp;
            <div>
                <label>Gender: </label> <small>${my_usr.sex}</small>
                <!--get info from db and present it here-->
            </div>
            &nbsp;
        </div>
    </div>
        <div class="my_buttons">
        <div class="row">
            <div class="half">
                <button type="button" onclick='delete_user()' class="cancel_button">Delete User</button>
            `;
                    per_info_html.appendChild(my_info);
                }
            })
        }
    }
    get_user_info();

})


//changes info - name or phone
async function editData(kind, change) {
    $(document).ready(async function () {
        async function get_user_email() {
            var user_email = ""
            await $.ajax({
                url: "http://localhost/API/users/CurrentUser",
                method: "GET",
                withCredentials: true,
                success: async function (data) {
                    user_email = data[0].email
                }
            })
            var dburl = "http://localhost/API/users"
            if (kind == 1) {
                if (change != null) {
                    console.log("1")
                    await $.ajax({
                        url: dburl,
                        method: "PUT",
                        withCredentials: true,
                        contentType: 'application/json',
                        data: JSON.stringify({
                            fieldsearch: "email",
                            name: change,
                            email: user_email
                        }),
                        success: function (data) {
                            alert(`Changed First Name Successfully`);
                            location.reload()
                        }
                    })
                }
                else { alert(`No Value`) }
            }
            else if (kind == 3) {
                if (change != null) {
                    await $.ajax({
                        url: dburl,
                        method: "PUT",
                        withCredentials: true,
                        contentType: 'application/json',
                        data: JSON.stringify({
                            fieldsearch: "email",
                            phoneNum: change,
                            email: user_email
                        }),
                        success: function (data) {
                            alert(`Changed phone number Successfully`);
                            location.reload()
                        }
                    })
                }
                else { alert(`No Value`) }
            }
        } get_user_email()
    })
}





//opens change info tab - 1 is name and 3 is phone number
function change_info(get_kind) {
    if (get_kind == 1) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('first_name_id').style.display = 'block';

    }
    if (get_kind == 3) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('phone_id').style.display = 'block';
    }


}

//closes all change info 
function func_close_up() {
    document.getElementById('show_change_fname').style.display = 'none';
    document.getElementById('first_name_id').style.display = 'none';
    document.getElementById('phone_id').style.display = 'none';
}

//checks input with regex and add to db
function check_info() {
    $(document).ready(function () {
        async function get_user_email() {
            var user_email = ""
            await $.ajax({
                url: "http://localhost/API/users/CurrentUser",
                method: "GET",
                withCredentials: true,
                success: function (data) {
                    user_email = data[0].email
                }
            })
        }
        let my_input;
        if (document.getElementById('first_name_id').style.display == 'block') {
            my_input = document.getElementById("my_input_first").value;
            if (!name_pattern.test(my_input)) {
                alert("Value is Invalid");
            }
            else {
                editData(1, my_input);
                func_close_up();
                my_input = null;
            }
        }
        else if (document.getElementById('phone_id').style.display == 'block') {
            my_input = document.getElementById("my_input_phone").value;
            if (!phone_pattern.test(my_input)) {
                alert("Value is Invalid");
            }
            else {
                editData(3, my_input);
                func_close_up();
                my_input = null;
            }
        }

        get_user_email()
    })

}

//delete user

async function delete_user() {
    $(document).ready(function () {
        async function get_user_email() {
            var user_email = ""
            await $.ajax({
                url: "http://localhost/API/users/CurrentUser",
                method: "GET",
                withCredentials: true,
                success: function (data) {
                    user_email = data[0].email
                }
            })
            var dburl = "http://localhost/API/users";
            let confirmation = prompt('To Confirm The Deletion Enter Confirm:');
            if (confirmation.toLowerCase() == "confirm") {
                await fetch(dburl, {
                    method: "DELETE",
                    body: JSON.stringify({
                        email: user_email
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(function (response) {
                    return response
                }).then(async function () {
                    alert(`Deleted Successfully`);
                    await $.ajax({
                        url: `http://localhost/auth/logout`,
                        method: 'GET',
                        success: function () {
                            // Redirect to the product page
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching product page:', error);
                        }
                    });
                    await $.ajax({
                        url: `http://localhost/auth`,
                        method: 'GET',
                        success: function () {
                            // Redirect to the product page
                            window.location.href = `http://localhost/auth`;
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching product page:', error);
                        }
                    });
                })
            }
            else {
                alert(`Did Not Delete`);
            }
        }
        get_user_email()
    })


}

