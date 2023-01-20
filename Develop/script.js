// Declared Variables

var currentDay = $("#currentDay");
var container = $(".container");
var mHours = [9, 10, 11, 12, 13, 14, 15, 16 ,17];
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM" "5PM"];


// Using Moment.js to dynamically update the date.
function addCurrentDate() {
  currentDay.text(moment().format("MM DD YYYY"));
}
// Creates Screen Content
function createText() {
  for (var [i, mHour] of Object.entries(mHours)) {
    var newDiv = $("<div>");
    var textArea = $("<textarea>");
    var button = $("<button>");
    var timeBlock = $("<span>");

    // TextArea | TextBlock | Save Button Container
    newDiv.addClass("row");
    container.append(newDiv);

    timeBlock.addClass("col-xl-1 time-block hour");
    timeBlock.text(hours[i]);
    newDiv.append(timeBlock);

    textArea.addClass(mHour + " col-xl-10 " + hours[i]);
    newDiv.append(textArea);

    button.addClass("btn btn-primary saveBtn col-xl-1");
    newDiv.append(button);

    button.on("click", function (event) {
      var input = $(event.target).siblings().next().val();
      var hour = $(event.target).siblings().next().attr("class").split(" ")[0];
      // add function to save text
    })
  }
  // add function to save data to local storage
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
    $("textarea." + hour).text(schedule[hour]);
  }
}