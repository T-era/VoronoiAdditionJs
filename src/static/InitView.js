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
	this.initWebStorageFiler = function(getField, setField, getDrawer, getContext) {
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
			var drawer = getDrawer();
			var context = getContext();
			var field = new Voronoi.Field();
			drawer.draw(context, field);
			var list = str.match(REGEX_POINTS);
			if (list) {
				var points = [];
				for (var i = 0, max = list.length; i < max; i ++) {
					var pointStr = list[i];

					var temp = pointStr.match(REGEX_POINT);
					var point = new Voronoi.Point(Number(temp[1]), Number(temp[2]));
					points.push(new Fortune.MPoint(point));
				}
				new Cnv.Convert(new Fortune.BeachLine(points)).to(field);
			}

			drawer.draw(context, field);
			setField(field)
		}
		function savePoints() {
			var field = getField();
			var str = keys(field.hashToPoint);
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
