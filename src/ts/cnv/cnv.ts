/// <reference path="../bl/FBeachLine.ts" />
/// <reference path="../ad/VField.ts" />

module Cnv {
    export class Convert {
        input :Fortune.BeachLine;

        constructor(input :Fortune.BeachLine) {
            while (! input.stepNextEvent());
            this.input = input;
        }
        to(output :Voronoi.Field) {
            var count = this.input.seedCount;
            var hashToPoint :{ [index :string]: Voronoi.Point } = {};
            var hashToVLines :{ [index :string]: Voronoi.VLine[] } = {};
            for (var i = 0, max = this.input.seedSortedByY.length; i < max; i ++) {
                var mPoint = this.input.seedSortedByY[i];
                var mPoinHash = Voronoi.toHash(mPoint);
                var point = new Voronoi.Point(mPoint.x, mPoint.y);
                hashToPoint[mPoinHash] = point;
                var vLineList :Voronoi.VLine[] = [];
                for (var j = 0, jMax = mPoint.voronoiLines.length; j < jMax; j++) {
                    vLineList.push(mPoint.voronoiLines[j]);
                }
                for (var hash in mPoint.lonleyNeighbor) {
                    var neighbor :Fortune.Neighbor = mPoint.lonleyNeighbor[hash];
                    // k,v,w
                    // mPoint, k のbisector, vが一端。 wと逆方向。
                    var buddyPoint = new Voronoi.Point(neighbor.k.x, neighbor.k.y);
                    var line = Voronoi.bisector(mPoint, neighbor.k)
                    var temp = line.chopAt(neighbor.v, isHereSide(neighbor.w, Voronoi.bisector(neighbor.w, mPoint)));
                    vLineList.push(new Voronoi.VLine(buddyPoint, line));
                }
                hashToVLines[mPoinHash] = vLineList;
            }

            output.countInField = count;
		        output.hashToPoint = hashToPoint;
            output.hashToVLines = hashToVLines;

            function isHereSide(side :Voronoi.IPoint, breakLine :Voronoi.Line) :(a:Voronoi.IPoint)=>boolean {
                return function(arg :Voronoi.IPoint) {
                    return !breakLine.isSameSide(arg, side);
                }
            }
        }
    }
}
