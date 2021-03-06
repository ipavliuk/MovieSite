var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "movies"	: "list",
        "movies/page/:page"	: "list",
        "movies/add"         : "addMovie",
        "movies/:id"         : "movieDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var movieList = new MovieCollection();
        movieList.fetch({success: function(){
            $("#content").html(new MovieListView({model: movieList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    movieDetails: function (id) {
        var movie = new Movie({_id: id});
        movie.fetch({success: function(){
            $("#content").html(new MovieView({model: movie}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addMovie: function() {
        var movie = new Movie();
        $('#content').html(new MovieView({model: movie}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'MovieView', 'MovieListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});