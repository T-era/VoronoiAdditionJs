/// <reference path="VLine.ts" />
/// <reference path="VPoint.ts" />

module Voronoi {
	export function toHash(p :IPoint) :string {
		return "(" + p.x + ", " + p.y + ")";
	}

	export class VLine {
		buddy: Point;
		line: Line;

		constructor(buddy :Point, line :Line) {
			this.buddy = buddy;
			this.line = line;
		}
	}
	export class Field {
		hashToPoint :{ [index :string]: Point } = {};
		hashToVLines :{ [index :string]: VLine[] } = {};
		countInField :number = 0;

		addPoint(newPoint :Point) {
			var that = this;
			var hash = toHash(newPoint);
			if (isDuplecated(newPoint)) {
				return;
			} else {
				this.hashToVLines[hash] = [];
				if (this.countInField !== 0)  {
					var nearest = this.getNearest(newPoint);
					relateChain(brushUpField, nearest);
				}
				this.hashToPoint[hash] = newPoint;
				this.countInField ++;
				return;
			}
			function brushUpField(buddy :Point) {
				var buddyHash = toHash(buddy);
				var bisectorLine = Voronoi.bisector(newPoint, buddy);
				return brushUpVLines(buddy, newPoint, bisectorLine, that.hashToVLines[buddyHash], that.hashToVLines[hash]);
			}
			function isDuplecated(newPoint :Point) :boolean {
				for (var hash in that.hashToPoint) {
					var point = that.hashToPoint[hash];
					if (newPoint.distance2(point) < 1) {
						return true;
					}
				}
				return false;
			}
			function brushUpVLines(owner :Point, newPoint :Point, bisector :Line, oVLineList :VLine[], nVLineList :VLine[]) :Point[] {
				var neighbors = [];
				for (var i = oVLineList.length - 1; i >= 0; i --) {
					var vLine = oVLineList[i];
					var l = vLine.line;
					var buddy = vLine.buddy;
					var modified = l.chop(bisector, owner);
					if (l.isNull) {
						oVLineList.splice(i, 1);
					} else {
						if (modified) {
							neighbors.push(buddy);
						}
						bisector.chop(l, owner);
						delete bisector.isNull;
					}
				}
				oVLineList.push(new VLine(newPoint, bisector));
				nVLineList.push(new VLine(owner, bisector));
				return neighbors;
			}
		}
		forEachBPoint(f :(p:Point, vl:VLine[])=>void) {
			for (var hash in this.hashToPoint) {
				f(this.hashToPoint[hash], this.hashToVLines[hash]);
			}
		}
		getNearest(arg :Point) :Point {
			var nearestPoint = null;
			var nearestDist2 = 0;
			for (var hash in this.hashToPoint) {
				var point = this.hashToPoint[hash];
				var dist2 = arg.distance2(point);
				if (! nearestPoint
					|| nearestDist2 > dist2) {
					nearestPoint = point;
					nearestDist2 = dist2;
				}
			}
			return nearestPoint;
		}
	}
	function relateChain<T>(f :(arg:T)=>T[], firstArg :T) {
		var doneList = [];
		var queue = [firstArg];
		do {
			var arg = queue.shift();
			var newElements = f(arg);
			doneList.push(arg);
			for (var i = 0, max = newElements.length; i < max; i ++) {
				var ne = newElements[i];
				if (doneList.indexOf(ne) === -1) {
					if (queue.indexOf(ne) === -1) {
						queue.push(ne);
					}
				}
			}
		} while (queue.length > 0);
	}
}
