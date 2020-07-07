var new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","main.js");
new_element.setAttribute("src","show.js");
document.body.appendChild(new_element);

(function() {
//根据各个不同网页获取不同的数据
const urlType = DATAS.judgeUrl();

//如果是淘宝搜索页
if (urlType == 1) {
	var selector = "#mainsrp-itemlist .item";
	var rules = {
		id:[null, "a[data-nid]", function(id) {
			return "tb_"+id.getAttribute("data-nid");
		}],
		_id:[null, "a[data-nid]", function(id) {
			return id.getAttribute("data-nid");
		}],
		url:[null, ".pic a[href]", function(url) {
			return url.getAttribute("href");
		}],
		title:[null, ".row.title a", function(title) {
			title = title.innerHTML;
			title = title.replace(/\s|<\/?.*?>/g, "");
			return title;
		}],
		price:[null, ".price strong", function(price) {
			price = price.innerHTML;
			price = Number(price);
			return price;
		}],
		pic:[null, ".pic img", function(pic) {
			return pic.getAttribute("data-src");
		}],
		volume:[null, ".row .deal-cnt", function(volume) {
			volume = volume.innerHTML;
			volume = volume.replace(/\+?人付款/, "");
			volume = volume.replace("万", "*10000");
			volume = eval(volume);
			volume = parseInt(volume);
			return volume;
		}]
	};
	//每个商品都设置按钮获取数据（主要的）
	DATAS.setBtnForGoods(selector, rules);
	//获取有销量的按钮及功能
	DATAS.getListHasSales(selector, rules);
	//取排名前十按钮及功能
	DATAS.getListTopTen(selector, rules);
	//同步按钮的颜色
	DATAS.updateBtnsColor();
}

//如果是敦煌网搜索页
if (urlType == 7) {
	//采集主体商品
	var selector = "#proGallery .gitem";
	var rules = {
		id:[null, "a[itemcode]", function(id) {
			return "dh_" + id.getAttribute("itemcode");
		}],
		_id:[null, "a[itemcode]", function(id) {
			return id.getAttribute("itemcode");
		}],
		url:[null, "a.subject", function(url) {
			return url.getAttribute("href");
		}],
		title:[null, "a.subject", function(title) {
			title = title.innerHTML;
			//title = title.replace(/\s|<\/?.*?>/g, "");
			return title;
		}],
		price:[null, ".price span", function(price) {
			price = price.innerHTML;
			return price;
		}],
		pic:[null, "img", function(pic) {
			return pic.getAttribute("src");
		}],
		volume:[null, ".ordernum", function(volume) {
			if (!volume) return 0;
			volume = volume.innerHTML;
			return volume;
		}]
	};
	//每个商品都设置按钮获取数据（主要的）
	DATAS.setBtnForGoods(selector, rules);
	//获取有销量的按钮及功能
	DATAS.getListHasSales(selector, rules);
	//取排名前十按钮及功能
	DATAS.getListTopTen(selector, rules);

	//采集左侧广告
	var selector = "#colLeft .b-recommendcon li";
	var rules = {
		id:[null, "a[itemcode]", function(id) {
			return "dh_" + id.getAttribute("itemcode");
		}],
		_id:[null, "a[itemcode]", function(id) {
			return id.getAttribute("itemcode");
		}],
		url:[null, ".b-recommendimg a", function(url) {
			return url.getAttribute("href");
		}],
		title:[null, ".b-recommendimg a", function(title) {
			return title.getAttribute("title");
		}],
		price:[null, ".price span", function(price) {
			price = price.innerHTML;
			return price;
		}],
		pic:[null, ".b-recommendimg img", function(pic) {
			return pic.getAttribute("src");
		}]
	};
	//每个商品都设置按钮获取数据（主要的）
	DATAS.setBtnForGoods(selector, rules);
	
	//同步按钮的颜色
	DATAS.updateBtnsColor();
	
	//全部采集左侧广告按钮
	const btn = DATAS.createBtn("采集左侧广告");
	btn.onclick = function() {
		const btns = document.querySelectorAll("#colLeft .b-recommendcon li ._btn_");
		for (let i = 0; i < btns.length; i++)
			btns[i].click();
	}
}

/* //如果是淘宝店铺搜索页
if (urlType == 3) {
	var selector = ".shop-hesper-bd .item3line1 .item";
	var rules = {
		id:[null, "self::data-id", function(id) {
			return id;
		}],
		title:[null, ".detail a", function(title) {
			title = title.innerHTML;
			title = title.replace(/\s|<\/?.*?>/g, "");
			return title;
		}],
		price:[null, ".cprice-area .c-price", function(price) {
			price = price.innerHTML;
			price = Number(price);
			return price;
		}],
		pic:[null, ".photo img", function(pic) {
			return pic.getAttribute("src");
		}],
		volume:[null, ".sale-area .sale-num", function(volume) {
			volume = volume.innerHTML;
			volume = parseInt(volume);
			return volume;
		}]
	};
	//每个商品都设置按钮获取数据
	DATAS.setBtnForGoods(selector, rules);
	//获取有销量的按钮及功能
	DATAS.getListHasSales(selector, rules);
	//取排名前十按钮及功能
	DATAS.getListTopTen(selector, rules);
}

//如果是天猫搜索页
if (urlType == 2) {
	var selector = "#J_ItemList .product";
	var rules = {
		id:[null, "self::data-id", function(id) {
			return id;
		}],
		title:[null, ".productTitle a", function(title) {
			title = title.innerHTML;
			title = title.replace(/\s|<\/?.*?>/g, "");
			return title;
		}],
		price:[null, ".productPrice em[title]", function(price) {
			price = price.getAttribute("title");
			price = Number(price);
			return price;
		}],
		pic:[null, ".productImg-wrap img", function(pic) {
			return pic.getAttribute("src");
		}],
		volume:[null, ".productStatus span:first-of-type em", function(volume) {
			volume = volume.innerHTML;
			volume = volume.replace(/\+?笔/, "");
			volume = volume.replace("万", "*10000");
			volume = eval(volume);
			volume = parseInt(volume);
			return volume;
		}]
	};
	//每个商品都设置按钮获取数据
	DATAS.setBtnForGoods(selector, rules);
	//获取有销量的按钮及功能
	DATAS.getListHasSales(selector, rules);
	//取排名前十按钮及功能
	DATAS.getListTopTen(selector, rules);
}

//如果是淘宝详情页
if (urlType == 5) {
	DATAS.getDatasByPage({
		id:["null", function() {
			return DATAS.getPageVar("g_config.itemId");
		}],
		title:["null", function() {
			return DATAS.getPageVar("g_config.idata.item.title");
		}],
		pic:["null", function() {
			return DATAS.getPageVar("g_config.idata.item.auctionImages");
		}],
		price:["#J_PromoPriceNum", function(price) {
			return price.innerHTML;
		}],
		recommend:["#J_DivItemDesc", function(recommend) {
			return recommend.innerHTML;
		}]
	});
} */
























})();