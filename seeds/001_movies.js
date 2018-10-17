exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function() {
      // Inserts seed entries
      return knex('movies').insert([
          {
            id: 1,
            title: 'Star Wars Episode IV: A New Hope',
            director: 'George Lucas',
            year: 1977,
            rating: 9.0,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,643,1000_AL_.jpg'
          },
          {
            id: 2,
            title: 'Star Wars Episode V: The Empire Strikes Back',
            director: 'Irvin Kershner',
            year: 1980,
            rating: 9.9,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,641,1000_AL_.jpg'
          },
          {
            id: 3,
            title: 'Star Wars Episode VI: Return of the Jedi',
            director: 'Richard Marquand',
            year: 1983,
            rating: 6.1,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY999_CR0,0,644,999_AL_.jpg'
          },
          {
            id: 4,
            title: 'Star Wars Episode I: The Phantom Menace',
            director: 'George Lucas',
            year: 1999,
            rating: 5.1,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY999_SX666_AL_.jpg'
          },
          {
            id: 5,
            title: 'Star Wars Episode II: Attack of the Clones',
            director: 'George Lucas',
            year: 2002,
            rating: 5.4,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SY999_CR0,0,659,999_AL_.jpg'
          },
          {
            id: 6,
            title: 'Star Wars Episode III: Revenge of the Sith',
            director: 'George Lucas',
            year: 2005,
            rating: 6.5,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SY1000_SX750_AL_.jpg'
          },
          {
            id: 7,
            title: 'Star Wars Episode VII: The Force Awakens',
            director: 'J.J. Abrams',
            year: 2015,
            rating: 7.8,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg'
          },
          {
            id: 8,
            title: 'Star Wars Episode VIII: The Last Jedi',
            director: 'Rian Johnson',
            year: 2017,
            rating: 7.2,
            poster_url: 'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
          }
        ])
        .then(() => {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
        })
    })
}
