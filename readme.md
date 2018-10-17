# MOVIE CRUD

Once you've added working with databases to your skillset you're ready to build a full stack application. To complete this project you will be building a Movie Rating website.


### The fronted requirements are as follows:

- You MUST include a CSS Framework such as Bootstrap or Materialize
- You MUST include at least two separate pages
- You MUST have your frontend interact with routes via AJAX
- You MUST have a separate project directory (and GitHub repository) for your frontend
- You MUST deploy your application

### The backend requirements are as follows:

- You MUST follow RESTful patterns
- You MUST use an opinionated architecture (e.g. MVC)
- You MUST include error handling
- You MUST store data in a database
- You MUST have a separate project directory (and GitHub repository) for your back-end project
- You MUST deploy your server

### Make your own movie rating site.

1. Fork and Clone this repository
1. Create CRUD Routes.
1. Style your site. However, CRUD is the priority.
1. Deploy your site

## HOME PAGE

- Your homepage can be whatever you want.  Make sure it has a link to your index page.

## INDEX PAGE

- Your index page should list all your movies.  The titles of the movies should link to that movies show page. There should be a button that links to each movie's edit page and a button to delete each movie.

## NEW PAGE

- Your new page should have form fields for "title", "director", "year", "your rating", and "poster url".

## EDIT PAGE

- Your edit page should display the poster have form fields for "title", "director", "year", "your rating", and "poster url".

## SHOW PAGE

- Your show page should display the poster and info for "title", "director", "year", and "your rating".


## ROUTES 
 
Use the RESTful routes for each of your routes.

- GET /movies   _lists all movies_
- POST /movies  _create a movie_
- GET /movies/:id  _show a movie_
- PUT /movies/:id _edit a movie_
- DELETE /movies/:id _delete a movie_
- ... etc


