describe("flickr", function () {
  var apiKey = "1e50a2d34c91872b37b9a94bbb1c3fec";
  var ajaxable = $;
  var flickr = weloveiran.flickr(apiKey, ajaxable, _);

  it("should fetch user id for username", function () {
    var complete = false;
    runs(function () {
      flickr.withUserIdFor("Batikart", function (result) {
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
      flickr.withPublicPhotosFor("21207178@N07", function (result) {
        expect(result.photos.photo.length).toBe(10);
        complete = true;
      });
    });

    waitsFor(function () {
      return complete == true;
    }, "Flickr API to return after withPublicPhotos call", 5000);
  });

  it("should fetch location information for photo id", function () {
    var complete = false;
    runs(function () {
      flickr.withLocationFor("7348984296", function (result) {
        expect(result.photo.location).toBeDefined();
        complete = true;
      });
    });

    waitsFor(function () {
      return complete == true;
    }, "Flickr API to return after withLocation call", 5000);
  });

  it("should generate photo url for photo", function () {
    var photoish = {"id":"7348984296", "secret":"d161612ac1", "farm":9, "server":"8012"};
    var complete = false;
    runs(function () {
      flickr.withPhotoUrlFor(photoish, function (url) {
        expect(url).toContain("7348984296_d161612ac1");
        expect(url).toContain("farm9");
        expect(url).toContain("8012");
        complete = true;
      });
    });

    waitsFor(function () {
      return complete == true;
    }, "Flickr API to return after withPhotoUrlFor call", 5000);
  });
});
