const grades = Array.from(document.getElementsByClassName('grades'));

for(element of grades) {
	element.addEventListener('click', function(event) {
		const title = document.getElementById('grade-title');
		title.textContent = event.target.textContent
	});
}