
var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var toDoListTag=document.getElementById("toDoList");//ul of todolist

window.onload=function(){
    var toDoList = JSON.parse(window.localStorage.getItem("toDoList"));
    if(toDoList!=null){
        console.log(toDoList);
        toDoList.forEach(element => {
            var listItem=document.createElement("li");

            //label
            var label=document.createElement("label");//label
            
            //button.delete
            var deleteButton=document.createElement("button");//delete button
            label.innerText=element;

            deleteButton.innerText="Delete";
            deleteButton.className="delete";

            //and appending.
            listItem.appendChild(label);
            listItem.appendChild(deleteButton);
            deleteEventHandler(listItem);
            toDoListTag.appendChild(listItem);

        });
    }
    
}
//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

	//label
	var label=document.createElement("label");//label
	
	//button.delete
	var deleteButton=document.createElement("button");//delete button
    
    var toDoList = JSON.parse(window.localStorage.getItem("toDoList"));
    console.log(toDoList);
    if(toDoList==null){
        toDoList = [];
        toDoList.push(taskString);      
        window.localStorage.setItem("toDoList", JSON.stringify(toDoList) );
    }else{
        toDoList.push(taskString);
        window.localStorage.setItem("toDoList", JSON.stringify(toDoList) );
    }
	console.log(toDoList);
	label.innerText=taskString;

	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	//and appending.
	listItem.appendChild(label);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
    var listItem=createNewTaskElement(taskInput.value);
    
	//Append listItem to toDoListTag
	toDoListTag.appendChild(listItem);
	deleteEventHandler(listItem);

	taskInput.value="";

}

function deleteEventHandler(taskListItem){
        var deleteButton=taskListItem.querySelector("button.delete");
        deleteButton.onclick=deleteTask;
}

//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

        var listItem=this.parentNode;
        var text = listItem.children[0].innerText;
        var toDoList = JSON.parse(window.localStorage.getItem("toDoList"));
        var index = toDoList.indexOf(text);
        toDoList.splice(index,1);
        console.log(toDoList);
        window.localStorage.setItem("toDoList",JSON.stringify(toDoList));
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);
}


addButton.addEventListener("click",addTask);
