var allMovieElems = [];

/*
 * This function shows the modal to create a comment when the "create comment"
 * button is clicked.
 */
function showCreateCommentModal() {

  var modalBackdrop = document.getElementById('modalBackdrop');
  var createCommentModal = document.getElementById('createCommentModal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createCommentModal.classList.remove('hidden');

}

/*
 * This function hides the modal to create a comment and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function closeCreateCommentModal() {

  var modalBackdrop = document.getElementById('modalBackdrop');
  var createCommentModal = document.getElementById('createCommentModal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createCommentModal.classList.add('hidden');

  clearCommentInputValues();

}

/*
 * This function clears any value present in any of the comment input elements.
 */
function clearCommentInputValues() {

  var commentInputElems = document.getElementsByClassName('comment-input-element');
  for (var i = 0; i < commentInputElems.length; i++) {
    var input = commentInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

function insertNewComment() {

  var commentText = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-author-input').value;

  /*
   * Only generate the new comment if the user supplied values for both the comment
   * text and the comment attribution.  Give them an alert if they didn't.
   */
  if (commentText && commentAuthor) {

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

  } else {

    alert('You must specify both the text and the author of the comment!');

  }
}

/*
 * Perform a search over over all the comments based on the search query the user
 * entered in the navbar.  Only display comments that match the search query.
 * Display all comments if the search query is empty.
 */
function doMovieSearch() {

  // Grab the search query, make sure it's not null, and do some preproessing.
  var searchQuery = document.getElementById('navbar-search-input').value;
  console.log(searchQuery);
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all comments from the comment container temporarily.
  var movieContainer = document.querySelector('.nodeContainer');
  while (movieContainer.lastChild) {
    movieContainer.removeChild(movieContainer.lastChild);
  }

  /*
   * Loop through the collection of all comments and add comments back into the DOM
   * if they contain the search term or if the search term is empty.
   */
  allMovieElems.forEach(function (commentElem) {
    if (!searchQuery || commentElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      movieContainer.appendChild(commentElem);
    }
  });

}

function checkLocation() {
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

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {
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
