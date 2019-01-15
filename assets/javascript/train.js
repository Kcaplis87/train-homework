$(document).ready(function () {
    // var tFrequency = "";
    // var firstTime = "";
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD47cELGWnfl7KiG9awglGaFZBYKTZ_z3g",
        authDomain: "train-schedule-33267.firebaseapp.com",
        databaseURL: "https://train-schedule-33267.firebaseio.com",
        projectId: "train-schedule-33267",
        storageBucket: "train-schedule-33267.appspot.com",
        messagingSenderId: "714713357823"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    $("#addTrainBtn").on("click", function (event) {
        event.preventDefault();


        var trainName = $("#inputTrainName").val().trim();
        var trainDestination = $("#inputDestination").val().trim();
        var trainTimeInput = moment($("#inputTrainTime").val().trim(), "HH:mm").format("LT");;
        var trainFrequency = $("#inputFrequency").val().trim();


        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainTimeInput,
            frequency: trainFrequency,
        };
        database.ref().push(newTrain);

        // console.log(newTrain.name);
        // console.log(newTrain.destination);
        // console.log(newTrain.time);
        // console.log(newTrain.frequency);


        $("#inputTrainName").val("");
        $("#inputDestination").val("");
        $("#inputTrainTime").val("");
        $("#inputFrequency").val("");

    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTimeInput = childSnapshot.val().frequency;
        var trainFrequency = childSnapshot.val().time;

        // console.log(trainFrequency);
        // console.log(trainName);
        // console.log(trainDestination);
        // console.log(trainTimeInput);

        var tFrequency = $("#inputFrequency").val().trim();
        console.log(tFrequency);
        var firstTime = $("#inputTrainTime").val().trim();
        

        console.log(firstTime);
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        var diffTime = moment().diff(moment.unix(firstTimeConverted), "minutes"); 
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log(tMinutesTillTrain);


        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainTimeInput),
            $("<td>").text(trainFrequency),
            $("<td>").text(tMinutesTillTrain),

        );
        $("#trainTable > tbody").append(newRow);
    });
});