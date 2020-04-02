$.get("/api/post").then(function(data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let posts = `<div class="card w-50">
        <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text">
          ${data[i].categorization}
          </p>
          <a href=${data[i].youtubeURL} class="btn btn-primary">
            Youtube Link
          </a>
        </div>
      </div>
      </br>`;
    $("#posts").append(posts);
  }
});
