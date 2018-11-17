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

//Deviant Art
/* var oembed_url = 'https://backend.deviantart.com/oembed?url=http%3A%2F%2Ffav.me%2Fd2enxz7&format=jsonp&callback=?';
$.getJSON(oembed_url, function(data) {
  console.log('Deviation by: ' + data.author_name);
  console.log('Photo ' + data.thumbnail_url);
}); */


