$(document).ready(function () {
  var dburl = "http://localhost/API/users"
  async function GetUsers() {
    var dburl = "http://localhost/API/users"
    await $.ajax({
      url: dburl,
      method: "GET",
      withCredentials: true,
      success: function (data) {
        console.log(data)
        var index = 0
        var userstable = ` <table class="table">
        <thead>
          <tr>
          <th class="text">name</th>
          <th class="text">sex</th>
          <th class="text">roles</th>
          <th class="text">email</th>
          <th class="text">phoneNum</th>
          <th class="text">dateBirth</th
          <th class="text">Edits</th>
          </tr>
        </thead>`
        data.forEach((model) => {
          var role = model.roles.Admin ? 200 : 100
          userstable = userstable + `<tbody>
            <tr>
              <td class="text">${model.name}</td>
              <td class="text">${model.sex}</td>
              <td class="text">${role}</td>
              <td class="text">${model.email}</td>
              <td class="text">${model.phoneNum}</td>
              <td class="text">${model.dateBirth}</td>
              <td>
<button id='${index}_edit' class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button id='${index}_del' class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
            </tr>
          </tbody>`
          index++
        })
        var parser = new DOMParser()
        var doc = parser.parseFromString(userstable, 'text/html')
        document.getElementById("userstable").innerHTML = doc.body.outerHTML
        index = 0
        data.forEach((model) => {

          $(`#${index}_edit`).click(`${model.email}`, editData);
          $(`#${index}_del`).click(`${model.email}`, deleteData);
          index++
        })
      }
    })
  }
  async function editData(data) {
    let field_name = prompt('Enter The Field Name That You Want To Change:');
    if (field_name.toLowerCase() == "name") {
      let field_value = prompt('Enter The Value You Want:');
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "email",
            name: field_value,
            email: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) { alert(`Failed ${error}`); }
        })
      }
      else { alert(`No Value`) }
    }
    else if (field_name.toLowerCase() == "roles") {
      let field_value = prompt('Enter The Value You Want:');
      if (field_value != null && (field_value == 100 || field_value == 200)) {
        if (field_value == 100)
          await $.ajax({
            url: dburl,
            method: "PUT",
            withCredentials: true,
            contentType: 'application/json',
            data: JSON.stringify({
              fieldsearch: "email",
              roles: { User: field_value },
              email: data.data
            }),
            success: function () {
              alert(`Changed ${field_name} Successfully`);
              location.reload()
            },
            error: function (xhr, status, error) { alert(`Failed ${error}`); }
          })
        else
          await $.ajax({
            url: dburl,
            method: "PUT",
            withCredentials: true,
            contentType: 'application/json',
            data: JSON.stringify({
              fieldsearch: "email",
              roles: { Admin: field_value },
              email: data.data
            }),
            success: function () {
              alert(`Changed ${field_name} Successfully`);
              location.reload()
            },
            error: function (xhr, status, error) { alert(`Failed ${error}`); }
          })
      }
      else { alert(`No Value`) }

    }
    else if (field_name.toLowerCase() == "sex") {
      let field_value = prompt('Enter The Value You Want:');
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "email",
            sex: field_value,
            email: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) { alert(`Failed ${error}`); }
        })
      }
      else { alert(`No Value`) }
    }
    else if (field_name.toLowerCase() == "phonenum") {
      const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      let field_value = ""
      while (field_value === "" || !phone_pattern.test(field_value)) {
        field_value = prompt('Enter The Phone Number:');
        if (field_value === null) {
          break
        }
        if (phone_pattern.test(field_value))
          break
      }
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "email",
            phoneNum: field_value,
            email: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) { alert(`Failed ${error}`); }
        })
      }
      else { alert(`No Value`) }
    }
    else if (field_name.toLowerCase() == "datebirth") {
      let field_value = ""
      let dateBirth_date = ""
      while (field_value === "" || isNaN(dateBirth_date)) {
        dateBirth = prompt('Enter The Date Of Birth (in the format (DD/MM/YYYY)):');
        dateBirth_date = new Date(field_value);
        if (field_value === null) {
          break
        }
        if (!isNaN(dateBirth_date))
          break
      }
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "email",
            dateBirth: dateBirth_date,
            email: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) { alert(`Failed ${error}`); }
        })
      }
      else { alert(`No Value`) }
    }
    else {
      alert(`Can Not Edit Field Named ${field_name}`);
    }
  }

  async function addData() {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
    var dburl = `http://localhost/API/users`
    try {
      let name = ""
      while (name === "") {
        name = prompt('Enter The First And Last Name:');
        if (name === null) {
          throw "No Name"
        }
      }
      let sex = ""
      while (sex === "") {
        sex = prompt('Enter The Sex Of The User:');
        if (sex === null) {
          throw "No Sex"
        }
      }
      let roles = ""
      while (roles === "") {
        roles = prompt('Enter The Role (Enter 200 If You Want An Admin):');
        if (roles === null) {
          throw "No Role"
        }
        if (!isNumeric(roles)) {
          roles = ""
          continue
        }
        if (roles == 200)
          roles = { Admin: roles }
        else if (roles)
          roles = { User: 100 }
      }
      let email = ""
      while (email === "" || !email_pattern.test(email)) {
        email = prompt('Enter The Email:');
        if (email === null) {
          throw "No Email"
        }
        if (email_pattern.test(email))
          break
      }
      let phoneNum = ""
      while (phoneNum === "" || !phone_pattern.test(phoneNum)) {
        phoneNum = prompt('Enter The Phone Number:');
        if (phoneNum === null) {
          throw "No Phone"
        }
        if (phone_pattern.test(phoneNum))
          break
      }
      let dateBirth = ""
      let dateBirth_date = ""
      while (dateBirth === "" || isNaN(dateBirth_date)) {
        dateBirth = prompt('Enter The Date Of Birth (in the format (DD/MM/YYYY)):');
        dateBirth_date = new Date(dateBirth);
        if (dateBirth === null) {
          throw "No DateBirth"
        }
        if (!isNaN(dateBirth_date))
          break
      }
      let password = ""
      while (password === "") {
        password = prompt('Enter The Password:');
        if (password === null) {
          throw "No Password"
        }
      }
      await $.ajax({
        url: dburl,
        method: "POST",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          name: name,
          sex: sex,
          roles: roles,
          email: email,
          phoneNum: phoneNum,
          dateBirth: dateBirth_date,
          password: password
        }),
        success: function () {
          alert(`Added ${email} Successfully`);
          location.reload()
        },
        error: function (xhr, status, error) { alert(`Failed To Add ${error}`); }
      })
    } catch (err) {
      alert("Canceled Operation: " + err)
    }
  }



  async function deleteData(data) {
    let confirmation = prompt('To Confirm The Deletion Enter Confirm:');
    if (confirmation.toLowerCase() == "confirm") {
      await $.ajax({
        url: dburl,
        method: "DELETE",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          email: data.data
        }),
        success: function () {
          alert(`Deleted ${data.data} Successfully`);
          location.reload()
        }
      })
    }
    else {
      alert(`Did Not Delete`);
    }
  }
  GetUsers()

  $('#add_btn').click(addData);
})