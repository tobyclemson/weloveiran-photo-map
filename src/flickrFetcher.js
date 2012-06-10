var weloveiran = weloveiran || {};

weloveiran.flickr = function (apiKey, ajaxable, _) {

  function flickrApiCall(method, params){
    var baseUrl = "http://api.flickr.com/services/rest/?method=" + method + "&api_key=" + apiKey + "&format=json&nojsoncallback=1&";
    return baseUrl + _.chain(params)
                      .keys()
                      .map(function(k){
                        return k + "=" + params[k];
                      })
                      .join("&")
                      .value();
  }

  function userIdLookupUrlFor(userName) {
    return flickrApiCall("flickr.people.findByUsername", {"username": userName});
  }

  function globalPhotosLookupUrlFor(userId) {
    return flickrApiCall("flickr.people.getPublicPhotos", {"user_id": userId, "per_page":10});
  }

  function getLocationLookupUrlFor(photoId){
    return flickrApiCall("flickr.photos.geo.getLocation", {"photo_id": photoId});
  }

  function withUserIdFor(userName, callback) {
    ajaxable.ajax(userIdLookupUrlFor(userName))
      .done(function (result) {
        callback(result);
      });
  }

  function withPublicPhotosFor(userId, callback) {
    ajaxable.ajax(globalPhotosLookupUrlFor(userId))
      .done(function (result) {
        callback(result);
      });
  }

  function withLocationFor(photoId, callback) {
    ajaxable.ajax(getLocationLookupUrlFor(photoId))
      .done(function (result) {
        callback(result);
      });
  }

  function withPhotoUrlFor(photo, callback) {
    callback("http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg")
  }

  return {
    withUserIdFor:withUserIdFor,
    withPublicPhotosFor:withPublicPhotosFor,
    withLocationFor:withLocationFor,
    withPhotoUrlFor:withPhotoUrlFor
  }
};