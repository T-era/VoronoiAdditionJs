module Fortune {
	/// 浮動小数値の一致比較をします。計算誤差を吸収するための誤差閾値を指定できます。
	/// 誤差閾値を省略した場合はデフォルトで0.0001とします。
	export function d_same(a :number, b :number, border :number = null) {
		if (!border) border = 0.0001;
		return Math.abs(a-b) < border;
	}

	/// 浮動小数値を固定長文字列に整形します。
	function dTo_2s(d) {
		var sign = (d < 0 ? "-" : "");
		var abs = Math.abs(d);
		var op = Math.floor(abs);
		var up = Math.floor(abs * 100 % 100);
		var len = Math.log(abs) / Math.LN10 + (abs < 1 ? 2 : 3);
		return ("      " + sign + String(op)).substr(-7, 7) + "." + ("00" + String(up)).substr(-2, 3);
	}

	/// 受け取ったリストから重複する要素を除外し、新しいリストにして返します。
	export function uniqueList<T>(arg :T[], fIsSame :(a:T,b:T)=>boolean, fMap:(arg:T)=>T = null) {
		if (!fMap) fMap = function(a) { return a; };
		var temp = [];
		for (var i = 0, iMax = arg.length; i < iMax; i ++) {
			var target = arg[i];
			var hasSame = false;
			for (var j = i + 1, jMax = arg.length; j < jMax; j ++) {
				if (fIsSame(target, arg[j])) {
					hasSame = true;
					break;
				}
			}
			if (! hasSame) temp.push(fMap(target));
		}
		return temp;
	}

	function showPoint(p) {
		return "(" + dTo_2s(p.x) + ", " + dTo_2s(p.y) + ")";
	}
}
