var allMovieElems = [];


function showCreateCommentModal() {// Shoes the creat comment module
  var modalBackdrop = document.getElementById('modalBackdrop');
  var createCommentModal = document.getElementById('createCommentModal');
  modalBackdrop.classList.remove('hidden');
  createCommentModal.classList.remove('hidden');

}

function closeCreateCommentModal() {// Hide the comment module

  var modalBackdrop = document.getElementById('modalBackdrop');
  var createCommentModal = document.getElementById('createCommentModal');
  modalBackdrop.classList.add('hidden');
  createCommentModal.classList.add('hidden');
  clearCommentInputValues();
}


function clearCommentInputValues() {// Clear the module
  var commentInputElems = document.getElementsByClassName('comment-input-element');
  for (var i = 0; i < commentInputElems.length; i++) {
    var input = commentInputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}

function insertNewComment() {// Inserts a new comment into the page
  var commentText = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-author-input').value;
  if (commentText && commentAuthor) {// If we have our data then we can make a comment

      var commentTemplate = Handlebars.templates.comment;
      var commentData = {
        content: commentText,
        author: commentAuthor
      };

      var newCommentElem = commentTemplate(commentData);
      var commentContainer = document.querySelector('.commentContainer');
      console.log(newCommentElem);
      commentContainer.insertAdjacentHTML('beforeend',newCommentElem);

      closeCreateCommentModal();

  }
  else {
    alert('You must specify both the text and the author of the comment!');
  }
}


function doMovieSearch() {// Searches all the movies

  var searchQuery = document.getElementById('navbar-search-input').value;
  console.log(searchQuery);
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all comments from the comment container temporarily.
  var movieContainer = document.querySelector('.nodeContainer');
  while (movieContainer.lastChild) {
    movieContainer.removeChild(movieContainer.lastChild);
  }
  allMovieElems.forEach(function (commentElem) {// for each serch for our Query
    if (!searchQuery || commentElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      movieContainer.appendChild(commentElem);
    }
  });

}

function checkLocation() {// Finds what window we are in
  var pathComponents = window.location.pathname.split('/');
  if (pathComponents[1] == "") {
    return 1;
  }
  else if (pathComponents[1] == "catalog"){
    return 2;
  }
  else if (pathComponents[1] == "play") {
    return 3;
  }
  else{
    return NULL;
  }
}

window.addEventListener('DOMContentLoaded', function () {// Loads up specific listners baised on our page
  var location = checkLocation();
  if (location == 1){

  }
  else if (location == 2){
    var searchInput = document.getElementById('navbar-search-input');
    searchInput.addEventListener('input', doMovieSearch);

    var movieElemsCollection = document.getElementsByClassName('movieNode');
    for (var i = 0; i < movieElemsCollection.length; i++) {
      allMovieElems.push(movieElemsCollection[i]);
    }
  }
  else if (location == 3) {
    var createCommentButton = document.getElementById('addCommentButton');
    createCommentButton.addEventListener('click', showCreateCommentModal);

    var modalCloseButton = document.querySelector('#createCommentModal .modal-close-button');
    modalCloseButton.addEventListener('click', closeCreateCommentModal);

    var modalCancalButton = document.querySelector('#createCommentModal .modal-cancel-button');
    modalCancalButton.addEventListener('click', closeCreateCommentModal);

    var modalAcceptButton = document.querySelector('#createCommentModal .modal-accept-button');
    modalAcceptButton.addEventListener('click', insertNewComment);
  }
});
