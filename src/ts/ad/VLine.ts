/// <reference path="VPoint.ts" />

module Voronoi {
	export class Line {
		p :Point;
		v :Vector;
		p1 :Point; // 半直線(または線分)の一端
		p2 :Point; // 線分の一端
		d :Vector; // 半直線の場合の、一端から延びる方向
		isNull :boolean;

		constructor(p :Point, v :Vector) {
			this.p = p;
			this.v = v;
		}

		takePoint() :Point {
			if (this.p1) return this.p1;
			else return this.p;
		}

		isPara(arg :Line) {
			return this.v.isPara(arg.v);
		}

		isSameDirection(arg :Line) {
			if (this.d && arg.d) {
				return this.d.isSameDirection(arg.d);
			} else {
				return this.v.isPara(arg.v);
			}
		}

		isSameSide(p1 :IPoint, p2 :IPoint) :boolean {
			var s1 = side(this, p1);
			var s2 = side(this, p2);
			return s1 === s2;
			function side(l :Line, p :IPoint) :number{
				return Math.sign(f(l, p));
			}
			function f(l, p) {
				var x = l.p.x;
				var y = l.p.y;
				var dx = l.v.dx;
				var dy = l.v.dy;
				return (p.x - x) * dy - (p.y - y) * dx;
			}
		}

		/// 指定された点が、線分上であるのかどうかを判定します。
		/// ただし、点は仮想的な直線上である必要があります。
		isIn(arg :Point) :boolean {
			if (! this.p1) return true;
			if (! this.p2) {
				return ((isSameSign(this.d.dx, arg.x - this.p1.x)
							&& isSameSign(this.d.dy, arg.y - this.p1.y))
						|| (this.p1.x === arg.x && this.p1.y === arg.y));
			} else {
				return arg.isBetween(this.p1, this.p2);
			}
			function isSameSign(a, b) {
				return Math.sign(a) === Math.sign(b);
			}
		}

		cross(arg :Line) :Point {
			var l1 = this;
			var l2 = arg;
			var cr = imaginaryCross();
			if (cr === null) return null;
			if (isOut(l1, cr) || isOut(l2, cr)) return null;
			return cr;

			function imaginaryCross() :Point {
				var p1 = l1.p;
				var v1 = l1.v;
				var p2 = l2.p;
				var v2 = l2.v;
				if (v1.isPara(v2)) return null;
				else {
					var denomi = v1.dx * v2.dy - v2.dx * v1.dy;
					var nume1 = numeSnip(v1, p1);
					var nume2 = numeSnip(v2, p2);
					var x = (v1.dx * nume2 - v2.dx * nume1) / denomi;
					var y = (v1.dy * nume2 - v2.dy * nume1) / denomi;
					return new Point(x, y);
				}
				function numeSnip(v :Vector, p :Point) :number {
					return v.dy * p.x - v.dx * p.y;
				}
			}
			function isOut(l :Line, p :Point) :boolean {
				return ! l.isIn(p);
			}
		}

		chop(breakLine :Line, side :Point) {
			var para = this.isPara(breakLine);
			var cp = para ? null : this.cross(breakLine);
			if (!cp) {
				if (! isHereSide(this.takePoint())) {
					this.isNull = true;
				}
				return false;
			} else {
				return this.chopAt(cp, isHereSide);
			}
			function isHereSide(arg :IPoint) :boolean {
				return breakLine.isSameSide(arg, side);
			}
		}

		chopAt(crossPoint :Point, fIsHereSide :(arg:IPoint)=>boolean) {
			if (! this.p1) {
				this.p1 = crossPoint;
				if (fIsHereSide(this.v.apply(crossPoint, 1))) {
					this.d = this.v;
				} else {
					this.d = this.v.reverse();
				}
				return true;
			} else if (! this.p2) {
				if (this.p1.isEq(crossPoint)) {
					if (fIsHereSide(this.d.apply(crossPoint, 1))) {
						return false;
					} else {
						this.isNull = true;
						return true;
					}
				} else if (fIsHereSide(this.p1)) {
					this.p2 = crossPoint;
				} else if (fIsHereSide(this.d.apply(crossPoint, 1))) {
					this.p1 = crossPoint;
				} else {
					this.isNull = true;
//					this.p2 = crossPoint;
				}
				return true;
			} else {
				if (fIsHereSide(this.p1) && fIsHereSide(this.p2)) {
					// Do nothing.
				} else if (fIsHereSide(this.p1)) {
					this.p2 = crossPoint;
				} else if (fIsHereSide(this.p2)) {
					this.p1 = crossPoint;
				} else {
					this.isNull = true;
				}
				return true;
			}
		}
		toString() :string {
			if (this.p2) {
				return "Close :" + this.p1 + "-" + this.p2;
			} else if (this.p1) {
				return "Side :" + this.p1 + "->" + this.d;
			} else {
				return "Line : " + this.p + "->" + this.v;
			}
		}
	}
	export function bisector(p1 :IPoint, p2 :IPoint) :Line {
		if (p1.x === p2.x
			&& p1.y === p2.y) throw "同一の点";
		var center = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
		var v = new Vector(p2.y - p1.y, p1.x - p2.x);
		return new Line(center, v);
	};
}
/*
	function isLine(obj) {
		return obj.p
			&& obj.v
			&& ! obj.p1
			&& ! obj.p2;
	}
	function isSLine(obj) {
		return obj.d
			&& obj.p1
			&& ! obj.p2;
	}
	function isCLine(obj) {
		return obj.p1
			&& obj.p2;
	}
*/
