import {remote} from "electron";
console.log(888888888)
remote.getGlobal('istate').db;
alert('222')
window.addEventListener("DOMContentLoaded", () => {
	alert('1111')
	for (const type of ['main.js','get.js', 'show.js']) {
		const new_element = document.createElement("script");
		new_element.setAttribute("src", type);
		document.body.appendChild(new_element);
	}
})