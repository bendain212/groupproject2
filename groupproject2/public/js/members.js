$(document).ready(function() {
  let paypalUsername = "";
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    objuserid = data.id;
    console.log(data);
  });

  $.get("/api/post").then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {

      function YouTubeGetID(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          ID = url[2].split(/[^0-9a-z_\-]/i);
          ID = ID[0];
        }
        else {
          ID = url;
        }
        console.log(ID)
          return ID;
      }

      YouTubeGetID(data[i].youtubeURL)


      
      let posts = `<div class="card w-50">
        <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <p class="card-text">
          ${data[i].categorization}
          </p>
          <p class="card-text">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value="${data[i].paypalEmail}" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
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
});
