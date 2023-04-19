// my jquery script in navbar
$("document").ready(function () {
  $(".btn-toggle").click(function () {
    $(this).next(".dropdown-menu").slideToggle();
  });
  $(".btn-toggle-sub").click(function () {
    $(this).next(".sub-menu").slideToggle();
  });
});
