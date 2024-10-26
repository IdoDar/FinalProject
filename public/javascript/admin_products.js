var dburl=`http://localhost/products`

async function GetProducts(){
    var dburl="http://localhost/products"
    await fetch(dburl, {
          method: "GET"
          }).then(function (response) {
          return response.json()}).then(function (data) {
            console.log(data)
            var userstable = ` <table class="table">
            <thead>
              <tr>
              <th class="text">product_name</th>
              <th class="text">price</th>
              <th class="text">weight</th>
              <th class="text">quantity</th>
              <th class="text">description</th>
              <th class="text">picture_link</th>
              <th class="text">category</th>
              <th class="text">Edits</th>
              </tr>
            </thead>`
                        data.forEach((model) => {
                            userstable = userstable + `<tbody>
                <tr>
                  <td class="text">${model.product_name}</td>
                  <td class="text">${model.price}</td>
                  <td class="text">${model.weight}</td>
                  <td class="text">${model.quantity}</td>
                  <td class="text">${model.description}</td>
                  <td class="text">${model.picture_link}</td>
                  <td class="text">${model.category}</td>
                  <td>
<button onclick="editData('${model.product_name}')" class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button onclick="deleteData('${model.product_name}')" class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
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
   if (field_name.toLowerCase()=="price"){
      let field_value = prompt('Enter The Value You Want:');
      if(field_value!=null){
      await fetch(dburl, {
          method: "PUT",
          body: JSON.stringify({
              fieldsearch:"product_name",
              price:field_value,
              product_name:data
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
  else if (field_name.toLowerCase()=="weight"){
    let field_value = prompt('Enter The Value You Want:');
    if(field_value!=null){
    await fetch(dburl, {
        method: "PUT",
        body: JSON.stringify({
            fieldsearch:"product_name",
            weight:field_value,
            product_name:data
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
else if (field_name.toLowerCase()=="quantity"){
  let field_value = prompt('Enter The Value You Want:');
  if(field_value!=null){
  await fetch(dburl, {
      method: "PUT",
      body: JSON.stringify({
          fieldsearch:"product_name",
          quantity:field_value,
          product_name:data
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
else if (field_name.toLowerCase()=="description"){
  let field_value = prompt('Enter The Value You Want:');
  if(field_value!=null){
  await fetch(dburl, {
      method: "PUT",
      body: JSON.stringify({
          fieldsearch:"product_name",
          description:field_value,
          product_name:data
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
else if (field_name.toLowerCase()=="picture_link"){
  let field_value = prompt('Enter The Value You Want:');
  if(field_value!=null){
  await fetch(dburl, {
      method: "PUT",
      body: JSON.stringify({
          fieldsearch:"product_name",
          picture_link:field_value,
          product_name:data
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
else if (field_name.toLowerCase()=="category"){
  let field_value = prompt('Enter The Value You Want:');
  if(field_value!=null){
  await fetch(dburl, {
      method: "PUT",
      body: JSON.stringify({
          fieldsearch:"product_name",
          category:field_value,
          product_name:data
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
          product_name:data 
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