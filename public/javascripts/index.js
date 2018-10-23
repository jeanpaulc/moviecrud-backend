document.addEventListener('DOMContentLoaded',  () => {

  displayAllMovies()
})

const displayAddMovieCard = (event) => {
  let cardDeck = document.getElementById('movie-card-deck')

  let addMovieCard = document.createElement('div')
  addMovieCard.setAttribute('class', 'card mt-2 mx-auto')
  addMovieCard.setAttribute('id', 'add-movie-card')

  cardDeck.prepend(addMovieCard)

  let fields = ['Title', 'Year', 'Director', 'Rating', 'Poster_URL']

  createForm(addMovieCard, fields)
  setFormElements()
}

const displayAllMovies = () => {
  axios.get('/movies')
  .then(function (response) {
    let container = document.getElementById('movies-container')

    let cardDeck = document.createElement('div')
    cardDeck.setAttribute('id', 'movie-card-deck')
    cardDeck.setAttribute('class', 'card-deck')

    response.data.forEach(movie => {
      let card = document.createElement('div')
      card.setAttribute('class', 'card mt-2 mx-auto')
      card.setAttribute('movie_id', movie.id)

      let cardImg = document.createElement('img')
      cardImg.setAttribute('class', 'card-img-top')
      cardImg.setAttribute('src', movie.poster_url)

      let cardBody = document.createElement('div')
      cardBody.setAttribute('class', 'card-body')

      let titleText = document.createElement('h5')
      titleText.setAttribute('class', 'card-title')
      titleText.textContent = `${movie.title} (${movie.year})`

      let directorText = document.createElement('p')
      directorText.setAttribute('class', 'card-text')
      directorText.textContent = `Directed By: ${movie.director}`

      let ratingText = document.createElement('h6')
      ratingText.setAttribute('class', 'card-text')
      ratingText.textContent = `Rating: ${movie.rating} / 10`

      let footerEdit = document.createElement('div')
      footerEdit.setAttribute('class', 'card-footer')
      footerEdit.setAttribute('id', 'card-footer-edit')

      let footerDelete = document.createElement('div')
      footerDelete.setAttribute('class', 'card-footer')
      footerDelete.setAttribute('id', 'card-footer-delete')

      let editor = document.createElement('small')
      editor.setAttribute("class", 'editor')
      editor.setAttribute('movie_id', movie.id)
      editor.textContent = 'Edit Movie Info'
      editor.addEventListener('click', editInfo, {once: true})

      let deletor = document.createElement('small')
      deletor.setAttribute("class", 'editor')
      deletor.setAttribute('movie_id', movie.id)
      deletor.textContent = 'Delete Movie from Database'
      deletor.addEventListener('click', deleteMovie, {once: true})

      container.appendChild(cardDeck)
      cardDeck.appendChild(card)
      card.appendChild(cardImg)
      card.appendChild(cardBody)
      card.appendChild(footerEdit)
      card.appendChild(footerDelete)
      cardBody.appendChild(titleText)
      cardBody.appendChild(directorText)
      cardBody.appendChild(ratingText)
      footerEdit.appendChild(editor)
      footerDelete.appendChild(deletor)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
  .then(() => {
    let addMovieBtn = document.getElementById('add-movie-btn')
    addMovieBtn.addEventListener('click', displayAddMovieCard, {once: true})
  })
}

const editInfo = (event) => {
  let movieId = event.target.getAttribute('movie_id')

  let cardDeck = document.querySelector('.card-deck')

  cardDeck.childNodes.forEach(card => {
    if (card.getAttribute('movie_id') !== movieId) {
      card.hidden = true
    }
  })

  let container = document.getElementById('movies-container')

  let textEditor = document.createElement('div')
  textEditor.setAttribute('class', 'card mt-2 mx-auto')
  textEditor.setAttribute('id', 'text-editor')

  let fields = ['Title', 'Year', 'Director', 'Rating', 'Poster_URL']

  createForm(textEditor, fields, movieId)

  getMovieByID(movieId)
  .then(movie => {
    setFormElements(movie)
  })

  container.appendChild(textEditor)
}

const setFormElements  = (movieObject) => {
  let title = document.getElementById('edit-Title')
  title.setAttribute('type', 'text')

  let year = document.getElementById('edit-Year')
  year.setAttribute('type', 'number')
  year.setAttribute('min', 1900)
  year.setAttribute('max', 2020)

  let director = document.getElementById('edit-Director')
  director.setAttribute('type', 'text')

  let rating = document.getElementById('edit-Rating')
  rating.setAttribute('type', 'number')
  rating.setAttribute('step', 0.1)
  rating.setAttribute('min', 0)
  rating.setAttribute('max', 10)

  let poster = document.getElementById('edit-Poster_URL')
  poster.setAttribute('type', 'url')

  if (movieObject) {
    title.value = movieObject.title
    year.value = movieObject.year
    director.value = movieObject.director
    rating.value = movieObject.rating
    poster.value = movieObject.poster_url
  }
}

const deleteMovie = (event) => {
  let id = event.target.getAttribute('movie_id')
  axios.delete(`/movies/${id}`)
  .then((response) => {
    event.target.parentElement.parentElement.remove()
  })
  .catch((err) => {
    console.log(err)
  })
}

const createForm = (parentNode, fieldsArr, movieId) => {

  let form = document.createElement('form')
  if ( movieId ) { form.setAttribute('movie-id', movieId) }
  form.setAttribute('id', 'edit-form')

  let cardTitle = document.createElement('h5')
  cardTitle.setAttribute('class', 'card-title')

  if ( movieId ) {
    cardTitle.setAttribute('id', 'edit-movie-title')
    cardTitle.textContent = 'Edit Movie'
  }
  else {
    cardTitle.setAttribute('id', 'create-movie-title')
    cardTitle.textContent = 'Create New Movie'
  }

  for (var i = 0; i < fieldsArr.length; i++) {
    let field = fieldsArr[i]

    let group = document.createElement('div')
    group.setAttribute('class', 'form-group')
    group.setAttribute('id',  `${field}-group`)

    let label = document.createElement('label')

    label.setAttribute('for', `edit-${field}`)
    label.textContent = field

    let input = document.createElement('input')
    input.setAttribute('name', field.toLowerCase())
    input.setAttribute('id', `edit-${field}`)
    input.setAttribute('class', `form-control`)
    input.required = true

    form.appendChild(group)
    group.appendChild(label)
    group.appendChild(input)
  }

  let cancelbtn = document.createElement('button')
  cancelbtn.setAttribute('id', 'form-cancel-btn')
  cancelbtn.setAttribute('class', 'btn btn-secondary float-right')
  cancelbtn.textContent = 'Cancel'

  cancelbtn.addEventListener('click', cancelForm, {once: true})

  let submitBtn = document.createElement('button')
  submitBtn.setAttribute('type', 'submit')
  submitBtn.setAttribute('id', 'form-submit-btn')
  submitBtn.setAttribute('class', 'btn btn-primary float-right')
  submitBtn.textContent = 'Submit'

  if ( movieId ) {
    form.addEventListener('submit', submitFormPatch, {once: true})
  }
  else {
    form.addEventListener('submit', submitFormPost, {once: true})
  }

  parentNode.appendChild(cardTitle)
  parentNode.appendChild(form)
  form.appendChild(submitBtn)
  form.appendChild(cancelbtn)
}

const getMovieByID = (id) => {
  return axios.get(`/movies/${id}`)
  .then(movie => movie.data[0])
}

const submitFormPatch = event => {
  event.preventDefault()

  let id = event.target.getAttribute('movie-id')

  let postData = {}
  let inputFields = event.target.elements

  for (let i = 0; i < inputFields.length; i++) {
    let inputName = inputFields[i].name
    if (inputName) {
      postData[inputName] = inputFields[i].value
    }
  }

  axios.patch(`/movies/${id}`, postData)
  .then((response) => {
    let title = document.getElementById('edit-movie-title')
    title.textContent = 'Movie Edited!'
    title.setAttribute('style', "color: white; background-color: green;")
    window.setTimeout( () => window.location.reload(), 2000)
  })
  .catch((error) => {
    console.log(error)
  })
}

const submitFormPost = event => {
  event.preventDefault()

  let postData = {}
  let inputFields = event.target.elements

  for (let i = 0; i < inputFields.length; i++) {
    let inputName = inputFields[i].name
    if (inputName) {
      postData[inputName] = inputFields[i].value
    }
  }

  axios.post(`/movies`, postData)
  .then((response) => {
    let title = document.getElementById('create-movie-title')
    title.textContent = 'Movie Created!'
    title.setAttribute('style', "color: white; background-color: green;")
    window.setTimeout( () => window.location.reload(), 2000)
  })
  .catch((error) => {
    console.log(error)
  })
}

const cancelForm = event => {
  window.location.reload()
}
