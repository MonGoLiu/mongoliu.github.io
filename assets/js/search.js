(function() {
  'use strict';

  var searchInput = document.getElementById('search-input');
  var resultsContainer = document.getElementById('search-results');

  if (!searchInput || !resultsContainer) return;

  var posts = [];

  // Load search data
  fetch('/search.json')
    .then(function(response) { return response.json(); })
    .then(function(data) { posts = data; })
    .catch(function(err) { console.error('Failed to load search data:', err); });

  searchInput.addEventListener('input', function() {
    var query = this.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (query.length < 2) return;

    var results = posts.filter(function(post) {
      return post.title.toLowerCase().indexOf(query) !== -1 ||
             post.content.toLowerCase().indexOf(query) !== -1 ||
             (post.categories && post.categories.join(' ').toLowerCase().indexOf(query) !== -1) ||
             (post.tags && post.tags.join(' ').toLowerCase().indexOf(query) !== -1);
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = '<li><p>没有找到匹配的文章。</p></li>';
      return;
    }

    results.forEach(function(post) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + post.url + '">' + post.title + '</a>' +
                     '<p>' + post.date + ' — ' + post.content.substring(0, 100) + '...</p>';
      resultsContainer.appendChild(li);
    });
  });
})();
