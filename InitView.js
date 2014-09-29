function ViewInitializer() {
	var REGEX_POINTS = /\([\d.]+, [\d.]+\)/g;
	var REGEX_POINT = /([\d.]+), ([\d.]+)/;
	var cnv = $("#cnv");
	var canvas = cnv[0];
	this.initSize = function() {
		var widthBase = $(window).width() * 6;
		var heightBase = $(window).height() * 5;
		var rate = Math.min(widthBase, heightBase);
		canvas.style.width = rate / 6 + "px";
		canvas.style.height = rate / 5 + "px";
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}
	this.initWebStorageFiler = function(getField, getDrawer, getContext) {
		var addNew = $("<span>")
			.addClass("shadow-camera")
			.addClass("svg-icon");
		var camera = svg_resize(cameraShadow, "70px")
		$(camera).appendTo(addNew);
		var wsfArg = {
			key: "Voronoi",
			buttons: { 
				trigger: $("#file"),
				addNew: addNew,
			},
			generateItem: function(thumbnail, thumbnailClass, trashClass, dropAction) {
				var trash = svg_resize(trashShadow, "50px");
				var item = $("<div>")
					.append(
						$("<div>")
							.addClass(thumbnailClass)
							.append(thumbnail))
					.append(
						$("<div>")
							.addClass(trashClass)
							.addClass("svg-icon shadow-trash")
							.click(dropAction)
							.append(
								$(trash)));
				return item;
			},
			callback: {
				onSelected: loadPoints,
				getData: savePoints,
				getThumbnailUrl: getThumbnail
			}
		};
		var filer = WebStorageFiler.Init(wsfArg);
		return filer;

		function loadPoints(str) {
			drawer = getDrawer();
			context = getContext();
			field = new Voronoi.Field();
			drawer.draw(context, field);
			var list = str.match(REGEX_POINTS);
			if (list) {
				for (var i = 0, max = list.length; i < max; i ++) {
					var point = list[i];

					var temp = point.match(REGEX_POINT);
					field.addPoint(new Voronoi.Point(1 * temp[1], 1 * temp[2]));
					drawer.draw(context, field);
				}
			}
			drawer.draw(context, field);
		}
		function savePoints() {
			field = getField();
			var str = keys(field._debugHshToPoint);
			return str;

			function keys(dict) {
				var str = "";
				for (var key in dict) {
					str += key;
				}
				return str;
			}
		}
		function getThumbnail() {
			return canvas.toDataURL();
		}
		function svg_resize(src, size) {
			return src.replace(/\d+px/g, size);
		}
	}
}
