const name_pattern = /^[a-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;


function change_info(get_kind) {
    if (get_kind == 1) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('first_name_id').style.display = 'block';
    }
    if (get_kind == 2) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('last_name_id').style.display = 'block';
    }
    if (get_kind == 3) {
        document.getElementById('show_change_fname').style.display = 'block';
        document.getElementById('phone_id').style.display = 'block';
    }
    

}

function func_close_up() {
    document.getElementById('show_change_fname').style.display = 'none';
    document.getElementById('first_name_id').style.display = 'none';
    document.getElementById('last_name_id').style.display = 'none';
    document.getElementById('phone_name_id').style.display = 'none';
}

function check_info() {
    console.log("clicked");
    let my_in = document.getElementById("my_input").value;
    if (!phone_pattern.test(my_in) && !name_pattern.test(my_in)) {

        alert("Value is  Invalid");
    }
    else {
        alert('jdh');
        func_close_up();
        //document.getElementById('phone_name_id').style.display = 'none';
     //   document.getElementById('first_name_id').style.display = 'none';
       // document.getElementById('last_name_id').style.display = 'none';
        //document.getElementById('show_change_fname').style.display = 'none';
    }
    //if (document.getElementById('phone_name_id').style.display == 'block') {
      //  if (!phone_pattern.test(my_in)) {

        //    alert("Phone Number is Invalid");
        //}
        //document.getElementById('phone_name_id').style.display = 'none';
    //}
    //else {
      //  if (!name_pattern.test(f_name)) {

        //    alert("Name is Invalid");
        //}
        //document.getElementById('first_name_id').style.display = 'none';
        //document.getElementById('last_name_id').style.display = 'none';
 //   }
    
}
    
