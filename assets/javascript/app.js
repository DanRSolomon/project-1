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

    // Send search term to save modal
    var userSavedTerm = $("#compilation-input").val();
    $("#user-search-term").html(userSavedTerm);


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

    //Harvard Art Museum
    // Find all of the objects that are paintings and have the "search term" in the title
    var artSearchTerm = $('#compilation-input').val();
    var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
    var apiKey = "902637e0-edfe-11e8-9463-0b5d77676a26";
    var queryString = $.param({
      apikey: apiKey,
      title: artSearchTerm,
      classification: "Paintings"
    });

    $.getJSON(apiEndpointBaseURL + "?" + queryString, function (data) {
      console.log(data);  
        var harvardRecord = data.records;
        var randomHarvardRecord = harvardRecord[Math.floor(Math.random() * harvardRecord.length)];
        var randomHarvardImage = randomHarvardRecord.images[0].baseimageurl;
      if (randomHarvardImage === 'undefined' || randomHarvardImage === 0) {
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
        harvardArtResult.appendTo(".harvard-art-result");
      }
    });
    // Person search within objects
    var personQueryString = $.param({
      apikey: apiKey,
      person: artSearchTerm,
    });
    $.getJSON(apiEndpointBaseURL + "?" + personQueryString, function (data) {
      console.log(data);
      var harvardRecord = data.records;
      var randomHarvardRecord = harvardRecord[Math.floor(Math.random() * harvardRecord.length)];
      var personRecord = randomHarvardRecord.people[0];
      if (personRecord === 'undefined' || personRecord === 0) {
            //Robohash.org
            var artSearchTerm = $("#compilation-input").val();
            var url = "https://robohash.org/${artSearchTerm}.png";
            var robotResult = $(`
            <img src="${url}" class="img-fluid robot-result" alt="Robot Image">
            <h3 class="card-title">Your Robot</h3>
            <h5>Sorry, no person has that name.</h5>
            <p>Robots lovingly delivered by <a href="https://robohash.org/">Robohash.org</a></p>
        `)
        robotResult.appendTo(".harvard-person-result");
      } else {
        var personName = personRecord.displayname;
        var personBirthplace = personRecord.birthplace;
        var personCulture = personRecord.culture;
        var personRole = personRecord.role;
        var workURL = randomHarvardRecord.url;
        var harvardPersonResult = $(`
       <h3 class="card-title">Your Inspiring Person</h3>
       <h5><div>Name: ${personName}</div>
          <div>Birthplace: ${personBirthplace}</div>
          <div>Culture: ${personCulture}</div>
          <div>Role: ${personRole}</div>
           <a href="${workURL}">Find out more about this person here.
           </a>
       </h5>
       <p>Person highlight brought to you by <a href="https://www.harvardartmuseums.org/">harvardartmuseums.org</a></p>
   `)
        harvardPersonResult.appendTo(".harvard-person-result");
      }
    }); //end Person search
    //Sculpture search within objects
    var sculptureQueryString = $.param({
      apikey: apiKey,
      title: artSearchTerm,
      classification: "Sculpture",
    })
    $.getJSON(apiEndpointBaseURL + "?" + sculptureQueryString, function (data) {
      console.log(data);
      var harvardRecord = data.records;
      var randomHarvardRecord = harvardRecord[Math.floor(Math.random() * harvardRecord.length)];
      var sculptureImage = randomHarvardRecord.images[0].baseimageurl;
      if (sculptureImage === 'undefined' || sculptureImage === 0) {
        $.getJSON();
      } else {
        var sculptureCulture = randomHarvardRecord.culture;
        var sculptureTitle = randomHarvardRecord.title;
        var sculptureURL = randomHarvardRecord.url;
        var harvardSculptureResult = $(`
      <img src="${sculptureURL}" class="img-fluid harvard-result" alt="Static Image">
      <h3 class="card-title">Your Inspiring Person</h3>
      <h5><div>Title: ${sculptureTitle}</div>
         <div>Culture: ${sculptureCulture}</div>
          <a href="${sculptureURL}">Find out more about this sculpture here.
          </a>
      </h5>
      <p>3D-ness brought to you by <a href="https://www.harvardartmuseums.org/">harvardartmuseums.org</a></p>
  `)
        harvardSculptureResult.appendTo(".harvard-sculpture-result");
      }
    }); //end Sculpture search
    //end of Harvard Art Museum

  }); //end of search compilation onClick function
}); //end of eventListener for DOM loading
