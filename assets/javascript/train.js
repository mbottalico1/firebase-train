var config = {
    apiKey: "AIzaSyB8MDc3DP4QR5tkZ5qWZlNffrrYIJW1XvU",
    authDomain: "train-schedule-5ad4b.firebaseapp.com",
    databaseURL: "https://train-schedule-5ad4b.firebaseio.com",
    projectId: "train-schedule-5ad4b",
    storageBucket: "train-schedule-5ad4b.appspot.com",
    messagingSenderId: "1033893274538"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $('.btn-default').on('click', function(event) {
  		event.preventDefault();

  	var trainName = $('#InputTrainName').val().trim();
  	var trainDestination = $('#InputDestination').val().trim();
  	var trainTime = moment($("#InputTrainTime").val().trim(), "DD/MM/YY").format("X");
  	var trainFrequency = $('#InputFrequency').val().trim();

  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		time: trainTime,
  		frequency: trainFrequency
  	};


  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.time);
  	console.log(newTrain.frequency);

  	alert('Train Station Added!');

    $('#InputTrainName').val("");
    $('#InputDestination').val("");
    $('#InputTrainTime').val("");
    $('#InputFrequency').val("");

  })

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

  })














  