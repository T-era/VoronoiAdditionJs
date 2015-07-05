/// <reference path="Compatibility.ts" />

module Voronoi {
	export interface IPoint {
		x :number;
		y :number;
	}
	export class Point implements IPoint {
		x :number;
		y :number;
		str :string;
		isEdge :boolean = false;

		constructor(x :number, y :number) {
			this.x = x;
			this.y = y;
			this.str = "(" + x + ", " + y + ")";
		}

		toString() :String {
			return this.str;
		}
		distance2(arg :Point) :number {
			var dx = arg.x - this.x;
			var dy = arg.y - this.y;
			return dx * dx + dy * dy;
		}
		isBetween(p1 :IPoint, p2 :IPoint) :boolean {
			return isBtwn(p1.x, p2.x, this.x)
					&& isBtwn(p1.y, p2.y, this.y);
			function isBtwn(a, b, c) {
				return a <= c && c <= b
					|| b <= c && c <= a;
			}
		}
		isEq(arg :Point) :boolean {
			return this.x === arg.x
					&& this.y === arg.y;
		}
	}
	export class Vector {
		dx :number;
		dy :number;
		str :string;

		constructor(dx :number, dy :number) {
			this.dx = dx;
			this.dy = dy;
			this.str = "(" + dx + ", " + dy + ")";
		}
		isPara(arg :Vector) :boolean {
			return Math.abs(this.dx * arg.dy - this.dy * arg.dx) < 0.00001;
		}
		isSameDirection(arg :Vector) :boolean {
			return this.isPara(arg)
					&& Math.sign(this.dx) === Math.sign(arg.dx)
					&& Math.sign(this.dy) === Math.sign(arg.dy);
		}
		apply(point :Point, times :number) :Point{
			return new Point(point.x + this.dx * times
						, point.y + this.dy * times);
		}
		reverse() :Vector {
			return new Vector(- this.dx, - this.dy);
		}
		isEq(arg :Vector) :boolean {
			return this.dx == arg.dx
					&& this.dy == arg.dy;
		}
		toString() :string {
			return this.str;
		}
	}
}
