$(document).ready(function () {
  var dburl = `http://localhost/API/suppliers`
  async function GetSuppliers() {
    var dburl = "http://localhost/API/suppliers"
    await $.ajax({
      url: dburl,
      method: "GET",
      withCredentials: true,
      success: function (data) {
        console.log(data)
        var index_size = 0
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
          var index = 0
          console.log(model.locations)
          for (const loc of model.locations) {
            latlng = `[${loc.lat},${loc.lng}]`
            if (index == 0) {
              userstable = userstable + `<td class="text">${latlng}</td>
                  <td rowspan=${model.locations.length}>
<button id='${index_size}_edit'  class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
<button id='${index_size}_del' class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
                </tr>`
            }
            else {
              userstable = userstable + `<tr><td class="text">${latlng}</td></tr>`
            }
            index++
          }
          index_size++
        })
        var parser = new DOMParser()
        var doc = parser.parseFromString(userstable, 'text/html')
        document.getElementById("supplierstable").innerHTML = doc.body.outerHTML
        index_size = 0
        data.forEach((model) => {

          $(`#${index_size}_edit`).click(`${model.numCompany}`, editData);
          $(`#${index_size}_del`).click(`${model.numCompany}`, deleteData);
          index_size++
        })
      }
    })
  }
  async function editData(data) {
    let field_name = prompt('Enter The Field Name That You Want To Change:');
    if (field_name.toLowerCase() == "companyname") {
      let field_value = ""
      while(field_value === "")
        {
          field_value = prompt('Enter The Value You Want:');
          if(field_value===null){
            break
          }
        }
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "numCompany",
            companyName: field_value,
            numCompany: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) {alert(`Failed ${error}`);}
        })
      }
      else { alert(`No Value`) }
    }
    else if (field_name.toLowerCase() == "contact") {
      let field_value = ""
      while(field_value === "")
        {
          field_value = prompt('Enter The Value You Want:');
          if(field_value===null){
            break
          }
        }
      if (field_value != null) {
        await $.ajax({
          url: dburl,
          method: "PUT",
          withCredentials: true,
          contentType: 'application/json',
          data: JSON.stringify({
            fieldsearch: "numCompany",
            contact: field_value,
            numCompany: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) {alert(`Failed ${error}`);}
        })
      }
      else { alert(`No Value`) }

    }
    else if (field_name.toLowerCase() == "phonenum") {
      const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      let field_value = ""
      while(field_value === "" || !phone_pattern.test(field_value))
        {
          field_value = prompt('Enter The Value You Want:');
          if(field_value===null){
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
            fieldsearch: "numCompany",
            phoneNum: field_value,
            numCompany: data.data
          }),
          success: function () {
            alert(`Changed ${field_name} Successfully`);
            location.reload()
          },
          error: function (xhr, status, error) {alert(`Failed ${error}`);}
        })
      }
      else { alert(`No Value`) }

    }
    else {
      alert(`No Field Named ${field_name}`);
    }
  }

  async function addData() {
    var dburl = `http://localhost/API/suppliers`
    const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
    try{
    let companyName = ""
  while(companyName === "")
  {
    companyName = prompt('Enter The Company Name:');
    if(companyName===null){
      throw "No companyName"
    }
  }
    let numCompany = ""
    while(numCompany === "" )
      {
        numCompany = prompt('Enter The Number Company:');
        if(numCompany===null){
          throw "No numCompany"
        }
        if(!isNumeric(numCompany)){
          numCompany=""
          continue}
      }
    let contact = ""
    while(contact === "")
    {
      contact = prompt('Enter The Name Of Your Contact:');
      if(contact===null){
        throw "No contact"
      }
    }
    let phoneNum = ""
    while(phoneNum === "" || !phone_pattern.test(phoneNum))
      {
        phoneNum = prompt('Enter The Phone Number:');
        if(phoneNum===null){
          throw "No Phone"
        }
        if (phone_pattern.test(phoneNum))
          break
      }
    let locations = []
    let latlng = ""
    while(latlng === "" || (latlng.toLowerCase() != "done" || locations.length == 0))
      {
        latlng = prompt('Enter The locations (In This Format lat,lng) (When You Are Done Enter Done):');
        if(latlng===null){
          throw "No LatLng"
        }
        if(((!isNumeric(latlng.split(",")[0]) || !isNumeric(latlng.split(",")[1])) || !latlng.split(",")[1] || !latlng.split(",")[0])){
          if (latlng.toLowerCase() === "done" && locations.length != 0)
            continue
          latlng=""
          continue}
        locations.push({ lat: parseFloat(latlng.split(",")[0]), lng: parseFloat(latlng.split(",")[1]) })
      }
    await $.ajax({
      url: dburl,
      method: "POST",
      withCredentials: true,
      contentType: 'application/json',
      data: JSON.stringify({
        companyName: companyName,
        numCompany: numCompany,
        contact: contact,
        phoneNum: phoneNum,
        locations: locations
      }),
      success: function () {
        alert(`Added ${numCompany} Successfully`);
        location.reload()
      }, error: function (xhr, status, error) { alert(`Failed To Add ${error}`); }
    })
  }catch(err){
    alert("Canceled Operation: "+err)}
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
          numCompany: data.data
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

  async function queryData() {
    var dburl = `http://localhost/API/suppliers/query`
    let contact = prompt('Enter The Regex For Contact:', ".*");
    let phoneNum = prompt('Enter The Regex For Phone Number:', ".*");
    let companyName = prompt('Enter The Regex For Company Name:', ".*");
    await $.ajax({
      url: dburl,
      method: "POST",
      withCredentials: true,
      contentType: 'application/json',
      data: JSON.stringify({
        companyName: companyName,
        contact: contact,
        phoneNum: phoneNum
      }),
      success: function (data) {
        var index_size = 0
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
          var index = 0
          console.log(model.locations)
          for (const loc of model.locations) {
            latlng = `[${loc.lat},${loc.lng}]`
            if (index == 0) {
              userstable = userstable + `<td class="text">${latlng}</td>
                    <td rowspan=${model.locations.length}>
  <button id='${index_size}_edit'  class="btn btn-default" type="button"><i class="glyphicon glyphicon-pencil"></i></button>
  <button id='${index_size}_del' class="btn btn-default" type="button"><i class="glyphicon glyphicon-remove"></i></button><td>
                  </tr>`
            }
            else {
              userstable = userstable + `<tr><td class="text">${latlng}</td></tr>`
            }
            index++
          }
          index_size++
        })
        var parser = new DOMParser()
        var doc = parser.parseFromString(userstable, 'text/html')
        document.getElementById("supplierstable").innerHTML = doc.body.outerHTML
        index_size = 0
        data.forEach((model) => {

          $(`#${index_size}_edit`).click(`${model.numCompany}`, editData);
          $(`#${index_size}_del`).click(`${model.numCompany}`, deleteData);
          index_size++
        })
      }, error: function (xhr, status, error) { alert(`Failed To Query ${error}`); }
    })
  }

  GetSuppliers()

  $('#add_btn').click(addData);
  $('#search_btn').click(queryData);
})