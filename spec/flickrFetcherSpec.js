describe("flickrFetcher", function () {
  var apiKey = "1e50a2d34c91872b37b9a94bbb1c3fec";
  var ajaxable = $;
  var fetcher = weloveiran.flickrFetcher(apiKey, ajaxable, _);

  it("should fetch user id for username", function () {
    var complete = false;
    runs(function () {
      fetcher.withUserIdFor("Batikart", function (result) {
        expect(result.user.id).toBe("21207178@N07");
        complete = true;
      });
    });

    waitsFor(function () {
      return complete == true;
    }, "Flickr API to return after findByUsername call", 5000);
  });

  it("should fetch public photos for userId", function () {
    var complete = false;
    runs(function () {
      fetcher.getPublicPhotosFor("21207178@N07", function (result) {
        expect(result.photos.photo.length).toBe(10);
        complete = true;
      });
    });

    waitsFor(function () {
      return complete == true;
    }, "Flickr API to return after getPublicPhotos call", 5000);
  });

  it("should fetch location information for photo id", function () {
      var complete = false;
      runs(function () {
        fetcher.getLocationFor("7348984296", function (result) {
          expect(result.photo.location).toBeDefined();
          complete = true;
        });
      });

      waitsFor(function () {
        return complete == true;
      }, "Flickr API to return after getLocation call", 5000);
    });
});
