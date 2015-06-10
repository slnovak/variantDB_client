/* Construct GASearchVariantsRequest and Send */

var GASearchVariantsRequest = function(start, end, reference, variantSetIds){
  // var request = {"end": end, "pageSize": null, "pageToken": null, "start": start, "callSetIds": null, "variantName": null, "referenceName": reference, "variantSetIds": variantSetIds}
  // return request
  return {
    "end": end, 
    "pageSize": null,
    "pageToken": null,
    "start": start, 
    "callSetIds": null, 
    "variantName": null, 
    "referenceName": reference, 
    "variantSetIds": variantSetIds
  }
}

var GASearchVariants = function (request){
  //var request = GASearchVariantsRequest(Number(data.start), Number(data.end), data.seq_region_name)
  //console.log('actual in GASearchvariants now with: ' + JSON.stringify(request))
  //console.log(proxy_path + '/variants/search')
  console.log(JSON.stringify(request))
  return $.ajax({
            url: 'http://127.0.0.1:5000/variants/search',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            data: JSON.stringify(request)
          })
}

// var GASearchVariantsRec = function(request){
//   var nextPageToken = 'nil', variants = [], new_req
//   while (nextPageToken != null){
//     $.when(GASearchVariants(request)).then(function(data){
//         variants = variants.concat(data['variants'])
//         request['nextPageToken'] = data['nextPageToken']
//         nextPageToken = data['nextPageToken']
//     })
//   }
//   return variants
// }