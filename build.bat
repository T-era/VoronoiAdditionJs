set DEST_DIR=dest/

call tsc --out %DEST_DIR%\voronoi_addition.js src/ts/ad/VDraw.ts
call tsc --out %DEST_DIR%\voronoi_fortune.js src/ts/cnv/cnv.ts

copy src\static\* dest\
