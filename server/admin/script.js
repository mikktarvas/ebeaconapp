var answerContainer;

window.onload = function(){
	var answer_adder = document.getElementById("answer_adder");
	answer_adder.addEventListener("click", addAnswer);
}

function addAnswer(){
	answerContainer = document.getElementById("answer_container");
	var answerGroup = document.createElement("div");
	answerGroup.className = "answer";
	
	var answerTextInput = document.createElement("input");
	answerTextInput.setAttribute("type", "text");
	answerTextInput.setAttribute("name", "answer_texts[]");
	answerTextInput.setAttribute("placeholder", "Answer text");
	answerGroup.appendChild(answerTextInput);
	
	var answerBooleanSelect = document.createElement("select");
	answerBooleanSelect.setAttribute("name", "answer_corrects[]");
	
	var optionTrue = document.createElement("option");
	optionTrue.text = "True";
	optionTrue.setAttribute("value", "1");
	
	var optionFalse = document.createElement("option");
	optionFalse.text = "False";
	optionFalse.setAttribute("value", "0");
	optionFalse.setAttribute("selected", "selected");
	
	answerBooleanSelect.add(optionTrue);
	answerBooleanSelect.add(optionFalse);
	
	answerGroup.appendChild(answerBooleanSelect);
	
	var removeLink = document.createElement("a");
	removeLink.text = "Remove";
	removeLink.setAttribute("href", "#");
	removeLink.setAttribute("onclick", "removeAnswer(this)");
	
	answerGroup.appendChild(removeLink);
	
	answerContainer.appendChild(answerGroup);
}

function removeAnswer(caller){
	answerContainer.removeChild(caller.parentNode);
}