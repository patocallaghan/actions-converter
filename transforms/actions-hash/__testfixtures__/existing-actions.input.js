import Component from '@ember/component';

Component.extend({
  actions: {
    bar(e) {
      //do stuff
    },
  },
  test: 'a',
  baz: action(function (e) {
    //do stuff
  }),
  bingo: action(async function (e) {
    //do stuff
  }),
});
