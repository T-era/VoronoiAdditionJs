DEST_DIR=dest/

tsc --out $DEST_DIR/voronoi_addition.js src/ts/ad/VDraw.ts
tsc --out $DEST_DIR/voronoi_fortune.js src/ts/cnv/cnv.ts

cp src/static/* dest/
