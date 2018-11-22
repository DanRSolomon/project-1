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
    // Find all of the objects that are paintings and have the word "rabbit" in the title
  /*   var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    var queryString = $.param({
      apikey: "undefined",
      title: "$('#compilation-input').val();",
      classification: "Paintings"
    });

    $.getJSON(apiEndpointBaseURL + "?" + queryString, function (data) {
      console.log(data);
    }); */
    var urlBored = "https://www.boredapi.com/api/activity/";
    $.ajax({
      url: urlBored,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var boredActivity = response.activity;
    var boredResult = $(`
        <img src="" class="img-fluid">
        <h3 class="card-title">A suggestion:</h3>
        <h5>${boredActivity}</h5>
        <p>Suggestion lovingly delivered by <a href="https://www.boredapi.com/">Boredapi.com</a></p>
     `);
    boredResult.appendTo(".bored-result");
    });
  
  }); //end of search compilation onClick function
}); //end of eventListener for DOM loading
