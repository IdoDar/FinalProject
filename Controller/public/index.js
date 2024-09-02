/*A Function to add more data via CRUD and get All data via CRUD and the Fetch functions*/
function postMethod(){
  fetch("http://localhost:8080/", {
method: "POST",
body: JSON.stringify({
  Dogname: document.getElementById('Dogname').value,
  Dogtype: document.getElementById('Dogtype').value
}),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
}).then(function (response) {
fetch("http://localhost:8080/", {
    
    method: "GET"
    }).then(function (response) {
    
    return response.text()}).then(function (html) {
    
    var parser = new DOMParser()
    var doc = parser.parseFromString(html, 'text/html')
    document.getElementById("res").innerHTML = doc.body.outerHTML
    })})
}
/*A Function to add more data via CRUD and the Fetch functions*/
  function postCRUDMethod(){
    fetch("http://localhost:8080/", {
    
method: "POST",
body: JSON.stringify({
  Dogname: document.getElementById('Dogname').value,
  Dogtype: document.getElementById('Dogtype').value
}),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
}).then(function (response) {

  return response.text()}).then(function (html) {
  
  var parser = new DOMParser()
  var doc = parser.parseFromString(html, 'text/html')
  document.getElementById("res").innerHTML = doc.body.outerHTML
  })
}
/*A Function to get all data via CRUD and the Fetch functions*/
function getCRUDMethod(){
    fetch("http://localhost:8080/", {
method: "GET"
}).then(function (response) {

return response.text()}).then(function (html) {

var parser = new DOMParser()
var doc = parser.parseFromString(html, 'text/html')
document.getElementById("res").innerHTML = doc.body.outerHTML
});}
/*A Function to update data via CRUD and the Fetch functions*/
function putCRUDMethod(){
  let row_num = prompt('Enter Row Number You Want To Cahnge');
fetch("http://localhost:8080/", {
method: "PUT",
body: JSON.stringify({
  row_num:row_num,
  Dogname: document.getElementById('Dogname').value,
  Dogtype: document.getElementById('Dogtype').value
}),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
}).then(function (response) {

  return response.text()}).then(function (html) {

var parser = new DOMParser()
var doc = parser.parseFromString(html, 'text/html')
document.getElementById("res").innerHTML = doc.body.outerHTML
})}
/*A Function to delete data via CRUD and the Fetch functions*/
function deleteCRUDMethod(){
fetch("http://localhost:8080/", {
method: "DELETE",
body: JSON.stringify({
  Dogname: document.getElementById('Dogname').value,
  Dogtype: document.getElementById('Dogtype').value
}),
headers: {
  "Content-type": "application/json; charset=UTF-8"
}
}).then(function (response) {

  return response.text()}).then(function (html) {

var parser = new DOMParser()
var doc = parser.parseFromString(html, 'text/html')
document.getElementById("res").innerHTML = doc.body.outerHTML
})}