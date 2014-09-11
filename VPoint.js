;(function() {
	Voronoi.Point = function(x, y) {
		this.getX = getter(x);
		this.getY = getter(y);
		this.str = "(" + x + ", " + y + ")";
	}
	Voronoi.Point.prototype = {
		distance2: function(arg) {
			var dx = arg.getX() - this.getX();
			var dy = arg.getY() - this.getY();
			return dx * dx + dy * dy;
		},
		isBetween: function(p1, p2) {
			return isBtwn(p1.getX(), p2.getX(), this.getX())
				&& isBtwn(p1.getY(), p2.getY(), this.getY());
			function isBtwn(a, b, c) {
				return a <= c && c <= b
					|| b <= c && c <= a;
			}
		},
		isEq: function(arg) {
			return this.getX() === arg.getX()
				&& this.getY() === arg.getY();
		},
		toString: function() {
			return this.str;
		}
	}

	Voronoi.Vector = function(dx, dy) {
		this.getDx = getter(dx);
		this.getDy = getter(dy);
		this.str = "(" + dx + ", " + dy + ")";
	}
	Voronoi.Vector.prototype = {
		isPara: function(arg) {
			return Math.abs(this.getDx() * arg.getDy() - this.getDy() * arg.getDx()) < 0.00001;
		},
		isSameDirection: function(arg) {
			return this.isPara(arg)
				&& Math.sign(this.getDx()) === Math.sign(arg.getDx())
				&& Math.sign(this.getDy()) === Math.sign(arg.getDy());
		},
		apply: function(point, times) {
			return new Voronoi.Point(point.getX() + this.getDx() * times
									, point.getY() + this.getDy() * times);
		},
		reverse: function() {
			return new Voronoi.Vector(- this.getDx(), - this.getDy());
		},
		isEq: function(arg) {
			return this.getDx() == arg.getDx()
				&& this.getDy() == arg.getDy();
		},
		toString: function() {
			return this.str;
		}
	}

	function getter(val) {
		return function() { return val; }
	}
})();
