function saveTask() {
    console.log("Saving tasks");
    // get the values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // build an object
    let taskToSave = new Task(title, description, color, date, status, budget);
    console.log(taskToSave); // Changed x to taskToSave to fix potential reference error

    // save to server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
            console.log("Task saved successfully:", response);
            // Optionally, you can reload tasks to update the list
            loadTask();
        },
        error: function(error) {
            console.error("There was an error saving the task:", error);
        }
    });
}

function testRequest() {
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
            console.log("Request was successful:", response);
        },
        error: function(error) {
            console.error("There was an error with the request:", error);
        }
    });
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response) {
            console.log("Request was successful:", response);
            let data = JSON.parse(response);

            for(let i = 0; i < data.length; i++) {
                let task = data[i];
                displayTask(task);
            }
        },
        error: function(error) {
            console.error("There was an error with the request:", error);
        }
    });
}

function displayTask(task) {
    // create the syntax
    let syntax = `<div class="task">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                    <label>${task.date}</label>
                    <label>${task.status}</label>
                    <label>${task.budget}</label>
                    <div style="background-color:${task.color}; width: 100%; height: 20px; border-radius: 4px;"></div>
                  </div>`;
    // append the syntax to existing html
    $("#tasks").append(syntax);
}

function init() {
    console.log("task manager");

    // load data
    loadTask();

    // hook events
    $("#btnSave").click(saveTask);
}

window.onload = init;
