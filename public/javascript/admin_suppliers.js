var dburl=`http://localhost/suppliers`

async function GetSuppliers(){
    var dburl="http://localhost/suppliers"
    await fetch(dburl, {
          method: "GET"
          }).then(function (response) {
          return response.json()}).then(function (data) {
            console.log(data)
            var userstable = ` <table class="table">
            <thead>
              <tr>
              <th class="text">companyName</th>
              <th class="text">numCompany</th>
              <th class="text">contact</th>
              <th class="text">phoneNum</th>
              <th class="text">locations</th>
              <th class="text">Edits</th>
              </tr>
            </thead>`
                        data.forEach((model) => {
                            userstable = userstable + `<tbody>
                <tr>
                  <td class="text">${model.companyName}</td>
                  <td class="text">${model.numCompany}</td>
                  <td class="text">${model.contact}</td>
                  <td class="text">${model.phoneNum}</td>
                  <td class="text">${Array(model.locations).toString()}</td>
                  <td>
<button onclick="editData(${model.numCompany})" class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button onclick="deleteData(${model.numCompany})" class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
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
    if (field_name.toLowerCase()=="companyname"){
        let field_value = prompt('Enter The Value You Want:');
        if(field_value!=null){
        await fetch(dburl, {
            method: "PUT",
            body: JSON.stringify({
                fieldsearch:"numCompany",
                companyName:field_value,
                numCompany:data
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
    else if (field_name.toLowerCase()=="contact"){
        let field_value = prompt('Enter The Value You Want:');
        if(field_value!=null){
        await fetch(dburl, {
            method: "PUT",
            body: JSON.stringify({
                fieldsearch:"numCompany",
                contact:field_value,
                numCompany:data
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
    else if (field_name.toLowerCase()=="phonenum"){
        let field_value = prompt('Enter The Value You Want:');
        if(field_value!=null){
        await fetch(dburl, {
            method: "PUT",
            body: JSON.stringify({
                fieldsearch:"numCompany",
                phoneNum:field_value,
                numCompany:data 
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
                numCompany:data 
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
