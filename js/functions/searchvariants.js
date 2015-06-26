/* Construct GASearchVariantsRequest and Send */

var GASearchVariantsRequest = function(start, end, reference, variantSetIds){
  console.log(variantSetIds)
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
  return $.ajax({
            url: 'http://127.0.0.1:5000/variants/search',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            cache: true,
            data: JSON.stringify(request)
          })
}

// var GASearchVariantsRequester = function (request, variants){
//   return GASearchVariantsReq(request).then(function(data){
//     if(data['nextPageToken'] == null){
//       return data
//     }
//   })
// }

// var GASearchVariants = function(request){
//   console.log('making the request with this ')
//   console.log(request)
//   GASearchVariantsRequester(request, []);
// }
