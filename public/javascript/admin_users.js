var dburl=`http://localhost/users`

async function GetUsers(){
var dburl="http://localhost/users"
await fetch(dburl, {
      method: "GET"
      }).then(function (response) {
      return response.json()}).then(function (data) {
        console.log(data)
        var userstable = ` <table class="table">
        <thead>
          <tr>
          <th class="text">name</th>
          <th class="text">roles</th>
          <th class="text">email</th>
          <th class="text">password</th>
          <th class="text">Edits</th>
          </tr>
        </thead>`
                    data.forEach((model) => {
                        userstable = userstable + `<tbody>
            <tr>
              <td class="text">${model.name}</td>
              <td class="text">${model.roles.User}</td>
              <td class="text">${model.email}</td>
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
async function editData(data){
  let field_name = prompt('Enter The Field Name That You Want To Change:');
  if (field_name.toLowerCase()=="name"){
      let field_value = prompt('Enter The Value You Want:');
      if(field_value!=null){
      await fetch(dburl, {
          method: "PUT",
          body: JSON.stringify({
              fieldsearch:"email",
              name:field_value,
              email:data
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function (response) {
          return response}).then(function () {
              alert(`Changed ${field_name} Successfully`);
              location.reload()
          })}
          else{alert(`No Value`)}
  }
  else if (field_name.toLowerCase()=="roles"){
      let field_value = prompt('Enter The Value You Want:');
      if(field_value!=null){
      await fetch(dburl, {
          method: "PUT",
          body: JSON.stringify({
              fieldsearch:"email",
              roles:{User:field_value},
              email:data
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(function (response) {
          return response}).then(function () {
              alert(`Changed ${field_name} Successfully`);
              location.reload()
          })}
          else{alert(`No Value`)}

  }
  else {
      alert(`No Field Named ${field_name}`);
  }
}

async function deleteData(data){
let confirmation = prompt('To Confirm The Deletion Enter Confirm:');
if(confirmation.toLowerCase()=="confirm"){
    await fetch(dburl, {
        method: "DELETE",
        body: JSON.stringify({
            email:data 
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(function (response) {
        return response}).then(function () {
            alert(`Deleted ${data} Successfully`);
            location.reload()
        })
}
else{
    alert(`Did Not Delete`);
}
}
    