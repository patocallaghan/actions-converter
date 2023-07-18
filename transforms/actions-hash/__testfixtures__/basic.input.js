import Component from '@ember/component';

Component.extend({
  bar: action(function (e) {
    //do stuff
  }),
  test: 'a',
  baz: action(function (e) {
    //do stuff
  }),
  bingo: action(async function (e) {
    //do stuff
  }),
});
