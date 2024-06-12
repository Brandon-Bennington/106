function saveTask(){
    console.log("Saving tasks");
}

function init(){
    console.log("task manager");

    //load data

    //hook events
    $("#btnSave").click(saveTask);
}

window.onload = init;