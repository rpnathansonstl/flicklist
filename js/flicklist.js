

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "2b9efc75d0c3b1be9b5e67cd0e935e45", // TODO 0 add your api key

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
		return "https://image.tmdb.org/t/p/w300" + movie.poster_path;
	}
};

/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<h6></h6>").text(movie.original_title);

		var button = $('<button class="btn btn-danger"></button');

		button.click(function() {
			var idx = model.watchlistItems.indexOf(movie);
			model.watchlistItems.splice(idx, 1);
			render();
		});

		var img = $("<img></img>").attr('src', api.posterUrl(movie));

    var itemView = $('<li class="panel panel-default"></li>')
      .append(title)
			.append(img)
			.append(button)
      .attr("class", "item-watchlist");

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $('<button class="btn btn-primary"></button>')
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });

}
// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
