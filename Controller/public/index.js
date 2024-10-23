/*A Function to add more data via CRUD and get All data via CRUD and the Fetch functions*/
function postMethod(){
  var password="lol"
  fetch("http://localhost:8080/", {
method: "POST",
body: JSON.stringify({
  email: document.getElementById('Dogname').value,
  password: password,
  name: document.getElementById('Dogtype').value
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
    var password="lol"
    fetch("http://localhost:8080/", {
    
method: "POST",
body: JSON.stringify({
  email: document.getElementById('Dogname').value,
  password: password,
  name: document.getElementById('Dogtype').value
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
var password="lol"
var parser = new DOMParser()
var doc = parser.parseFromString(html, 'text/html')
document.getElementById("res").innerHTML = doc.body.outerHTML
});}
/*A Function to update data via CRUD and the Fetch functions*/
function putCRUDMethod(){
var password="lol"
fetch("http://localhost:8080/", {
method: "PUT",
body: JSON.stringify({
  email: document.getElementById('Dogname').value,
  password: password,
  name: document.getElementById('Dogtype').value
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
  var password="lol"
fetch("http://localhost:8080/", {
method: "DELETE",
body: JSON.stringify({
  email: document.getElementById('Dogname').value,
  password: password,
  name: document.getElementById('Dogtype').value
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