$(document).ready(function () {
var dburl = `http://localhost/API/products`

async function GetProducts() {
  var dburl = "http://localhost/API/products"
  await $.ajax({url:dburl, 
    method: "GET",
    withCredentials: true,
    success: function (data) {
    console.log(data)
    var index=0
    var userstable = ` <table class="table">
            <thead>
              <tr>
              <th class="text">product_name</th>
              <th class="text">price</th>
              <th class="text">weight</th>
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
                  <td class="text">${model.description}</td>
                  <td class="text">${model.picture_link}</td>
                  <td class="text">${model.category}</td>
                  <td>
<button id='${index}_edit' class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button id='${index}_del' class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
                </tr>
              </tbody>`
              index++
    })
    var parser = new DOMParser()
    var doc = parser.parseFromString(userstable, 'text/html')
    document.getElementById("productstable").innerHTML = doc.body.outerHTML
    index=0
    data.forEach((model) => {
     
    $(`#${index}_edit`).click(`${model.product_name}`,editData);
    $(`#${index}_del`).click(`${model.product_name}`,deleteData);
  index++})
}})
}
async function editData(data) {
  const url_pattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
  let field_name = prompt('Enter The Field Name That You Want To Change:');
  if (field_name.toLowerCase() == "price") {
    let field_value = ""
    while(field_value === "" )
      {
        field_value = prompt('Enter The Value You Want:');
        if(field_value===null){
          break
        }
        if(!isNumeric(field_value)){
          field_value=""
          continue}
      }
    if (field_value != null) {
      await $.ajax({url:dburl, 
        method: "PUT",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          fieldsearch: "product_name",
          price: field_value,
          product_name: data.data
        }),
        success: function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      },
      error: function (xhr, status, error) {alert(`Failed ${error}`);}})
    }
    else { alert(`No Value`) }

  }
  else if (field_name.toLowerCase() == "weight") {
    let field_value = ""
    while(field_value === "" )
      {
        field_value = prompt('Enter The Value You Want:');
        if(field_value===null){
          break
        }
        if(!isNumeric(field_value)){
          field_value=""
          continue}
      }
    if (field_value != null) {
      await $.ajax({url:dburl, 
        method: "PUT",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          fieldsearch: "product_name",
          weight: field_value,
          product_name: data.data
        }),
        success: function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      },
      error: function (xhr, status, error) {alert(`Failed ${error}`);}})
    }
    else { alert(`No Value`) }

  }
  else if (field_name.toLowerCase() == "description") {
    let field_value = ""
    while(field_value === "")
      {
        field_value = prompt('Enter The Value You Want:');
        if(field_value===null){
          break
        }
      }
    if (field_value != null) {
      await $.ajax({url:dburl, 
        method: "PUT",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          fieldsearch: "product_name",
          description: field_value,
          product_name: data.data
        }),
        success: function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      },
      error: function (xhr, status, error) {alert(`Failed ${error}`);}})
    }
    else { alert(`No Value`) }

  }
  else if (field_name.toLowerCase() == "picture_link") {
    let field_value = ""
    while(field_value === "" || !url_pattern.test(field_value))
      {
        field_value = prompt('Enter The Value You Want:');
        if(field_value===null){
          break
        }
        if (url_pattern.test(field_value))
          break
      }
    if (field_value != null) {
      await $.ajax({url:dburl, 
        method: "PUT",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          fieldsearch: "product_name",
          picture_link: field_value,
          product_name: data.data
        }),
        success: function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      },
      error: function (xhr, status, error) {alert(`Failed ${error}`);}})
    }
    else { alert(`No Value`) }

  }
  else if (field_name.toLowerCase() == "category") {
    let field_value = ""
    while(field_value === "")
      {
        field_value = prompt('Enter The Value You Want:');
        if(field_value===null){
          break
        }
      }
    if (field_value != null) {
      await $.ajax({url:dburl, 
        method: "PUT",
        withCredentials: true,
        contentType: 'application/json',
        data: JSON.stringify({
          fieldsearch: "product_name",
          category: field_value,
          product_name: data.data
        }),
        success: function () {
        alert(`Changed ${field_name} Successfully`);
        location.reload()
      },
      error: function (xhr, status, error) {alert(`Failed ${error}`);}})
    }
    else { alert(`No Value`) }

  }
  else {
    alert(`No Field Named ${field_name}`);
  }
}

async function addData() {
  var dburl = `http://localhost/API/products`
  const url_pattern = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
  try{
  let product_name = ""
  while(product_name === "")
    {
      product_name = prompt('Enter The Product Name:');
      if(product_name===null){
        throw "No Product Name"
      }
    }
  let company_name = ""
  while(company_name === "" )
    {
      company_name = prompt('Enter The Company Number:');
      if(company_name===null){
        throw "No Company Number"
      }
      if(!isNumeric(company_name)){
        company_name=""
        continue}
      await $.ajax({url:`http://localhost/API/suppliers/${company_name}`, method: "GET",withCredentials: true,
          success: function (data) { try{company_name = data[0]._id}
            catch{
              company_name=""}
           },
          error: function (xhr, status, error) {alert(`No Company with this number`);company_name=""}})
    }
  let price = ""
  while(price === "" )
    {
      price = prompt('Enter The Price:');
      if(price===null){
        throw "No Price"
      }
      if(!isNumeric(price)){
        price=""
        continue}
    }
  let weight = ""
  while(weight === "" )
    {
      weight = prompt('Enter The Weight:');
      if(weight===null){
        throw "No Weight"
      }
      if(!isNumeric(weight)){
        weight=""
        continue}
    }
  let description = ""
  while(description === "")
    {
      description = prompt('Enter The Description:');
      if(description===null){
        throw "No Description"
      }
    }
  let picture_link = ""
  while(picture_link === "" || !url_pattern.test(picture_link))
    {
      picture_link = prompt('Enter The Picture_link:');
      if(picture_link===null){
        throw "No Email"
      }
      if (url_pattern.test(picture_link))
        break
    }
  let category = ""
  while(category === "")
    {
      category = prompt('Enter The Category:');
      if(category===null){
        throw "No Category"
      }
    }
  await $.ajax({url:dburl, 
    method: "POST",
    withCredentials: true,
    contentType: 'application/json',
    data: JSON.stringify({
      product_name: product_name,
      company_name: company_name,
      price: price,
      weight: weight,
      description: description,
      picture_link: picture_link,
      category: category
    }),
    success: function () {
    alert(`Added ${product_name} Successfully`);
    location.reload()
  },
  error: function (xhr, status, error) {alert(`Failed To Add ${error}`);}})
}catch(err){
  alert("Canceled Operation: "+err)}
}

async function deleteData(data) {
  let confirmation = prompt('To Confirm The Deletion Enter Confirm:');
  if (confirmation.toLowerCase() == "confirm") {
    await $.ajax({url:dburl, 
      method: "DELETE",
      withCredentials: true,
      contentType: 'application/json',
      data: JSON.stringify({
        product_name: data.data
      }),
      success: function () {
      alert(`Deleted ${data.data} Successfully`);
      location.reload()
  }})
  }
  else {
    alert(`Did Not Delete`);
  }
}
GetProducts()

$('#add_btn').click(addData);
})