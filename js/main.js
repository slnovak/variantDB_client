/* Main

Main Object of the Variant DB Interface

*/
 
// initialize the mutation mapper 

// var _mut3dVis = null;
// _mut3dVis = new Mutation3dVis("default3dView", {appOptions: {j2sPath: "mutation-mapper/lib/jsmol/j2s"}});
// _mut3dVis.init();

// $(document).ready(function(){

    var main = function () {

        Ladda.bind('input[type=submit]')

        $('#input').append($('<div>')
             .attr('id', 'variants_query'));

        this.var_expl_selector = $('#variants_query')

        

        $("#output_content").append($("<div>").attr('id', 'home_plot'))


		var chart = c3.generate({
		  bindto: '#output_content',
		  data: {
		    json: [{'count': 4080, 'bucket': 0}, {'count': 17803, 'bucket': 100}, {'count': 5246, 'bucket': 200}, {'count': 2489, 'bucket': 300}, {'count': 1332, 'bucket': 400}, {'count': 902, 'bucket': 500}, {'count': 628, 'bucket': 600}, {'count': 385, 'bucket': 700}, {'count': 298, 'bucket': 800}, {'count': 209, 'bucket': 900}, {'count': 186, 'bucket': 1000}, {'count': 147, 'bucket': 1100}, {'count': 117, 'bucket': 1200}, {'count': 84, 'bucket': 1300}, {'count': 73, 'bucket': 1400}, {'count': 78, 'bucket': 1500}, {'count': 55, 'bucket': 1600}, {'count': 46, 'bucket': 1700}, {'count': 40, 'bucket': 1800}, {'count': 40, 'bucket': 1900}, {'count': 47, 'bucket': 2000}, {'count': 29, 'bucket': 2100}, {'count': 34, 'bucket': 2200}, {'count': 45, 'bucket': 2300}, {'count': 23, 'bucket': 2400}, {'count': 21, 'bucket': 2500}, {'count': 14, 'bucket': 2600}, {'count': 21, 'bucket': 2700}, {'count': 21, 'bucket': 2800}, {'count': 11, 'bucket': 2900}, {'count': 7, 'bucket': 3000}, {'count': 21, 'bucket': 3100}, {'count': 12, 'bucket': 3200}, {'count': 17, 'bucket': 3300}, {'count': 6, 'bucket': 3400}, {'count': 7, 'bucket': 3500}, {'count': 13, 'bucket': 3600}, {'count': 7, 'bucket': 3700}, {'count': 13, 'bucket': 3800}, {'count': 7, 'bucket': 3900}, {'count': 8, 'bucket': 4000}, {'count': 6, 'bucket': 4100}, {'count': 7, 'bucket': 4200}, {'count': 7, 'bucket': 4300}, {'count': 7, 'bucket': 4400}, {'count': 5, 'bucket': 4500}, {'count': 4, 'bucket': 4600}, {'count': 2, 'bucket': 4700}, {'count': 4, 'bucket': 4800}, {'count': 4, 'bucket': 4900}, {'count': 1, 'bucket': 5000}, {'count': 3, 'bucket': 5100}, {'count': 2, 'bucket': 5200}, {'count': 4, 'bucket': 5300}, {'count': 3, 'bucket': 5400}, {'count': 5, 'bucket': 5500}, {'count': 1, 'bucket': 5600}, {'count': 2, 'bucket': 5700}, {'count': 3, 'bucket': 5800}, {'count': 2, 'bucket': 5900}, {'count': 1, 'bucket': 6000}, {'count': 2, 'bucket': 6100}, {'count': 3, 'bucket': 6300}, {'count': 2, 'bucket': 6400}, {'count': 4, 'bucket': 6500}, {'count': 2, 'bucket': 6600}, {'count': 6, 'bucket': 6700}, {'count': 1, 'bucket': 6800}, {'count': 1, 'bucket': 6900}, {'count': 3, 'bucket': 7000}, {'count': 1, 'bucket': 7100}, {'count': 2, 'bucket': 7200}, {'count': 2, 'bucket': 7300}, {'count': 3, 'bucket': 7400}, {'count': 3, 'bucket': 7500}, {'count': 3, 'bucket': 7600}, {'count': 2, 'bucket': 7700}, {'count': 2, 'bucket': 7900}, {'count': 1, 'bucket': 8100}, {'count': 1, 'bucket': 8200}, {'count': 5, 'bucket': 8300}, {'count': 3, 'bucket': 8400}, {'count': 1, 'bucket': 8500}, {'count': 2, 'bucket': 8600}, {'count': 1, 'bucket': 8700}, {'count': 2, 'bucket': 8900}, {'count': 1, 'bucket': 9100}, {'count': 1, 'bucket': 9400}, {'count': 3, 'bucket': 9900}, {'count': 1, 'bucket': 10000}, {'count': 1, 'bucket': 11000}, {'count': 1, 'bucket': 11300}, {'count': 1, 'bucket': 11800}, {'count': 1, 'bucket': 12200}, {'count': 2, 'bucket': 12300}, {'count': 1, 'bucket': 12400}, {'count': 1, 'bucket': 12700}, {'count': 1, 'bucket': 13100}, {'count': 1, 'bucket': 13200}, {'count': 2, 'bucket': 14900}, {'count': 1, 'bucket': 15100}, {'count': 1, 'bucket': 15300}, {'count': 1, 'bucket': 15400}, {'count': 1, 'bucket': 15900}, {'count': 1, 'bucket': 16400}, {'count': 1, 'bucket': 16800}, {'count': 1, 'bucket': 17600}, {'count': 1, 'bucket': 18600}, {'count': 1, 'bucket': 20200}, {'count': 1, 'bucket': 22700}],
		    type: 'bar',
		    keys: {
		      x: 'bucket', // it's possible to specify 'x' when category axis
		      value: ['count'],
		    }
		  },
		  axis: {
		    x: {
		      type: 'category'
		    }
		  },
		  subchart: {
  			show: true
		  }
		});


        this.variant_explorer = new VariantExplorerWidget(this.var_expl_selector[0])
        
    };
// })
$(document).ready(main);