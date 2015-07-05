/// <reference path="../ad/VPoint.ts" />
/// <reference path="FBeachLine.ts" />

module Fortune {
	export interface Event {
		eventBorder :number;
		action :(BLNode)=>BLNode;
		center :Voronoi.IPoint;
	}
	export function toCircleEvent(removing, voronoiPoints :BeachLine) :Event {
		var circle = removing.circle;
		return {
			eventBorder: circle.center.y + circle.r,
			action: function(topNode) {
				// 削除される場合、その中心はボロノイ点
				voronoiPoints.addVPoint(removing.circle.center, removing.mPoint, removing.prev.mPoint, removing.next.mPoint);
				return removing.remove();
			},
			center: circle.center
		};
	}
	export function toSightEvent(newPoint :MPoint) :Event {
		return {
			eventBorder: newPoint.y,
			action: function(topNode) {
				if (topNode) {
					var ownerNode = topNode.seek(function(node) {
						return node.containsRangeX(newPoint.x, newPoint.y);
					});

					function last(node) {
						if (node.next) return last(node.next);
						else return node;
					}
					ownerNode = ownerNode == null ? last(topNode) : ownerNode;
					var node = ownerNode.addChild(newPoint);
					return node.topNode();
				} else {
					return new BLNode(newPoint);
				}
			},
			center: null
		};
	}
}
