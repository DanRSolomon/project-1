/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});

//Toggle off Youtube in case someone searches the compilation first
$("#music-iframe").toggle(false);
//Script to pull YouTube playlists
function go_get() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  var base_url = 'https://www.youtube.com/embed?listType=search&list=';
  var search_field = document.getElementById('music-input').value;
  var target_url = base_url + search_field;
  var ifr = document.getElementById('music-iframe');
  ifr.src = target_url;
  return false;
}
//Toggle on Youtube with onClick function so we a know user has requested it
$(".music-search-button").click(function () {
  $("#music-iframe").toggle();
})

//Beginning of eventListener to wait for document to load before clearing result fields
document.addEventListener('DOMContentLoaded', function () {

  //modal button
  $("#modal-btn").on("click", function () {
    $('#myModal').modal(options)
  })
  //When DOM is loaded, clear search results area  
  function clear() {
    $(".compilation-results").empty()
  }
  //Clear function
  clear();

  //Toggle off compilation card-deck to keep the appearance clean
  $(".card-deck").toggle(false);
  //Search compilations button with onClick function
  $(document).on("click", '.compilation-search-button', function () {
    clear();
    //Toggle on card-deck after onClick function
    $(".card-deck").toggle();

    //Robohash.org
    var searchTerm = $("#compilation-input").val();
    var url = "https://robohash.org/" + searchTerm + ".png";
    var robotResult = $(`
        <img src="${url}" class="img-fluid robot-result" alt="Robot Image">
        <h3 class="card-title">Your Robot</h3>
        <p>Robots lovingly delivered by <a href="https://robohash.org/">Robohash.org</a></p>
    `)
    robotResult.appendTo(".robot-result");
    //end of Robohash.org

    //OpenLibrary.org
    var userSubjectSearch = $("#compilation-input").val();
    var uriSubjectSearch = encodeURI(userSubjectSearch);
    var queryURL = "https://openlibrary.org/subjects/" + uriSubjectSearch + ".json";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var bookWorks = response.works;
      if (bookWorks.length === 0) {
        $(`
          <h3>Sorry, no results.</h3>
        `).appendTo(".book-result");
      } else {
        var randomBook = bookWorks[Math.floor(Math.random() * bookWorks.length)];
        var subjectBookTitle = randomBook.title;
        console.log(subjectBookTitle);
        var coverImg = randomBook.cover_id
        var bookID = randomBook.cover_edition_key
        $(` 
        <a href="https://openlibrary.org/books/${bookID}" target="_blank">
        <img src="http://covers.openlibrary.org/b/id/${coverImg}-M.jpg">
        <h3 class="card-title">${subjectBookTitle}</h3>
        </a>
        
        <p>Cover image lovingly delivered by <a href="https://openlibrary.org/">OpenLibrary.org</a></p>
        `).appendTo(".book-result");
      };
    }); //end of Open Library

    //Harvard Art Museum
    // Find all of the objects that are paintings and have the "search term" in the title
    var artSearchTerm = $('#compilation-input').val();
    var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    var queryString = $.param({
      apikey: "902637e0-edfe-11e8-9463-0b5d77676a26",
      title: artSearchTerm,
      classification: "Paintings"
    });

    $.getJSON(apiEndpointBaseURL + "?" + queryString, function (data, index) {
      console.log(data);
      var harvardRecord = data.records;
      var randomHarvardRecord = harvardRecord[Math.floor(Math.random() * harvardRecord.length)];
      var randomHarvardImage = randomHarvardRecord.images[0].baseimageurl;
        if (randomHarvardImage === 'undefined') {
          $.getJSON();
        } else {
          var randomHarvardImageTitle = randomHarvardRecord.title;
          var randomHarvardLinkBack = randomHarvardRecord.url;
          var harvardArtResult = $(`
               <img src="${randomHarvardImage}" class="img-fluid harvard-result" alt="Static Image">
                <h3 class="card-title">Your Inspiring Image</h3>
                <h5><div>Title: ${randomHarvardImageTitle}</div>
                    <a href="${randomHarvardLinkBack}">Find out more about it here.
                    </a>
                </h5>
                <p>Artwork gracefully delivered by <a href="https://www.harvardartmuseums.org/">harvardartmuseums.org</a></p>
            `)
          harvardArtResult.appendTo(".harvard-result");
      }
    }); //end of Harvard Art Museum

  }); //end of search compilation onClick function
}); //end of eventListener for DOM loading
