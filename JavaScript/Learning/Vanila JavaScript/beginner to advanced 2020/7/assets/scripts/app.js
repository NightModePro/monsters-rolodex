const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMoveiButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMivieButton = cancelAddMoveiButton.nextElementSibling;
const userImputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const closeMovieDeletionModal = () => {
    toggleBacdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
}

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBacdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    const confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

const addNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);

}

const toggleBacdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBacdrop();
};

const clearMovieInputs = () => {
    for (const userInput of userImputs) {
        userInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBacdrop();
    clearMovieInputs();
};

const addMovieHandler = () => {
    const titleValue = userImputs[0].value;
    const imageUrlValue = userImputs[1].value;
    const ratigValue = userImputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratigValue.trim() === '' ||
        +ratigValue < 1 ||
        +ratigValue > 5
    ) {
        alert('please enter valid values (1 to 5)');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratigValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBacdrop();
    clearMovieInputs();
    addNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMoveiButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMivieButton.addEventListener('click', addMovieHandler);