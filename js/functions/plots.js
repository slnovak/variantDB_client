function lollipop_plot(selector, gene, data){

  var vsID = {
    6: "Cervix", 
    16: "Stomach", 
    10: "Liver", 
    15: "Skin", 
    1: "Bladder", 
    2: "Brain", 
    5: "Head and Neck", 
    12: "Lung", 
    4: "Breast", 
    7: "Colorectal", 
    9: "Kidney", 
    17: "Uterus", 
    8: "Esophagus", 
    13: "Pancreas", 
    14: "Prostate", 
    11: "Ovary", 
    3: "Bone", 
    0: "Blood"
  }

  var start = gene_census[gene]['start'], end = gene_census[gene]['end'], diff = end-start

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    vs_str = ''
    $.each(d.vs_tracker, function(ps){
      if (ps != 'All'){
        vs_str += "<strong> "+vsID[ps]+" : </strong><span style='color:yellow'> " + d.vs_tracker[ps] + " </span><br/>"
      }
    })
    return "<strong> Ref/Alt: </strong> <span style='color:red'> " + d.referenceBases + " / " + d.alternateBases + " </span><br/>"+vs_str;
  })

  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 60
    },
    width = 1050 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // X Scale
    var x = d3.scale.linear()
      .domain([start, end+width])
      .range([0, width], 1)

    // Our Y scale
    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { d.calls = +d.calls; return d.calls + 2; })])
        .rangeRound([height-50, 0]);

    // Our color bands
    var color = d3.scale.category20();

    // Use our X scale to set a bottom axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Same for our left axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("d"));


    // Add our chart to the #chart div
    var svg = d3.select(selector).append("svg")
      .data(data)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    svg.call(tip);

    svg.append('g')
      .attr('fill', 'none')
      .style('stroke', 'silver')
      .style('stroke-width', '20px')
      .attr('transform', 'translate(0,'+String(height-margin.bottom+5)+")")
      .call(xAxis);
    
    svg.append('g')
      .attr("fill", "none")
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .attr('transform', 'translate('+(-margin.bottom+5)+",0)")
      .call(yAxis);

    svg.append("g")
      .attr("class", "y axis")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# Mutations");

    svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", 'gray')
      .attr("x", function(d) { 
        d.start = +d.start
        return x(d.start); })
      .attr("width", 1.5)
      .attr("y", function(d) { 
        d.calls = +d.calls
        return y(d.calls); })
      .attr("height", function(d) {
        d.calls = +d.calls 
        return height - y(d.calls); 
      });

    svg.selectAll("circle").data(data).enter()
      .append("svg:circle")
      .attr("r", 4)
      .attr("fill",function(d,i){return color(i);})
      .attr("cx", function(d) { return x(d.start); })
      .attr("cy", function(d) { return y(d.calls); }) 
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}


function plotCounts(selector, min, max, l){
  console.log(selector)
  return c3.generate({
    bindto: selector,
    size: {
      //height: 15000
      height: Number(max-min)*55
    },
    padding: {
        top: 40,
        right: 40,
        bottom: 50,
        left: 70,
    },
    data: {
      json: raw_gene_counts,
      //[
        //{'cervix': 11, 'all': 18570, 'stomach': 52, 'name': 'CNTNAP2', 'kidney': 785, 'prostate': 732, 'liver': 5651, 'bladder': 15, 'brain': 134, 'lung': 50, 'blood': 540, 'colorectal': 40, 'skin': 143, 'uterus': 42, 'esophagus': 3563, 'pancreas': 4774, 'head': 8, 'ovary': 1757, 'bone': 42, 'breast': 231},
        //{'cervix': 13, 'all': 17572, 'stomach': 47, 'name': 'PTPRD', 'kidney': 478, 'prostate': 1201, 'liver': 7540, 'bladder': 15, 'brain': 112, 'lung': 26, 'blood': 478, 'colorectal': 21, 'skin': 127, 'uterus': 42, 'esophagus': 2737, 'pancreas': 3067, 'head': 18, 'ovary': 1379, 'bone': 83, 'breast': 188},
        //{'cervix': 14, 'all': 16781, 'stomach': 68, 'name': 'PCDH15', 'kidney': 484, 'prostate': 1023, 'liver': 4196, 'bladder': 13, 'brain': 146, 'lung': 57, 'blood': 582, 'colorectal': 40, 'skin': 185, 'uterus': 80, 'esophagus': 3713, 'pancreas': 4878, 'head': 12, 'ovary': 1022, 'bone': 63, 'breast': 205},
      //],
      type: 'bar',
      keys: {
        x: 'name', // it's possible to specify 'x' when category axis
        value: ['all']
        //value: ['cervix', 'stomach', 'kidney', 'prostate', 'liver', 'bladder', 'brain', 'lung', 'blood', 'colorectal', 'skin', 'uterus', 'esophagus', 'pancreas', 'head', 'ovary', 'bone', 'breast'],
      },
      // groups:[
      //      ['cervix', 'stomach', 'kidney', 'prostate', 'liver', 'bladder', 'brain', 'lung', 'blood', 'colorectal', 'skin', 'uterus', 'esophagus', 'pancreas', 'head', 'ovary', 'bone', 'breast']  
      // ]
    },
    axis: {
      rotated: true,
      x: {
        type: 'category',
        tick:{
          fit: true,
        },
        min: min,
        max: max
      },
      y: {
        label: {
          text: 'Raw Mutation Count',
          position: 'outer-middle',
      }
  }
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    bar: {
        width: {
            ratio: .4 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
  });
}

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