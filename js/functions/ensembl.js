/* Ensembl Functions

Make REST calls to ensembl

*/

var getId = function(gene){
	console.log("calling get id with " + gene)
	var server = "http://rest.ensembl.org"
	var get_gene = "/xrefs/symbol/homo_sapiens/"+gene+"?"
	return  $.ajax({
            url: server+get_gene,
            type: 'GET',
            contentType: "application/json"
        })
} 

var getPosition = function(pos){
	var server = "http://rest.ensembl.org"
  	var get_pos = "/lookup/id/"+pos+"?"
  	return  $.ajax({
              url: server+get_pos,
              type: 'GET',
              contentType: "application/json",
        }) 
        .pipe(function(data){
        	var liftover = "/map/human/"+data.assembly_name+"/"+data.seq_region_name+":"+data.start+".."+data.end+":/GRCh37"
        	return  $.ajax({
		              url: server+liftover,
		              type: 'GET',
		              contentType: "application/json",
		            }) 

        })
}