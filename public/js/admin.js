$(document).ready(function(){

  $.get("/api/user_data").then(function(data) {
    console.log("logged in")
    //$("#loginID").html("<h4> Logged in as <b>" + data.email + "</h4>").addClass("loggedInID");
  });

  $("#logoutBtn").on("click", handleLogout); 

  function handleLogout() {
    $.get("/logout").then(function() {
      window.location.href = "/admin";
      console.log("logging out")
    })
  }

  var futureContainer= $('.futureBody');

  var pastContainer= $('.pastBody');

  var addArray= [];

  //store value when user updates Notes
  var changedTitle;
  var changedLocation;
  var changedDate;
  var changedNotes;
  var changedURL; 

  var updateObj;
  var id;

  $('#addEvent').on("click", function() {
      console.log("add click")
     $('#modelWindow').modal('show');
  });

  //event listener for when user adds movie to the database
  $("#modalSubmit").on("click", handleSubmit);

  $("#deleteEventBtn").on("click", handleDelete);

  $(document.body).on("click", '.block', handleMyEvent);

  $(".buttonEdit").on("click", function(){
    event.preventDefault();
    $("#event-form").css("display", "block"); 
    $("#event-delete").css("display", "none");
  });

  $(".buttonDelete").on("click", function(){
    event.preventDefault();
    $("#event-form").css("display", "none"); 
    $("#event-delete").css("display", "block");
  });

  $("#updateEventTitle").on("click", handleUpdateTitle);
  $("#updateEventLocation").on("click", handleUpdateLocation);
  $("#updateEventDate").on("click", handleUpdateDate);
  $("#updateEventNotes").on("click", handleUpdateNotes);
  $("#updateEventURL").on("click", handleUpdateURL);

  eventCreator();
  //ajax request to pull data from the database/server
  //Then calls function to populate it on the page
  function eventCreator(){
    $.ajax({
        method: 'GET',
        url: '/api/events'
    }).done(function(data){
        console.log("\nData from the server using eventPopulator() [pulling from our API]");
        //console.log(data);

        for(var i = 0; i < data.length; i++){
   
            var futureDiv = $("<div>").addClass("eventBlocks");
            futureDiv.addClass("futureDiv" +i);
            futureDiv.addClass("block");

            var showDate = moment(data[i].date).add(4, 'hours').format('LLL');

            var titleDiv = $("<h4>" + data[i].title + "</h4>").addClass("textEntry");
            var locationDiv = $("<h5>" + data[i].location + "</h5>").addClass("textEntry");
            var dateDiv = $("<h5>" + showDate + "</h5>").addClass("textEntry");
            var notesDiv = $("<p>" + data[i].notes + "</p>").addClass("textEntry");
            if (data[i].url) {
              var urlDiv = $("<a href='" + data[i].url + "' target='_blank'><button class='btn btn-success'>Official Site</button></a>").addClass("urlEntry"); 
            }
            //var deleteEventBtn = $("<button id='deleteEventBtn' type='submit' class='btn btn-danger'>Delete Event</button>").addClass("deleteEventBtn");

            futureDiv.append(titleDiv);
            futureDiv.append(locationDiv);
            futureDiv.append(dateDiv);
            futureDiv.append(notesDiv);
            titleDiv.append(urlDiv);
            //futureDiv.append(deleteEventBtn);

            futureDiv.data("clickedData", data[i]);

          // }//end first if
          if( moment() >= moment(data[i].date) ){
            pastContainer.append(futureDiv);
            //pastContainer.sort(function(a, b){return a-b})
          }
          else {
            futureContainer.append(futureDiv);
          }
        }
    })
  }

  function handleMyEvent(){
      var clickedData = $(this).data("clickedData")
      id = $(this).data("clickedData").id;

      console.log(id);
      console.log(typeof id);

      //show the modal
      $("#eventModal").modal("show");

      //show the movie title
      $("#myEventTitle").html(clickedData.title);

      //display current notes on the movis
      $(".notesBody").html(clickedData.notes);

      //hiddien once user clicks edit
      $("#editNotes").html(clickedData.notes);
  }

//---------------- update stuff -------------------------------------

  function handleUpdateTitle(){

    changedTitle = $("#editTitle").val().trim();

    updateObj ={
      title: changedTitle,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/events/title",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/admin";
    });
  }

  function handleUpdateLocation(){

    changedLocation = $("#editLocation").val().trim();

    updateObj ={
      title: changedLocation,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/events/location",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/admin";
    });
  }  

  function handleUpdateDate(){

    changedDate = $("#editDate").val().trim();

    updateObj ={
      title: changedDate,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/events/date",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/admin";
    });
  }

  function handleUpdateNotes(){

    changedNotes = $("#editNotes").val().trim();

    updateObj ={
      title: changedNotes,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/events/notes",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/admin";
    });
  } 

  function handleUpdateURL(){

    changedURL = $("#editURL").val().trim();

    updateObj ={
      title: changedURL,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/events/url",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/admin";
    });
  }   

//---------------------------------------------------------------------

  function handleDelete(){

    console.log(id)

    updateObj ={
      id: id
    }

    $.ajax({
      method: "DELETE",
      url: "/api/events/delete",
      data: updateObj
    })
    .done(function() {
      console.log("delete worked")
      window.location.href = "/admin";
    });
  }

  function handleSubmit(event) {
    event.preventDefault(); 

    //getting info for columns 
    var theTitle = $("#eventTitle").val().trim();
    var theLocation = $("#eventLocation").val().trim();
    var theDate = $("#eventDate").val();
    var theNotes = $("#eventNotes").val().trim();
    var theURL = $("#eventURL").val().trim();

    addArray.push(theTitle, theLocation, theDate, theNotes, theURL);

    console.log(addArray);

    var newEvent = {
      title: addArray[0], 
      location: addArray[1],
      date: addArray[2],
      notes: addArray[3],
      url: addArray[4]
    }; 

    console.log("\nNEW EVENT OBJECT CREATED:")
    console.log(newEvent);

    if (!addArray[0] || !addArray[1] || !addArray[2]) {
      alert("Missing Required Information")
      window.location.reload()
      return; 
    } else {
      submitEvent(newEvent); 
    } 

  } // handleSubmit 


  function submitEvent(Event) {
    $.ajax({
      type: 'POST',
      url:'/api/events',
      data: Event
    }).done(function(){
      console.log("posted data"); 

      //redirects us back to the movies html
      window.location.href = "/admin";

    })
  }//handle submitMovie

});

