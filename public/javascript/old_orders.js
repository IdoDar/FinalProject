async function get_basket_info(){
    var dburl="http://localhost/users"
    await fetch(dburl, {
          method: "GET"
          }).then(function (response) {
          return response.json()}).then(function (data) {
            console.log(data)})
          }
          get_basket_info();
