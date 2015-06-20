var answerContainer;

window.addEventListener('load', function(){
	var answer_adder = document.getElementById("answer_adder");
	answer_adder.addEventListener("click", addAnswer);
	answerContainer = document.getElementById("answer_container");
});

function addAnswer(){
	var answerGroup = document.createElement("div");
	answerGroup.className = "answer row";
	
	var answerTextInput = document.createElement("input");
	answerTextInput.setAttribute("type", "text");
	answerTextInput.setAttribute("name", "answer_texts[]");
	answerTextInput.setAttribute("placeholder", "Answer text");
	answerTextInput.className = "form-control";
	
	// Container div for Bootstrap
	var textInputContainer = document.createElement("div");
	textInputContainer.className = "col-lg-6";
	textInputContainer.appendChild(answerTextInput);
	answerGroup.appendChild(textInputContainer);
	
	var answerBooleanSelect = document.createElement("select");
	answerBooleanSelect.setAttribute("name", "answer_corrects[]");
	answerBooleanSelect.className = "form-control";
	
	var optionTrue = document.createElement("option");
	optionTrue.text = "True";
	optionTrue.setAttribute("value", "1");
	
	var optionFalse = document.createElement("option");
	optionFalse.text = "False";
	optionFalse.setAttribute("value", "0");
	optionFalse.setAttribute("selected", "selected");
	
	answerBooleanSelect.add(optionTrue);
	answerBooleanSelect.add(optionFalse);
	
	// Container div for Bootstrap
	var selectInputContainer = document.createElement("div");
	selectInputContainer.className = "col-lg-2";
	selectInputContainer.appendChild(answerBooleanSelect);
		
	answerGroup.appendChild(selectInputContainer);
	
	var removeLink = document.createElement("a");
	removeLink.text = "Remove";
	removeLink.setAttribute("href", "#");
	removeLink.setAttribute("onclick", "removeAnswer(this)");
	
	var removeLinkContainer = document.createElement("div");
	removeLinkContainer.className = "col-lg-1";
	removeLinkContainer.appendChild(removeLink);
	
	answerGroup.appendChild(removeLinkContainer);
	
	answerContainer.appendChild(answerGroup);
	
	// change_message.js
	updateMessage();
}

function removeAnswer(caller){
	answerContainer.removeChild(caller.parentNode.parentNode);
	
	// change_message.js
	updateMessage();
}