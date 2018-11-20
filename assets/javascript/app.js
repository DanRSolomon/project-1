/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});


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

//Poetry DB
/* 
$(document).on("click", '.compilation-search-button', function () {

  var searchTerm = $("#compilation-input").val();
  var url = "http://poetrydb.org/lines/" +
    `${searchTerm}` +
    `/lines.json`;

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    clear();

    response.json.forEach(function (data, index) {
      var poetryResult = $(`
              <div class="text-white-50 bg-dark">
                  <div> Title: ${response.json[0].title} </div>
                  <div> Author: ${response.json[0].author}</div>
                  <div> Lines: ${response.json[0].lines} </div>
                  <br />
              </div>
          `)
      poetryResult.appendTo(".poetry-result");
    });
  });
}) */ 

//Quotes
$(document).on("click", '.compilation-search-button', function () {

  var url = "https://andruxnet-random-famous-quotes.com/";

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    clear();

    response.forEach(function (data, index) {
      var famousQuoteResult = $(`
              <div class="text-white-50 bg-dark">
                  <div> Quote: ${response[0].quote} </div>
                  <div> Author: ${response[0].author}</div>
                  <br />
              </div>
          `)
      famousQuoteResult.appendTo(".quote-result");
    });
  });
}) 


