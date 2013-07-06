var Guestbook = (function() {
  var self = this, callbacks = [], _form;

  self.entries = [];
  self.subdomain = window.location.href.replace(/\.neocities\.org/i, '');

  function getPage(page, callback) {
    $.get("http://neocities-guestbook.herokuapp.com", { page: page }, function(json) {
      self.entries = json
      callback.call(self, page, json)
    });
  }

  function CreateEntry(name, msg, callback) {
    $.ajax({
      url: "http://neocities-guestbook.herokuapp.com",
      type: 'POST',
      data: {
        name: name,
        message: msg
      },
      dataType: 'json',
      success: function(json) {
        self.entries.push(json);
        callback.call(this, json);
      },
      error: callback
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
  self.getPage = getPage;

  return self;

}).call({});
