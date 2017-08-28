$(document).ready(function() {

	twitter()
	events()

	$("#pastEventsBtn").on("click", handlePast); 

	function twitter() {
		$.ajax({
				method: "GET",
				url: "/twitter"
			}).done(function(data) {
				console.log(data); 
				for (var i = 0; i < data.length; i++) {
					var theDate = moment(data[i].created_at).calendar()

					var tweet = $("<div></div>").addClass("tweet")
					var text = $("<p>" + data[i].text + "</p>").addClass("tweetText")
					var date = $("<p>" + theDate + "</p>").addClass("tweetDate")

					tweet.append(text)
					tweet.append(date)
					$(".tweet-container").append(tweet)
				}
			})
	}

	function events() {
		$.ajax({
			method: "GET", 
			url: "/api/events"
		}).done(function(data) {

			if (data.length > 0) {
				$("#captionBottom").css("display", "block"); 
			}

      for(var i = 0; i < data.length; i++){
   
            var futureDiv = $("<div>").addClass("eventBlocks");
            futureDiv.addClass("futureDiv" +i);
            futureDiv.addClass("block");

            var showDate = moment(data[i].date).calendar()

            var titleDiv = $("<h5>" + data[i].title + "</h5>").addClass("textEntry");
            var locationDiv = $("<h6>" + data[i].location + "</h6>").addClass("textEntry");
            var dateDiv = $("<h6>" + showDate + "</h6>").addClass("textEntry");
            var notesDiv = $("<p>" + data[i].notes + "</p>").addClass("textEntry");
            if (data[i].url) {
              var urlDiv = $("<a href='" + data[i].url + "' target='_blank'><button class='waves-effect waves-light btn urlEntry'>Official Site</button></a>")
            }
            
            futureDiv.append(titleDiv);
            futureDiv.append(locationDiv);
            futureDiv.append(dateDiv);
            futureDiv.append(notesDiv);
            titleDiv.append(urlDiv);

          if( moment() >= moment(data[i].date) ){
            $(".pastContainer").append(futureDiv);
          }
          else {
            $(".futureContainer").append(futureDiv);
          }
      }

		}) // end done
	} //end events

	function handlePast() {
		$("#pastEventsBtn").css("display", "none");
		$("#captionPast").css("display", "block");
		$(".pastContainer").css("display", "block");
	}

}); //end doc
