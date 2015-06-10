
var VariantExplorerWidget = function(selector){
	this.selector = $(selector)

	this.form_region = $('<div class="well">')
    	.attr('id', 'form_region')

  	this.variant_options = $('<div class="btn-group" role="group" aria-label="...">')
  		.css('margin-bottom', '10px')
    	.append($('<button type="button" class="btn btn-default" onclick="GeneVS()">Gene</button>'))
      .append($('<button type="button" class="btn btn-default" onclick="GeneSetVS()">Gene Sets</button>'))
    	.append($('<button type="button" class="btn btn-default" onclick="PositionVS()">Position</button>'))

  	this.query_area = $('<div>').attr('id', 'query_area')
  	this.form_region.append(this.variant_options)
  	this.form_region.append(this.query_area)

  	this.selector.append(this.form_region)
}	

var PositionVS = function(){
	$('#query_area').html("")
	this.pos_query = new VariantByPositionWidget(this.query_area)
}

var GeneSetVS = function(){
  $('#query_area').html("")
  this.gene_query = new VariantByGenesetWidget(this.query_area)
}

var GeneVS = function(){
	$('#query_area').html("")
	this.gene_query = new VariantByGeneWidget(this.query_area)
}