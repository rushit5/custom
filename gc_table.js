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
x  = config.query_fields.dimensions[0].name;
y  = config.query_fields.dimensions[1].name;
z  = config.query_fields.dimensions[2].name;
a  = config.query_fields.dimensions[3].name;
b  = config.query_fields.dimensions[4].name;     
c  = config.query_fields.dimensions[5].name;     
d  = config.query_fields.dimensions[6].name;     
e  = config.query_fields.dimensions[7].name;     
f  = config.query_fields.dimensions[8].name;     
g  = config.query_fields.dimensions[9].name;     
h  = config.query_fields.dimensions[10].name;     


var plot_data = [];

for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	plot_data.push([ 
           row[x].value,
		   row[y].value,
	       row[z].value,
		   row[a].value,
		   row[b].value,
		   row[c].value,
		   row[d].value,
		   row[e].value,
		   row[f].value,
		   row[g].value,
		   row[h].value
	]);}
	
// Data retrival and formatting ends here *********************************************************************************
console.log('Color', plot_data)	
// here google chart code starts *************************************************************************************
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

           function drawTable() {
									var data = new google.visualization.DataTable();
									data.addColumn('string', 'Campaign');
									data.addColumn('string', 'Email Subject');
									data.addColumn('date', 'Send Date');
									data.addColumn('number', 'Sent');
									data.addColumn('number', 'Delivered');
									data.addColumn('number', 'Bounce %');
									data.addColumn('number', 'UnSubs. %');
									data.addColumn('number', 'Opens %');
									data.addColumn('number', 'CTOR');
									data.addColumn('number', 'Revennue');
									data.addColumn('number', 'CR');
									data.addRows([plot_data]);									
									var table = new google.visualization.Table(document.getElementById('container'));
									table.draw(data, {showRowNumber: false,page:'enable',pageSize:15,pagingButtons:'both' , width: '450%', height: '450%',frozenColumns:3,alternatingRowStyle:false});
								}
// here google chart code ends **********************************************************************************************
doneRendering();
}
})
