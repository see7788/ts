(function() {
//生成查看数据的按钮
const btn = DATAS.createBtn("查看数据");
btn.onclick = function() {
	let box = document.querySelector("#_datasBox_");
	if (!box) {
		box = document.createElement("div");
		box.setAttribute("id", "_datasBox_");
		document.body.appendChild(box);
	}
	DATAS.getDatas(box);
	if (box.getAttribute("open") == "true") {
		box.setAttribute("open", "false");
	} else box.setAttribute("open", "true");
}




















})();