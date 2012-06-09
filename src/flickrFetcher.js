var weloveiran = weloveiran || {};

weloveiran.flickrFetcher = function (apiKey, ajaxable) {

  function userIdLookupUrlFor(userName) {
    return "http://api.flickr.com/services/rest/?method=flickr.people.findByUsername&format=json&nojsoncallback=1&api_key=" + apiKey + "&username=" + userName;
  }

  function globalPhotosLookupUrlFor(userId) {
    return "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&format=json&nojsoncallback=1&api_key=" + apiKey + "&per_page=10&user_id=" + userId;
  }

  function withUserIdFor(userName, callback) {
    ajaxable.ajax(userIdLookupUrlFor(userName))
      .done(function (result) {
        callback(result);
      });
  }

  function getPublicPhotosFor(userId, callback) {
    ajaxable.ajax(globalPhotosLookupUrlFor(userId))
      .done(function (result) {
        callback(result);
      });
  }

  return {
    withUserIdFor:withUserIdFor,
    getPublicPhotosFor : getPublicPhotosFor
  }
};