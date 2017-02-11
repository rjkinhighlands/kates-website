
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCe4cg3yshDNT-y6AnTnXyyDY0CFtZPzoQ",
    authDomain: "trainscheduler-925b2.firebaseapp.com",
    databaseURL: "https://trainscheduler-925b2.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1003457769775"
  };
  firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// Initial value
var train = {
  name: "",
  destination: "",
  startTime: "",
  frequency: "",
  dateAdded: firebase.database.ServerValue.TIMESTAMP
}

// METHODS
// ==========================================================
  
// Submit Button Click
$("#btnSubmit").on("click", function() {
  // Code in the logic for storing and retrieving the train information.
  train.name = $("#txtTrainName").val().trim();
  train.destination = $("#txtDestination").val().trim();
  train.startTime = $("#txtTrainTime").val().trim();
  train.frequency = $("#txtFrequency").val().trim();

  console.log("Train info:");
  console.log(JSON.stringify(train));
  
    // Save new value to Firebase
  database.ref().push(train);

  // Clears all of the text-boxes
  $("#txtTrainName").val("");
  $("#txtDestination").val("");
  $("#txtTrainTime").val("");
  $("#txtFrequency").val("");

   // This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
   return false;
});

// 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  var trainInfo = childSnapshot.val();
  var row = $("<tr>");
  var colName = $("<td>").html(trainInfo.name);
  var colDest = $("<td>").html(trainInfo.destination);
  var colFreq = $("<td>").html(trainInfo.frequency);

  // Calculate the Next Arrival time and Minutes Away
  var tFrequency = parseInt(trainInfo.frequency);
  var startTime = parseInt(trainInfo.startTime);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(startTime,"hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE in Minutes: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES Till Train: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes")
  console.log("ARRIVAL Time: " + moment(nextTrain).format("hh:mm"))


  var colNextArrival = $("<td>").html(moment(nextTrain).format("hh:mm A"));
  var colMinAway = $("<td>").html(tMinutesTillTrain);

  row.append(colName).append(colDest).append(colDest).append(colFreq).append(colNextArrival).append(colMinAway);
  $("#trainTable").append(row);
});

// FUNCTIONS
// ==========================================================

function monthDiff(d1, d2) {
  var date1 = new moment(d1);
    var date2 = new moment(d2);
    var months = date2.diff(date1, "months");


    console.log ("date1:" + moment(date1).format("MM/DD/YYYY"));
    console.log ("date2:" + moment(date2).format("MM/DD/YYYY"));
    console.log ("diff:" + months);
   return months;
}

