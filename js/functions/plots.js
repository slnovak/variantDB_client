function variants_search(data){
  
  console.log(data)
  var that = this
  var first = true

  var var_x = ['variants_x']
  var var_y = ['variants']
  var variant_position = {}

    data['variants'].forEach(function(variant){

      var genotype = {'0':variant.referenceBases}
      for(var i = 0; i < variant.alternateBases.length; i++){
        genotype[String(i+1)] = variant.alternateBases[i]
      }

      variant_position[variant.start] = variant
      var calls = []
      var check_calls = []
      var max = 1;
      variant['calls'].map(function(call){
        var all_ref = String(genotype[call['genotype'][0]]) + String(genotype[call['genotype'][0]])
        var geno = String(genotype[call['genotype'][0]]) + String(genotype[call['genotype'][1]])
        var look = check_calls.indexOf(geno);
        if (look > -1){
          calls[look][1] += 1
          if(calls[look][1] > max){
            max = calls[look][1]
          }
        }else{
          check_calls.push(geno)
          var new_item = []
          new_item.push(geno)
          new_item.push(1)
          calls.push(new_item)
        }
      });

      variant_position[variant.start]['calls'] = calls
      calls.forEach(function(call){
        var_x.push(variant.start)
        var_y.push(call[1])
      })

    })

  var variant_chart = c3.generate({
    bindto: '#variant_scatter',
    size: { height: 550 },
    data:{
      xs: { variants : 'variants_x'},
      columns: [ var_x, var_y ],
      type: 'scatter',
      onclick: function (d, i) { 
        console.log("onclick", d, i)
        $('#variant_scatter').hide()
        $('#variant_panel').show()
        freq_plot(variant_position[d.x])
      }
    },
    axis: {
      x: {
        label: 'position',
        tick:{
          fit: false
        }
      },
      y: {
        label: 'count'
      }
    },
    subchart: {
      show: true,
      height: 100
    }
  });
}

function freq_plot(variant){
    //clear div
    $('#variant_window').html("")
    console.log(variant)
    console.log(variant.alternateBases.toString())
    console.log(variant.calls)

    $('#variant_window').append($('<div class="col-xs-8">')
      .append('<p><strong>Alternate Bases:</strong> '+variant.alternateBases.toString()+'</p>')
      .append('<p><strong>Reference Bases:</strong> '+variant.referenceBases.toString()+'</p>')
      .append('<p><strong>Start: </strong>'+ variant.start.toString()+'</p>')
      .append('<p><strong>End: </strong>'+ variant.end.toString()+'</p>')
      .append('<p><strong>Info: </strong></p>')
      .append('<p><ul id="info_list"></ul></p>'))
      .append($('<div class="col-xs-4">')
        .append('<p><strong>Proportion of Genotypes:</strong></p>')
        .append($('<div>').attr('id', 'pie_chart')))

    $.each(variant.info, (function(key, value){
      $('#info_list').append('<li>'+key+": "+value+"</li>")
    }))

    var calls = variant['calls']
    console.log(calls)

    var chart = c3.generate({
      bindto: '#pie_chart',
      size: {
        height: 200
      },
      data: {
          columns: calls,
          type : 'pie',
        }
    });
}