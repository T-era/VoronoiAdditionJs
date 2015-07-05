/// <reference path="../ad/VPoint.ts" />
/// <reference path="JunkRack.ts" />

module Fortune {
	export interface Crosses {
		right :Voronoi.Point;
		left :Voronoi.Point;
	}
	export class CCurve {
		x :number;
		y :number;
		a :number;
		isVertical :boolean = false;

		static create(depthBy :number, focus :Voronoi.IPoint) :CCurve {
			if (d_same(depthBy, 0)) {
				var vertical = new Vertical(focus.x);
				return vertical;
			} else {
				var qCurve = new QCurve(focus.x, focus.y + depthBy / 2, - 1 / 2 / depthBy);
				return qCurve;
			}
		}

		static curveCrosses(depth :number, p1 :Voronoi.IPoint, p2 :Voronoi.IPoint) :Crosses {
			if (! p1|| ! p2) return null;
			return CCurve.create(depth - p1.y, p1)
				.cross(CCurve.create(depth - p2.y, p2));
		}

		cross(arg :CCurve) :Crosses { alert('MUST BE OVERRIDE'); return null; }
		f(x :number) :number { alert('MUST BE OVERRIDE'); return null; }
	}
	export class Vertical extends CCurve {
		isVertical :boolean = true;

		constructor(x :number) {
			super();
			this.x = x;
			this.y = NaN;
			this.a = NaN;
		}
		cross(arg :CCurve) :Crosses {
			if (arg.isVertical) {
				// 垂直線同士の交点はない。(もっとも浅い2点のyが一致した場合にここに来る)
				return null;
			} else {
				var ay = arg.f(this.x);
				var point = new Voronoi.Point(this.x, ay);
				return {
					right: point,
					left: point
				};
			}
		}
	}
	export class QCurve extends CCurve {
		constructor(x :number, y :number, a :number) {
			super();
			this.x = x;
			this.y = y;
			this.a = a;
		}

		f(x :number) :number {
			return this.a * (x - this.x) * (x - this.x) + this.y;
		}
		cross(arg :CCurve) :Crosses {
			if (arg.isVertical) {
				return arg.cross(this);
			} else if (this.a === arg.a) {
				// 交点が2つ存在しないケース
				if (this.x === arg.x) {
					// 交点なし。
					return null;
				} else {
					// 交点一つ
					var x = (this.x + arg.x) / 2.0;
					var y = this.f(x);
					var point = new Voronoi.Point(x, y);
					return { right: point, left: point };
				}
			} else {
				// y = a1 * (x - xx1) ^2 + yy1
				// 	 = a1 * x^2 - 2*a1*xx1*x + a1*xx1^2 + yy1
				// y = a2 * (x - xx2) ^2 + yy2
				//   = a2 * x^2 - 2*a2*xx2*x + a2*xx2^2 + yy2
				//
				// 0 = (a1-a2)x^2 - (2*a1*xx1 - 2*a2*xx2) + a1*xx1^2 - a2*xx2^2 + yy1 - yy2

				// p*x^2 + q*x + r = 0
				// p: a1-a2
				// q: -2(a1*xx1 - a2*xx2)
				// r: a1*xx1^2 - a2*xx2^2 + yy1 - yy2

				var p = this.a - arg.a;
				var q = -2.0 * (this.a * this.x - arg.a * arg.x);
				var r = this.a * this.x * this.x
						- arg.a * arg.x * arg.x
						+ this.y - arg.y;

				var x1 = (- q + Math.sqrt(q * q - 4 * p * r)) / (2 * p);
				var x2 = (- q - Math.sqrt(q * q - 4 * p * r)) / (2 * p);
				var xr = Math.max(x1, x2);
				var xl = Math.min(x1, x2);
				var yr = this.f(xr);
				var yl = this.f(xl);
				return {
					right: new Voronoi.Point(xr, yr),
					left: new Voronoi.Point(xl, yl)
				};
			}
		}
	}
}
