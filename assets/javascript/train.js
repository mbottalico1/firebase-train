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
    var trainTime = $("#InputTrainTime").val().trim();
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

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


    var hour = moment().format('H');
    var min = moment().format('m');
    var trainHour = moment(trainTime, "HH:mm").format('H');
    var trainMin = moment(trainTime, "HH:mm").format('m');

    var momentTrain = (trainMin * 1) + (trainHour * 60);
    var momentTime = (hour * 60) + (min * 1);

    var difference = momentTime - momentTrain;

    var frequencySince = Math.floor(difference / trainFrequency);

    var nextArrival = ((frequencySince + 1) * trainFrequency) + momentTrain;

    if (momentTrain < momentTime) {
        var minutesAway = nextArrival - momentTime;
        var nextArrival = moment().add(minutesAway, 'minutes').format('HH:mm');
    } else {
        nextArrival = trainTime;
        minutesAway = momentTrain - momentTime;
    };



    $('.table > tbody').append("<tr><td>" + trainName + "</th><th>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTime + "</td><td>" + minutesAway + "<td><tr>");

})
