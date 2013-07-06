var Guestbook = (function() {
  var self = this,
      callbacks = [],
      jsonp_callback = function(json) {
        self.entries = json;
        runCallbacks();
      }, _form;

  self.entries = [];
  self.subdomain = window.location.href.replace(/\.neocities\.org/i, '');

  function bind(callback) {
    callbacks.push(callback);
  }

  function getPage(page) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "http://neocities-guestbook.herokuapp.com?key=" + window.encodeURIComponent(self.subdomain) + "&page=" + page + "&callback=Guestbook.jsonp_callback";
    document.body.appendChild(script);
  }

  function runCallbacks() {
    callbacks.forEach(function(callback) {
      try {
        callback.call(self, self.entries);
      } catch(e) {
        (console || {error: function() {}}).error(e);
      }
    });
  }

  function form() {
    if (!_form) {
      var return_to = document.createElement('input'),
          name = document.createElement('input'),
          msg = document.createElement('input'),
          submit = document.createElement('input'),
          div, label;

      _form = document.createElement('form');

      _form.action = "http://neocities-guestbook.herokuapp.com?key=" + window.encodeURIComponent(self.subdomain);
      _form.method = "POST";

      return_to.type = "hidden";
      return_to.name = "return_to";
      return_to.value = window.location.href;

      _form.appendChild(return_to);

      name.type = "text";
      name.name = "name";

      div = document.createElement('div');

      label = document.createElement('label');
      label.innerHTML = "Name";
      label.for = "name";

      div.appendChild(label);
      div.appendChild(name);
      _form.appendChild(div);

      msg.type = "text"
      msg.name = "message"

      div = document.createElement('div');

      label = document.createElement('label');
      label.innerHTML = "Message";
      label.for = "message";

      div.appendChild(label);
      div.appendChild(msg);
      _form.appendChild(div);

      submit.type = "submit"
      submit.value = "Save"

      _form.appendChild(submit);
    }
    return _form;
  }

  self.form = form;
  self.bind = bind;
  self.jsonp_callback = jsonp_callback;
  self.getPage = getPage;

  return self;

}).call({});
