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
                userstable = userstable + `
                <tr>
                  <td class="text" rowspan=${model.locations.length}>${model.companyName}</td>
                  <td class="text" rowspan=${model.locations.length}>${model.numCompany}</td>
                  <td class="text" rowspan=${model.locations.length}>${model.contact}</td>
                  <td class="text" rowspan=${model.locations.length}>${model.phoneNum}</td>`
                  var index=0
                  console.log(model.locations)
                  for (const loc of model.locations){
                    latlng=`[${loc.lat},${loc.lng}]`
                    if(index==0)
                      userstable = userstable + `<td class="text">${latlng}</td>
                  <td rowspan=${model.locations.length}>
<button onclick="editData(${model.numCompany})" class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button onclick="deleteData(${model.numCompany})" class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
                </tr>`
                    else
                    {
                      userstable = userstable + `<tr><td class="text">${latlng}</td></tr>`
                    }
                    index++
                  }       
                        })
            var parser = new DOMParser()
            var doc = parser.parseFromString(userstable, 'text/html')
            document.getElementById("supplierstable").innerHTML = doc.body.outerHTML
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

async function addData(){
  var dburl=`http://localhost/suppliers`
  let companyName = prompt('Enter The Company Name:');
  let numCompany = prompt('Enter The Number Company:');
  let contact = prompt('Enter The Name Of Your Contact:');
  let phoneNum = prompt('Enter The Phone Number:');
  let locations=[]
  let latlng = prompt('Enter The locations (In This Format lat,lng) (When You Are Done Enter Done):');
  while(latlng.toLowerCase() !="done"){
    locations.push({lat:parseFloat(latlng.split(",")[0]),lng:parseFloat(latlng.split(",")[1])})
    latlng = prompt('Enter The locations (In This Format lat,lng) (When You Are Done Enter Done):');
  }
  await fetch(dburl, {
    method: "POST",
    body: JSON.stringify({
      companyName:companyName,
      numCompany:numCompany,
      contact:contact,
      phoneNum:phoneNum,
      locations:locations
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(function (response) {
    return response}).then(function () {
        alert(`Added ${numCompany} Successfully`);
        location.reload()
    }).catch((err)=>{alert(`Failed To Add ${err}`);})
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
