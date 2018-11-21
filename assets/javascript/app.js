/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});



//Hide Youtube at first
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
//Display Youtube onClick 
$(".music-search-button").click(function () {
  $("#music-iframe").toggle();
})

//When DOM is loaded, clear search results area
document.addEventListener('DOMContentLoaded', function () {
  $("#modal-btn").on("click", function () {
    $('#myModal').modal(options)
  })
  function clear() {
    $(".compilation-results").empty()
  }
  //Clear function
  clear();

  //Hide compilation search areas
  $(".card-deck").toggle(false);
  //Search compilations button with onClick function
  $(document).on("click", '.compilation-search-button', function () {
    clear();
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
    });

    // //Poetry DB
    // var searchTerm = $("#compilation-input").val();
    // var url = `http://poetrydb.org/lines/${searchTerm}/lines.json`;
    // $.ajax({
    //   url: url,
    //   method: "GET",
    //   headers: {
    //     "accept": "application/json",
    //     "Access-Control-Allow-Origin":"*",
    //     'X-Mashape-Key': 'QNPeLrTuJImshsrV1xsmJKc5ytUZp16QOAAjsnch01iaEEZR3G',
    //   },
    // }).then(console.log)


  });
});
