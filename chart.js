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
const path = d3.geoPath()

// get data
d3.queue()
    .defer(d3.json, world)
    .defer(d3.json, earthquakes)
    .await(makeMap);

// make the map with the data
function makeMap(error, us, education) {



}