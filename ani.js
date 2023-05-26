document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("active");
});

window.addEventListener("beforeunload", function() {
  document.body.classList.remove("active");
});
