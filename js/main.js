/* Main

Main Object of the Variant DB Interface

*/
 
// initialize the mutation mapper 

// var _mut3dVis = null;
// _mut3dVis = new Mutation3dVis("default3dView", {appOptions: {j2sPath: "mutation-mapper/lib/jsmol/j2s"}});
// _mut3dVis.init();

// $(document).ready(function(){

    var main = function () {

        var that = this;

        Ladda.bind('input[type=submit]')

        $('#title').css('padding-bottom', '25px')
          .css('padding-top', '25px')

        $('#tablist').append($('<li role="presentation" class="active">')
          .append($('<a href="#main_explorer" aria-controls="main_explorer" role="tab" data-toggle="tab">')
            .text('VariantDB Explorer')))

	    $('#tablist').append($('<li role="presentation">')
	      .append($('<a href="#gene_explorer" aria-controls="gene_explorer" role="tab" data-toggle="tab">')
	        .text('Explore by Gene')))

	    $('#tab_content').append($('<div role="tabpanel" class="tab-pane active">')
	      .attr('id', 'main_explorer'));

        $('#tab_content').append($('<div role="tabpanel" class="tab-pane">')
          .attr('id', 'gene_explorer'));

        $('#gene_explorer').append($('<div class="row">')
             .attr('id', 'gene_query'));

        $('#gene_explorer').append($('<div class="col-sm-4">')
        	.attr('id', 'input')
        	.css('padding-top', '15px'))
        	.append($('<div class="col-sm-8">')
        	.attr('id', 'output')
        	.css('padding-top', '15px')
        	.append($('<div role="tabpanel">')
        		.append($("<ul class='nav nav-tabs' id='output_tablist'>"))
        		.append($("<div class='tab-content' id='output_content'>"))));

       	$('#input').append($('<div>')
             .attr('id', 'variants_query'));

        this.var_expl_selector = $('#variants_query')

        this.select_view_form = $('<form>').attr('id', 'chart_opts')

        this.select_cancer = $('<select class="form-control">')
          .attr('name', 'primary_site')

        this.select_cancer.append($('<option>All</option>').attr('value', 'All'))
        $.each(variantSetIds, function(key){
          that.select_cancer.append($('<option>'+key+'</option>').attr('value', key))
        }) 

        this.select_view_form.append($('<div class="form-group input-container">')
            .append($('<label>Display Cancer: </label>'))
            .append(this.select_cancer))
          .append($('<div class="form-group input-container">')
            .append($('<label>Number of Genes to Display (Start): </label>'))
            .append($('<input class="form-control">')
              .attr('id', 'gene_view_s')
              .attr('type', 'number')
              .attr('name', 'gene_view_s')
              .attr('value', '0')
              .attr('min', '0')
              .attr('max', '1000')
              .attr('step', '10')))
           .append($('<div class="form-group input-container">')
            .append($('<label>Number of Genes to Display (End): </label>'))
            .append($('<input class="form-control">')
              .attr('id', 'gene_view_e')
              .attr('type', 'number')
              .attr('name', 'gene_view_e')
              .attr('value', '50')
              .attr('min', '0')
              .attr('max', '1000')
              .attr('step', '10')))
          .append($('<button class="btn btn-primary ladda-button">')
            .attr('data-style', 'expand-right')
            .attr('data-spinner-color', '#74F9FF')
          .attr('type','submit')
            .attr('id', 'chart_opts_submit')
            .append('<span class="ladda-label">Submit</span>'))
       
        $("#main_explorer")
          .append($('<div class="row">')
          .append($('<div class="col-sm-4">').attr('id', 'main_chart_opts'))
          .append($('<div class="col-sm-4">'))
          .append($('<div class="col-sm-4">')))
          .append($('<div class="row">')
          .append('<h4 id="plot_title"><center>Top Mutated Genes</center></h4>'))
          .append($("<div class='row'>").attr('id', 'home_plot'))
        $('#main_chart_opts').css('padding-top', '20px')

        $('#main_chart_opts').append(this.select_view_form)

        $('#chart_opts_submit').click(function(e){
          e.preventDefault()
          $('#home_plot').html("");
          var chart = plotCounts('#home_plot', Number($('#gene_view_s').val()), Number($('#gene_view_e').val())-1)
          return false;

        })

        var chart = plotCounts('#home_plot', Number($('#gene_view_s').val()), Number($('#gene_view_e').val())-1)


        this.variant_explorer = new VariantExplorerWidget(this.var_expl_selector[0])

        // $(function(){
          // $('#gene_search').typeahead({
          //   name: 'gene_list',

          //   // data source
          //   local: gene_list,

          //   // max item numbers list in the dropdown
          //   limit: 10
          // });
      // });
        
    };
// })
$(document).ready(main);