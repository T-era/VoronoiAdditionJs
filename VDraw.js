;(function() {
	Voronoi.Drawer = function(settings) {
		if (!settings) settings = Voronoi.Setting("#aaa", "#fcfcfc");
		this.draw = function(context, field) {
			context.clearAll();
			field.forEachBPoint(drawBPoint);
			function drawBPoint(bPoint, vLines) {
				var edges = []
				for (var i = 0, max = vLines.length; i < max; i ++) {
					var line = vLines[i].line;
					var points = toDrawingPoints(line);
					if (points.p1.isEdge) {
						edges.push(points.p1);
					}
					if (points.p2.isEdge) {
						edges.push(points.p2);
					}
					fillPolygon(settings.vAreaColor, bPoint, [points.p1, points.p2]);
				}
				fillPolygon(settings.vAreaColor, bPoint, edges);
			}
			function fillPolygon(color, center, points) {
				context.fillStyle = color;
				context.strokeStyle = color;
				context.beginPath();
				context.moveTo(center.getX(), center.getY());
				for (var i = 0, max = points.length; i < max; i ++) {
					var p1 = merge(center, points[i], 1, 5);
					context.lineTo(p1.x, p1.y);
				}
				context.lineTo(center.getX(), center.getY());
				context.stroke();
				context.fill();
				function merge(p1, p2, rat1, rat2) {
					return {
						x: (p1.getX() * rat1 + p2.getX() * rat2) / (rat1 + rat2),
						y: (p1.getY() * rat1 + p2.getY() * rat2) / (rat1 + rat2) };
				}
			}
			function toDrawingPoints(line) {
				if (! line.p1) {
					var ret = {
						p1: line.v.reverse().apply(line.p, 5),
						p2: line.v.apply(line.p, 5) };
					ret.p1.isEdge = true;
					ret.p2.isEdge = true;
					return ret;
				} else if (! line.p2) {
					var ret = {
						p1: line.p1,
						p2: line.d.apply(line.p1, 10) };
					ret.p2.isEdge = true;
					return ret;
				} else {
					return line;
				}
			}
		}
	}
	Voronoi.Setting = function(bPointColor, vAreaColor) {
		return {
			bPointColor: bPointColor,
			vAreaColor: vAreaColor };
	}
	var DefaultSetting = Voronoi.Setting("#000", "#000");
})();