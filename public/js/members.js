$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  var postForm = $("form.post");
  var postTitleInput = $("input#title-input");
  var youtubeURLInput = $("input#youtubeURL-input");
  //radio buttons
  var standupInput = $("input#standup-input");
  var improvInput = $("input#improv-input");
  var liveshowInput = $("input#improv-input");
  var objuserid = "";

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    objuserid = data.id;
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
      objuserid
    );
    postTitleInput.val("");
    youtubeURLInput.val("");
  });

  function createPost(postTitle, categorization, youtubeURL, userid) {
    $.post("/api/post", {
      title: postTitle,
      categorization: categorization,
      youtubeURL: youtubeURL,
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


