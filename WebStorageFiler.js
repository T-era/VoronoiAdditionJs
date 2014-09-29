;WebStorageFiler_Args = {
	key: "__WebStorageFilerKey",
	buttons: {
		trigger: null,
		addNew: null,
	},
	generateItem: function(thumbnail, thumbnailClass, trashClass, dropItemCallback) {},
	callback: {
		onSelected: alert,
		getData: function() { return "TEST DATA"; },
		getThumbnailURL: function() { return "TEST THUMBNAIL DATA"; }
	}
};
WebStorageFiler = {};
(function() {
	// モジュールを初期化します。
	// 引数は初期化内容を指定したオブジェクトです。オブジェクトの構成はWebStorageFiler_Argsを参考に。
	WebStorageFiler.Init = function(arg) {
		ownerDom = arg.buttons.trigger.parent();
		ownerDom.addClass("_saver_owner");

		var items = getItems();

		var dropDown = $("<div>")
			.addClass("_saver_dropdown")
			.appendTo(ownerDom);
		arg.buttons.addNew
			.click(addNewItem)
			.addClass("_saver_item")
			.appendTo(dropDown);

		var itemMap = {};
		for (var i = 0, max = items.length; i < max; i ++) {
			var name = items[i];
			appendItemDom(name);
		}

		function appendItemDom(name) {
			var item = arg.generateItem(
				$("<img>")
					.attr("src", localStorage.getItem(name + "___thumbnail"))
					.addClass("_saver_item_label")
					.click(selectItem(name)),
				"_saver_item_label",
				"_saver_item_close",
				dropItem(name)
			)
				.addClass("_saver_item")
				.appendTo(dropDown);
			itemMap[name] = item;
		}
		dropDown.hide();
		return dropDown;

		function keys(dict, separator) {
			var temp = [];
			for (var key in dict) {
				temp.push(key);
			}
			return temp.toString();
		}
		function addNewItem() {
			name = arg.key + new Date().toString();
			if (name in itemMap) return;
			value = arg.callback.getData();
			thumbnailUrl = arg.callback.getThumbnailUrl();

			localStorage.setItem(name, value);
			localStorage.setItem(name + "___thumbnail", thumbnailUrl);
			appendItemDom(name);
			names = keys(itemMap, ",");
			localStorage.setItem(arg.key, names);
		}
		function show() {
			dropDown.show();
		}
		function getItems() {
			var itemNamesStr = localStorage.getItem(arg.key);
			if (itemNamesStr)
				return itemNamesStr.split(",");
			else
				return [];
		}

		function selectItem(name) {
			return function() {
				arg.callback.onSelected(localStorage.getItem(name));
			}
		}
		function dropItem(name) {
			return function() {
				localStorage.removeItem(name);
				localStorage.removeItem(name + "___thumbnail");
				itemMap[name].hide();
				delete itemMap[name];
				localStorage.setItem(arg.key, keys(itemMap, ","));
			}
		}
	}
})();
