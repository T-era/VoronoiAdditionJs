/// <reference path="FMotherPoint.ts" />
/// <reference path="FCircle.ts" />
/// <reference path="FCurv.ts" />

module Fortune {
	export class BLNode {
		mPoint :MPoint;
		prev :BLNode;
		next :BLNode;
		circle :Circle;
		circleEventDepth :number;
		lr :(c:Crosses)=>Voronoi.Point;

		constructor(motherPoint :MPoint) {
			this.mPoint = motherPoint;
		}

		computeCircle() {
			if (this.prev && this.next) {
				var circle = Circle.create(this.mPoint, this.prev.mPoint, this.next.mPoint);
				this.circle = circle;
				if (circle) {
					this.circleEventDepth = circle.center.y + circle.r;
				} else {
					delete this.circleEventDepth;
				}
			}
		}
		willClose() {
			if (d_same(this.circleEventDepth, this.mPoint.y)) {
				// 交点直下でSightイベントが発生する場合への対処。
				return false;
			} else if (this.prev && this.next) {
				var c1 = CCurve.curveCrosses(this.circleEventDepth, this.mPoint, this.prev.mPoint);
				var c2 = CCurve.curveCrosses(this.circleEventDepth, this.mPoint, this.next.mPoint);
				var pl = this.prev.lr(c1);
				var pr = this.     lr(c2);

				return d_same(pl.y, pr.y)
					&& d_same(pl.x, pr.x);
			} else {
				return false;
			}
		}
		containsRangeX(x :number, depth :number) {
			if (this.prev && this.next) {
				var p1 = this.prev.lr(CCurve.curveCrosses(depth, this.mPoint, this.prev.mPoint));
				var p2 = this     .lr(CCurve.curveCrosses(depth, this.mPoint, this.next.mPoint));

				return p1 && p2
					&& p1.x <= x
					&& x < p2.x;
			} else if (this.next) {
				var p2 = this     .lr(CCurve.curveCrosses(depth, this.mPoint, this.next.mPoint));
				return p2
					&& x < p2.x;
			} else if (this.prev) {
				var p1 = this.prev.lr(CCurve.curveCrosses(depth, this.mPoint, this.prev.mPoint));
				return p1
					&& p1.x <= x;
			} else {
				return true;
			}
		}
		setNext(node :BLNode, fLR :(c:Crosses)=>Voronoi.Point) {
			this.next = node;
			this.lr = fLR;
			if (node) {
				node.prev = this;
			}
		}
		addChild(newPoint :MPoint) :BLNode {
			// 交点が一つしかないケース/交点が2つあるケース。
			var twoCross = !(newPoint.y == this.mPoint.y);
			var oldNext = this.next;
			var firstHalf = this;
			var oldLR = this.lr;
			var newNode = new BLNode(newPoint);
			firstHalf.setNext(newNode, function(c) { return c == null ? null : c.left; });
			if (twoCross) {
				var secondHalf = new BLNode(this.mPoint);
				newNode.setNext(secondHalf, function(c) { return c.right; });
				secondHalf.setNext(oldNext, oldLR);
				secondHalf.computeCircle();
			}
			firstHalf.computeCircle();
			newNode.computeCircle();
			if (oldNext) oldNext.computeCircle();

			return firstHalf;
		}
		remove() {
			// 要素を削除(LinkedListを切り詰める)
			// LRを引き継ぐ。 深い方のLRを設定。
			var lr = this.prev.mPoint.y > this.next.mPoint.y
					? this.prev.lr
					: this.     lr;

			this.prev.next = this.next;
			this.prev.lr = lr;

			this.next.prev = this.prev;
			this.prev.computeCircle();
			if (this.next) this.next.computeCircle();
			return this.topNode();
		}

		// コレクション操作
		seek(f :(arg:BLNode)=>boolean) :BLNode {
			for (var temp = this; temp; temp = temp.next) {
				if (f(temp)) {
					return temp;
				}
			}
			return null;
		}
		addToList(list :BLNode[]) {
			for (var temp = this; temp; temp = temp.next) {
				list.push(temp);
			}
		};
		topNode() :BLNode{
			for (var temp = this; ; temp = temp.prev) {
				if (! temp.prev) {
					return temp;
				}
			}
		};
		forEach(f :(arg:BLNode)=>void) {
			for (var temp = this; temp; temp = temp.next) {
				f(temp);
			}
		};
	}
}
