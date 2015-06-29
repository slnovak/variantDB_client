/* VariantByGeneWidget

Explore variants based on gene level query

*/

var VariantByGeneWidget = function(selector){
  this.selector = $(selector)
  var that = this

  this.form = $('<div id="gene_form">')
  
  //cancer filter
  this.select = $('<select class="form-control">').attr('id', 'gene_form_primary_site')
          .attr('name', 'primary_site')

  this.select_2 = $('<select class="form-control" multiple>').attr('id', 'gene')
          .attr('name', 'gene').css('height', 200)

  $.each(variantSetIds, function(key, value){
    that.select.append($('<option>'+key+'</option>').attr('value', value))
  }) 


  // gene census
  $.each(gene_census, function(key){
    that.select_2.append($('<option>'+key+'</option>').attr('value', key))
  })

  this.form.append($('<span class="help-block">').text("Query by Gene"))
       // .append($('<div class="form-group input-container">')
       //  .append($('<label>Select Primary Site:</label>'))
       //  .append(this.select))
       .append($('<div class="form-group input-container">')
        .append($('<label>Enter Gene:</label>'))
        .append(that.select_2))
       // .append($('<div class="container">')
       //  .append($('<input class="typeahead form-control">').attr('type', 'text')
       //    .attr('id', 'gene_search').attr('placeholder', 'Search Genes'))))
       .append($('<button class="btn btn-primary ladda-button">')
            .attr('data-style', 'expand-right')
            .attr('data-spinner-color', '#74F9FF')
        .attr('type','submit')
            .attr('id', 'gene_submit')
            .append('<span class="ladda-label">Submit</span>'))
  
  this.selector.append(this.form)

  $('#output_content').append($('<div>').attr('id', 'mutation_plot'))

  lollipop_plot('#mutation_plot')

  $('#gene_submit').click(function(e){
    e.preventDefault()
    $('#output_tablist').html("");
    $('#output_content').html("");
    var la = Ladda.create(this)
    la.start()
    variant_explorer(la);
    return false;

  })

}

var variant_explorer = function(l){

    // reset

    var genes = $('#gene').val();
    var variantSet = $('#gene_form_primary_site').val();
    if (genes != null){

      //set tabs
      // $('#output').append($('<div>').attr('id', 'query_results'));

      $('#output_tablist').append($('<li role="presentation" class="active">')
          .append($('<a href="#query_results" aria-controls="query_results" role="tab" data-toggle="tab">')
            .text('Results')))

      $('#output_tablist').append($('<li role="presentation">')
          .append($('<a href="#query_statistics_gene" aria-controls="query_statistics_gene" role="tab" data-toggle="tab">')
            .text('Gene Stats')))

      $('#output_tablist').append($('<li role="presentation">')
          .append($('<a href="#query_statistics" aria-controls="query_statistics" role="tab" data-toggle="tab">')
            .text('Query Stats')))

      $('#output_content').append($('<div role="tabpanel" class="tab-pane active">')
          .attr('id', 'query_results'));

      $('#output_content').append($('<div role="tabpanel" class="tab-pane">')
           .attr('id', 'query_statistics_gene'));

      $('#output_content').append($('<div role="tabpanel" class="tab-pane">')
           .attr('id', 'query_statistics'));

      

      var getBatch = function(requests, callback, timer){

        var results = [];
        var raw_response = {};
        var stats = []

        track = 0
        request = requests[0]
        getBatchPart = function (batchId){
          var start_time = new Date().getTime()
          $.when(GASearchVariants(batchId)).then(function(response){
            console.log('loggin response')
            console.log(response)
            raw_response[genes[track]] = response;
            var ele = {"name":genes[track], "value":response['variants'].length}
            results.push(ele)

            var request_time = new Date().getTime() - start_time;
            stats.push({"time": request_time, "request": genes[track], "label": "Tile", "size": response['variants'].length})
            stats.push({"time": request_time*10, "request": genes[track], "label": "NonTile", "size": response['variants'].length})

            if(results.length == genes.length){
              callback(results, stats, raw_response, timer)
            }else{
              track += 1
              getBatchPart(requests[track])
            }
          })
        };
        var start_time = new Date().getTime()
        $.when(GASearchVariants(request)).then(function(response){
          raw_response[genes[track]] = response

          var ele = {"name":genes[track], "value":response['variants'].length}
          results.push(ele)

          var request_time = new Date().getTime() - start_time;
          stats.push({"time": request_time, "request": genes[track], "label": "Tile", "size": response['variants'].length})
          stats.push({"time": request_time*10, "request": genes[track], "label": "NonTile", "size": response['variants'].length})

          track += 1
          if(results.length == genes.length){
              callback(results, stats, raw_response, timer)
          }else{
            getBatchPart(requests[track])
          }
        })
      }

      var callback = function(data, stats, responses, timer){
        timer.stop()

        // biology statistiscs

        // all genes
        $('#query_results').append($("<div class='row'>").attr('id', 'mutation_counts'))
        $('#query_statistics_gene').append($("<div class='row'>").attr('id', 'mutation_counts_gene'))
        $('#query_statistics_gene').append($("<div class='row'>").attr('id', 'mutation_spectrum_gene'))

        var visualizationQuery = d3plus.viz()
          .container("#mutation_counts")
          .data(data)
          .type("bar")
          .id("name")
          .x("name")
          .y("value")
          .width(600)
          .height(400)
          .draw()

        // by genes

        var mutation_frequency = {"A>C":0, "C>A":0, "A>T":0, "T>A":0, "A>G":0, "G>A":0, "T>C":0, "C>T":0, "T>G":0, "G>T":0, "G>C":0, "C>G":0}
        var mutation_annotations = {"Nonsense":1000, "Missense":200, "Synonymous":150, "Inframe":50, "Frameshift":99, "Other":10}
        console.log(responses)
        console.log(responses[genes[0]]['nextPageToken'])
        var variants = responses[genes[0]]['variants'].map(function(variant){
          var alt = variant['alternateBases'][0]
          if (alt.length == 1 && variant['referenceBases'].length == 1){
            var spectra = variant['referenceBases'] +">"+alt
            if (mutation_frequency[spectra] != 'undefined'){
              mutation_frequency[spectra] += 1
            }
          }
          variant['alternateBases'] = alt
          variant['calls'] = 1;
          return variant
        })

        var pie_data1 = [];
        var pie_data2 = [];

        $.each(mutation_frequency, function(key, value){
          pie_data1.push({"name": key, "value": value})
        })

        $.each(mutation_annotations, function(key, value){
          pie_data2.push({"name": key, "value": value})
        })

        // var mutation_rate = variants.length/(gene_census[genes[0]]['end'] - gene_census[genes[0]]['start'])

        // var visualizationQuery2 = d3plus.viz()
        //   .container('#mutation_counts_gene')
        //   .data(variants)
        //   .type('scatter')
        //   .id(['start', 'referenceBases', 'alternateBases'])
        //   .x({"value":'start', "domain":[gene_census[genes[0]]['start'], gene_census[genes[0]]['end']], "grid":false})
        //   .y({"value":'calls', "grid":false})
        //   .size(5)
        //   .aggs({"start":"min", "end":"min"})
        //   .footer("Mutations across the " + gene + " axis (mutation rate: " + mutation_rate+")")
        //   .height(500)
        //   // .axes({"background":{"color" : "white"}})
        //   .draw()

        var pie_vis = d3plus.viz()
          .container("#mutation_counts_gene")
          .data(pie_data2)
          .type("pie")
          .id("name")
          .size("value")
          .height(300)
          .draw()

        var pie_vis = d3plus.viz()
          .container("#mutation_spectrum_gene")
          .data(pie_data1)
          .type("pie")
          .id("name")
          .size("value")
          .height(300)
          .draw()

        // query statistics 

        $('#query_statistics').append($('<div class=row>').append(
            $('<div class="col-sm-4">').attr('id', 'tiledb_stats').css('height', 600)
          ).append(
            $('<div class="col-sm-4">').attr('id', 'nontile_stats').css('height', 600)
          ).append(
            $('<div class="col-sm-4">').attr('id', 'tile_stats_combo').css('height', 600)
          ))

        var visualizationStats = d3plus.viz()
          .container("#tiledb_stats")
          .data(stats)
          .type("bar")
          .id("label")
          .x("request")
          .y("time")
          .title({"value":"Response time per request.", "padding":15})
          .width(400)
          .height(400)
          .draw()

        var visualizationStats2 = d3plus.viz()
          .container("#nontile_stats")
          .data(stats)
          .type("line")
          .id(["label"])
          .text("request")
          .x("size")
          .y("time")
          .title({"value": "Response time base on return size.", "padding":15})
          .width(400)
          .height(400)
          .draw()

        var visualizationStats3 = d3plus.viz()
          .container("#tile_stats_combo")
          .data(stats)
          .type("bar")
          .id("request")
          .y({"stacked":true, "value":"time"})
          .x("label")
          .title({"value":"Overall response time broken down by request.", "padding":15})
          .width(400)
          .height(400)
          .draw()
      }

      // make requests, and build promise
      requests = []
      genes.forEach(function(gene){
        var request = GASearchVariantsRequest(gene_census[gene]['start'], gene_census[gene]['end'], gene_census[gene]['referenceName'], [variantSet]);
        console.log(request)
        requests.push(request)
      })

      getBatch(requests, callback, l)
    }else{
      l.stop()
      alert('Select a gene!')
    }
    return false;

}

