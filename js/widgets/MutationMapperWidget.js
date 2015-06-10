// cBioPortal Mutation Mapper

var MutationMapperWidget = function(input){


    $("#mutation_mapper_content").append(window["backbone-template"]["mutationViews"]);
    $("#mutation_mapper_content").append($('<div>').attr('id', 'mutation_details'));
    //console.log($('#mutation_mapper_content').html())
    //$("output").append($('<div>').attr('id', 'mutation_details'));
	// mutation mapper 

    
    //processInput($("#mutation_file_example").val());
    processInput(input);
	
}

var processInput = function(input)
  {
    console.log('here is the input')
    console.log(input)
    //var sampleArray = PortalGlobals.getCases().trim().split(/\s+/);
    var parser = new MutationInputParser();

    // parse the provided input string
    var mutationData = parser.parseInput(input);

    var sampleArray = parser.getSampleArray();

    var geneList = parser.getGeneList();

    // No data to visualize...
    if (geneList.length == 0)
    {
      // console.log("Inside gene list area")
      // console.log(geneList)
      // console.log("length should be zero")
      $("#mutation_details").html(
        "No data to visualize. Please make sure your input format is valid.");

      return;
    }

    // customized table options
    var tableOpts = {
      columnVisibility: {
        startPos: function (util, gene) {
          if (util.containsStartPos(gene)) {
            return "visible";
          }
          else {
            return "hidden";
          }
        },
        endPos: function (util, gene) {
          if (util.containsEndPos(gene)) {
            return "visible";
          }
          else {
            return "hidden";
          }
        },
        variantAllele: function (util, gene) {
          if (util.containsVarAllele(gene)) {
            return "visible";
          }
          else {
            return "hidden";
          }
        },
        referenceAllele: function (util, gene) {
          if (util.containsRefAllele(gene)) {
            return "visible";
          }
          else {
            return "hidden";
          }
        },
        chr: function (util, gene) {
          if (util.containsChr(gene)) {
            return "visible";
          }
          else {
            return "hidden";
          }
        }
      },
      columnRender: {
        caseId: function(datum) {
          var mutation = datum.mutation;
          var caseIdFormat = MutationDetailsTableFormatter.getCaseId(mutation.caseId);
          var vars = {};
          vars.linkToPatientView = mutation.linkToPatientView;
          vars.caseId = caseIdFormat.text;
          vars.caseIdClass = caseIdFormat.style;
          vars.caseIdTip = caseIdFormat.tip;

          var templateFn;

          if (mutation.linkToPatientView)
          {
            templateFn = BackboneTemplateCache.getTemplateFn("mutation_table_case_id_template");
          }
          else
          {
            templateFn = BackboneTemplateCache.getTemplateFn("custom_mutation_case_id_template");
          }

          return templateFn(vars);
        }
      }
    };

    // customized main mapper options
    var options = {
      el: "#mutation_details",
      data: {
        geneList: geneList,
        sampleList: sampleArray
      },
      proxy: {
        mutationProxy: {
          options: {
            initMode: "full",
            data: mutationData
          }
        },
        pfamProxy: {
          options: {
            initMode: "full",
            data: TestData.getPfamData()
          }
        },
        pdbProxy: {
          options: {
            initMode: "full",
            data: TestData.getPdbData()
          }
        }
        // TODO implement full init for pancan & portal data
        //pancanProxy: {
        //  options: {
        //    initMode: "full",
        //    data: TestData.getPancanData()
        //  }
        //},
        //portalProxy: {
        //  options: {
        //    initMode: "full",
        //    data: TestData.getPortalData()
        //  }
        //}
      },
      view: {
        mutationTable: tableOpts
      }
    };

    // init mutation mapper
    var mutationMapper = new MutationMapper(options);
    mutationMapper.init(_mut3dVis);
  }