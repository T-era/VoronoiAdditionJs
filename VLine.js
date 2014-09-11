;(function() {
	Voronoi.Line = function(p, v) {
		this.p = p;
		this.v = v;
	}

	Voronoi.Line.prototype = {
		takePoint: function() {
			if (this.p1) return this.p1;
			else return this.p;
		},
		isPara: function(arg) {
			return this.v.isPara(arg.v);
		},
		isSameDirection: function(arg) {
			if (this.d && arg.d) {
				return this.d.isSameDirection(arg.d);
			} else {
				return this.v.isPara(arg.v);
			}
		},
		isSameSide: function(p1, p2) {
			var s1 = side(this, p1);
			var s2 = side(this, p2);
			return s1 === s2;
			function side(l, p) {
				return Math.sign(f(l, p));
			}
			function f(l, p) {
				var x = l.p.getX();
				var y = l.p.getY();
				var dx = l.v.getDx();
				var dy = l.v.getDy();
				return (p.getX() - x) * dy - (p.getY() - y) * dx;
			}
		},
		cross: function(arg) {
			var l1 = this;
			var l2 = arg;
			var cr = imaginaryCross(l1, l2);
			if (cr === null) return null;
			if (isOut(l1, cr) || isOut(l2, cr)) return null;
			return cr;
			function imaginaryCross() {
				var p1 = l1.p;
				var v1 = l1.v;
				var p2 = l2.p;
				var v2 = l2.v;
				if (v1.isPara(v2)) return null;
				else {
					var denomi = v1.getDx() * v2.getDy() - v2.getDx() * v1.getDy();
					var nume1 = numeSnip(v1, p1);
					var nume2 = numeSnip(v2, p2);
					var x = (v1.getDx() * nume2 - v2.getDx() * nume1) / denomi;
					var y = (v1.getDy() * nume2 - v2.getDy() * nume1) / denomi;
					return new Voronoi.Point(x, y);
				}
				function numeSnip(v, p) {
					return v.getDy() * p.getX() - v.getDx() * p.getY();
				}
			}
			function isOut(l, p) {
				return ! l.isIn(p);
			}
		},
		chop: function(breakLine, side) {
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
			function isHereSide(arg) {
				return breakLine.isSameSide(arg, side);
			}
		},
		chopAt: function(crossPoint, fIsHereSide) {
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
		},
		isIn: function(arg) {
			if (! this.p1) return true;
			if (! this.p2) {
				return ((isSameSign(this.d.getDx(), arg.getX() - this.p1.getX())
					&& isSameSign(this.d.getDy(), arg.getY() - this.p1.getY()))
					|| (this.p1.getX() === arg.getX() && this.p1.getY() === arg.getY()));
			} else {
				return arg.isBetween(this.p1, this.p2);
			}
			function isSameSign(a, b) {
				return Math.sign(a) === Math.sign(b);
			}
		},
		toString: function() {
			if (this.p2) {
				return "Close :" + this.p1 + "-" + this.p2;
			} else if (this.p1) {
				return "Side :" + this.p1 + "->" + this.d;
			} else {
				return "Line : " + this.p + "->" + this.v;
			}
		}
	};
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

	Voronoi.bisector = function(p1, p2) {
		if (p1.getX() === p2.getX()
			&& p1.getY() === p2.getY()) throw "同一の点";
		var center = new Voronoi.Point((p1.getX() + p2.getX()) / 2, (p1.getY() + p2.getY()) / 2);
		var v = new Voronoi.Vector(p2.getY() - p1.getY(), p1.getX() - p2.getX());
		return new Voronoi.Line(center, v);
	};
})();
