const world = 'world.json';
const earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';

// width and height of svg
const h = 600
const w = 1000
const ptop = 50

// append svg
const svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

// create path
const projection = d3.geoMercator();
const path = d3.geoPath().projection(projection)

// get data
d3.queue()
    .defer(d3.json, world)
    .defer(d3.json, earthquakes)
    .await(makeMap);

// make the map with the data
function makeMap(error, world, earthquakes) {
    d3.json('world.json', function (error, world) {
        if (error) return console.error(error);
        svg.selectAll("path")
            .data(world.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style('fill', 'white')
            .style('stroke', 'black')

        d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson', function (error, earthquakes) {
            if (error) return console.error(error);
            svg.selectAll("circle")
                .data(earthquakes.features)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection(d.geometry.coordinates)[0];
                })
                .attr("cy", function (d) {
                    return projection(d.geometry.coordinates)[1];
                })
                .attr("r", 5)
                .style('fill', 'red')
        });

    });


}