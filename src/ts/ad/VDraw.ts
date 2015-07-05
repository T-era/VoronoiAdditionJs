/// <reference path="VField.ts"/>
/// <reference path="VLine.ts"/>
/// <reference path="VPoint.ts"/>

interface CanvasRenderingContext2D {
	clearAll() :void
}
CanvasRenderingContext2D.prototype.clearAll = function() {
	this.fillStyle = "#ff8";
	this.fillRect(0,0,this.canvas.width, this.canvas.height);
}

module Voronoi {
	export class Setting {
		bPointColor :string;
		vAreaColor :string;

		constructor(c1 :string, c2 :string) {
			this.bPointColor = c1;
			this.vAreaColor = c2;
		}
	}
	var defaultSetting = new Setting("#aaa", "#fcfcfc");

	export class Drawer {
		setting :Setting;

		constructor(setting :Setting = null) {
			this.setting = setting || defaultSetting;
		}

		draw(context :CanvasRenderingContext2D, field :Field) {
			var that = this;
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
					fillPolygon(that.setting.vAreaColor, bPoint, [points.p1, points.p2]);
				}
				fillPolygon(that.setting.vAreaColor, bPoint, edges);
			}
			function fillPolygon(color, center, points) {
				context.fillStyle = color;
				context.strokeStyle = color;
				context.beginPath();
				context.moveTo(center.x, center.y);
				for (var i = 0, max = points.length; i < max; i ++) {
					var p1 = merge(center, points[i], 1, 5);
					context.lineTo(p1.x, p1.y);
				}
				context.lineTo(center.x, center.y);
				context.stroke();
				context.fill();
				function merge(p1, p2, rat1, rat2) {
					return {
						x: (p1.x * rat1 + p2.x * rat2) / (rat1 + rat2),
						y: (p1.y * rat1 + p2.y * rat2) / (rat1 + rat2) };
				}
			}
			function toDrawingPoints(line :Line) {
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
}
