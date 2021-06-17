looker.plugins.visualizations.add({
create: function(element, config) {
  element.innerHTML = `
	<style>
	.sannith {
	min-width: 200px;
	height: 290px
	}
	</style>
	`;
	
    var container = element.appendChild(document.createElement("div"));
	container.className = "sannith";
    container.id = 'container';
		
  },

updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)
	
// get the names of the first dimension and measure available in data
// Data retrival and formatting starts here *********************************************************************************
x  = config.query_fields.dimensions[0].name;     // quater
y  = config.query_fields.dimensions[1].name;     // total count
z  = config.query_fields.dimensions[2].name;     // BM total count
a  = config.query_fields.dimensions[3].name;     // color codes

 
var quarter = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	quarter.push([
		row[x].value 
	]);
}

var tot_cnt = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[1].name]
	tot_cnt.push([
		row[y].value 
	]);
}
var bm_data = [];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[2].name]
	bm_data.push([
		row[z].value 
	]);
}

var plot_data = [['Q','Total Count',{ role: "style" },'Goal',{ role: "style" }]];
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	plot_data.push([ 
           row[x].value,
	   row[y].value,
	   'color :'.concat(row[a].value),
	   row[z].value,
	   'color : #aba9ad'
	]);
}
// Data retrival and formatting ends here *********************************************************************************
console.log('Color', plot_data)	
// here google chart code starts *************************************************************************************
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

           function drawTable() {
									var data = new google.visualization.DataTable();
									data.addColumn('string', 'Name');
									data.addColumn('number', 'Salary');
									data.addColumn('boolean', 'Full Time Employee');
									data.addRows([
									  ['Mike',  {v: 10000, f: '$10,000'}, true],
									  ['Jim',   {v:8000,   f: '$8,000'},  false],
									  ['Alice', {v: 12500, f: '$12,500'}, true],
									  ['Mike',  {v: 10000, f: '$10,000'}, true],
									  ['Jim',   {v:8000,   f: '$8,000'},  false],
									  ['Alice', {v: 12500, f: '$12,500'}, true],
									  ['Mike',  {v: 10000, f: '$10,000'}, true],
									  ['Jim',   {v:8000,   f: '$8,000'},  false],
									  ['Alice', {v: 12500, f: '$12,500'}, true],          
									  ['Mike',  {v: 10000, f: '$10,000'}, true],
									  ['Jim',   {v:8000,   f: '$8,000'},  false],
									  ['Alice', {v: 12500, f: '$12,500'}, true]
									]);
									var table = new google.visualization.Table(document.getElementById('table_div'));
									table.draw(data, {showRowNumber: false,page:'enable',pageSize:5,pagingButtons:'both' , width: '450%', height: '450%'});
								}
// here google chart code ends **********************************************************************************************
doneRendering();
}
})
