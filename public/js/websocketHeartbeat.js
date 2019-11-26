!(function(t, e) {
	if ('object' == typeof exports && 'object' == typeof module) module.exports = e();
	else if ('function' == typeof define && define.amd) define([], e);
	else {
		var o = e();
		for (var n in o) ('object' == typeof exports ? exports : t)[n] = o[n];
	}
})(window, function() {
	return (function(t) {
		var e = {};
		function o(n) {
			if (e[n]) return e[n].exports;
			var i = (e[n] = { i: n, l: !1, exports: {} });
			return t[n].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
		}
		return (
			(o.m = t),
			(o.c = e),
			(o.d = function(t, e, n) {
				o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
			}),
			(o.r = function(t) {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(t, '__esModule', { value: !0 });
			}),
			(o.t = function(t, e) {
				if ((1 & e && (t = o(t)), 8 & e)) return t;
				if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
				var n = Object.create(null);
				if (
					(o.r(n),
					Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
					2 & e && 'string' != typeof t)
				)
					for (var i in t)
						o.d(
							n,
							i,
							function(e) {
								return t[e];
							}.bind(null, i)
						);
				return n;
			}),
			(o.n = function(t) {
				var e =
					t && t.__esModule
						? function() {
								return t.default;
							}
						: function() {
								return t;
							};
				return o.d(e, 'a', e), e;
			}),
			(o.o = function(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(o.p = ''),
			o((o.s = 0))
		);
	})([
		function(t, e, o) {
			'use strict';
			function n(t) {
				var e = t.url,
					o = t.pingTimeout,
					n = void 0 === o ? 15e3 : o,
					i = t.pongTimeout,
					r = void 0 === i ? 1e4 : i,
					c = t.reconnectTimeout,
					s = void 0 === c ? 2e3 : c,
					u = t.pingMsg,
					p = void 0 === u ? 'heartbeat' : u,
					f = t.repeatLimit,
					a = void 0 === f ? null : f;
				(this.opts = {
					url: e,
					pingTimeout: n,
					pongTimeout: r,
					reconnectTimeout: s,
					pingMsg: p,
					repeatLimit: a
				}),
					(this.ws = null),
					(this.repeat = 0),
					(this.onclose = function() {}),
					(this.onerror = function() {}),
					(this.onopen = function() {}),
					(this.onmessage = function() {}),
					(this.onreconnect = function() {}),
					this.createWebSocket();
			}
			Object.defineProperty(e, '__esModule', { value: !0 }),
				(n.prototype.createWebSocket = function() {
					try {
						(this.ws = new WebSocket(this.opts.url)), this.initEventHandle();
					} catch (t) {
						throw (this.reconnect(), t);
					}
				}),
				(n.prototype.initEventHandle = function() {
					var t = this;
					(this.ws.onclose = function() {
						t.onclose(), t.reconnect();
					}),
						(this.ws.onerror = function() {
							t.onerror(), t.reconnect();
						}),
						(this.ws.onopen = function() {
							(t.repeat = 0), t.onopen(), t.heartCheck();
						}),
						(this.ws.onmessage = function(e) {
							t.onmessage(e), t.heartCheck();
						});
				}),
				(n.prototype.reconnect = function() {
					var t = this;
					(this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat) ||
						this.lockReconnect ||
						this.forbidReconnect ||
						((this.lockReconnect = !0),
						this.repeat++,
						this.onreconnect(),
						setTimeout(function() {
							t.createWebSocket(), (t.lockReconnect = !1);
						}, this.opts.reconnectTimeout));
				}),
				(n.prototype.send = function(t) {
					this.ws.send(t);
				}),
				(n.prototype.heartCheck = function() {
					this.heartReset(), this.heartStart();
				}),
				(n.prototype.heartStart = function() {
					var t = this;
					this.forbidReconnect ||
						(this.pingTimeoutId = setTimeout(function() {
							t.ws.send(t.opts.pingMsg),
								(t.pongTimeoutId = setTimeout(function() {
									t.ws.close();
								}, t.opts.pongTimeout));
						}, this.opts.pingTimeout));
				}),
				(n.prototype.heartReset = function() {
					clearTimeout(this.pingTimeoutId), clearTimeout(this.pongTimeoutId);
				}),
				(n.prototype.close = function() {
					(this.forbidReconnect = !0), this.heartReset(), this.ws.close();
				}),
				window && (window.WebsocketHeartbeatJs = n),
				(e.default = n);
		}
	]);
});
