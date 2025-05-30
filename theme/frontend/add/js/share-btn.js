var a2a_config = a2a_config || {};
a2a_config.vars = {
    vars: ["menu_type", "static_server", "linkmedia", "linkname", "linkurl", "linkname_escape", ["http_s", "http:" != document.location.protocol ? "s" : ""], "show_title", "onclick", "num_services", "hide_embeds", "prioritize", "exclude_services", "custom_services", ["templates", {}], "orientation", ["track_links", !1], ["track_links_key", ""], "tracking_callback", "track_pub", "color_main", "color_bg", "color_border", "color_link_text", "color_link_text_hover", "color_arrow", "color_arrow_hover", ["add_services", !1, 1], ["thanks", {}], "locale", "delay", "icon_color", "no_3p", "show_menu", "target"],
    process: function() {
        for (var e, a, t = a2a_config.vars.vars, n = 0, i = t.length; n < i; n++)
            void 0 !== (a = "string" == typeof t[n] ? (e = t[n],
            undefined) : (e = t[n][0],
            t[n][1])) && "undefined" == typeof a2a_config[e] && (a2a_config[e] = a)
    }
},
a2a_config.vars.process(),
a2a_config.localize = window.a2a_localize || "",
a2a_config.static_server = a2a_config.static_server || "https://static.addtoany.com/menu";
var a2a = a2a || {
    static_addtoany: "https://static.addtoany.com/menu",
    total: 0,
    kit_services: [],
    icons_img_url: a2a_config.static_server + "/icons.36.png",
    head_tag: document.getElementsByTagName("head")[0],
    canonical_url: function() {
        if (!document.querySelector)
            return !1;
        var e, a = document.querySelector('meta[property="og:url"]');
        return a ? a.content : !!(e = document.querySelector('link[rel="canonical"]')) && e.href
    }(),
    ieo: function() {
        for (var e = -1, a = document.createElement("b"); a.innerHTML = "\x3c!--[if gt IE " + ++e + "]>1<![endif]--\x3e",
        +a.innerHTML; )
            ;
        return a2a.ieo = function() {
            return e
        }
        ,
        e
    },
    quirks: document.compatMode && "BackCompat" == document.compatMode ? 1 : null,
    is_mobile: navigator.userAgent.match(/Mobi/) || "screen"in window && window.screen.width < 1366,
    has_menter: document.documentElement && "onmouseenter"in document.documentElement,
    has_touch: "ontouchend"in window,
    has_pointer: window.PointerEvent || navigator.msPointerEnabled,
    dom: {
        isReady: !1,
        ready: function(e) {
            var a = function() {
                if (!document.body)
                    return setTimeout(a2a.dom.ready(e));
                e(),
                a2a.dom.isReady = !0
            }
              , t = function(e) {
                (document.addEventListener || "load" === e.type || "complete" === document.readyState) && (n(),
                a())
            }
              , n = function() {
                document.addEventListener ? (document.removeEventListener("DOMContentLoaded", t, !1),
                window.removeEventListener("load", t, !1)) : (document.detachEvent("onreadystatechange", t),
                window.detachEvent("onload", t))
            };
            if ("complete" === document.readyState)
                a();
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", t, !1),
                window.addEventListener("load", t, !1);
            else {
                document.attachEvent("onreadystatechange", t),
                window.attachEvent("onload", t);
                var i = !1;
                try {
                    i = null == window.frameElement && document.documentElement
                } catch (o) {}
                i && i.doScroll && !function l() {
                    if (!a2a.dom.isReady) {
                        try {
                            i.doScroll("left")
                        } catch (o) {
                            return setTimeout(l, 50)
                        }
                        n(),
                        a()
                    }
                }()
            }
        }
    },
    ready: function() {
        a2a.type = "page",
        a2a.cbs("ready"),
        a2a.ready = function() {}
    },
    init: function(e, a) {
        var t, n, i, o, l = a2a.c, r = (a = a || {},
        {}), s = null, c = {}, d = location.href;
        for (var u in a2a.make_once(e),
        a)
            l[u] = a[u];
        for (var u in l)
            r[u] = l[u];
        if (n = l.target)
            if ("string" == typeof n) {
                if (i = n.substr(0, 1),
                o = n.substr(1),
                "." == i)
                    return a2a.multi_init(a2a.HTMLcollToArray(a2a.getByClass(o, document)), e, a),
                    void (l.target = !1);
                0 <= (t = (s = a2a.gEl(o)).className).indexOf("a2a_kit") && t.indexOf("a2a_target") < 0 && (s = null)
            } else
                s = l.target;
        (e = l.menu_type ? "mail" : e) && (a2a.type = e,
        l.vars.process()),
        c.type = a2a.type,
        c.node = s,
        c.linkmedia = l.linkmedia,
        c.linkname = l.linkname || document.title || location.href,
        c.linkurl = l.linkurl || location.href,
        c.linkname_escape = l.linkname_escape,
        c.linkname_implicit = !l.linkname_escape && (document.title || d) == c.linkname,
        c.linkurl_implicit = d == c.linkurl,
        c.orientation = l.orientation || !1,
        c.track_links = l.track_links || !1,
        c.track_links_key = l.track_links_key || "",
        c.track_pub = l.track_pub || !1,
        l.linkmedia = l.linkname = l.linkurl = l.linkname_escape = l.show_title = l.custom_services = l.exclude_services = l.orientation = l.track_pub = l.target = !1,
        "custom" == l.track_links && (l.track_links = !1,
        l.track_links_key = ""),
        a2a.last_type = a2a.type,
        window["a2a" + a2a.type + "_init"] = 1,
        function(e, a) {
            a2a.total++,
            a2a.n = a2a.total;
            var t, n, i = (a2a["n" + a2a.n] = e).node = a2a.set_this_index(e.node), o = document.createElement("div"), l = a2a.getData(i)["a2a-media"], r = a2a.getData(i)["a2a-title"], s = a2a.getData(i)["a2a-url"];
            i ? (e.linkname_escape && (n = a2a.getByClass("a2a_linkname_escape", i.parentNode)[0] || a2a.getByClass("a2a_linkname_escape", i.parentNode.parentNode)[0]) && (e.linkname = n.textContent || n.innerText),
            e.linkmedia = a.linkmedia = l || e.linkmedia,
            e.linkname = a.linkname = r || e.linkname,
            e.linkurl = a.linkurl = s || e.linkurl,
            r && (e.linkname_implicit = !1),
            s && (e.linkurl_implicit = !1),
            "textContent"in document ? o.textContent = e.linkname : o.innerText = e.linkname,
            (t = o.childNodes[0]) && (e.linkname = t.nodeValue),
            delete o,
            i.a2a_kit ? a2a.kit(e, a) : a2a.button(e)) : a2a.c.show_menu || a2a.total--
        }(c, r),
        l.menu_type = !1,
        a2a.init_show()
    },
    init_all: function(a) {
        a2a.unindexed(function(e) {
            0 <= e.className.indexOf("a2a_follow") ? a2a.init("feed", {
                target: e
            }) : a2a.init(a || "page", {
                target: e
            })
        }, !0) || !a2a.gEl("a2a_menu_container") || a2a.init_show.a2a_done || a2a.init(a)
    },
    multi_init: function(e, a, t) {
        for (var n = 0, i = e.length; n < i; n++)
            t.target = e[n],
            a2a.init(a, t)
    },
    button: function(e) {
        var n = a2a.gEl
          , i = e.node
          , o = e.type
          , l = "a2a" + o
          , r = n(l + "_dropdown")
          , s = n(l + "_full")
          , a = a2a.has_menter
          , t = i.firstChild
          , c = a2a[o].onclick;
        i.getAttribute("onclick") && -1 != (i.getAttribute("onclick") + "").indexOf("a2a_") || i.getAttribute("onmouseover") && -1 != (i.getAttribute("onmouseover") + "").indexOf("a2a_") || (a2a.add_event(i, "click", function(e) {
            a2a.preventDefault(e),
            a2a.stopPropagation(e);
            var a = "none" !== r.style.display
              , t = document.activeElement;
            if (a ? a2a.toggle_dropdown("none", o) : 2 !== c && (a2a.show_menu(i),
            a2a[o].last_focus = t,
            r.focus()),
            a && a2a.isDisplayed(n(l + "_show_more_less")) || 2 === c) {
                if ("mail" == o)
                    return;
                a2a.show_full(),
                a2a[o].last_focus = t,
                s.focus()
            }
        }),
        a2a.add_event(i, "click", a2a.stopPropagation),
        a2a.add_event(i, "touchstart", a2a.stopPropagation, !!a2a.evOpts() && {
            passive: !0
        }),
        !a2a[a2a.type].onclick && a && (a2a.c.delay ? i.onmouseenter = function() {
            a2a[a2a.type].over_delay = setTimeout(function() {
                a2a.show_menu(i)
            }, a2a.c.delay)
        }
        : i.onmouseenter = function() {
            a2a.show_menu(i)
        }
        ,
        i.onmouseleave = function() {
            a2a.miniLeaveDelay(),
            a2a[a2a.type].over_delay && clearTimeout(a2a[a2a.type].over_delay)
        }
        )),
        "a" == i.tagName.toLowerCase() && "page" == a2a.type && (i.href = ""),
        t && "undefined" != typeof t.srcset && /\/share_save_171_16.(?:gif|png)$/.test(t.src) && (t.srcset = "https://static.addtoany.com/buttons/share_save_342_32.png 2x")
    },
    kit: function(o, e) {
        var a, t, n, i, l, d = o.type, r = {
            behance: {
                name: "Behance",
                icon: "behance",
                color: "007EFF",
                url: "https://www.behance.net/${id}"
            },
            facebook: {
                name: "Facebook",
                icon: "facebook",
                color: "3B5998",
                url: "https://www.facebook.com/${id}"
            },
            flickr: {
                name: "Flickr",
                icon: "flickr",
                color: "FF0084",
                url: "https://www.flickr.com/photos/${id}"
            },
            foursquare: {
                name: "Foursquare",
                icon: "foursquare",
                color: "F94877",
                url: "https://foursquare.com/${id}"
            },
            github: {
                name: "GitHub",
                icon: "github",
                color: "2A2A2A",
                url: "https://github.com/${id}"
            },
            instagram: {
                name: "Instagram",
                icon: "instagram",
                color: "E4405F",
                url: "https://www.instagram.com/${id}"
            },
            linkedin: {
                name: "LinkedIn",
                icon: "linkedin",
                color: "007BB5",
                url: "https://www.linkedin.com/in/${id}"
            },
            linkedin_company: {
                name: "LinkedIn",
                icon: "linkedin",
                color: "007BB5",
                url: "https://www.linkedin.com/company/${id}"
            },
            medium: {
                name: "Medium",
                icon: "medium",
                color: "2A2A2A",
                url: "https://medium.com/@${id}"
            },
            pinterest: {
                name: "Pinterest",
                icon: "pinterest",
                color: "BD081C",
                url: "https://www.pinterest.com/${id}"
            },
            snapchat: {
                name: "Snapchat",
                icon: "snapchat",
                color: "2A2A2A",
                url: "https://www.snapchat.com/add/${id}"
            },
            tumblr: {
                name: "Tumblr",
                icon: "tumblr",
                color: "35465C",
                url: "http://${id}.tumblr.com"
            },
            twitter: {
                name: "Twitter",
                icon: "twitter",
                color: "55ACEE",
                url: "https://twitter.com/${id}"
            },
            vimeo: {
                name: "Vimeo",
                icon: "vimeo",
                color: "1AB7EA",
                url: "https://vimeo.com/${id}"
            },
            youtube: {
                name: "YouTube",
                icon: "youtube",
                color: "FF0000",
                url: "https://www.youtube.com/user/${id}"
            },
            youtube_channel: {
                name: "YouTube Channel",
                icon: "youtube",
                color: "FF0000",
                url: "https://www.youtube.com/channel/${id}"
            }
        }, s = ["facebook_like", "twitter_tweet", "pinterest_pin", "linkedin_share"], c = a2a.counters.avail, u = function(e, a) {
            if (e && !a2a.in_array(e, s))
                for (var t = 0, n = a ? a2a[d].services : a2a.services, i = n.length; t < i; t++)
                    if (e == n[t][1])
                        return [n[t][0], n[t][2], n[t][3], n[t][4], n[t][5]];
            return !a && [e, e]
        }, p = function(e, a) {
            for (var t, n = 0, i = e.attributes.length, o = a; n < i; n++)
                (t = e.attributes[n]).name && "data-" == t.name.substr(0, 5) && (o[t.name.substr(5)] = t.value);
            return o
        }, m = function() {
            E = o.linkurl = a2a.getData(h)["a2a-url"] || E,
            S = o.linkname = a2a.getData(h)["a2a-title"] || S,
            B = o.linkmedia = a2a.getData(h)["a2a-media"] || B,
            a2a.linker(this)
        }, f = function(e, a, t) {
            var n = {
                node: a,
                service: e,
                title: S,
                url: E,
                media: B,
                mediaNode: h.a2a_mediaNode
            }
              , i = a2a.cbs("share", n);
            void 0 !== i && (i.url && (o.linkurl = i.url,
            o.linkurl_implicit = !1),
            i.title && (o.linkname = i.title,
            o.linkname_implicit = !1),
            i.media && (o.linkmedia = i.media),
            a2a.linker(a),
            i.stop && t && a2a.preventDefault(t))
        }, _ = a2a.c.templates, g = a2a.in_array, h = o.node, v = a2a.getData(h), y = h.className, k = h.a2a_follow, w = a2a.HTMLcollToArray(h.getElementsByTagName("a")), b = w.length, x = document.createElement("div"), A = encodeURIComponent, E = o.linkurl, C = A(o.linkurl).replace(/'/g, "%27"), S = o.linkname, B = (A(o.linkname).replace(/'/g, "%27"),
        o.linkmedia), T = (B && A(o.linkmedia).replace(/'/g, "%27"),
        v["a2a-icon-color"] || a2a.c.icon_color), F = T ? T.split(",", 2) : T, L = F ? F[0] : F, N = F ? F[1] : F, z = y.match(/a2a_kit_size_([\w\.]+)(?:\s|$)/), D = z ? z[1] : "16", I = D + "px", M = "a2a_svg a2a_s__default a2a_s_", j = {}, P = {}, O = o.linkurl_implicit && a2a.canonical_url ? encodeURIComponent(a2a.canonical_url).replace(/'/g, "%27") : C, H = v["a2a-scroll-show"], R = 0 <= y.indexOf("a2a_vertical_style");
        D && !isNaN(D) && (a2a.svg.load(),
        T && "unset" != T && a2a.svg.works() && (L && "unset" != L && (j.backgroundColor = L),
        N && "unset" != N.trim() && (N = N.trim())),
        h.style.lineHeight = P.height = P.lineHeight = I,
        P.width = 2 * D + "px",
        P.fontSize = "16px",
        R && (P.height = P.lineHeight = D / 2 + "px",
        P.fontSize = "10px",
        P.width = D + "px"),
        H && a2a.scrollToggle(h, H),
        32 != D && (j.backgroundSize = j.height = j.lineHeight = j.width = I,
        P.borderRadius = j.borderRadius = (.14 * D).toFixed() + "px",
        P.fontSize = (parseInt(P.height, 10) + (R ? 4 : 0)) / 2 + "px")),
        a2a.kit.facebook_like = function() {
            pe.href = E,
            pe.width = "90",
            pe.layout = "button_count",
            pe.ref = "addtoany",
            pe = p(V, pe),
            V.style.width = pe.width + "px";
            var e, a, t, n, i = a2a.i18n();
            for (var o in 2 == (i = i ? i.replace(/-/, "_") : "en_US").length && (i += "_" + i.toUpperCase()),
            pe)
                ue += " data-" + o + '="' + pe[o] + '"';
            window.fbAsyncInit || (window.fbAsyncInit = function() {
                FB.init({
                    appId: "0",
                    status: !1,
                    xfbml: !0,
                    version: "v3.1"
                }),
                FB.Event.subscribe("edge.create", function(e, a) {
                    a2a.GA.track("Facebook Like", "facebook_like", e, "pages", "AddToAny Share/Save Button"),
                    f("Facebook Like", V)
                })
            }
            ,
            (U = document.createElement("span")).id = "fb-root",
            document.body.insertBefore(U, document.body.firstChild)),
            a2a.kit.facebook_like_script || (e = document,
            a = "facebook-jssdk",
            n = e.getElementsByTagName("script")[0],
            e.getElementById(a) || ((t = e.createElement("script")).id = a,
            t.src = "https://connect.facebook.net/" + i + "/sdk.js#xfbml=1&version=v3.1",
            n.parentNode.insertBefore(t, n))),
            a2a.kit.facebook_like_script = 1,
            V.innerHTML = '<div class="fb-like"' + ue + "></div>";
            try {
                FB.XFBML.parse(V)
            } catch (l) {}
        }
        ,
        a2a.kit.twitter_tweet = function() {
            pe.url = E,
            pe.lang = a2a.i18n() || "en",
            pe.related = "AddToAny,micropat";
            var e = _.twitter
              , a = "string" == typeof e ? e.lastIndexOf("@") : null;
            a && -1 !== a && (a++,
            a = (a = e.substr(a).split(" ", 1))[0].replace(/:/g, "").replace(/\//g, "").replace(/-/g, "").replace(/\./g, "").replace(/,/g, "").replace(/;/g, "").replace(/!/g, ""),
            pe.related = a + ",AddToAny"),
            pe = p(V, pe);
            var t, n, i, o, l, r = document.createElement("a");
            for (var s in r.className = "twitter-share-button",
            pe)
                r.setAttribute("data-" + s, pe[s]);
            V.appendChild(r),
            a2a.kit.twitter_tweet_script || (t = document,
            n = "twitter-wjs",
            l = t.getElementsByTagName("script")[0],
            t.getElementById(n) || ((o = t.createElement("script")).id = n,
            o.src = "https://platform.twitter.com/widgets.js",
            l.parentNode.insertBefore(o, l),
            window.twttr = window.twttr || (i = {
                _e: [],
                ready: function(e) {
                    i._e.push(e)
                }
            }))),
            a2a.kit.twitter_tweet_script = 1;
            try {
                twttr.ready(function(e) {
                    a2a.twitter_bind || (e.events.bind("click", function(l) {
                        if (l && "tweet" == l.region) {
                            var e = function() {
                                var e = l.target.src.split("#")[1] || "";
                                if (e && -1 < e.indexOf("url=")) {
                                    for (var a = {}, t = e.split("&"), n = t.length, i = 0; i < n; i++) {
                                        var o = t[i].split("=");
                                        a[o[0]] = o[1]
                                    }
                                    return a
                                }
                                return !1
                            }();
                            e && e.url && (a2a.GA.track("Twitter Tweet", "twitter_tweet", unescape(e.url), "pages", "AddToAny Share/Save Button"),
                            f("Twitter Tweet", V))
                        }
                    }),
                    a2a.twitter_bind = 1),
                    e.widgets && e.widgets.load()
                })
            } catch (c) {}
        }
        ,
        a2a.kit.pinterest_pin = function() {
            pe["pin-config"] = "beside",
            pe["pin-do"] = "buttonPin",
            pe.media = B,
            pe.url = E,
            pe = p(V, pe);
            var e, a, t, n = document.createElement("a");
            for (var i in pe)
                n.setAttribute("data-" + i, pe[i]);
            "beside" == pe["pin-config"] && "buttonPin" == pe["pin-do"] && (V.style.width = "76px"),
            n.href = "https://www.pinterest.com/pin/create/button/?url=" + pe.url + (pe.media ? "&media=" + pe.media : "") + (pe.description ? "&description=" + encodeURIComponent(pe.description).replace(/'/g, "%27") : ""),
            a2a.add_event(V, "click", function() {
                a2a.GA.track("Pinterest Pin", "pinterest_pin", E, "pages", "AddToAny Share/Save Button"),
                f("Pinterest Pin", V)
            }),
            V.appendChild(n),
            a2a.kit.pinterest_pin_script || (e = document,
            a = e.createElement("script"),
            t = e.getElementsByTagName("script")[0],
            a.type = "text/javascript",
            a.async = !0,
            a.src = "https://assets.pinterest.com/js/pinit.js",
            t.parentNode.insertBefore(a, t)),
            a2a.kit.pinterest_pin_script = 1
        }
        ,
        a2a.kit.linkedin_share = function() {
            for (var e in pe.onsuccess = "a2a.kit.linkedin_share_event",
            pe.url = E,
            pe = p(V, pe))
                ue += " data-" + e + '="' + pe[e] + '"';
            var a, t, n;
            a2a.kit.linkedin_share_event = function() {
                a2a.GA.track("LinkedIn Share", "linkedin_share", E, "pages", "AddToAny Share/Save Button"),
                f("LinkedIn Share", V)
            }
            ,
            a2a.kit.linkedin_share_script || (a = document,
            t = a.createElement("script"),
            n = a.getElementsByTagName("script")[0],
            t.type = "text/javascript",
            t.async = !0,
            t.src = "https://platform.linkedin.com/in.js",
            n.parentNode.insertBefore(t, n)),
            a2a.kit.linkedin_share_script = 1,
            V.innerHTML = '<script type="IN/Share"' + ue + "><\/script>"
        }
        ;
        for (var $ = 0; $ < b; $++) {
            var U, W, q, G, V = w[$], Y = V.className, K = Y.match(/a2a_button_([\w\.]+)(?:\s|$)/), J = 0 <= Y.indexOf("a2a_dd"), X = 0 <= Y.indexOf("a2a_counter"), Q = !!K && K[1], Z = V.childNodes, ee = u(Q), ae = k && r[Q] ? r[Q].name : ee[0], te = " noopener", ne = "_blank", ie = k && r[Q] ? r[Q].icon : ee[1], oe = k && r[Q] ? r[Q].color : ee[2] || "CAE0FF", le = ee[3] || {}, re = le.type, se = ee[4], ce = !1, de = !1, ue = "", pe = {};
            if (J)
                e.target = V,
                a2a.init(d, e),
                oe = "0166FF",
                ie = Q = "a2a",
                de = X && 1;
            else if ("feed" == Q || "print" == Q)
                te = ne = "";
            else if (X && Q && g(Q, c))
                de = 1;
            else if (Q && g(Q, s)) {
                if ("1" === navigator.doNotTrack || "1" === window.doNotTrack)
                    continue;
                a2a.kit[Q](),
                ce = 1
            }
            if (Q && !g(Q, ["google_plus", "stumbleupon"]) && !ce) {
                if (J || (V.target = ne,
                !k || !r[Q] && u(Q, !0) ? "feed" == Q ? V.href = V.href || o.linkurl : (V.href = "/#" + Q,
                "js" === re ? a2a.add_event(V, "click", m) : (a2a.add_event(V, "mousedown", m),
                a2a.add_event(V, "keydown", m)),
                V.rel = "nofollow" + te) : V.href = (t = Q,
                l = n = void 0,
                i = p(a = V, {})["a2a-follow"],
                l = r[t],
                i && l && (n = l.url.replace("${id}", i)),
                n || a.href),
                V.a2a = {},
                V.a2a.customserviceuri = se,
                V.a2a.stype = re,
                V.a2a.linkurl = o.linkurl,
                V.a2a.servicename = ae,
                V.a2a.safename = Q,
                le.src && (V.a2a.js_src = le.src),
                le.url && (V.a2a.url = le.url),
                le.pu && (V.a2a.popup = 1),
                le.media && (V.a2a.media = 1),
                h.a2a_codes = h.a2a_codes || [],
                h.a2a_codes.push(Q),
                k || a2a.add_event(V, "click", function(o, l, r, s, c) {
                    return function(e) {
                        var a = "js" === c.a2a.stype
                          , t = c.a2a.js_skip
                          , n = screen.height
                          , i = "event=service_click&url=" + A(location.href) + "&title=" + A(document.title || "") + "&ev_service=" + A(o) + "&ev_service_type=kit&ev_menu_type=" + d + "&ev_url=" + A(r) + "&ev_title=" + A(s).replace(/'/g, "%27");
                        f(l, c, e),
                        "feed" == d || c.a2a.url || c.a2a.js_src || a2a.postClick(h),
                        !c.a2a.popup || a2a.defaultPrevented(e) || a || (a2a.preventDefault(e),
                        window.open(c.href, "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + (450 < n ? Math.round(n / 2 - 225) : 40) + ",left=" + Math.round(screen.width / 2 - 275))),
                        a && !t && a2a.preventDefault(e),
                        t && delete c.a2a.js_skip,
                        a2a.util_frame_post(d, i),
                        a2a.GA.track(l, o, r, "pages", "AddToAny Share/Save Button")
                    }
                }(Q, ae, E, S, V))),
                Z.length) {
                    for (var me, fe, _e, ge = 0, he = Z.length; ge < he; ge++)
                        if (_e = (fe = "string" == typeof (me = Z[ge].className)) && ("a2a_label" === me || 0 <= me.indexOf("a2a_ignore")),
                        1 == Z[ge].nodeType && (_e || (G = !0),
                        fe && 0 <= me.indexOf("a2a_count"))) {
                            q = !0;
                            break
                        }
                    if (!G) {
                        for (var ve in (U = document.createElement("span")).className = M + ie + " a2a_img_text",
                        oe && (U.style.backgroundColor = "#" + oe),
                        "pending" !== (W = a2a.svg.get(ie, U, N)) && (U.innerHTML = W),
                        j)
                            U.style[ve] = j[ve];
                        V.insertBefore(U, Z[0])
                    }
                } else {
                    for (var ve in (U = document.createElement("span")).className = M + ie,
                    oe && (U.style.backgroundColor = "#" + oe),
                    "pending" !== (W = a2a.svg.get(ie, U, N)) && (U.innerHTML = W),
                    j)
                        U.style[ve] = j[ve];
                    V.appendChild(U),
                    (U = document.createElement("span")).className = "a2a_label",
                    U.innerHTML = ae || ("feed" == d ? a2a.c.localize.Subscribe : a2a.c.localize.Share),
                    ae || (U.className += " a2a_localize",
                    U.setAttribute("data-a2a-localize", "inner," + ("feed" == d ? "Subscribe" : "Share"))),
                    V.appendChild(U)
                }
                if (R && D && D < 20 && (de = !1),
                de && !q) {
                    for (var ve in (U = document.createElement("span")).className = "a2a_count",
                    U.a2a = {},
                    U.a2a.kit = h,
                    P)
                        U.style[ve] = P[ve];
                    V.appendChild(U),
                    J ? (U.a2a.is_a2a_dd_counter = 1,
                    h.a2a_dd_counter = U,
                    a2a.counters.get("facebook", U, O)) : a2a.counters.get(Q, U, O)
                }
                "a2a_dd" != Y && a2a.kit_services.push(V)
            }
        }
        0 <= y.indexOf("a2a_default_style") && (x.style.clear = "both",
        h.appendChild(x))
    },
    counters: {
        get: function(n, i, e, a) {
            a2a_config.counts;
            var o, t, l = decodeURIComponent(e), r = a2a.counters.bonus(n, l, e, i.a2a.kit), s = "", c = a2a.counters[n], d = c.api, u = (c.cb,
            i.a2a.is_a2a_dd_counter);
            !a && r && (s = "2",
            a2a.counters.get(n, i, r, !0)),
            "undefined" == typeof (o = c[l] = c[l] || {}).num ? (o.queued = o.queued || [],
            o.queued.push(i),
            c.n = c.n || 0,
            c.n++,
            c["cb" + c.n] = function(e) {
                var a = a2a.counters[n].cb(e, i);
                if (void 0 !== a)
                    for (var t = 0; t < o.queued.length; t++)
                        queued_count_element = o.queued[t],
                        o.num = a,
                        queued_count_element.a2a.is_a2a_dd_counter ? a2a.counters.sum(queued_count_element, a, n + s) : a2a.counters.set(queued_count_element, a, n + s)
            }
            ,
            1 == o.queued.length && (t = d[0] + e + (d[1] || "&callback") + "=a2a.counters." + n + ".cb" + c.n,
            a2a.dom.ready(function() {
                a2a.loadExtScript(t)
            }))) : u ? a2a.counters.sum(i, o.num, n + s) : a2a.counters.set(i, o.num, n + s)
        },
        set: function(e, a, t) {
            var n = a;
            a = "undefined" != typeof e.a2a.last_count ? e.a2a.last_count + a : a,
            e.innerHTML = "<span>" + a2a.counters.format(a) + "</span>",
            "a2a" != t && (e.a2a.last_count = n,
            a2a.counters.sum(e, n, t))
        },
        sum: function(e, a, t) {
            var n = e.a2a.kit
              , i = n.a2a_counts_sum || 0
              , o = n.a2a_counts_summed || [];
            "a2a" != t && -1 === o.indexOf(t) && (i = n.a2a_counts_sum = i + a,
            (o = n.a2a_counts_summed = o || []).push(t)),
            n.a2a_dd_counter && a2a.counters.set(n.a2a_dd_counter, i, "a2a")
        },
        format: function(e) {
            var a = a2a.counters.format
              , t = "localize";
            return a[t] || (a.locale = a2a.i18n(),
            a[t] = function n() {
                return !("object" != typeof Intl || !Intl || "function" != typeof Intl.NumberFormat)
            }() ? function i(e) {
                return e.toLocaleString(a.locale, {
                    maximumFractionDigits: 1
                })
            }
            : function o(e, a) {
                return a && "decimal" === a ? Math.round(10 * e) / 10 : e = (e += "").charAt(0) + "," + e.substring(1)
            }
            ),
            999 < e && (e = e < 1e6 ? 1e4 < e ? a[t](e / 1e3, "decimal") + "k" : a[t](e) : e < 1e9 ? a[t](e / 1e6, "decimal") + "M" : "1B+"),
            e
        },
        bonus: function(e, a, t, n) {
            var i, o, l, r = a2a_config.counts, s = "%3A%2F%2F";
            return r && (r.recover_protocol && "http" === r.recover_protocol && (i = t.replace(/^https%/, "http%"),
            a = decodeURIComponent(i)),
            r.recover_domain && (i = encodeURIComponent(a.replace(/^(https?\:\/\/)(?:[^\/?#]+)([\/?#]|$)/i, "$1" + r.recover_domain + "$2")),
            a = decodeURIComponent(i)),
            r.recover && "function" == typeof r.recover && (l = {
                url: (o = document.createElement("a")).href = a,
                pathParts: o.pathname.split("/"),
                domain: o.hostname,
                protocol: o.protocol,
                kit: n
            },
            i = encodeURIComponent(r.recover(l)))),
            !(!i || i === t || -1 !== ["tumblr"].indexOf(e) && i.split(s).pop() === t.split(s).pop()) && i
        },
        avail: ["facebook", "pinterest", "reddit", "tumblr"],
        facebook: {
            api: ["https://graph.facebook.com/?fields=og_object%7Bengagement%7D&id=", "&callback"],
            cb: function(e, a) {
                return e && e.og_object && e.og_object.engagement && !isNaN(e.og_object.engagement.count) ? e.og_object.engagement.count : 0
            }
        },
        pinterest: {
            api: ["https://widgets.pinterest.com/v1/urls/count.json?url="],
            cb: function(e, a) {
                if (e && !isNaN(e.count))
                    return e.count
            }
        },
        reddit: {
            api: ["https://www.reddit.com/api/info.json?url=", "&jsonp"],
            cb: function(e, a) {
                var t = e.data;
                if (e && t && t.children) {
                    for (var n, i = 0, o = [], l = t.children; i < l.length; i++)
                        (n = l[i].data) && !isNaN(n.ups) && o.push(n.ups);
                    return 0 < o.length ? Math.max.apply(null, o) : 0
                }
            }
        },
        tumblr: {
            api: ["https://api.tumblr.com/v2/share/stats?url="],
            cb: function(e, a) {
                if (e && e.response && !isNaN(e.response.note_count))
                    return e.response.note_count
            }
        }
    },
    overlays: function() {
        var e = a2a.c.overlays || []
          , a = !!a2a.evOpts() && {
            passive: !0
        }
          , t = window
          , n = t.innerWidth
          , i = t.innerHeight
          , y = n && (n < 375 || i < 375) ? 150 : 200
          , k = 200
          , w = location.href
          , b = document.title || w;
        function o(e, a, t, n) {
            var i, o, l, r, s, c, d, u, p, m = function v(e) {
                return e.target ? 3 === e.target.nodeType ? e.target.parentNode : e.target : e.srcElement
            }(e), f = m, _ = 0, g = 0, h = m.longDesc;
            if (a2a.matches(m, n) && "false" !== m.getAttribute("data-a2a-overlay")) {
                if (l = m.width < y || m.height < y,
                r = "naturalWidth"in m && (m.naturalWidth < k || m.naturalHeight < k),
                l || r)
                    return;
                o = a2a.getPos(m),
                a.style.display = "",
                s = a.clientHeight || a.offsetHeight,
                c = a.clientWidth || a.offsetWidth,
                t[0] && ("bottom" === t[0] ? g = m.height - s : "center" === t[0] && (g = x((m.height - s) / 2))),
                t[1] && ("right" === t[1] ? _ = m.width - c : "center" === t[1] && (_ = x((m.width - c) / 2))),
                d = o.left + _,
                u = o.top + g,
                a.style.left = d + "px",
                a.style.top = u + "px",
                a.setAttribute("data-a2a-media", m.src),
                (a.a2a_mediaNode = m).alt ? a.setAttribute("data-a2a-title", m.alt) : a.setAttribute("data-a2a-title", b),
                !h || "#" !== h.substr(0, 1) && "http" !== h.substr(0, 4) ? a.setAttribute("data-a2a-url", w) : (p = "#" === h.substr(0, 1) ? w.split("#")[0] + m.longDesc : h,
                a.setAttribute("data-a2a-url", p))
            } else if ("none" !== a.style.display) {
                for (; (i = f) && "body" !== f.tagName.toLowerCase(); ) {
                    if (i === a)
                        return;
                    f = f.parentNode
                }
                a.style.display = "none"
            }
        }
        for (var l = 0, r = e.length; l < r; l++) {
            var s, c = e[l], d = c.services || ["pinterest", "facebook"], u = "", p = c.html, m = c.position, f = c.style, _ = c.size || 32, g = c.target, x = Math.round;
            if (m = m && 2 < m.length ? m.split(" ") : ["top", "left"],
            f = !f || "horizontal" !== f && "default" !== f ? "vertical" : "default",
            g = g || "img",
            p)
                document.body.insertAdjacentHTML("beforeend", p),
                s = document.body.lastChild;
            else {
                for (var h = 0, v = d.length; h < v; h++) {
                    u += '<a class="a2a_button_' + d[h] + '"></a>'
                }
                (s = document.createElement("div")).className = "a2a_kit a2a_kit_size_" + _ + " a2a_overlay_style a2a_" + f + "_style",
                s.innerHTML = u,
                document.body.insertBefore(s, null)
            }
            s.style.display = "none",
            s.style.position = "absolute",
            s.setAttribute("data-a2a-title", b),
            s.setAttribute("data-a2a-url", w),
            a2a.add_event(document.body, "mouseover", function(a, t, n) {
                return function(e) {
                    o(e, a, t, n)
                }
            }(s, m, g), a)
        }
        a2a.c.overlays = []
    },
    init_show: function() {
        var e = a2a_config
          , a = a2a[a2a.type]
          , t = a2a.show_menu
          , n = a2a.init_show
          , i = a2a.n;
        e.bookmarklet && (a.no_hide = 1,
        a2a.sole_index = i,
        t()),
        e.show_menu && (a.no_hide = 1,
        a2a.sole_index = i,
        t(!1, e.show_menu),
        e.show_menu = !1),
        n.a2a_done = 1
    },
    unindexed: function(o, e) {
        var a = document
          , t = a2a.getByClass
          , n = t("a2a_kit", a)
          , i = a2a.HTMLcollToArray(a.getElementsByName("a2a_dd")).concat(t("a2a_dd", a));
        function l(e) {
            for (var a, t, n = 0, i = e.length; n < i; n++)
                if (("undefined" == typeof (a = e[n]).a2a_index || "" === a.a2a_index) && a.className.indexOf("a2a_target") < 0 && a.parentNode.className.indexOf("a2a_kit") < 0 && (t = o(a)),
                t)
                    return t;
            return null
        }
        if (e)
            return l(n) || l(i);
        l(n.concat(i))
    },
    set_this_index: function(e) {
        var a = a2a.n;
        function t(e) {
            if (!(0 <= e.className.indexOf("a2a_kit")))
                return !1;
            e.a2a_kit = 1,
            0 <= e.className.indexOf("a2a_follow") && (e.a2a_follow = 1)
        }
        return e ? (e.a2a_index = a,
        t(e),
        e) : a2a.unindexed(function(e) {
            return e.a2a_index = a,
            t(e),
            e
        }, !0)
    },
    gEl: function(e) {
        return document.getElementById(e)
    },
    getByClass: function(e, a, t) {
        return document.getElementsByClassName && /\{\s*\[native code\]\s*\}/.test("" + document.getElementsByClassName) ? a2a.getByClass = function(e, a, t) {
            for (var n, i = (a = a || a2a.gEl("a2a" + a2a.type + "_dropdown")).getElementsByClassName(e), o = t ? new RegExp("\\b" + t + "\\b","i") : null, l = [], r = 0, s = i.length; r < s; r += 1)
                n = i[r],
                o && !o.test(n.nodeName) || l.push(n);
            return l
        }
        : document.evaluate ? a2a.getByClass = function(e, a, t) {
            t = t || "*",
            a = a || a2a.gEl("a2a" + a2a.type + "_dropdown");
            for (var n, i, o = e.split(" "), l = "", r = "http://www.w3.org/1999/xhtml", s = document.documentElement.namespaceURI === r ? r : null, c = [], d = 0, u = o.length; d < u; d += 1)
                l += "[contains(concat(' ',@class,' '), ' " + o[d] + " ')]";
            try {
                n = document.evaluate(".//" + t + l, a, s, 0, null)
            } catch (p) {
                n = document.evaluate(".//" + t + l, a, null, 0, null)
            }
            for (; i = n.iterateNext(); )
                c.push(i);
            return c
        }
        : a2a.getByClass = function(e, a, t) {
            t = t || "*",
            a = a || a2a.gEl("a2a" + a2a.type + "_dropdown");
            for (var n, i, o = e.split(" "), l = [], r = "*" === t && a.all ? a.all : a.getElementsByTagName(t), s = [], c = 0, d = o.length; c < d; c += 1)
                l.push(new RegExp("(^|\\s)" + o[c] + "(\\s|$)"));
            for (var u = 0, p = r.length; u < p; u += 1) {
                n = r[u],
                i = !1;
                for (var m = 0, f = l.length; m < f && (i = l[m].test(n.className)); m += 1)
                    ;
                i && s.push(n)
            }
            return s
        }
        ,
        a2a.getByClass(e, a, t)
    },
    HTMLcollToArray: function(e) {
        for (var a = [], t = e.length, n = 0; n < t; n++)
            a[a.length] = e[n];
        return a
    },
    matches: function(e, a) {
        var t, n = "MatchesSelector", i = "ms" + n, o = "webkit" + n;
        if (e.matches)
            t = "matches";
        else if (e[i])
            t = i;
        else {
            if (!e[o])
                return !(a2a.matches = function(e, a) {
                    return !1
                }
                );
            t = o
        }
        return a2a.matches = function(e, a) {
            return e[t](a)
        }
        ,
        a2a.matches(e, a)
    },
    evOpts: function() {
        var e = !1;
        try {
            var a = Object.defineProperty({}, "passive", {
                get: function() {
                    e = !0
                }
            });
            window.addEventListener("test", null, a)
        } catch (t) {}
        return a2a.evOpts = function() {
            return e
        }
        ,
        e
    },
    add_event: function(e, a, t, n) {
        if (e.addEventListener) {
            if ("object" == typeof n) {
                var i = !!n.useCapture;
                n = a2a.evOpts() ? n : i
            }
            return e.addEventListener(a, t, n),
            {
                destroy: function() {
                    e.removeEventListener(a, t, n)
                }
            }
        }
        var o = function() {
            t.call(e, window.event)
        };
        return e.attachEvent("on" + a, o),
        {
            destroy: function() {
                e.detachEvent("on" + a, o)
            }
        }
    },
    stopPropagation: function(e) {
        e || (e = window.event),
        e.cancelBubble = !0,
        e.stopPropagation && e.stopPropagation()
    },
    preventDefault: function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
    defaultPrevented: function(e) {
        return !!(e.defaultPrevented || !1 === e.returnValue || "undefined" == typeof e.defaultPrevented && e.getPreventDefault && e.getPreventDefault())
    },
    onLoad: function(e) {
        var a = window.onload;
        "function" != typeof window.onload ? window.onload = e : window.onload = function() {
            a && a(),
            e()
        }
    },
    in_array: function(e, a, t, n, i) {
        if ("object" == typeof a) {
            e = e.toLowerCase();
            for (var o, l = a.length, r = 0; r < l; r++)
                if (o = n ? a[r][n] : a[r],
                o = i ? o[i] : o,
                t) {
                    if (e == o.toLowerCase())
                        return a[r]
                } else if (-1 != e.indexOf(o.toLowerCase()) && "" !== o)
                    return a[r]
        }
        return !1
    },
    serialize: function(e, a) {
        var t = [];
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var i = a ? a + "[" + n + "]" : n
                  , o = e[n];
                t.push("object" == typeof o ? a2a.serialize(o, i) : encodeURIComponent(i) + "=" + encodeURIComponent(o))
            }
        return t.join("&")
    },
    throttle: function(t, n, i) {
        var o, l, r, s;
        previous = 0,
        i || (i = {});
        var c = Date.now || function() {
            return (new Date).getTime()
        }
          , d = function() {
            previous = !1 === i.leading ? 0 : c(),
            o = null,
            s = t.apply(l, r),
            o || (l = r = null)
        }
          , e = function() {
            var e = c();
            previous || !1 !== i.leading || (previous = e);
            var a = n - (e - previous);
            return l = this,
            r = arguments,
            a <= 0 || n < a ? (o && (clearTimeout(o),
            o = null),
            previous = e,
            s = t.apply(l, r),
            o || (l = r = null)) : o || !1 === i.trailing || (o = setTimeout(d, a)),
            s
        };
        return e.cancel = function() {
            clearTimeout(o),
            previous = 0,
            o = l = r = null
        }
        ,
        e
    },
    scrollToggle: function(e, a) {
        (a = a.split(","))[0] && a[0].trim(),
        a[1] && a[1].trim();
        var n, o = window, t = parseInt(a[0], 10) || 0, i = parseInt(a[1], 10) || 0, l = function(e, a, t) {
            var n = o.pageYOffset
              , i = document.documentElement.scrollHeight - o.innerHeight - n;
            e.style.display = a <= n && t <= i ? "" : "none"
        }
        .bind(null, e, t, i);
        (t || i) && (a2a.scrollToggle.handlers = a2a.scrollToggle.handlers || [],
        (n = a2a.scrollToggle.handlers).push(l),
        n.length < 2 && o.addEventListener("scroll", a2a.throttle(function() {
            for (var e = 0, a = n, t = a.length; e < t; e++)
                a[e]()
        }, 20)),
        l())
    },
    miniLeaveDelay: function() {
        var e = a2a.type
          , a = "a2a" + e
          , t = a2a.gEl;
        a2a.isDisplayed(t(a + "_dropdown")) && "none" === a2a.getStyle(t(a + "_full"), "display") && (a2a[e].out_delay = setTimeout(function() {
            a2a.toggle_dropdown("none", e),
            a2a[e].out_delay = null
        }, 501))
    },
    miniEnterStay: function() {
        a2a.type = a2a["n" + (a2a.sole_index || a2a.n)].type;
        var e = a2a.type;
        a2a[e] && a2a[e].out_delay && clearTimeout(a2a[e].out_delay)
    },
    toggle_dropdown: function(e, a) {
        if ("none" != e || !a2a[a].no_hide) {
            var t = (0,
            a2a.gEl)("a2a" + a + "_dropdown")
              , n = (document.activeElement,
            a2a.show_menu.key_listener);
            t.style.display = e,
            a2a.miniEnterStay(),
            "none" == e && (a2a.show_menu["doc_click_listener_" + a].destroy(),
            delete a2a[a].doc_click_close_mini,
            n && n[a] && n[a].destroy())
        }
    },
    getData: function(e) {
        if (!e)
            return {};
        for (var a, t = 0, n = e.attributes.length, i = {}; t < n; t++)
            (a = e.attributes[t]).name && "data-" == a.name.substr(0, 5) && (i[a.name.substr(5)] = a.value);
        return i
    },
    getStyle: function(e, a) {
        return e ? e.currentStyle ? e.currentStyle[a.replace(/-(\w)/gi, function(e, a) {
            return a.toUpperCase()
        })] : window.getComputedStyle(e, null).getPropertyValue(a) : null
    },
    isDisplayed: function(e) {
        var a = a2a.getStyle(e, "display");
        return !(!a || "none" === a)
    },
    getPos: function(e) {
        var a, t = Math.round;
        return "undefined" == typeof e.getBoundingClientRect ? a2a.getPosOld(e) : {
            left: t((a = e.getBoundingClientRect()).left + a2a.getScrollDocDims("w")),
            top: t(a.top + a2a.getScrollDocDims("h"))
        }
    },
    getPosOld: function(e) {
        for (var a = 0, t = 0; a += e.offsetLeft || 0,
        t += e.offsetTop || 0,
        e = e.offsetParent; )
            ;
        return {
            left: a,
            top: t
        }
    },
    getDocDims: function(e) {
        var a = 0
          , t = 0;
        return "number" == typeof window.innerWidth ? (a = window.innerWidth,
        t = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (a = document.documentElement.clientWidth,
        t = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (a = document.body.clientWidth,
        t = document.body.clientHeight),
        "w" == e ? a : t
    },
    getScrollDocDims: function(e) {
        var a = 0
          , t = 0;
        return "number" == typeof window.pageYOffset ? (a = window.pageXOffset,
        t = window.pageYOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (a = document.body.scrollLeft,
        t = document.body.scrollTop) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (a = document.documentElement.scrollLeft,
        t = document.documentElement.scrollTop),
        "w" == e ? a : t
    },
    show_more_less: function(e) {
        var a = "a2a" + a2a.type;
        (0,
        a2a.gEl)(a + "_show_more_less");
        a2a.show_full()
    },
    focus_find: function() {
        var e = a2a.gEl("a2a" + a2a.type + "_find");
        "none" != e.parentNode.style.display && e.focus()
    },
    default_services: function(e) {
        for (var a = e || a2a.type, t = a2a[a].main_services_col_1, n = t.length, i = 0; i < n; i++)
            t[i].style.display = ""
    },
    do_find: function() {
        var e, a = a2a.type, t = a2a[a].main_services, n = t.length, i = a2a.gEl("a2a" + a + "_find").value, o = a2a.in_array;
        if ("" !== i) {
            e = i.split(" ");
            for (var l = 0; l < n; l++)
                o(t[l].a2a.serviceNameLowerCase, e, !1) ? t[l].style.display = "" : t[l].style.display = "none"
        } else
            a2a.default_services()
    },
    selection: function(e) {
        var a, t, n = document.getElementsByTagName("meta"), i = n.length;
        if (window.getSelection)
            a = window.getSelection() + "";
        else if (document.selection) {
            try {
                a = document.selection.createRange()
            } catch (s) {
                a = ""
            }
            a = a.text ? a.text : ""
        }
        if (a && "" !== a)
            return a;
        if (a2a["n" + a2a.n].linkurl === location.href && -1 === ["facebook", "twitter", "linkedin"].indexOf(e))
            for (var o, l, r = 0; r < i; r++)
                if (o = (o = n[r].getAttribute("name")) ? o.toLowerCase() : "",
                l = (l = n[r].getAttribute("property")) ? l.toLowerCase() : "",
                o && "description" === o || l && "og:description" === l) {
                    t = n[r].getAttribute("content");
                    break
                }
        return t ? t.substring(0, 1200) : ""
    },
    collections: function(e) {
        var a = a2a.gEl
          , t = a2a[e]
          , n = "a2a" + e;
        t.main_services_col_1 = a2a.getByClass("a2a_i", a(n + "_full_services"), "a"),
        t.main_services = t.main_services_col_1,
        t.email_services = a2a.getByClass("a2a_i", a(n + "_2_col1", "a")),
        t.all_services = t.main_services.concat(t.email_services)
    },
    cbs: function(e, a) {
        var t = a2a.c.callbacks || []
          , n = a2a.c.tracking_callback
          , i = {};
        n && (n[e] ? t.push(n) : n[0] == e ? (i[e] = n[1],
        t.push(i)) : "function" == typeof n && (i[e] = n,
        t.push(i)),
        a2a.c.tracking_callback = null);
        for (var o, l = 0, r = t.length; l < r; l++)
            if ("function" == typeof (o = t[l][e]) && (returned = o(a),
            "ready" == e && (o = null),
            "undefined" != typeof returned))
                return returned
    },
    linker: function(e) {
        var a, t, n = location.href, i = document.title || n, o = e.parentNode, l = a2a["n" + (o.a2a_index || o.parentNode.a2a_index || a2a.sole_index || a2a.n)], r = l.type, s = e.a2a.safename, c = l.linkurl_implicit && n != l.linkurl ? n : l.linkurl, d = encodeURIComponent(c).replace(/'/g, "%27"), u = l.linkname_implicit && i != l.linkname ? i : l.linkname, p = encodeURIComponent(u).replace(/'/g, "%27"), m = l.linkmedia, f = !!m && encodeURIComponent(m).replace(/'/g, "%27"), _ = encodeURIComponent(a2a.selection(s)).replace(/'/g, "%27"), g = !l.track_links || "page" != r && "mail" != r ? "" : "&linktrack=" + l.track_links + "&linktrackkey=" + encodeURIComponent(l.track_links_key), h = e.a2a.customserviceuri || !1, v = e.a2a.stype, y = e.a2a.js_src, k = e.a2a.url, w = e.a2a.media, b = a2a.c.templates, x = b[s], A = "email", E = navigator.userAgent, C = -1 != E.indexOf("Safari") && -1 == E.indexOf("Chrome");
        function S(e) {
            return encodeURIComponent(e).replace(/'/g, "%27").replace(/%24%7Blink%7D/g, "${link}").replace(/%24%7Blink_noenc%7D/g, "${link_noenc}").replace(/%24%7Blink_nohttp%7D/g, "${link_nohttp}").replace(/%24%7Bmedia%7D/g, "${media}").replace(/%24%7Btitle%7D/g, "${title}").replace(/%24%7Btitle_noenc%7D/g, "${title_noenc}").replace(/%24%7Bnotes%7D/g, "${notes}")
        }
        if (w && f)
            e.a2a.js_skip = 1;
        else if (v && "js" == v && y)
            e.target = "",
            "javascript:" == y.substr(0, 11) ? (a = y.replace("${link}", c.replace(/'/g, "\\'")),
            (t = document.createElement("script")).textContent = a.substr(11),
            document.head.appendChild(t)) : a2a.loadExtScript(y),
            a = "#" + s;
        else if (k && (s != A || s == A && (a2a.is_mobile || C)) && !g) {
            if (e.target = "",
            "object" == typeof x)
                for (var B in x)
                    k = a2a.urlParam(k, B, S(x[B]));
            else
                "string" == typeof x && (k = a2a.urlParam(k, "text", S(x)));
            a = k.replace(/\$\{link\}/g, d).replace(/\$\{media\}/g, f).replace(/\$\{link_noenc\}/g, c).replace(/\$\{link_nohttp\}/g, c.replace(/^https?:\/\//, "")).replace(/\$\{title\}/g, p)
        } else
            h && "undefined" != h && (a = h.replace(/A2A_LINKNAME_ENC/, p).replace(/A2A_LINKURL_ENC/, d).replace(/A2A_LINKNOTE_ENC/, _));
        return e.href = a || "http" + a2a.c.http_s + "://www.addtoany.com/add_to/" + s + "?linkurl=" + d + "&linkname=" + p + (f ? "&linkmedia=" + f : "") + g + function T() {
            var e = "";
            return x ? e = "&" + a2a.serialize({
                template: x
            }) : b[A] && v && v == A && (e = "&" + a2a.serialize({
                template: b[A]
            })),
            e
        }() + ("feed" == r ? "&type=feed" : "") + "&linknote=" + _,
        !0
    },
    animate: function(e, a, t) {
        if (a) {
            var n = a2a.isDisplayed(a)
              , i = a.classList
              , o = "a2a_starting"
              , l = "transitionend";
            if ("show" === e) {
                if (n)
                    return;
                !function r(e, a) {
                    a && a2a.getStyle(e, "transition-duration") && a.add(o)
                }(a, i),
                a.style.display = "block",
                i && setTimeout(function() {
                    i.remove(o)
                }, 1)
            } else
                i ? n ? (a.addEventListener(l, function s() {
                    a.style.display = "show" === e ? "block" : "none",
                    t && t(),
                    a.removeEventListener(l, s, !1)
                }, !1),
                i.add(o)) : t && t() : t && (a.style.display = "none",
                t())
        }
    },
    overlay: {
        show: function() {
            var e = a2a.gEl
              , n = a2a.type
              , a = "a2a" + n
              , t = e("a2a_overlay")
              , i = e(a + "_find");
            "none" === a2a.getStyle(t, "display") && (a2a.animate("show", t),
            a2a.overlay.key_listener = a2a.add_event(document, "keydown", function(e) {
                var a = (e = e || window.event).which || e.keyCode
                  , t = document.activeElement;
                27 == a && i != t ? a2a.hide_modals(n) : 40 < a && a < 91 && i != t && i.focus()
            }))
        },
        hide: function(e) {
            var a = a2a.gEl("a2a_overlay")
              , t = a2a.overlay
              , n = t.key_listener;
            a2a.animate("hide", a, e),
            n && (n.destroy(),
            setTimeout(function() {
                delete t.key_listener
            }, 1))
        }
    },
    hide_modals: function(e) {
        var a = a2a.gEl
          , t = "a2a" + e
          , n = a(t + "_full")
          , i = a("a2a_overlay")
          , o = a("a2a_modal");
        a2a.show_full.full_shown = !1,
        a2a.animate("hide", o),
        a2a.animate("hide", n),
        a2a.overlay.hide(function l() {
            i.style.display = o.style.display = "none",
            n && (n.style.display = "none"),
            a2a.thanks.showing = !1,
            a2a.isDisplayed(a(t + "_dropdown")) && a(t + "_show_more_less").focus()
        })
    },
    show_modal: function() {
        a2a.type;
        for (var e = a2a.gEl, a = (e("a2a_overlay"),
        e("a2a_modal")), t = a2a.getByClass("a2a_modal_body", a), n = 0; n < t.length; n++)
            t[n].style.display = "none";
        a2a.overlay.show(),
        a2a.animate("show", a)
    },
    show_full: function() {
        var e = "a2a" + a2a.type
          , a = a2a.gEl
          , t = a2a.getByClass
          , n = a(e + "_full")
          , i = t("a2a_full_header", n)[0]
          , o = a(e + "_full_services")
          , l = t("a2a_full_footer", n)[0];
        a2a.overlay.show(),
        a2a.animate("show", n),
        o.style.cssText = "height:calc(10px)",
        o.style.height.length && (o.style.height = "calc(100% - " + (i.offsetHeight + l.offsetHeight) + "px)"),
        a2a.stats("full")
    },
    show_menu: function(e, a) {
        e ? a2a.n = e.a2a_index : a2a.sole_index && (a2a.n = a2a.sole_index);
        var t, n, i, o, l, r, s, c, d, u, p = a2a["n" + a2a.n], m = a2a.type = p.type, f = "a2a" + m, _ = a2a.gEl(f + "_dropdown"), g = a2a.has_touch, h = g ? "touchstart" : "click", v = !(!g || !a2a.evOpts()) && {
            passive: !0
        };
        a2a.gEl(f + "_title").value = p.linkname,
        a2a.toggle_dropdown("block", m),
        t = [_.clientWidth, _.clientHeight],
        n = a2a.getDocDims("w"),
        i = a2a.getDocDims("h"),
        o = a2a.getScrollDocDims("w"),
        l = a2a.getScrollDocDims("h"),
        e ? (d = (r = e.getElementsByTagName("img")[0]) ? (s = a2a.getPos(r),
        c = r.clientWidth,
        r.clientHeight) : (s = a2a.getPos(e),
        c = e.offsetWidth,
        e.offsetHeight),
        s.left - o + t[0] + c > n && (s.left = s.left - t[0] + c - 8),
        ("up" == p.orientation || "down" != p.orientation && s.top - l + t[1] + d > i && s.top > t[1]) && (s.top = s.top - t[1] - d),
        _.style.left = (s.left < 0 ? 0 : s.left) + 2 + "px",
        _.style.top = s.top + d + "px") : (a || (a = {}),
        _.style.position = a.position || "absolute",
        _.style.left = a.left || n / 2 - t[0] / 2 + "px",
        _.style.top = a.top || i / 2 - t[1] / 2 + "px"),
        a2a[m].doc_click_close_mini || a2a[m].no_hide || (a2a[m].doc_click_close_mini = (u = m,
        function(e) {
            !a2a.ieo() && "number" == typeof e.button && 0 < e.button || (a2a[m].last_focus && a2a[m].last_focus.focus(),
            a2a.toggle_dropdown("none", u))
        }
        ),
        a2a.show_menu["doc_click_listener_" + m] = a2a.add_event(document, h, a2a[m].doc_click_close_mini, v)),
        a2a.show_menu.key_listener = a2a.show_menu.key_listener || {},
        a2a.show_menu.key_listener[m] = a2a.add_event(document, "keydown", function(e) {
            27 != ((e = e || window.event).which || e.keyCode) || a2a.overlay.key_listener || a2a.toggle_dropdown("none", m)
        }),
        a2a.svg.load();
        var y = encodeURIComponent
          , k = "event=menu_show&url=" + y(location.href) + "&title=" + y(document.title || "") + "&ev_menu_type=" + m;
        a2a.util_frame_post(m, k)
    },
    bmBrowser: function() {},
    copyLink: function(e) {
        var a = a2a.gEl
          , t = (a2a.getStyle,
        a("a2apage_full"))
          , n = (a("a2a_overlay"),
        a("a2a_modal"))
          , i = a("a2a_copy_link")
          , o = a("a2a_copy_link_copied")
          , l = a("a2a_copy_link_text");
        function r() {
            n.setAttribute("aria-label", "Copy link"),
            l.value = e,
            a2a.show_modal(),
            i.style.display = "block",
            i.focus(),
            a2a.stats("copy")
        }
        a2a.show_full.full_shown = a2a.isDisplayed(t),
        a2a.copyLink.clickListen || (a2a.add_event(l, "click", function(e) {
            l.setSelectionRange ? l.setSelectionRange(0, l.value.length) : l.select(),
            document.execCommand && document.execCommand("copy") && (l.blur(),
            o.style.display = "block",
            setTimeout(function() {
                n.style.display = i.style.display = o.style.display = "none",
                a2a.show_full.full_shown ? a2a.show_full() : a2a.hide_modals("page")
            }, 700))
        }),
        a2a.copyLink.clickListen = 1),
        a2a.show_full.full_shown ? a2a.animate("hide", t, r) : r()
    },
    thanks: {
        off: function() {
            var e = a2a_config.thanks;
            return "boolean" == typeof e && !1 === e || e && "boolean" == typeof e.postShare && !1 === e.postShare
        },
        show: function() {
            var e = a2a.ads
              , a = "a2a" + a2a.type
              , t = a2a.gEl
              , n = a2a.getStyle
              , i = t("a2a_modal")
              , o = t(a + "_full")
              , l = t("a2a_thanks")
              , r = a2a_config.thanks
              , s = a2a.thanks.off();
            function c() {
                i.setAttribute("aria-label", "Thanks for sharing"),
                a2a.show_modal(),
                l.style.display = "inline-block",
                a2a.thanks.showing = !0
            }
            a2a.ads.lit() && r && !s && (e.has(!0) || r.postShare) && !a2a.thanks.showing && "none" === n(i, "display") && (a2a.isDisplayed(o) ? a2a.animate("hide", o, c) : c())
        },
        showing: !1
    },
    postClick: function(e) {
        var a = window
          , m = document
          , t = a2a.thanks
          , n = "blur"
          , i = "focus"
          , o = "waiting";
        a2a.ads;
        function l() {
            a2a.stats("post"),
            a2a.thanks.show(),
            a.removeEventListener(i, l),
            t[o] = 0
        }
        t[o] || (t[o] = 1,
        a.addEventListener(n, function r() {
            a.removeEventListener(n, r),
            a.addEventListener(i, l),
            function p(e) {
                var a, t = a2a.gEl, n = "", i = e ? e.a2a_index : null, o = e ? e.a2a_codes : ["facebook", "twitter", "email"], l = a2a["n" + (i || a2a.n)], r = l.type, s = t("a2a_thanks"), c = "a2a_thanks_kit", d = t(c);
                d || ((d = m.createElement("div")).id = c,
                s.appendChild(d)),
                d.innerHTML = "",
                (a = m.createElement("div")).className = "a2a_kit a2a_kit_size_32 a2a_default_style",
                a.setAttribute("data-a2a-url", l.linkurl),
                a.setAttribute("data-a2a-title", l.linkname),
                l.linkmedia && a.setAttribute("data-a2a-media", l.linkmedia),
                a.style.display = "flex",
                a.style.justifyContent = "center";
                for (var u = 0; u < o.length && u < 8; u++)
                    n += '<a class="a2a_button_' + o[u] + '"></a>';
                a.innerHTML = n,
                d.appendChild(a),
                a2a.init("page", {
                    target: a
                }),
                a2a.type = r
            }(e)
        }))
    },
    loadExtScript: function(e, t, n) {
        var a = document.createElement("script");
        if (a.charset = "UTF-8",
        a.src = e,
        document.body.appendChild(a),
        "function" == typeof t)
            var i = setInterval(function() {
                var e = !1;
                try {
                    e = t.call()
                } catch (a) {}
                e && (clearInterval(i),
                n.call())
            }, 100)
    },
    domEval: function(e, a) {
        var o = /^$|^module$|\/(?:java|ecma)script/i;
        function l() {
            var e = document.createEvent("Event");
            e.initEvent("DOMContentLoaded", !0, !0),
            document.dispatchEvent(e)
        }
        a.innerHTML = e,
        function r(e) {
            var t, a = e.querySelectorAll("script"), n = [];
            [].forEach.call(a, function(a) {
                (t = a.getAttribute("type")) && !o.test(t) || n.push(function(e) {
                    !function n(e, a) {
                        var t = document.createElement("script");
                        e.src ? (t.onload = a,
                        t.onerror = a,
                        t.src = e.src) : t.textContent = e.innerText,
                        document.head.appendChild(t),
                        e.src || a()
                    }(a, e)
                })
            }),
            n.length && function i(e, a, t) {
                void 0 === t && (t = 0),
                e[t](function() {
                    ++t === e.length ? a() : i(e, a, t)
                })
            }(n, l)
        }(a)
    },
    ads: {
        lit: function() {
            var e = a2a_config.thanks;
            return !((a2a.gEl("wpadminbar") || "undefined" != typeof wp && wp.customize) && (!e || !e.postShare))
        },
        has: function(e) {
            var a = {}
              , t = !1
              , n = window;
            return ("object" == typeof adsbygoogle && adsbygoogle.loaded || "object" == typeof google_ad_modifications) && (a.as = t = !0),
            "object" == typeof googletag && googletag.slots && "function" == typeof Object.keys && 0 < Object.keys(googletag.slots).length && (a.dc = t = !0),
            n.vglnk && n.vglnk.key && (a.vl = t = !0),
            n.__SKIM_JS_GLOBAL__ && (a.sl = t = !0),
            (n.amazon_ad_tag || n.amzn_assoc_ad) && (a.az = t = !0),
            !(e && !a.as && !a.dc) && (t ? a : void 0)
        },
        set: function(e) {
            var i = a2a.gEl
              , o = (a2a.type,
            "a2a_thanks_a2a_ad")
              , a = "a2a_thanks_pub_ad"
              , l = i(o)
              , r = i(a)
              , s = i("a2a_thanks")
              , t = a2a_config.thanks
              , n = "boolean" == typeof t && !1 === t || t && "boolean" == typeof t.postShare && !1 === t.postShare || t && "boolean" == typeof t.ad && !1 === t.ad
              , c = t && "undefined" != typeof t.ad && !1 !== t.ad;
            function d() {
                var e = window.innerHeight
                  , a = e < 460
                  , t = Math.max(.5, (e / 600).toFixed(1))
                  , n = Math.floor(250 * (t - 1) / 2);
                l.style.marginTop = e < 360 ? "25px" : "45px",
                l.style.transform = a ? "translateY(" + n + "px) scale(" + t + ")" : "none"
            }
            (a2a.ads.lit() && a2a.ads.has(!0) && !n || c) && (t && "string" == typeof t.ad && t.ad && .5 <= Math.random() ? function u() {
                if (l && (l.style.display = "none"),
                !r) {
                    var e = document.createElement("div");
                    e.id = a,
                    e.style = "margin:45px auto 0;",
                    s.appendChild(e),
                    a2a.domEval(t.ad, e)
                }
            }() : e && function p() {
                var e, a = encodeURIComponent(location.href), t = "width:300px;height:250px;";
                r && (r.style.display = "none"),
                l ? window.postMessage && i("a2a_thanks_ifr").contentWindow.postMessage("a2a_refresh_slot1", "*") : (function n() {
                    if (window.postMessage)
                        var t = a2a.add_event(window, "message", function(e) {
                            if (".a2a.me" === e.origin.substr(-7)) {
                                var a = e.data;
                                a && "a2a_display_slot1" === a && (l.style.display = "",
                                t.destroy())
                            }
                        });
                    else
                        l.style.display = ""
                }(),
                (e = document.createElement("iframe")).id = "a2a_thanks_ifr",
                e.title = "Post-Share Container",
                e.setAttribute("transparency", "true"),
                e.setAttribute("allowTransparency", "true"),
                e.setAttribute("frameBorder", "0"),
                e.src = "https://www.a2a.me/html/tag.html#url=" + a,
                (l = document.createElement("div")).id = o,
                l.insertBefore(e, null),
                e.style = t,
                l.style = t + "display:none;border-radius:6px;margin:45px auto 0;overflow:hidden;",
                s.appendChild(l),
                d(),
                a2a.add_event(window, "resize", d))
            }())
        }
    },
    stats: function(a) {
        if (a2a.stats.a2a = a2a.stats.a2a || {},
        !a2a.stats.a2a[a]) {
            var e, t, n, i, o, l, r = "&domain=" + encodeURIComponent(location.href.split("/")[2]), s = a2a.ads, c = s.has();
            e = c && c.as ? "&as=1" : "",
            t = c && c.dc ? "&dc=1" : "",
            c && c.vl ? "&vl=1" : "",
            n = c && c.sl ? "&sl=1" : "",
            i = c && c.az ? "&az=1" : "",
            o = c ? "&ad=1" : "",
            (l = new XMLHttpRequest).open("POST", "https://stats.addtoany.com/menu"),
            l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            l.timeout = 3e3,
            l.ontimeout = function(e) {
                l.abort(),
                "post" === a && s.set()
            }
            ,
            "post" === a && (l.onload = function(e) {
                var a = this.responseText;
                200 === this.status && a && "1" === a ? s.set(!0) : s.set()
            }
            ),
            l.send("view=" + a + r + o + e + t + n + i),
            a2a.stats.a2a[a] = 1
        }
    },
    track: function(e) {
        var a = new Image(1,1);
        a.src = e,
        a.width = 1,
        a.height = 1
    },
    GA: function() {
        var l = window
          , c = a2a.type
          , d = "feed"
          , e = function() {}
          , a = function() {
            if ("function" == typeof urchinTracker)
                a2a.GA.track = function(e, a, t, n, i) {
                    urchinTracker("/addtoany.com/" + n),
                    urchinTracker("/addtoany.com/" + n + "/" + (t || a2a["n" + a2a.n].linkurl)),
                    urchinTracker("/addtoany.com/services/" + a)
                }
                ;
            else if ("object" == typeof pageTracker && "object" == typeof _gat)
                a2a.GA.track = function(e, a, t, n, i) {
                    c != d && (_gat._anonymizeIp(),
                    _gat._forceSSL(),
                    pageTracker._trackSocial("AddToAny", e, t || a2a["n" + a2a.n].linkurl))
                }
                ;
            else if ("object" == typeof _gaq)
                a2a.GA.track = function(e, a, t, n, i) {
                    c != d && (_gaq.push(["_gat._anonymizeIp"]),
                    _gaq.push(["_gat._forceSSL"]),
                    _gaq.push(["_trackSocial", "AddToAny", e, t || a2a["n" + a2a.n].linkurl]))
                }
                ;
            else if ("string" == typeof GoogleAnalyticsObject && "object" != typeof dataLayer)
                a2a.GA.track = function(e, a, t, n, i) {
                    if (c != d) {
                        var o = t || a2a["n" + a2a.n].linkurl;
                        l[GoogleAnalyticsObject]("send", "social", {
                            anonymizeIp: !0,
                            forceSSL: !0,
                            socialNetwork: "AddToAny",
                            socialAction: e,
                            socialTarget: o,
                            page: o
                        })
                    }
                }
                ;
            else {
                if ("object" != typeof dataLayer)
                    return;
                a2a.GA.track = function(e, a, t, n, i) {
                    if (c != d) {
                        var o = t || a2a["n" + a2a.n].linkurl
                          , l = a2a.c.callbacks;
                        !function r() {
                            dataLayer.push(arguments)
                        }("event", e, {
                            anonymize_ip: !0,
                            event_category: "AddToAny",
                            event_label: o
                        }),
                        l && l.length && "function" == typeof l.some && l.some(function s(e) {
                            var a = e.share;
                            return !!a && /dataLayer[^]+AddToAnyShare[^]+socialAction/.test(a.toString())
                        }) || dataLayer.push({
                            event: "AddToAnyShare",
                            socialNetwork: "AddToAny",
                            socialAction: e,
                            socialTarget: o
                        })
                    }
                }
            }
        };
        a2a.GA.track = e,
        a(),
        a2a.GA.track === e && a2a.onLoad(a)
    },
    add_services: function() {
        var e, a = a2a.type, t = a2a.gEl, n = parseInt(a2a[a].num_services), i = t("a2a" + a + "_full_services"), o = t("a2a" + a + "_mini_services");
        if (a2a[a].custom_services) {
            var l = (d = a2a[a].custom_services).length
              , r = a2a.make_service;
            d.reverse();
            for (var s, c = 0; c < l; c++)
                d[c] && (1,
                s = r(d[c][0], d[c][0].replace(/ /g, "_"), !1, null, {}, d[c][1], d[c][2]),
                i.insertBefore(s, i.firstChild),
                s = r(d[c][0], d[c][0].replace(/ /g, "_"), !1, null, {}, d[c][1], d[c][2]),
                o.insertBefore(s, o.firstChild))
        }
        if ("page" == a && a2a.c.add_services) {
            l = (d = a2a.c.add_services).length,
            r = a2a.make_service;
            var d, u = a2a.c.http_s;
            for (c = 0; c < l; c++)
                d[c] && (1,
                u && (d[c].icon = !1),
                s = r(d[c].name, d[c].safe_name, !1, null, {}, !1, d[c].icon),
                i.insertBefore(s, i.firstChild),
                s = r(d[c].name, d[c].safe_name, !1, null, {}, !1, d[c].icon),
                o.insertBefore(s, o.firstChild))
        }
        if ((e = a2a.getByClass("a2a_i", o, "a")).length > n) {
            c = 0;
            for (var p = e.length; c < p - n; c++)
                o.removeChild(o.lastChild)
        }
    },
    util_frame_make: function(e) {
        var a = document.createElement("iframe")
          , t = document.createElement("div")
          , n = encodeURIComponent
          , i = document.referrer ? n(document.referrer) : ""
          , o = n(location.href)
          , l = (n(document.title || ""),
        navigator.browserLanguage || navigator.language,
        a2a.c.no_3p ? "&no_3p=1" : "");
        a.id = "a2a" + e + "_sm_ifr",
        a.width = a.height = 1,
        a.style.width = a.style.height = t.style.width = t.style.height = "1px",
        a.style.top = a.style.left = a.frameborder = a.style.border = 0,
        a.style.position = t.style.position = "absolute",
        a.style.zIndex = t.style.zIndex = 1e5,
        a.title = "AddToAny Utility Frame",
        a.setAttribute("transparency", "true"),
        a.setAttribute("allowTransparency", "true"),
        a.setAttribute("frameBorder", "0"),
        a.src = "https://static.addtoany.com/menu/sm.22.html#type=" + e + "&event=load&url=" + o + "&referrer=" + i + l,
        t.style.top = "0",
        t.style.visibility = "hidden",
        a2a.gEl("a2a" + e + "_dropdown").parentNode.insertBefore(t, null),
        t.insertBefore(a, null)
    },
    util_frame_listen: function(e) {
        a2a.util_frame_make(e),
        window.postMessage && !a2a[e].message_event && (a2a.add_event(window, "message", function(e) {
            if (".addtoany.com" === e.origin.substr(-13)) {
                var a = "string" == typeof e.data ? e.data.split("=") : [""]
                  , t = a[0].substr(4)
                  , n = a[1]
                  , i = t.substr(0, 4);
                if (a2a.c.http_s = "s",
                -1 === ["page", "feed", "mail"].indexOf(i))
                    return;
                t == i + "_services" && (n = "" != n && n.split(","),
                a2a.top_services(n, i, " a2a_sss"),
                a2a.collections(i),
                a2a.default_services(i)),
                a2a.gEl("a2a" + i + "_sm_ifr").style.display = "none"
            }
        }),
        a2a[e].message_event = 1)
    },
    util_frame_post: function(e, a) {
        window.postMessage && a2a.gEl("a2a" + e + "_sm_ifr").contentWindow.postMessage(a, "*")
    },
    urlParam: function(e, a, t) {
        var n, i, o = new RegExp("[?&]" + a.replace(/[.\\+*?\[\^\]$(){}=!<>|:\-]/g, "\\$&") + "=([^&#]*)","i"), l = o.exec(e);
        null === l ? i = e + (n = /\?/.test(e) ? "&" : "?") + a + "=" + t : (n = l[0].charAt(0),
        i = e.replace(o, n + a + "=" + t));
        return i
    },
    fix_icons: function() {
        var e = a2a.ieo();
        if (e && e < 9) {
            var a = (a = a2a.getByClass("a2a_s_a2a", document))[0]
              , t = a2a.fix_icons.tryNum || 0;
            if (a && !a.a2aFixed && !a.currentStyle.backgroundImage.split('"')[1] && t < 999)
                return a2a.fix_icons.tryNum = t + 1,
                setTimeout(a2a.fix_icons, 99);
            for (var n, i, o, l, r = 0, s = a2a.getByClass("a2a_svg", document), c = s.length; r < c; r++)
                i = (n = (l = s[r]).currentStyle).backgroundImage.split('"')[1],
                !l.a2aFixed && i && ((o = new Image).style.backgroundColor = n.backgroundColor,
                o.style.border = 0,
                o.style.height = n.height,
                o.style.width = n.width,
                o.src = i,
                l.style.background = "none",
                l.insertBefore(o, l.firstChild)),
                l.a2aFixed = 1
        } else
            fix_icons = function() {}
    },
    arrange_services: function() {
        var e = a2a.type
          , a = a2a.c.prioritize;
        a && a2a.top_services(a, e),
        a2a.add_services()
    },
    top_services: function(e, a, t) {
        var n = a || a2a.type
          , i = a2a.in_array
          , o = a2a.make_service
          , l = parseInt(a2a[n].num_services)
          , r = a2a.gEl("a2a" + n + "_full_services")
          , s = a2a.gEl("a2a" + n + "_mini_services")
          , c = a2a.getByClass("a2a_i", r, "a")
          , d = a2a.getByClass("a2a_i", s, "a")
          , u = [];
        if (e) {
            var p = e.length - 1;
            for (t = t; -1 < p; p--) {
                var m = i(e[p], c, !0, "a2a", "safename");
                m && (t && (m.className = m.className + t),
                r.insertBefore(m, r.firstChild),
                u.push(m))
            }
            if (0 < u.length) {
                var f, _, g;
                for (p = 0,
                t = t; p < u.length; p++)
                    g = (f = i(u[p].a2a.safename, d, !0, "a2a", "safename")) ? f : o((_ = u[p].a2a).servicename, _.safename, _.serviceIcon, _.serviceColor, {
                        src: _.js_src,
                        url: _.url,
                        type: _.serviceType,
                        pu: _.popup,
                        media: _.media
                    }),
                    t && (g.className = g.className + t),
                    s.insertBefore(g, s.firstChild);
                if ((d = a2a.getByClass("a2a_i", s, "a")).length > l) {
                    p = 0;
                    for (var h = d.length; p < h - l; p++)
                        s.removeChild(s.lastChild)
                }
            }
        }
    },
    css: function() {
        var e, a, t = a2a.type, n = a2a.c, i = n.css = document.createElement("style"), o = n.color_main || "EEE", l = n.color_bg || "FFF", r = n.color_border || "CCC", s = n.color_link_text || "0166FF", c = n.color_link_text_hover || "2A2A2A", d = (n.color_link_text_hover,
        n.color_link_text || "2A2A2A"), u = (o.toLowerCase(),
        n.color_link_text || "2A2A2A"), p = n.color_border || r, m = ".a2a_", f = m + "menu", _ = "border", g = "background-color:", h = "color:", v = "margin:", y = "padding:";
        e = f + "," + f + " *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;float:none;" + v + "0;" + y + "0;position:static;height:auto;width:auto}" + f + "{" + _ + "-radius:6px;display:none;direction:ltr;background:#" + l + ';font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;' + h + "#000;line-height:12px;" + _ + ":1px solid #" + r + ";vertical-align:baseline;outline:0;overflow:hidden}" + m + "mini{min-width:200px;position:absolute;width:300px;z-index:9999997}" + m + 'overlay{display:none;background:#616c7d;_height:expression( ((e=document.documentElement.clientHeight)?e:document.body.clientHeight)+"px" );_width:expression( ((e=document.documentElement.clientWidth)?e:document.body.clientWidth)+"px" );filter:alpha(opacity=90);opacity:.92;backdrop-filter:blur(8px);position:fixed;_position:absolute;top:0;right:0;left:0;bottom:0;z-index:9999998;-webkit-tap-highlight-' + h + "rgba(0,0,0,0);transition:opacity .14s,backdrop-filter .14s}" + m + "full{background:#" + l + ";" + _ + ":1px solid #" + l + ';height:auto;height:calc(320px);top:15%;_top:expression(40+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+"px");left:50%;margin-left:-320px;position:fixed;_position:absolute;text-align:center;width:640px;z-index:9999999;transition:transform .14s,opacity .14s}' + m + "full_footer," + m + "full_header," + m + "full_services{" + _ + ":0;" + v + "0;" + y + "12px;box-sizing:" + _ + "-box}" + m + "full_header{padding-bottom:8px}" + m + "full_services{height:280px;overflow-y:scroll;" + y + "0 12px;-webkit-overflow-scrolling:touch}" + m + "full_services " + m + "i{display:inline-block;float:none;width:181px;width:calc(33.334% - 18px)}div" + m + "full_footer{font-size:12px;text-align:center;" + y + "8px 14px}div" + m + "full_footer a,div" + m + "full_footer a:visited{display:inline;font-size:12px;line-height:14px;" + y + "8px 14px}div" + m + "full_footer a:focus,div" + m + "full_footer a:hover{background:0 0;" + _ + ":0;" + h + "#" + s + "}div" + m + "full_footer a span" + m + "s_a2a,div" + m + "full_footer a span" + m + "w_a2a{background-size:14px;" + _ + "-radius:3px;display:inline-block;height:14px;line-height:14px;" + v + "0 3px 0 0;vertical-align:top;*vertical-align:middle;width:14px}" + m + 'modal{height:0;left:50%;margin-left:-320px;position:fixed;_position:absolute;text-align:center;top:15%;_top:expression(40+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+"px");width:640px;z-index:9999999;transition:transform .14s,opacity .14s;-webkit-tap-highlight-' + h + "rgba(0,0,0,0)}" + m + "modal_body{background:0 0;" + _ + ':0;font:24px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;position:relative;height:auto;width:auto}' + m + "thanks{" + h + "#fff;height:auto;margin-top:20px;width:auto}" + m + "thanks>div:first-child{" + v + "0 0 40px 0}" + m + "thanks div *{height:inherit}#a2a_copy_link{background:#" + l + ";" + _ + ":1px solid #" + l + ";margin-top:15%}span" + m + "s_link#a2a_copy_link_icon,span" + m + "w_link#a2a_copy_link_icon{background-size:48px;" + _ + "-radius:0;display:inline-block;height:48px;left:0;line-height:48px;" + v + "0 3px 0 0;position:absolute;vertical-align:top;*vertical-align:middle;width:48px}#a2a_modal input#a2a_copy_link_text{" + g + "transparent;_" + g + "#" + l + ";" + _ + ":0;" + h + "#" + u + ";font:inherit;height:48px;left:62px;max-width:initial;" + y + "0;position:relative;width:564px;width:calc(100% - 76px)}#a2a_copy_link_copied{" + g + "#0166ff;" + h + "#fff;display:none;font:inherit;font-size:16px;margin-top:1px;" + y + "3px 8px}@media (prefers-color-scheme:dark){" + f + " a," + f + " a" + m + "i," + f + " a" + m + "i:visited," + f + " a" + m + "more,i" + m + "i{" + _ + "-" + h + "#2a2a2a!important;" + h + "#fff!important}" + f + " a" + m + "i:active," + f + " a" + m + "i:focus," + f + " a" + m + "i:hover," + f + " a" + m + "more:active," + f + " a" + m + "more:focus," + f + " a" + m + "more:hover," + f + "_find_container{" + _ + "-" + h + "#444!important;" + g + "#444!important}" + f + "{" + g + "#2a2a2a;" + _ + "-" + h + "#2a2a2a}" + f + "_find{" + h + "#fff!important}" + f + " span" + m + "s_find svg{" + g + "transparent!important}" + f + " span" + m + "s_find svg path{fill:#fff!important}}@media print{" + m + "floating_style," + f + "," + m + "overlay{visibility:hidden}}@keyframes a2aFadeIn{from{opacity:0}to{opacity:1}}" + m + "starting{opacity:0}" + m + "starting" + m + "full," + m + "starting" + m + "modal{transform:scale(.8)}@media (max-width:639px){" + m + "full{" + _ + "-radius:0;top:15%;left:0;margin-left:auto;width:100%}" + m + "modal{left:0;margin-left:10px;width:calc(100% - 20px)}}@media (min-width:318px) and (max-width:437px){" + m + "full " + m + "full_services " + m + "i{width:calc(50% - 18px)}}@media (max-width:317px){" + m + "full " + m + "full_services " + m + "i{width:calc(100% - 18px)}}@media (max-height:436px){" + m + "full{bottom:40px;height:auto;top:40px}}@media (max-height:550px){" + m + "modal{top:30px}}@media (max-height:360px){" + m + "modal{top:20px}" + m + "thanks>div:first-child{margin-bottom:20px}}" + f + " a{" + h + "#" + s + ';text-decoration:none;font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;line-height:14px;height:auto;width:auto;outline:0;-moz-outline:none}' + f + " a" + m + "i:visited," + f + " a" + m + "more{" + h + "#" + s + "}" + f + " a" + m + "i:active," + f + " a" + m + "i:focus," + f + " a" + m + "i:hover," + f + " a" + m + "more:active," + f + " a" + m + "more:focus," + f + " a" + m + "more:hover{" + h + "#" + c + ";" + _ + "-" + h + "#" + o + ";" + _ + "-style:solid;" + g + "#" + o + ";text-decoration:none}" + f + " span" + m + "s_find{background-size:24px;height:24px;left:8px;position:absolute;top:7px;width:24px}" + f + " span" + m + "s_find svg{" + g + "#" + l + "}" + f + " span" + m + "s_find svg path{fill:#" + p + "}#a2a_menu_container{display:inline-block}#a2a_menu_container{_display:inline}" + f + "_find_container{" + _ + ":1px solid #" + p + ";" + _ + "-radius:6px;" + y + "2px 24px 2px 0;position:relative;text-align:left}" + m + "cols_container " + m + "col1{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}#a2a_modal input,#a2a_modal input[type=text]," + f + " input," + f + " input[type=text]{display:block;background-image:none;box-shadow:none;line-height:100%;" + v + "0;outline:0;overflow:hidden;" + y + "0;-moz-box-shadow:none;-webkit-box-shadow:none;-webkit-appearance:none}#a2a" + t + "_find_container input,#a2a" + t + "_find_container input[type=text]{" + g + "transparent;_" + g + "#" + l + ";" + _ + ":0;box-sizing:content-box;" + h + "#" + u + ";font:inherit;font-size:16px;height:28px;line-height:20px;left:38px;outline:0;" + v + "0;max-width:initial;" + y + "2px 0;position:relative;width:99%}" + ("undefined" != typeof document.body.style.maxHeight ? m + "clear{clear:both}" : m + "clear{clear:both;height:0;width:0;line-height:0;font-size:0}") + " " + m + "svg{background-repeat:no-repeat;display:block;overflow:hidden;height:32px;line-height:32px;" + y + "0;width:32px}" + m + "svg svg{background-repeat:no-repeat;background-position:50% 50%;" + _ + ":none;display:block;left:0;" + v + "0 auto;overflow:hidden;" + y + "0;position:relative;top:0;width:auto;height:auto}a" + m + "i,i" + m + "i{display:block;float:left;" + _ + ":1px solid #" + l + ";line-height:24px;" + y + "6px 8px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:132px}a" + m + "i span,a" + m + "more span{display:inline-block;overflow:hidden;vertical-align:top;*vertical-align:middle}a" + m + "i " + m + "svg{" + v + "0 6px 0 0}a" + m + "i " + m + "svg,a" + m + "more " + m + "svg{background-size:24px;height:24px;line-height:24px;width:24px}a" + m + "sss:hover{" + _ + "-left:1px solid #" + r + "}a" + f + "_show_more_less{" + _ + "-bottom:1px solid #" + l + ";" + _ + "-left:0;" + _ + "-right:0;line-height:24px;" + v + "6px 0 0;" + y + "6px;-webkit-touch-callout:none}a" + f + "_show_more_less span{display:inline-block;height:24px;" + v + "0 6px 0 0}" + m + "kit " + m + "svg{background-repeat:repeat}" + m + "default_style a{float:left;line-height:16px;" + y + "0 2px}" + m + "default_style a:hover " + m + "svg," + m + "floating_style a:hover " + m + "svg," + m + "overlay_style a:hover " + m + "svg svg{opacity:.7}" + m + "overlay_style" + m + "default_style a:hover " + m + "svg{opacity:1}" + m + "default_style " + m + "count," + m + "default_style " + m + "svg," + m + "floating_style " + m + "svg," + f + " " + m + "svg," + m + "vertical_style " + m + "count," + m + "vertical_style " + m + "svg{" + _ + "-radius:4px}" + m + "default_style " + m + "counter img," + m + "default_style " + m + "dd," + m + "default_style " + m + "svg{float:left}" + m + "default_style " + m + "img_text{margin-right:4px}" + m + "default_style " + m + "divider{" + _ + "-left:1px solid #000;display:inline;float:left;height:16px;line-height:16px;" + v + "0 5px}" + m + "kit a{cursor:pointer}" + m + "floating_style{" + g + "#fff;" + _ + "-radius:6px;position:fixed;z-index:9999995}" + m + "overlay_style{z-index:2147483647}" + m + "floating_style," + m + "overlay_style{animation:a2aFadeIn .2s ease-in;" + y + "4px}" + m + "vertical_style a{clear:left;display:block;overflow:hidden;" + y + "4px;text-decoration:none}" + m + "floating_style" + m + "default_style{bottom:0}" + m + "floating_style" + m + "default_style a," + m + "overlay_style" + m + "default_style a{" + y + "4px}" + m + "count{" + g + "#fff;" + _ + ":1px solid #ccc;box-sizing:" + _ + "-box;" + h + "#2a2a2a;display:block;float:left;font:12px Arial,Helvetica,sans-serif;height:16px;margin-left:4px;position:relative;text-align:center;width:50px}" + m + "count:after," + m + "count:before{" + _ + ":solid transparent;" + _ + '-width:4px 4px 4px 0;content:"";height:0;left:0;line-height:0;' + v + "-4px 0 0 -4px;position:absolute;top:50%;width:0}" + m + "count:before{" + _ + "-right-" + h + "#ccc}" + m + "count:after{" + _ + "-right-" + h + "#fff;margin-left:-3px}" + m + "count span{animation:a2aFadeIn .14s ease-in}" + m + "vertical_style " + m + "counter img{display:block}" + m + "vertical_style " + m + "count{float:none;margin-left:0;margin-top:6px}" + m + "vertical_style " + m + "count:after," + m + "vertical_style " + m + "count:before{" + _ + ":solid transparent;" + _ + '-width:0 4px 4px 4px;content:"";height:0;left:50%;line-height:0;' + v + "-4px 0 0 -4px;position:absolute;top:0;width:0}" + m + "vertical_style " + m + "count:before{" + _ + "-bottom-" + h + "#ccc}" + m + "vertical_style " + m + "count:after{" + _ + "-bottom-" + h + "#fff;margin-top:-3px}" + m + "nowrap{white-space:nowrap}" + m + "note{" + v + "0 auto;" + y + "9px;font-size:12px;text-align:center}" + m + "note " + m + "note_note{" + v + "0;" + h + "#" + d + "}" + m + "wide a{display:block;margin-top:3px;" + _ + "-top:1px solid #" + o + ";text-align:center}" + m + "label{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:polygon(0 0,0 0,0 0);-webkit-clip-path:polygon(0 0,0 0,0 0);overflow:hidden;height:1px;width:1px}" + m + "kit," + f + "," + m + "modal," + m + "overlay{-ms-touch-action:manipulation;touch-action:manipulation}" + m + "dd img{" + _ + ":0}" + m + "button_facebook_like iframe{max-width:none}",
        i.setAttribute("type", "text/css"),
        a2a.head_tag.appendChild(i),
        i.styleSheet ? i.styleSheet.cssText = e : (a = document.createTextNode(e),
        i.appendChild(a))
    },
    svg_css: function() {
        a2a.init("page");
        var e = a2a.c.css.sheet || a2a.c.css.styleSheet || {}
          , a = "insertRule"in e
          , t = "addRule"in e;
        all_services = a2a.services.concat([[0, 0, "a2a", "0166FF"]]);
        for (var n, i, o = 0, l = all_services.length; o < l; o++)
            n = ".a2a_s_" + all_services[o][2],
            i = "background-color:#" + all_services[o][3] + ";",
            a ? e.insertRule(n + "{" + i + "}", 0) : t && e.addRule(n, i, 0);
        a2a.svg.load(!0),
        a2a.svg_css = function() {}
    },
    svg: {
        icons: {},
        queue: [],
        tagO: '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">',
        tagC: "</svg>",
        fill: function(e, a) {
            return e.replace(/#FFF/gi, a)
        },
        get: function(e, a, t) {
            var n = a2a.svg
              , i = n.fill;
            return icons = n.icons,
            svg_tag_open = n.tagO,
            svg_tag_close = n.tagC,
            svg_src = icons[e],
            svg_src_default = icons.a2a,
            svg_src ? (svg_src = t ? i(svg_src, t) : svg_src,
            svg_tag_open + svg_src + svg_tag_close) : svg_src_default ? (svg_src_default = t ? i(svg_src_default, t) : svg_src_default,
            svg_tag_open + svg_src_default + svg_tag_close) : (a2a.svg.queue.push({
                name: e,
                node: a,
                color: t
            }),
            "pending")
        },
        set: function(e) {
            var a = a2a.svg
              , t = a.queue;
            if (icons = a.icons = e,
            svg_tag_open = a.tagO,
            svg_tag_close = a.tagC,
            icons.a2a)
                for (var n, i, o, l = 0, r = t.length; l < r; l++)
                    i = (n = t[l]).name,
                    color = n.color,
                    o = icons[i] ? icons[i] : icons.a2a,
                    o = color ? a.fill(o, color) : o,
                    n.node.innerHTML = svg_tag_open + o + svg_tag_close
        },
        load: function(t) {
            var n = a2a.svg.works()
              , i = new window.Image;
            i.onerror = function() {
                a2a.svg.loadCSS(!1)
            }
            ,
            i.onload = function() {
                var a, e = 1 === i.width && 1 === i.height;
                n && !t ? a2a.svg.loadJS(document) : a2a.svg.loadCSS(e),
                a2a.svg.load = (a = e,
                function(e) {
                    e && a2a.svg.loadCSS(a)
                }
                )
            }
            ,
            a2a.svg.load = function() {}
            ,
            i.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        },
        loadCSS: function(e) {
            var a = a2a.static_addtoany
              , t = a2a.c.static_server
              , n = a2a.fix_icons
              , i = a2a.svg.works()
              , o = window.document.createElement("link")
              , l = e && i && t != a ? t + "/" : a + "/svg/";
            o.rel = "stylesheet",
            o.href = l + ["icons.29.svg.css", "icons.29.png.css", "icons.29.old.css"][e && i ? 0 : e ? 1 : 2],
            a2a.head_tag.appendChild(o),
            n(),
            a2a.svg.loadCSS = n
        },
        loadJS: function() {
            var e = document
              , a = a2a.c.static_server
              , t = e.createElement("script")
              , n = e.getElementsByTagName("script")[0]
              , i = a != a2a.static_addtoany ? a + "/" : a + "/svg/";
            t.async = !0,
            t.src = i + "icons.29.svg.js",
            n.parentNode.insertBefore(t, n),
            a2a.svg.loadJS = function() {}
        },
        works: function() {
            var e = document
              , a = !(!e.createElementNS || !e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || !e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") || window.opera && -1 === navigator.userAgent.indexOf("Chrome"));
            return a2a.svg.works = function() {
                return a
            }
            ,
            a
        }
    },
    make_service: function(c, d, e, a, t, n, i) {
        var o, l, u = document.createElement("a"), r = a2a.c, s = function() {
            a2a.linker(this)
        }, p = a2a.type, m = (t = t || {},
        "a2a_svg a2a_s__default"), f = r.icon_color, _ = f ? f.split(",", 2) : f, g = _ ? _[0] : _, h = _ ? _[1] : _;
        return u.rel = "nofollow noopener",
        u.className = "a2a_i",
        u.href = "/#" + d,
        u.target = "_blank",
        u.a2a = {},
        u.a2a.safename = d,
        u.a2a.servicename = c,
        u.a2a.serviceNameLowerCase = c.toLowerCase(),
        u.a2a.serviceIcon = e,
        u.a2a.serviceColor = a,
        u.a2a.serviceType = t.type,
        u.innerHTML = "<span></span>" + c + " ",
        o = u.firstChild,
        t.type && (u.a2a.stype = t.type),
        t.src && (u.a2a.js_src = t.src),
        t.url && (u.a2a.url = t.url),
        t.pu && (u.a2a.popup = 1),
        t.media && (u.a2a.media = 1),
        n && (u.a2a.customserviceuri = n),
        i ? (o.style.backgroundImage = "url(" + i + ")",
        o.className = m) : f && a2a.svg.works() ? (o.className = m + " a2a_s_" + e,
        g && "unset" != g ? o.style.backgroundColor = g : a && (o.style.backgroundColor = "#" + a),
        h && (h = h.trim())) : e ? (o.className = m + " a2a_s_" + e,
        a && (o.style.backgroundColor = "#" + a)) : o.className = m,
        i || "pending" !== (l = a2a.svg.get(e, o, h)) && (o.innerHTML = l),
        "js" === u.a2a.stype ? a2a.add_event(u, "click", s) : (a2a.add_event(u, "mousedown", s),
        a2a.add_event(u, "keydown", s)),
        a2a.add_event(u, "click", function(e) {
            var a = a2a["n" + a2a.n]
              , t = {
                node: u,
                service: c,
                title: a.linkname,
                url: a.linkurl,
                media: a.linkmedia
            }
              , n = a2a.cbs("share", t);
            void 0 !== n && (n.url && (a.linkurl = n.url,
            a.linkurl_implicit = !1),
            n.title && (a.linkname = n.title,
            a.linkname_implicit = !1),
            n.media && (a.linkmedia = n.media),
            a2a.linker(u),
            n.stop && a2a.preventDefault(e))
        }),
        a2a.add_event(u, "click", function(e) {
            var a = encodeURIComponent
              , t = a2a["n" + a2a.n]
              , n = "page" == p ? "pages" : "subscriptions"
              , i = "page" == p ? "AddToAny Share/Save Button" : "AddToAny Subscribe Button"
              , o = "js" === u.a2a.stype
              , l = u.a2a.js_skip
              , r = screen.height
              , s = "event=service_click&url=" + a(location.href) + "&title=" + a(document.title || "") + "&ev_service=" + a(d) + "&ev_service_type=menu&ev_menu_type=" + p + "&ev_url=" + a(t.linkurl) + "&ev_title=" + a(t.linkname).replace(/'/g, "%27");
            "feed" == p || u.a2a.url || u.a2a.js_src || a2a.postClick(),
            !u.a2a.popup || a2a.defaultPrevented(e) || o || (a2a.preventDefault(e),
            window.open(u.href, "_blank", "toolbar=0,personalbar=0,resizable,scrollbars,status,width=550,height=450,top=" + (450 < r ? Math.round(r / 2 - 225) : 40) + ",left=" + Math.round(screen.width / 2 - 275))),
            o && !l && a2a.preventDefault(e),
            l && delete u.a2a.js_skip,
            a2a.util_frame_post(p, s),
            a2a.GA.track(c, d, t.linkurl, n, i)
        }),
        u
    },
    i18n: function() {
        if (a2a.c.static_server != a2a.static_addtoany)
            return !1;
        var e = ["ar", "id", "ms", "bn", "bn-IN", "bs", "bs-BA", "bg", "ca", "ca-AD", "ca-ES", "cs", "cs-CZ", "cy", "cy-GB", "da", "da-DK", "de", "dv", "el", "el-GR", "et", "et-EE", "es", "es-AR", "es-VE", "eo", "en-US", "eu", "eu-ES", "fa", "fa-IR", "fr", "fr-CA", "gd", "he", "hi", "hi-IN", "hr", "hy", "hy-AM", "is", "it", "ja", "ja-JP", "ko", "ko-KR", "ku", "ku-TR", "lv", "lt", "li", "li-NL", "hu", "mk", "ms-MY", "nl", "nn-NO", "no", "pl", "pt", "pt-BR", "pt-PT", "ro", "ru", "sr", "sr-RS", "fi", "sk", "sl", "sl-SI", "sv", "sv-SE", "ta", "ta-IN", "tr", "te-IN", "uk", "uk-UA", "vi", "vi-VN", "zh-CN", "zh-TW"]
          , a = a2a.c.locale || (navigator.browserLanguage || navigator.language).toLowerCase()
          , t = a2a.in_array(a, e, !0);
        if (!t) {
            var n = a.indexOf("-");
            -1 != n && (t = a2a.in_array(a.substr(0, n), e, !0))
        }
        return !("en-us" == a || !t) && t
    },
    localize: function() {
        var i = document
          , e = a2a.getByClass("a2a_localize", i)
          , a = a2a.c.localize
          , t = a2a.locale;
        function n(e) {
            var a, t, n = i.createElement("div");
            return n.innerHTML = e,
            (a = n.childNodes[0]) && (t = a.nodeValue),
            delete n,
            t
        }
        for (var o, l, r, s, c, d = 0, u = e.length; d < u; d++)
            (l = (l = (o = e[d]).getAttribute("data-a2a-localize")) ? l.split(",", 2) : l) && (s = l[0],
            c = a[r = l[1]] || t[r] || "",
            "inner" === s ? o.innerHTML = c : "label" === s ? o.setAttribute("aria-label", n(c)) : "title" === s && o.setAttribute("title", n(c)))
    },
    locale: {
        Share: "Share",
        Save: "Save",
        Subscribe: "Subscribe",
        Email: "Email",
        Bookmark: "Bookmark",
        ShowAll: "Show all",
        ShowLess: "Show less",
        FindAnyServiceToAddTo: "Find any service",
        PoweredBy: "By",
        AnyEmail: "Any email",
        ShareViaEmail: "Share via email",
        SubscribeViaEmail: "Subscribe via email",
        BookmarkInYourBrowser: "Bookmark in your browser",
        BookmarkInstructions: "Press Ctrl+D or &#8984;+D to bookmark this page",
        AddToYourFavorites: "Add to Favorites",
        SendFromWebOrProgram: "Send from any other email service",
        EmailProgram: "Email application",
        More: "More&#8230;",
        ThanksForSharing: "Thanks for sharing!",
        ThanksForFollowing: "Thanks for following!"
    }
};
a2a.c = a2a_config,
a2a.make_once = function(e) {
    if (a2a.type = a2a.c.menu_type || e,
    !a2a[a2a.type] && !window["a2a" + a2a.type + "_init"]) {
        a2a[a2a.type] = {},
        window.a2a_show_dropdown = a2a.show_menu,
        window.a2a_miniLeaveDelay = a2a.miniLeaveDelay,
        window.a2a_init = a2a.init,
        a2a["create_" + a2a.type + "_html"] = function(e, a) {
            var t, n, r, i, o, l, s = a2a.html_container, c = "", d = "", u = a2a.gEl, p = a2a.type = e, m = "a2a" + p, f = a2a.c, _ = a2a.ieo(), g = a2a.has_menter, h = document.createElement("i"), v = document.createDocumentFragment(), y = document.createDocumentFragment(), k = (document.createElement("a"),
            f.icon_color), w = k ? k.split(",", 2) : k, b = w ? w[0] : w, x = w ? w[1] : w, A = "a2a_svg a2a_s__default a2a_s_", E = x || "#FFF", C = ' style="background-color:' + (b && "unset" != b ? b : "#0166ff") + '"', S = '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="' + E + '"><path d="M14 7h4v18h-4z"/><path d="M7 14h18v4H7z"/></g></svg>', B = a2a.locale, T = f.localize;
            if (a2a.css(),
            T = f.localize = {
                Share: T.Share || B.Share,
                Save: T.Save || B.Save,
                Subscribe: T.Subscribe || B.Subscribe,
                Email: T.Email || B.Email,
                Bookmark: T.Bookmark || B.Bookmark,
                ShowAll: T.ShowAll || B.ShowAll,
                ShowLess: T.ShowLess || B.ShowLess,
                FindAnyServiceToAddTo: T.FindAnyServiceToAddTo || B.FindAnyServiceToAddTo,
                PoweredBy: T.PoweredBy || B.PoweredBy,
                AnyEmail: "Any email",
                ShareViaEmail: T.ShareViaEmail || B.ShareViaEmail,
                SubscribeViaEmail: T.SubscribeViaEmail || B.SubscribeViaEmail,
                BookmarkInYourBrowser: T.BookmarkInYourBrowser || B.BookmarkInYourBrowser,
                BookmarkInstructions: T.BookmarkInstructions || B.BookmarkInstructions,
                AddToYourFavorites: T.AddToYourFavorites || B.AddToYourFavorites,
                SendFromWebOrProgram: T.SendFromWebOrProgram || B.SendFromWebOrProgram,
                EmailProgram: T.EmailProgram || B.EmailProgram,
                More: T.More || B.More,
                ThanksForSharing: T.ThanksForSharing || B.ThanksForSharing,
                ThanksForFollowing: T.ThanksForFollowing || B.ThanksForFollowing
            },
            s || (d += '<div class="a2a_overlay" id="a2a_overlay"></div>',
            d += '<div id="a2a_modal" class="a2a_modal" role="dialog" tabindex="-1" aria-label="" style="display:none">',
            d += '<div class="a2a_modal_body a2a_menu" id="a2a_copy_link" style="display:none"><span id="a2a_copy_link_icon" class="a2a_svg a2a_s_link"' + C + '><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="' + E + '" d="M24.4 21.18c0-.36-.1-.67-.36-.92l-2.8-2.8a1.24 1.24 0 0 0-.92-.38c-.38 0-.7.14-.97.43.02.04.1.12.25.26l.3.3.2.24c.08.12.14.24.17.35.03.1.05.23.05.37 0 .36-.13.66-.38.92a1.25 1.25 0 0 1-.92.37 1.4 1.4 0 0 1-.37-.03 1.06 1.06 0 0 1-.35-.18 2.27 2.27 0 0 1-.25-.2 6.82 6.82 0 0 1-.3-.3l-.24-.25c-.3.28-.44.6-.44.98 0 .36.13.66.38.92l2.78 2.8c.24.23.54.35.9.35.37 0 .68-.12.93-.35l1.98-1.97c.26-.25.38-.55.38-.9zm-9.46-9.5c0-.37-.13-.67-.38-.92l-2.78-2.8a1.24 1.24 0 0 0-.9-.37c-.36 0-.67.1-.93.35L7.97 9.92c-.26.25-.38.55-.38.9 0 .36.1.67.37.92l2.8 2.8c.24.25.55.37.92.37.36 0 .7-.13.96-.4-.03-.04-.1-.12-.26-.26s-.24-.23-.3-.3a2.67 2.67 0 0 1-.2-.24 1.05 1.05 0 0 1-.17-.35 1.4 1.4 0 0 1-.04-.37c0-.36.1-.66.36-.9.26-.26.56-.4.92-.4.14 0 .26.03.37.06.12.03.23.1.35.17.1.1.2.16.25.2l.3.3.24.26c.3-.28.44-.6.44-.98zM27 21.17c0 1.07-.38 2-1.15 2.73l-1.98 1.98c-.74.75-1.66 1.12-2.73 1.12-1.1 0-2-.38-2.75-1.14l-2.8-2.8c-.74-.74-1.1-1.65-1.1-2.73 0-1.1.38-2.04 1.17-2.82l-1.18-1.17c-.8.8-1.72 1.18-2.82 1.18-1.08 0-2-.36-2.75-1.12l-2.8-2.8C5.38 12.8 5 11.9 5 10.82c0-1.08.38-2 1.15-2.74L8.13 6.1C8.87 5.37 9.78 5 10.86 5c1.1 0 2 .38 2.75 1.15l2.8 2.8c.74.73 1.1 1.65 1.1 2.72 0 1.1-.38 2.05-1.17 2.82l1.18 1.18c.8-.8 1.72-1.2 2.82-1.2 1.08 0 2 .4 2.75 1.14l2.8 2.8c.76.76 1.13 1.68 1.13 2.76z"/></svg></span><input id="a2a_copy_link_text" type="text" title="Copy link" readonly><div id="a2a_copy_link_copied">&check;</div></div>',
            d += '<div class="a2a_modal_body a2a_menu a2a_thanks" id="a2a_thanks" style="display:none"><div class="a2a_localize" data-a2a-localize="inner,ThanksForSharing">' + T.ThanksForSharing + "</div></div>",
            d += "</div>"),
            c += '<div class="a2a_menu a2a_full a2a_localize" id="a2a' + p + '_full" role="dialog" tabindex="-1" aria-label="' + ("feed" == p ? T.Subscribe : T.Share) + '" data-a2a-localize="title,' + ("feed" == p ? "Subscribe" : "Share") + '"><div class="a2a_full_header"><div id="a2a' + p + '_find_container" class="a2a_menu_find_container"><input id="a2a' + p + '_find" class="a2a_menu_find a2a_localize" type="text" autocomplete="off" title="' + T.FindAnyServiceToAddTo + '" data-a2a-localize="title,FindAnyServiceToAddTo"><span id="a2a' + p + '_find_icon" class="a2a_svg a2a_s_find"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M19.7 18.2l-4.5-4.5c.7-1.1 1.2-2.3 1.2-3.6 0-3.5-2.8-6.3-6.3-6.3s-6.3 2.8-6.3 6.3 2.8 6.3 6.3 6.3c1.4 0 2.6-.4 3.6-1.2l4.5 4.5c.6.6 1.3.7 1.7.2.5-.4.4-1.1-.2-1.7zm-9.6-3.6c-2.5 0-4.5-2.1-4.5-4.5 0-2.5 2.1-4.5 4.5-4.5 2.5 0 4.5 2.1 4.5 4.5s-2 4.5-4.5 4.5z"/></svg></span></div></div><div class="a2a_full_services scrollstyle1" id="a2a' + p + '_full_services" role="presentation"></div><div class="a2a_full_footer"></div></div><div id="a2a' + p + '_dropdown" class="a2a_menu a2a_mini a2a_localize" tabindex="-1" aria-label="' + ("feed" == p ? T.Subscribe : T.Share) + '" data-a2a-localize="label,' + ("feed" == p ? "Subscribe" : "Share") + '" style="display:none"><div id="a2a' + p + '_title_container" class="a2a_menu_title_container" style="display:none"><div id="a2a' + p + '_title" class="a2a_menu_title"></div></div><div class="a2a_mini_services" id="a2a' + p + '_mini_services"></div><div id="a2a' + p + '_cols_container" class="a2a_cols_container"><div class="a2a_col1" id="a2a' + p + '_col1"' + ("mail" == p ? ' style="display:none"' : "") + '></div><div id="a2a' + p + '_2_col1"' + ("mail" != p ? ' style="display:none"' : "") + '></div><div class="a2a_clear"></div></div>',
            "mail" != p && (c += '<div class="a2a' + p + '_wide a2a_wide"><a href="" id="a2a' + p + '_show_more_less" class="a2a_menu_show_more_less a2a_more a2a_localize" title="' + T.ShowAll + '" data-a2a-localize="title,ShowAll"><span class="' + A + 'a2a"' + C + ">" + S + '</span><span class="a2a_localize" data-a2a-localize="inner,More">' + T.More + "</a></span></div>"),
            c += "</div>",
            s)
                s.insertAdjacentHTML("beforeend", c);
            else {
                var F = "a2a_menu_container"
                  , L = u(F);
                s = a2a.html_container = L && !a2a.init_show.a2a_done ? L : document.createElement("div");
                a2a.add_event(s, "click", a2a.stopPropagation),
                a2a.add_event(s, "touchstart", a2a.stopPropagation, !!a2a.evOpts() && {
                    passive: !0
                }),
                s.innerHTML = d + c
            }
            if (s.id != F && (s.style.position = "static",
            _ && _ < 9 ? document.body.insertBefore(s, document.body.firstChild) : document.body.insertBefore(s, null)),
            (o = u(m + "_dropdown")) && g && (a2a.add_event(o, "mouseenter", a2a.miniEnterStay),
            a2a[p].onclick || a2a.add_event(o, "mouseleave", a2a.miniLeaveDelay)),
            (r = u(m + "_find")) && (a2a.add_event(u(m + "_find_icon"), "click", a2a.focus_find),
            a2a.add_event(r, "click", a2a.focus_find),
            a2a.add_event(r, "keyup", a2a.do_find)),
            (l = u("a2a_copy_link_icon")) && a2a.add_event(l, "click", function() {
                u("a2a_copy_link_text").click()
            }),
            i = a2a.make_service,
            "mail" != p) {
                for (var N = 0, z = a.most, D = z.length, I = parseInt(a2a[p].num_services), M = 0, j = a2a[p].exclude_services; N < D; N++) {
                    var P = z[N];
                    j && a2a.in_array(P[1], j, !0) || v.appendChild(i(P[0], P[1], P[2], P[3], P[4])),
                    !(M < I) || j && a2a.in_array(P[1], j, !0) || (y.appendChild(i(P[0], P[1], P[2], P[3], P[4])),
                    M++)
                }
                u(m + "_full_services").appendChild(v),
                u(m + "_mini_services").appendChild(y)
            }
            t = u(m + "_full_services"),
            h.className = "a2a_i",
            n = h.cloneNode(),
            t.appendChild(h),
            t.appendChild(n);
            N = 0;
            for (var O = a.email, H = O.length; N < H; N++) {
                P = O[N];
                j && a2a.in_array(P[1], j, !0) || u(m + "_2_col1").appendChild(i(P[0], P[1], P[2], P[3], P[4]))
            }
            a2a[p].services = a.most.concat(a.email),
            a2a.add_event(u("a2a_overlay"), "click", function(e) {
                a2a.hide_modals(p)
            }),
            "mail" != p && a2a.add_event(u(m + "_show_more_less"), "click", function(e) {
                a2a.preventDefault(e),
                a2a.show_more_less()
            }),
            a2a.arrange_services(),
            a2a.util_frame_listen(p),
            a2a.collections(p),
            a2a.default_services(),
            "mail" != p && (r.onkeydown = function(e) {
                var a = (e = e || window.event).which || e.keyCode
                  , t = a2a.type;
                if (13 == a) {
                    for (var n, i = 0, o = a2a[t].main_services, l = o.length; i < l; i++)
                        if ("none" != (n = o[i]).style.display)
                            return n.focus(),
                            !1
                } else
                    27 == a && ("" == r.value && r.blur(),
                    r.value = "",
                    a2a.do_find())
            }
            )
        }
        ;
        var a = {
            page: {
                most: [["Facebook", "facebook", "facebook", "3B5998", {
                    media: 1,
                    pu: 1
                }], ["Twitter", "twitter", "twitter", "55ACEE", {
                    pu: 1
                }], ["Email", "email", "email", "0166FF", {
                    url: "mailto:?subject=${title}&body=${link}"
                }], ["Pinterest", "pinterest", "pinterest", "BD081C", {
                    type: "js",
                    src: "https://assets.pinterest.com/js/pinmarklet.js",
                    media: 1,
                    pu: 1
                }], ["LinkedIn", "linkedin", "linkedin", "007BB5", {
                    pu: 1
                }], ["Reddit", "reddit", "reddit", "ff4500"], ["WhatsApp", "whatsapp", "whatsapp", "12AF0A"], ["Gmail", "google_gmail", "gmail", "DD5347", {
                    type: "email",
                    pu: 1
                }], ["Telegram", "telegram", "telegram", "2CA5E0"], ["Pocket", "pocket", "pocket", "EE4056"], ["Mix", "mix", "mix", "ff8226"], ["Tumblr", "tumblr", "tumblr", "35465C", {
                    media: 1,
                    pu: 1
                }], ["Amazon Wish List", "amazon_wish_list", "amazon", "F90"], ["AOL Mail", "aol_mail", "aol", "2A2A2A", {
                    type: "email",
                    pu: 1
                }], ["Balatarin", "balatarin", "balatarin", "079948"], ["BibSonomy", "bibsonomy", "bibsonomy", "2A2A2A"], ["Bitty Browser", "bitty_browser", "bitty", "999"], ["Blinklist", "blinklist", "blinklist", "3D3C3B"], ["Blogger", "blogger", "blogger", "FDA352"], ["BlogMarks", "blogmarks", "blogmarks", "535353"], ["Bookmarks.fr", "bookmarks_fr", "bookmarks_fr", "96C044"], ["Box.net", "box_net", "box", "1A74B0"], ["Buffer", "buffer", "buffer", "2A2A2A"], ["Care2 News", "care2_news", "care2", "6EB43F"], ["CiteULike", "citeulike", "citeulike", "2781CD"], ["Copy Link", "copy_link", "link", "0166FF", {
                    type: "js",
                    src: "javascript:a2a.copyLink('${link}')"
                }], ["Design Float", "design_float", "designfloat", "8AC8FF"], ["Diary.Ru", "diary_ru", "diary_ru", "912D31"], ["Diaspora", "diaspora", "diaspora", "2E3436"], ["Digg", "digg", "digg", "2A2A2A"], ["Diigo", "diigo", "diigo", "4A8BCA"], ["Douban", "douban", "douban", "071", {
                    pu: 1
                }], ["Draugiem", "draugiem", "draugiem", "F60", {
                    pu: 1
                }], ["DZone", "dzone", "dzone", "82C251"], ["Evernote", "evernote", "evernote", "00A82D"], ["Facebook Messenger", "facebook_messenger", "facebook_messenger", "0084FF", {
                    pu: 1
                }], ["Fark", "fark", "fark", "555"], ["Flipboard", "flipboard", "flipboard", "C00", {
                    pu: 1
                }], ["Folkd", "folkd", "folkd", "0F70B2"], ["Google Bookmarks", "google_bookmarks", "google", "4285F4"], ["Google Classroom", "google_classroom", "google_classroom", "FFC112"], ["Hacker News", "hacker_news", "y18", "F60"], ["Hatena", "hatena", "hatena", "00A6DB"], ["Houzz", "houzz", "houzz", "7AC143", {
                    type: "js",
                    src: "https://www.houzz.com/js/clipperBookmarklet.js",
                    media: 1,
                    pu: 1
                }], ["Instapaper", "instapaper", "instapaper", "2A2A2A"], ["Kakao", "kakao", "kakao", "FCB700", {
                    pu: 1
                }], ["Kik", "kik", "kik", "2A2A2A"], ["Kindle It", "kindle_it", "kindle", "2A2A2A"], ["Known", "known", "known", "2A2A2A"], ["Line", "line", "line", "00C300", {
                    pu: 1
                }], ["LiveJournal", "livejournal", "livejournal", "113140"], ["Mail.Ru", "mail_ru", "mail_ru", "356FAC"], ["Mastodon", "mastodon", "mastodon", "2b90d9"], ["Mendeley", "mendeley", "mendeley", "A70805"], ["Meneame", "meneame", "meneame", "FF7D12"], ["MeWe", "mewe", "mewe", "007DA1"], ["Mixi", "mixi", "mixi", "D1AD5A"], ["MySpace", "myspace", "myspace", "2A2A2A"], ["Netvouz", "netvouz", "netvouz", "6C3"], ["Odnoklassniki", "odnoklassniki", "odnoklassniki", "F2720C"], ["Outlook.com", "outlook_com", "outlook_com", "0072C6", {
                    type: "email"
                }], ["Papaly", "papaly", "papaly", "3AC0F6", {
                    pu: 1
                }], ["Pinboard", "pinboard", "pinboard", "1341DE", {
                    pu: 1
                }], ["Plurk", "plurk", "plurk", "CF682F"], ["Print", "print", "print", "0166FF", {
                    type: "js",
                    src: "javascript:print()"
                }], ["PrintFriendly", "printfriendly", "printfriendly", "6D9F00"], ["Protopage Bookmarks", "protopage_bookmarks", "protopage", "413FFF"], ["Pusha", "pusha", "pusha", "0072B8"], ["Qzone", "qzone", "qzone", "2B82D9"], ["Rediff MyPage", "rediff", "rediff", "D20000"], ["Refind", "refind", "refind", "1492ef"], ["Renren", "renren", "renren", "005EAC", {
                    pu: 1
                }], ["Sina Weibo", "sina_weibo", "sina_weibo", "E6162D"], ["SiteJot", "sitejot", "sitejot", "FFC808"], ["Skype", "skype", "skype", "00AFF0"], ["Slashdot", "slashdot", "slashdot", "004242"], ["SMS", "sms", "sms", "6CBE45", {
                    url: "sms:?&body=${title}%20${link}"
                }], ["StockTwits", "stocktwits", "stocktwits", "40576F", {
                    pu: 1
                }], ["Svejo", "svejo", "svejo", "5BD428"], ["Symbaloo Bookmarks", "symbaloo_bookmarks", "symbaloo", "6DA8F7"], ["Threema", "threema", "threema", "2A2A2A", {
                    url: "threema://compose?text=${title}%20${link}"
                }], ["Trello", "trello", "trello", "0079BF", {
                    pu: 1
                }], ["Tuenti", "tuenti", "tuenti", "0075C9"], ["Twiddla", "twiddla", "twiddla", "2A2A2A"], ["TypePad Post", "typepad_post", "typepad", "D2DE61"], ["Viadeo", "viadeo", "viadeo", "2A2A2A", {
                    pu: 1
                }], ["Viber", "viber", "viber", "7C529E", {
                    url: "viber://forward?text=${title}%20${link}"
                }], ["VK", "vk", "vk", "587EA3", {
                    pu: 1
                }], ["Wanelo", "wanelo", "wanelo", "9cb092"], ["WeChat", "wechat", "wechat", "7BB32E"], ["WordPress", "wordpress", "wordpress", "464646"], ["Wykop", "wykop", "wykop", "367DA9"], ["XING", "xing", "xing", "165B66", {
                    pu: 1
                }], ["Yahoo Mail", "yahoo_mail", "yahoo", "400090", {
                    type: "email"
                }], ["Yoolink", "yoolink", "yoolink", "A2C538"], ["Yummly", "yummly", "yummly", "E16120", {
                    type: "js",
                    src: "https://www.yummly.com/js/yumlet.js",
                    media: 1,
                    pu: 1
                }]],
                email: [["Email", "email", "email", "0166FF", {
                    type: "email"
                }], ["Gmail", "google_gmail", "gmail", "DD5347", {
                    type: "email",
                    pu: 1
                }], ["AOL Mail", "aol_mail", "aol", "2A2A2A", {
                    type: "email",
                    pu: 1
                }], ["Outlook.com", "outlook_com", "outlook_com", "0072C6", {
                    type: "email"
                }], ["Yahoo Mail", "yahoo_mail", "yahoo", "400090", {
                    type: "email"
                }]]
            },
            feed: {
                most: [["Feed", "feed", "feed", "E3702D", {
                    url: "${link_noenc}"
                }], ["Feedly", "feedly", "feedly", "2BB24C"], ["My Yahoo", "my_yahoo", "yahoo", "400090"], ["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", {
                    type: "email"
                }], ["AOL Reader", "my_aol", "aol", "2A2A2A"], ["The Old Reader", "oldreader", "oldreader", "D73F31"], ["Agregator", "agregator", "agregator", "359440"], ["Bitty Browser Preview", "bitty_browser_preview", "bitty", "999"], ["Daily Rotation", "daily_rotation", "dailyrotation", "2A2A2A"], ["Feed Mailer", "feed_mailer", "feedmailer", "78A8D1"], ["FeedBucket", "feedbucket", "feedbucket", "E3702D"], ["iTunes", "itunes", "itunes", "FB233A", {
                    url: "itpc://${link_nohttp}"
                }], ["Miro", "miro", "miro", "D41700"], ["Netvibes", "netvibes", "netvibes", "7CA900"], ["NewsAlloy", "newsalloy", "newsalloy", "8E2B3D"], ["NewsIsFree", "newsisfree", "newsisfree", "316CA9"], ["Outlook", "outlook", "outlook_com", "0072C6", {
                    url: "feed://${link_nohttp}"
                }], ["PodNova", "podnova", "podnova", "B50419"], ["Protopage News Feeds", "protopage_news_feeds", "protopage", "413FFF"], ["Symbaloo Feeds", "symbaloo_feeds", "symbaloo", "6DA8F7"], ["The Free Dictionary", "the_free_dictionary", "thefreedictionary", "004B85"], ["The Free Library", "the_free_library", "thefreelibrary", "004B85"], ["WINKsite", "winksite", "winksite", "6FE738"]],
                email: [["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", {
                    type: "email"
                }]]
            }
        };
        a2a.services = a.page.most.concat(a.feed.most);
        var t, n = a2a.type, i = a2a[n], o = "feed" == n ? "feed" : "page", l = a2a.c;
        location.host.split(".").slice(-1);
        i.onclick = l.onclick || !1,
        i.show_title = l.show_title || !1,
        i.num_services = l.num_services || 8,
        i.exclude_services = l.exclude_services || !1,
        i.custom_services = l.custom_services || !1,
        (t = a2a.i18n()) && "custom" != t && a2a.loadExtScript(l.static_server + "/locale/" + t + ".js", function() {
            return "" != a2a_localize
        }, function() {
            l.localize = a2a_localize,
            a2a.localize()
        }),
        a2a["create_" + n + "_html"](n, a[o]),
        a2a.GA()
    }
}
,
function() {
    function e() {
        a2a.overlays(),
        a2a.init_all("page"),
        a2a.ready()
    }
    document.body && e(),
    a2a.dom.ready(e)
}();
