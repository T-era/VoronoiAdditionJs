/// <reference path="../ad/VLine.ts" />
/// <reference path="../ad/VField.ts" />

module Fortune {
	export interface Neighbor {
		k :MPoint;
		v :Voronoi.Point;
		w :MPoint;
	}
	/// 母点
	export class MPoint implements Voronoi.IPoint {
		x :number;
		y :number;
		lonleyNeighbor :{ [index :string]: Neighbor } = {};
		voronoiLines :Voronoi.VLine[] = [];
		str :string;

		constructor(p :Voronoi.IPoint) {
			this.x = p.x;
			this.y = p.y;
			/// toString用(キーに使うため)
			this.str = this.str = this.x + "," + this.y;
		}

		/// (連想配列のキーに使うため)
		toString() :string {
			return this.str;
		}

		/// ボロノイ点を追加します。
		/// ボロノイ点を囲む残り2つの母点を受け取ります。
		addVPoint(vPoint :Voronoi.Point, buddy1 :MPoint, buddy2 :MPoint) {
			var that = this;
			addImpl.call(this, buddy1, buddy2);
			addImpl.call(this, buddy2, buddy1);

			function addImpl(mp1 :MPoint, mp2 :MPoint) {
				var ln = that.lonleyNeighbor[mp1.toString()];
				if (ln) {
					var newVPoint = ln.v;
					var line :Voronoi.Line = Voronoi.bisector(that, mp1);
					line.p1 = vPoint;
					line.p2 = newVPoint;
					that.voronoiLines.push(new Voronoi.VLine(new Voronoi.Point(mp1.x, mp1.y), line));
					delete this.lonleyNeighbor[mp1.toString()];
				} else {
					that.lonleyNeighbor[mp1.toString()] = { k: mp1, v: vPoint, w: mp2 };
				}
			}
		}
	}
}
