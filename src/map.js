var weloveiran = weloveiran || {};

weloveiran.initialize = function (flickr) {
  var mapCenter = new google.maps.LatLng(0, 0);

  var initialMapOptions = {
    zoom:2,
    center:mapCenter,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), initialMapOptions);

  flickr.withLocatablePhotosFor("Batikart", function (photos) {
    _.each(photos, function (photo) {
      var position = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);
      var marker = new google.maps.Marker({
        position:position,
        map:map,
        title:photo.url
      });

      var infoWindow = new google.maps.InfoWindow({"maxWidth":"100px"});

      google.maps.event.addDomListener(marker, 'click', function () {
        infoWindow.setContent('<img src="' + photo.url + '" />');
        infoWindow.open(map, this);
      });
    })
  });
};