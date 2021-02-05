$(document).ready(function ($) {
  $("#display-history").click(function () {
    $(".sc")
      .fadeOut(700)
      .promise()
      .done(function () {
        $(".history-div").fadeIn(700);
      });
  });
  $("#backToCalc").click(function () {
    $(".history-div")
      .fadeOut(700)
      .promise()
      .done(function () {
        $(".sc").fadeIn(700);
      });
  });
  $("#evalBuiltIn").click(function () {
    $("#evalBuiltInLabel").addClass("radio-bold");
    $("#evalProgrammedLabel").removeClass("radio-bold");
  });
  $("#evalProgrammed").click(function () {
    $("#evalProgrammedLabel").addClass("radio-bold");
    $("#evalBuiltInLabel").removeClass("radio-bold");
  });
  $(".info-contact").click(function () {
    if (
      $(".code-logo").hasClass("animate-code-logo") &&
      $(".dev-logo").hasClass("animate-dev-logo")
    ) {
      classing();
    } else {
      $(".code-logo").addClass("animate-code-logo");
      $(".dev-logo").addClass("animate-dev-logo");
      $(".code-logo").removeClass("hide-code-logo");
      $(".dev-logo").removeClass("hide-dev-logo");
    }
  });
  $(".code-logo").click(function () {
    classing();
  });
  $(".dev-logo").click(function () {
    classing();
  });
  function classing() {
    $(".code-logo").addClass("hide-code-logo");
    $(".dev-logo").addClass("hide-dev-logo");
    setTimeout(function () {
      $(".code-logo").removeClass("animate-code-logo");
      $(".dev-logo").removeClass("animate-dev-logo");
    }, 500);
    console.log("done");
  }
});
