import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from '../templates/librarySearch.jst';

const libraryChannel = Radio.channel('userSearchEvent');

export default Marionette.View.extend({
  template: template,
  events: {
    'click button#search-books': 'searchForBook',
    'keypress #book-search': 'searchForBook',
    'click a.search-result-item': 'onSearchResultItemClick'
  },
  searchForBook(e) {
    if (e.type ===  'keypress' && e.which === 13 || e.type === 'click') {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURI($('input#book-search').val()),
        contentType: 'application/json',
        success: function(response) {
          let results = '';
          $.each(response.items, function(index, item) {
            if (item.volumeInfo.industryIdentifiers) {
              results = results + '<li><a class="search-result-item" href="" data-isbn="' + item.volumeInfo.industryIdentifiers[0].identifier + '">' + item.volumeInfo.title + '</a></li>';
            }
          });
          $('.search-results .search-results-list').empty().append(results);
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
    }
  },

  onSearchResultItemClick(e) {
    e.preventDefault();
    libraryChannel.trigger('item:selection', e.currentTarget);
    // $('ul.library-list').append('<li><a class="library-item" data-isbn="' + e.currentTarget.attributes['data-isbn'].value + '">' + e.currentTarget.text + '</a></li>');
  }
});
