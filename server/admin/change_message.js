var saved_message_container;
var section_to_listen;

window.addEventListener('load', function(){
	saved_message_container = document.getElementById("saved_message");
	section_to_listen = document.getElementsByTagName("section")[0];
	section_to_listen.addEventListener("change", updateMessage);	
});

function updateMessage(){
	saved_message_container.innerHTML = "Not saved yet.";
}