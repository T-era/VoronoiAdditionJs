/// <reference path="../ad/VPoint.ts"/>
/// <reference path="JunkRack.ts"/>

module Fortune {
	export class Circle {
		center :Voronoi.Point;
		r :number;

		constructor(center :Voronoi.Point, r :number) {
			this.center = center;
			this.r = r;
		}
		static create(p1 :Voronoi.IPoint, p2 :Voronoi.IPoint, p3 :Voronoi.IPoint) :Circle {
			var d = - determinant(p1.x * p1.x + p1.y * p1.y, p1.y, 1,
					p2.x * p2.x + p2.y * p2.y, p2.y, 1,
					p3.x * p3.x + p3.y * p3.y, p3.y, 1);
			var e = determinant(p1.x * p1.x + p1.y * p1.y, p1.x, 1,
					p2.x * p2.x + p2.y * p2.y, p2.x, 1,
					p3.x * p3.x + p3.y * p3.y, p3.x, 1);
			var a = determinant(p1.x, p1.y, 1,
					p2.x, p2.y, 1,
					p3.x, p3.y, 1);
			var f = - determinant(p1.x * p1.x + p1.y * p1.y, p1.x, p1.y,
					p2.x * p2.x + p2.y * p2.y, p2.x, p2.y,
					p3.x * p3.x + p3.y * p3.y, p3.x, p3.y);
			if (d_same(a, 0)) {
				return null;
			} else {
				var y0 = - e / 2.0 / a;
				var x0 = - d / 2.0 / a;
				var r = Math.sqrt((d * d + e * e) / 4.0 / a / a - f / a);

				return new Circle(new Voronoi.Point(x0, y0), r);
			}

			function determinant(a :number, b :number, c :number,
								d :number, e :number, f :number,
								g :number, h :number, i :number) :number {
				return a * e * i
						+ b * f * g
						+ c * d * h
						- a * f * h
						- b * d * i
						- c * e * g;
			}
 		}
	}
}
