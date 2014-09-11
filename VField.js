;(function() {
	function toHash(p) {
		return "(" + p.getX() + ", " + p.getY() + ")";
	}

	Voronoi.Field = function() {
		var hashToPoint = {};
this._debugHshToPoint = hashToPoint;
		var hashToVLines = {};
this._debugHshToVLines = hashToVLines;
		var countInField = 0;

		this.addPoint = function(newPoint) {
			var hash = toHash(newPoint);
			if (isDuplecated(newPoint)) {
				return;
			} else {
				hashToVLines[hash] = [];
				if (countInField !== 0)  {
					var nearest = getNearest(newPoint);
					relateChain(brushUpField, nearest);
				}
				hashToPoint[hash] = newPoint;
				countInField ++;
				return;
			}
			function brushUpField(buddy) {
				var buddyHash = toHash(buddy);
				var bisectorLine = Voronoi.bisector(newPoint, buddy);
				return brushUpVLines(buddy, newPoint, bisectorLine, hashToVLines[buddyHash], hashToVLines[hash]);
			}
			function isDuplecated(newPoint) {
				for (var hash in hashToPoint) {
					var point = hashToPoint[hash];
					if (newPoint.distance2(point) < 1) {
						return true;
					}
				}
				return false;
			}
			function brushUpVLines(owner, newPoint, bisector, oVLineList, nVLineList) {
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
				oVLineList.push(toVLine(newPoint, bisector));
				nVLineList.push(toVLine(owner, bisector));
				return neighbors;
			}
		};
		this.forEachBPoint = function (f) {
			for (var hash in hashToPoint) {
				f(hashToPoint[hash], hashToVLines[hash]);
			}
		};
		function getNearest(arg) {
			var nearestPoint = null;
			var nearestDist2 = 0;
			for (var hash in hashToPoint) {
				var point = hashToPoint[hash];
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
	function toVLine(point, line) {
		return {
			buddy: point,
			line: line };
	}
	function relateChain(f, firstArg) {
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
})();
