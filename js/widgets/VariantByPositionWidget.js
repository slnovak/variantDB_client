/* VariantByPositionWidget

Explore variants based on position level query

*/

var VariantByPositionWidget = function(selector){

	this.selector = $(selector)
  var that = this

	this.form = $('<form id="pos_form">')
					.attr('enctype', 'application/json')
					.attr('method', 'POST')

  this.select = $('<select class="form-control">').attr('id', 'gene_form_primary_site')
    .attr('name', 'primary_site')

  $.each(variantSetIds, function(key){
    that.select.append($('<option>'+key+'</option>').attr('value', key))
  }) 

	this.form.append($('<span class="help-block">').text("Make a GA4GH Search Variants Request."))
			.append($('<div class="form-group input-container">')
        .append($('<label>Select Primary Site:</label>'))
        .append(this.select))
      .append($('<div class="form-group input-container">')
				.append($('<label>Start position:</label>'))
				.append($('<input class="form-control">')
					.attr('id', 'start')
					.attr('type', 'number')
					.attr('name', 'start')
					.attr('value', '55000')))
			.append($('<div class="form-group input-container">')
		  	.append($('<label>End position:</label>'))
				.append($('<input class="form-control">')
					.attr('id', 'end')
					.attr('type', 'number')
					.attr('name', 'end')
					.attr('value', '60000')))
			.append($('<div class="form-group input-container">')
				.append($('<label>Chromosome:</label>'))
				.append($('<input class="form-control">')
					.attr('id', 'referenceName')
					.attr('type', 'text')
					.attr('name', 'referenceName')
					.attr('value', '1')))
    .append($('<button class="btn btn-primary ladda-button">')
        .attr('data-style', 'expand-right')
        .attr('data-spinner-color', '#74F9FF')
				.attr('type','submit')
        .attr('id', 'pos_submit')
        .append('<span class="ladda-label">Submit</span>'))

	this.selector.append(this.form)

  this.variant_window = $('<div class="panel panel-default">')
    .attr('id', 'variant_panel').hide()
  this.variant_window.append($('<div class="panel-heading">Variant Summary</div>')
    .attr('id', 'variant_heading')
    .append($('<a>').append('<span class="glyphicon glyphicon-backward" aria-hidden="true"> Back</span>')
      .css('float', 'right')
      .click(function(){
        $('#variant_panel').hide()
        $('#barplot').show()
      })))
    .append($('<div class="panel-body">').attr('id', 'variant_window'))

  $('#output').append(this.variant_window)

  $('#pos_submit').click(function(e){

  })

}