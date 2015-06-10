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

        this.variant_explorer = new VariantExplorerWidget(this.var_expl_selector[0])
        
    };
// })
$(document).ready(main);