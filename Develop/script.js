// Declared Variables
var currentDay = $("#currentDay");
var container = $(".container");
var mHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

initLocalStorage();
createText();
currentDay.text(moment().format("MMM Do YYYY"));
TimeColor();

// Creates text elements and appends them to the container
function createText() {
  for (var [i, mHour] of Object.entries(mHours)) {
    var newDiv = $("<div>").addClass("row");
    var textArea = $("<textarea>").addClass(mHour + " col-xl-10 " + hours[i]);
    var button = $("<button>")
      .addClass("btn btn-primary saveBtn col-xl-1")
      .text("Save");
    var timeBlock = $("<span>")
      .addClass("col-xl-1 time-block hour")
      .text(hours[i]);
    // Append all elements to the container
    container.append(newDiv.append(timeBlock).append(textArea).append(button));
    // Set up the click even for the save button
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
// Function saves the text in the text area to local storage
function saveText(input, hour) {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  if (!schedule) {
    initLocalStorage();
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  schedule[hour] = input;
  localStorage.setItem("schedule", JSON.stringify(schedule));
}
// Function creates an empty schedule object in local storage if it doesnt already exist
function initLocalStorage() {
  var schedule = {};
  if (localStorage.getItem("schedule")) {
    return;
  } else {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }
}
// Function renders the schedule from local storage to the text area
function renderLocalStorage() {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  for (var hour of Object.keys(schedule)) {
    $("." + hour).val(schedule[hour]);
  }
}
// Function applies css properties to the text area based on the current time
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
