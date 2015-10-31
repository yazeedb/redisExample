var submit = document.getElementById('submit'),
	email = document.getElementById('email'),
	password = document.getElementById('password');

submit.onclick = function (event) {
	event.preventDefault();

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status === 200) {
			var res = JSON.parse(xhr.responseText);
			if (res.message) {
				toastr.info(res.message);
			}
		}
	};

	xhr.open('POST', '/api/auth', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send('email=' + email.value + '&password=' + password.value);
};