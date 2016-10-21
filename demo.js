var apiKey="2b9efc75d0c3b1be9b5e67cd0e935e45";
var urlBase = 'https//api.themoviedb.org/3/movie/';

var movieIds = [550, 551, 552];

console.log('Loading script.js')

document.addEventListener('DOMContentLoaded', function() {

}

movieIds.forEach(function(id) {
  var url = urlBase + id + '?api_key=2b9efc75d0c3b1be9b5e67cd0e935e45' + apiKey;
  $.ajax(url, {
    complete: function(data) {
      //when i get data back, server responds with JSON
      var title = data.responseJSON.title;
    //use jquery here
    $("#movie-list").append('<li> + title + '</li>);
    },
    error: function(err){
      console.errror(err)
    }
  })
});
