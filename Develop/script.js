// Declared Variables

var currentDay = $("#currentDay");
var container = $(".container");
var mHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

initLocalStorage();
createText();


// Using Moment.js to dynamically update the date.
function addCurrentDate() {
  currentDay.text(moment().format("MMM Do YYYY"));
}
// Calling function to display current date
addCurrentDate();

// Creates Screen Content
function createText() {
  for (var [i, mHour] of Object.entries(mHours)) {
    var newDiv = $("<div>").addClass("row");
    var textArea = $("<textarea>").addClass(mHour + " col-xl-10 " + hours[i]);
    var button = $("<button>").addClass("btn btn-primary saveBtn col-xl-1");
    var timeBlock = $("<span>")
      .addClass("col-xl-1 time-block hour")
      .text(hours[i]);

    container.append(newDiv.append(timeBlock).append(textArea).append(button));

    button.on("click", function (event) {
      var input = $(event.target).siblings("textarea").val();
      var hour = $(event.target)
        .siblings("textarea")
        .attr("class")
        .split(" ")[0];
      saveText(input, hour);
    });
  }
  renderLocalStorage();
}

function saveText(input, hour) {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  if (!schedule) {
    initLocalStorage();
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  schedule[hour] = input;
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

function initLocalStorage() {
  var schedule = {};
  if (localStorage.getItem("schedule")) {
    return;
  } else {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }
}

function renderLocalStorage() {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  for (var hour of Object.keys(schedule)) {
    $("." + hour).val(schedule[hour]);
  }
}

function TimeColor() {
  var currentHour = moment().hours();
  for (var [i, mHour] of Object.entries(mHours)) {
    var textArea = $("." + mHour);
    if (mHour < currentHour) {
      textArea.addClass("past");
    } else if (mHour === currentHour) {
      textArea.addClass("present");
    } else {
      textArea.addClass("future");
    }
  }
}

TimeColor();

