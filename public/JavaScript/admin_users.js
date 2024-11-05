var dburl = `http://localhost/API/users`

async function GetUsers() {
  var dburl = "http://localhost/API/users"
  await fetch(dburl, {
    method: "GET"
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    console.log(data)
    var userstable = ` <table class="table">
        <thead>
          <tr>
          <th class="text">name</th>
          <th class="text">sex</th>
          <th class="text">roles</th>
          <th class="text">email</th>
          <th class="text">phoneNum</th>
          <th class="text">dateBirth</th>
          <th class="text">password</th>
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
              <td class="text">${model.password}</td>
              <td>
<button onclick="editData('${model.email}')" class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button onclick="deleteData('${model.email}')" class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
            </tr>
          </tbody>`
    })
    var parser = new DOMParser()
    var doc = parser.parseFromString(userstable, 'text/html')
    document.getElementById("userstable").innerHTML = doc.body.outerHTML
  })
}
async function editData(data) {
  let field_name = prompt('Enter The Field Name That You Want To Change:');
  if (field_name.toLowerCase() == "name") {
    let field_value = prompt('Enter The Value You Want:');
    if (field_value != null) {
      await fetch(dburl, {
        method: "PUT",
        body: JSON.stringify({
          fieldsearch: "email",
          name: field_value,
          email: data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function (response) {
        return response
      }).then(function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      })
    }
    else { alert(`No Value`) }
  }
  else if (field_name.toLowerCase() == "roles") {
    let field_value = prompt('Enter The Value You Want:');
    if (field_value != null && (field_value == 100 || field_value == 200)) {
      if (field_value == 100)
        await fetch(dburl, {
          method: "PUT",
          body: JSON.stringify({
            fieldsearch: "email",
            roles: { User: field_value },
            email: data
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(function (response) {
          return response
        }).then(function () {
          alert(`Changed ${field_name} Successfully`);
          location.reload()
        })
      else
        await fetch(dburl, {
          method: "PUT",
          body: JSON.stringify({
            fieldsearch: "email",
            roles: { Admin: field_value },
            email: data
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(function (response) {
          return response
        }).then(function () {
          alert(`Changed ${field_name} Successfully`);
          location.reload()
        })
    }
    else { alert(`No Value`) }

  }
  else if (field_name.toLowerCase() == "sex") {
    let field_value = prompt('Enter The Value You Want:');
    if (field_value != null) {
      await fetch(dburl, {
        method: "PUT",
        body: JSON.stringify({
          fieldsearch: "email",
          sex: field_value,
          email: data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function (response) {
        return response
      }).then(function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      })
    }
    else { alert(`No Value`) }
  }
  else if (field_name.toLowerCase() == "phonenum") {
    let field_value = prompt('Enter The Value You Want:');
    if (field_value != null) {
      await fetch(dburl, {
        method: "PUT",
        body: JSON.stringify({
          fieldsearch: "email",
          phoneNum: field_value,
          email: data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function (response) {
        return response
      }).then(function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      })
    }
    else { alert(`No Value`) }
  }
  else if (field_name.toLowerCase() == "datebirth") {
    let field_value = prompt('Enter The Value You Want in the format (DD/MM/YYYY):');
    var dob = new Date(field_value);
    if (field_value != null) {
      await fetch(dburl, {
        method: "PUT",
        body: JSON.stringify({
          fieldsearch: "email",
          dateBirth: dob,
          email: data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function (response) {
        return response
      }).then(function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      })
    }
    else { alert(`No Value`) }
  }
  else {
    alert(`Can Not Edit Field Named ${field_name}`);
  }
}

async function addData() {
  var dburl = `http://localhost/API/users`
  let name = prompt('Enter The First And Last Name:');
  console.log("name "+ name);
  let sex = prompt('Enter The Sex Of The User:');
  console.log("sex "+ sex);
  let roles = prompt('Enter The Role(Enter 200 If You Want An Admin):');
  if (roles == 200)
    roles = { "Admin": 200 }
  else
    roles = { "User": 100 }
  console.log("role "+ roles);
  let email = prompt('Enter The Email:');
  console.log("email "+ email);
  let phoneNum = prompt('Enter The Phone Number:');
  console.log("phone "+ phoneNum);
  let dateBirth = prompt('Enter The Date Of Birth (in the format (DD/MM/YYYY)):');
  dateBirth = new Date(dateBirth);
  console.log("date "+ dateBirth);
  let password = prompt('Enter The Password:');
  console.log("pass "+ password);
  console.log(name + sex + roles + email + phoneNum + dateBirth +password);
  await fetch(dburl, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      sex: sex,
      roles: roles,
      email: email,
      phoneNum: phoneNum,
      dateBirth: dateBirth,
      password: password
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function (response) {
    return response
  }).then(function () {
    alert(`Added ${email} Successfully`);
    location.reload()
  }).catch((err) => { alert(`Failed To Add ${err}`); })
}


async function deleteData(data) {
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
