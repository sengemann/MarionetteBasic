import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import myTemplate from './Booklist.jst';

const booklistChannel = Radio.channel('booklistChannel');

export default Marionette.View.extend({
  template: myTemplate,
  onRender() {
    this.$el = this.$el.children();
    this.$el.unwrap();
    this.setElement(this.$el);
    booklistChannel.on('add-book', function(newBook) {
      $('ul.library-list').append('<li><a class="library-item" data-isbn="' + newBook.isbn + '">' + newBook.title + '</a></li>');
    });
  }
});
