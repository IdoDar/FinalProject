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
      let field_value = prompt('Enter The Value You Want:');
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
          }
        })
      }
      else { alert(`No Value`) }
    }
    else if (field_name.toLowerCase() == "contact") {
      let field_value = prompt('Enter The Value You Want:');
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
          }
        })
      }
      else { alert(`No Value`) }

    }
    else if (field_name.toLowerCase() == "phonenum") {
      let field_value = prompt('Enter The Value You Want:');
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
          }
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
    let companyName = prompt('Enter The Company Name:');
    let numCompany = prompt('Enter The Number Company:');
    let contact = prompt('Enter The Name Of Your Contact:');
    let phoneNum = prompt('Enter The Phone Number:');
    let locations = []
    let latlng = prompt('Enter The locations (In This Format lat,lng) (When You Are Done Enter Done):');
    while (latlng.toLowerCase() != "done") {
      locations.push({ lat: parseFloat(latlng.split(",")[0]), lng: parseFloat(latlng.split(",")[1]) })
      latlng = prompt('Enter The locations (In This Format lat,lng) (When You Are Done Enter Done):');
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