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

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  postForm.on("submit", function(event) {
    event.preventDefault();
    var postData = {
      postTitle: postTitleInput.val().trim(),
      youtubeURL: youtubeURLInput.val().trim(),
      categorization: "test cat"
    };
    postTitleInput.val("");
    youtubeURLInput.val("");
    console.log(postData.postTitle);
    console.log(postData.youtubeURL);
    console.log(postData.categorization);
  });

  function createPost(postTitle, youtubeURL, categorization) {
    $.post("/api/post", {
      
      postTitle: postTitle,
      youtubeURL: youtubeURL,
      categorization: categorization
    })
      .then(function() {
        //window.location.replace("/root");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
