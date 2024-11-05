$(document).ready(function () {
var dburl = `http://localhost/API/basket`

async function GetUsers() {
  var dburl = "http://localhost/API/basket/historys/All"
  await $.ajax({url:dburl, 
    method: "GET",
    withCredentials: true,
    success: function (data) {
    console.log(data)
    var prices=[]
    data.forEach((product)=>{
        product.product_names.forEach((name)=>{
        if(!prices.find(prices=>{return Object.getOwnPropertyNames(prices).includes(`${name.product_name}`)}))    
            prices.push(JSON.parse(`{"${name.product_name}": ${name.price}}`))
        })
    })
    var occ_table=[]
    data.forEach((product)=>{
        var occ=[]
        product.product_names.forEach((name)=>{
            name= name.product_name
            occ.forEach((product_c)=>{
            if (Object.getOwnPropertyNames(product_c).includes(`${name}`))
                product_c[`${name}`]=product_c[`${name}`]+1
            })  
        if(!occ.find(product_c=>{return Object.getOwnPropertyNames(product_c).includes(`${name}`)}))    
            occ.push(JSON.parse(`{"${name}": 1}`))
        })
        occ_table.push({user:product.user.email,date:product.date,occ:occ})
    })
    console.log(occ_table)
    var userstable = ` <table class="table">
        <thead>
          <tr>
          <th class="text">user</th>
          <th class="text">date</th>
          <th class="text">product</th>
          <th class="text">quantity</th>
          <th class="text">price</th>
            <th class="text">total</th>
          </tr>
        </thead>`
        occ_table.forEach((model) => {
            var total=0
            var index=0
            console.log(model)
             userstable = userstable + `
            <tr>
                <td class="text" rowspan="${model.occ.length}">${model.user}</td>
                <td class="text" rowspan="${model.occ.length}">${model.date}</td>
                `
            model.occ.forEach((occ)=>{
                var key=Object.keys(occ)
                var real_price=0
                for(price of prices)
                    if(String(Object.keys(price))==String(key))
                        real_price=price[key]
                total=total+occ[key]*real_price
            })
            model.occ.forEach((occ)=>{
            var key=Object.keys(occ)
            var real_price=0
            for(price of prices)
                if(String(Object.keys(price))==String(key))
                    real_price=price[key]
            if(index==0)
            userstable = userstable + `
            <td class="text">${key}</td> 
            <td class="text">${occ[key]}</td>
            <td class="text">${occ[key]*real_price}</td>
            <td class="text" rowspan="${model.occ.length}">${total}</td>
             </tr>
             <tr>` 
             else
             userstable = userstable + `
             <td class="text">${key}</td> 
             <td class="text">${occ[key]}</td>
             <td class="text">${occ[key]*real_price}</td>
              </tr>
              <tr>`
              index++
            })
            userstable = userstable +`</tr>`
                    })
    var parser = new DOMParser()
    var doc = parser.parseFromString(userstable, 'text/html')
    document.getElementById("userstable").innerHTML = doc.body.outerHTML
  }})
}
GetUsers()
})