

javascript: (function() {
  var elements = document.body.getElementsByClassName("content_left");
  var items = [];
  for (var i = 0; i < elements.length; i++) {
      items.push(elements[i]);
  }
  console.log(items)
})();
