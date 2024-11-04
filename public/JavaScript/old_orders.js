var dburl=`http://localhost/basketHistory`
async function GetOrders(){
    var dburl="http://localhost/API/basket/history/test@lol.mail"
    await fetch(dburl, {
          method: "GET"
          }).then(function (response) {
          return response.json()}).then(function (data) {
            console.log(data)
            var occ_table=[]
            data.forEach((product)=>{
                var occ=[]
                product.product_names.forEach((name)=>{
                    occ.forEach((product_c)=>{
                    if (Object.getOwnPropertyNames(product_c).includes(`${name}`))
                        product_c[`${name}`]=product_c[`${name}`]+1
                    })  
                if(!occ.find(product_c=>{return Object.getOwnPropertyNames(product_c).includes(`${name}`)}))    
                    occ.push(JSON.parse(`{"${name}": 1}`))
                })
                occ_table.push({date:product.date,occ:occ})
            })
            console.log(occ_table)
            var userstable = ` <table class="table">
            <thead>
              <tr>
              <th class="text">Date</th>
              <th class="text">product_name</th>
              <th class="text">quantity</th>
              </tr>
            </thead>`
            occ_table.forEach((model) => {
                 userstable = userstable + `
                <tr>
                    <td class="text" rowspan="${model.occ.length}">${model.date}</td>
                    `
                model.occ.forEach((occ)=>{
                var key=Object.keys(occ)
                userstable = userstable + `
                 <td class="text">${key}</td>
                 <td class="text">${occ[key]}</td>
                  </tr>
                  <tr>`
                })
                userstable = userstable +"</tr>"
                        })
            var parser = new DOMParser()
            var doc = parser.parseFromString(userstable, 'text/html')
            document.getElementById("orderstable").innerHTML = doc.body.outerHTML
        })
      }
