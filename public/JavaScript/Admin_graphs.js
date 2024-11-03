function loadlolipopProducts() {
      var margin_for_the_lollipop = { top: 20, right: 20, bottom: 60, left: 50 },

            width = 600 - margin_for_the_lollipop.left - margin_for_the_lollipop.right,
            height = 500 - margin_for_the_lollipop.top - margin_for_the_lollipop.bottom;

      var svg = d3.select("#productviz")
            .append("svg")
            .attr("width", width + margin_for_the_lollipop.left + margin_for_the_lollipop.right)
            .attr("height", height + margin_for_the_lollipop.top + margin_for_the_lollipop.bottom)
            .append("g")
            .attr("transform", "translate(" + margin_for_the_lollipop.left + "," + margin_for_the_lollipop.top + ")");


      // Input Data - data
      var dburl = "http://localhost/API/users/MostBought"
      fetch(dburl, {
            method: "GET"
      }).then(function (response) {
            return response.json()
      }).then(function (data) {
            var arr_data = []
            var max_count = 0
            for (var k in data) {
                  arr_data.push({ name: k, count: data[k] });
                  if (max_count < data[k])
                        max_count = data[k]
            }
            // Specify the x-axis
            var xScale = d3.scaleBand()
                  .range([0, width])
                  .domain(arr_data.map(function (i) { return i.name; }))
                  .padding(1);
            svg.append("g")
                  .call(d3.axisBottom(xScale))
                  .attr("transform", "translate(0," + height + ")")
                  .selectAll("text")
                  .attr("transform", "translate(-10,16)rotate(-55)")


            // Specify the y-axis
            var yScale = d3.scaleLinear()
                  .domain([0, max_count])
                  .range([height, 0]);
            svg.append("g")
                  .call(d3.axisLeft(yScale));

            // Add Lines
            svg.selectAll("Anything")
                  .data(arr_data)
                  .enter()
                  .append("line")
                  .attr("x1", function (d) { return xScale(d.name); })
                  .attr("x2", function (d) { return xScale(d.name); })
                  .attr("y1", function (d) { return yScale(d.count); })
                  .attr("y2", yScale(0))
                  .attr("stroke", "blue")
                  .attr("stroke-width", 3)



            svg.selectAll("Circle")
                  .data(arr_data)
                  .enter()
                  // Append the Circle by specifying the cx and cy points with radius (r) = 10
                  .append("circle")
                  .attr("cx", function (d) { return xScale(d.name); })
                  .attr("cy", function (d) { return yScale(d.count); })
                  .attr("r", "10")
                  // Also use the style attribute to fill these circles with green color
                  .style("fill", "darkblue")
      })
}
function loadlolipopUsers() {
      var margin_for_the_lollipop = { top: 20, right: 20, bottom: 60, left: 50 },

            width = 600 - margin_for_the_lollipop.left - margin_for_the_lollipop.right,
            height = 500 - margin_for_the_lollipop.top - margin_for_the_lollipop.bottom;

      var svg = d3.select("#usersviz")
            .append("svg")
            .attr("width", width + margin_for_the_lollipop.left + margin_for_the_lollipop.right)
            .attr("height", height + margin_for_the_lollipop.top + margin_for_the_lollipop.bottom)
            .append("g")
            .attr("transform", "translate(" + margin_for_the_lollipop.left + "," + margin_for_the_lollipop.top + ")");


      // Input Data - data
      var dburl = "http://localhost/API/users/ThatBoughtMost"
      fetch(dburl, {
            method: "GET"
      }).then(function (response) {
            return response.json()
      }).then(function (data) {
            var arr_data = []
            var max_count = 0
            for (var k in data) {
                  arr_data.push({ name: k, count: data[k] });
                  if (max_count < data[k])
                        max_count = data[k]
            }
            // Specify the x-axis
            var xScale = d3.scaleBand()
                  .range([0, width])
                  .domain(arr_data.map(function (i) { return i.name; }))
                  .padding(1);
            svg.append("g")
                  .call(d3.axisBottom(xScale))
                  .attr("transform", "translate(0," + height + ")")
                  .selectAll("text")
                  .attr("transform", "translate(-10,16)rotate(-55)")


            // Specify the y-axis
            var yScale = d3.scaleLinear()
                  .domain([0, max_count])
                  .range([height, 0]);
            svg.append("g")
                  .call(d3.axisLeft(yScale));

            // Add Lines
            svg.selectAll("Anything")
                  .data(arr_data)
                  .enter()
                  .append("line")
                  .attr("x1", function (d) { return xScale(d.name); })
                  .attr("x2", function (d) { return xScale(d.name); })
                  .attr("y1", function (d) { return yScale(d.count); })
                  .attr("y2", yScale(0))
                  .attr("stroke", "blue")
                  .attr("stroke-width", 3)



            svg.selectAll("Circle")
                  .data(arr_data)
                  .enter()
                  // Append the Circle by specifying the cx and cy points with radius (r) = 10
                  .append("circle")
                  .attr("cx", function (d) { return xScale(d.name); })
                  .attr("cy", function (d) { return yScale(d.count); })
                  .attr("r", "10")
                  // Also use the style attribute to fill these circles with green color
                  .style("fill", "darkblue")
      })
}
