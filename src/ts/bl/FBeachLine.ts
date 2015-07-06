/// <reference path="../ad/VPoint.ts" />
/// <reference path="JunkRack.ts" />
/// <reference path="FMotherPoint.ts" />
/// <reference path="FEvent.ts" />
/// <reference path="FBeachLineNode.ts" />

module Fortune {
	export class BeachLine {
		voronoiPoints :Voronoi.IPoint[] = [];
		sightPointIndex :number = 0;
		depth :number = 0;
		seedCount :number;
		seedSortedByY :MPoint[];
		topNode :BLNode;
		lastEvent :Event;

		constructor(arg :MPoint[]) {
			var seed = uniqueList(arg, function(p1 :Voronoi.IPoint, p2 :Voronoi.IPoint) {
				return d_same(p1.x, p2.x, 3)
					&& d_same(p1.y, p2.y, 3);
			}, function(p) { return new MPoint(p); });
			this.seedCount = seed.length;
			this.seedSortedByY = seed.sort(function(a, b) {
				if (a.y == b.y) {
					return a.x - b.x;
				} else {
					return a.y - b.y;
				}
			});

		}
		addVPoint(vPoint :Voronoi.Point, m1 :MPoint, m2 :MPoint, m3 :MPoint) {
			this.voronoiPoints.push(vPoint);
			m1.addVPoint(vPoint,m2,m3);
			m2.addVPoint(vPoint,m1,m3);
			m3.addVPoint(vPoint,m1,m2);
		}
		getSeedAt(i :number) :MPoint {
			if (this.seedSortedByY.length > i) {
				return this.seedSortedByY[i];
			} else {
				return null;
			}
		}
		getNextSight() :MPoint {
			return this.getSeedAt(this.sightPointIndex);
		}

		stepNextEvent() :boolean {
			var event :Event = null;
			var done = false;

			var nextCircle = this.getNextCircleEvent();

			if (nextCircle) { // サークルイベントが起きないなら、サイトイベントを起こす。
				event = toCircleEvent(nextCircle, this);
			} else {
				var nextPoint = this.getNextSight();
				if (nextPoint) {
					event = toSightEvent(nextPoint);
					this.sightPointIndex ++;
				} else {
					return true;
				}
			}

			// Fire event
			this.topNode = event.action(this.topNode);
			this.lastEvent = event;
			this.depth = event.eventBorder;
			return done;
		}
		getNextCircleEvent() :BLNode {
			var nextSight = this.getNextSight();
			// Seek circle event
			var circleEventQueue = this.toList(function(o1, o2) {
				if (o1.circleEventDepth
					&& o2.circleEventDepth)
					return o1.circleEventDepth - o2.circleEventDepth;
				else if (o1.circleEventDepth) return -1;
				else if (o2.circleEventDepth) return 1;
				else return 0;
			});
			for (var i = 0, max = circleEventQueue.length; i < max; i ++) {
				var arc = circleEventQueue[i];
				// 最後のポイントのサイトイベント後は、すべてのサークルイベントを処理する。
				// 次のサイトイベントの手前に、サークルイベントがあるばあい、今回処理するのはそのサークルイベント
				if (nextSight != null
						&& arc.circleEventDepth > nextSight.y) {
					break; // サイトイベントの予定があり、キューにあるサークルイベントはすべてより深いものばかり。
				} else if (arc.willClose()) {
					return arc;
				}
			}
			return null;
		}
		toList(fSort :(a1:BLNode,a2:BLNode)=>number) {
			var list = [];
			if (this.topNode) {
				this.topNode.forEach(function(n) {
					list.push(n);
				});
			}
			return list.sort(fSort);
		}
	}
}
