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

//Robohash.org
$(document).on("click", '.compilation-search-button', function () {
  clear();

  var searchTerm = $("#compilation-input").val();
  var url = "https://robohash.org/" + searchTerm + ".png";
  var robotResult = $(`
      <div class="text-white-50 bg-dark">
      <img class="w-100" src="${url}" alt="Robot Image" />
      <br />
      </div>
  `)

  robotResult.appendTo(".search-results");
});

