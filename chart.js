const world = 'world.json';
const earthquakes = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';

// width and height of svg
const h = 700
const w = 1000
const ptop = 50

// append svg
const svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

// create path
const projection = d3.geoMercator()
    .translate([w / 2, h / 2])
    .scale([100])
const path = d3.geoPath()
    .projection(projection)

// size scale for earthquakes
const quakeScale = d3.scaleLinear().domain([4.5, 10]).range([2, 20])

// colour scale for earthquakes
var threshold = d3.scaleThreshold()
    .domain([5, 6, 7, 8, 9, 10])
    .range(['#370617', "#9D0208", "#DC2F02", "#E85D04", "#F48C06", '#FFBA08'])

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
            .attr('id', 'world')
            .attr("d", path)
            .style('fill', 'none')
            .style('stroke', 'black')
    });

    d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson', function (error, earthquakes) {
        if (error) return console.error(error);
        console.log(earthquakes.features)
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
            .attr("r", d => quakeScale(d.properties.mag))
            .style('fill', d => threshold(d.properties.mag))
            .attr('id', 'earthquakes')
    });




}