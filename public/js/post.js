$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $(".alert").hide();

  var postForm = $("form.post");
  var postTitleInput = $("input#title-input");
  var youtubeURLInput = $("input#youtubeURL-input");
  //radio buttons
  var standupInput = $("input#standup-input");
  var improvInput = $("input#improv-input");
  var liveshowInput = $("input#improv-input");
  var objuserid = "";
  let paypalUsername = "";

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    objuserid = data.id;
    paypalUsername = data.paypal;
  });

  postForm.on("submit", function(event) {
    event.preventDefault();
    var postData = {
      postTitle: postTitleInput.val().trim(),
      youtubeURL: youtubeURLInput.val().trim(),
      categorization: $("input[name=inputRadio]:checked", "#postForm").val()
    };
    console.log(postData.postTitle);
    console.log(postData.youtubeURL);
    console.log(postData.categorization);
    console.log(objuserid);
    createPost(
      postData.postTitle,
      postData.categorization,
      postData.youtubeURL,
      paypalUsername,
      objuserid
    );
    postTitleInput.val("");
    youtubeURLInput.val("");
    setTimeout(function() {
      $("input[name=inputRadio]:checked", "#postForm").prop("checked", false);
    });
    $(".alert").show();
    setTimeout(function() {
      $(".alert").hide();
    }, 2000);
  });

  function createPost(
    postTitle,
    categorization,
    youtubeURL,
    paypalUsername,
    userid
  ) {
    $.post("/api/post", {
      title: postTitle,
      categorization: categorization,
      youtubeURL: youtubeURL,
      paypalEmail: paypalUsername,
      UserId: userid
    })
      .then(function() {
        console.log("working");
        //window.location.replace("/root");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
