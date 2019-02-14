import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from '../templates/myLibrary.jst';

const libraryChannel = Radio.channel('userSearchEvent');

export default Marionette.View.extend({
  template: template,
  onRender() {
    this.$el = this.$el.children();
    this.$el.unwrap();
    this.setElement(this.$el);
    libraryChannel.on('item:selection', function(e) {
      $('ul.library-list').append('<li><a class="library-item" data-isbn="' + e.attributes['data-isbn'].value + '">' + e.text + '</a></li>');
    });
  }

});
