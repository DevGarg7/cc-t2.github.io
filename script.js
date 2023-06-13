(function () {
    function asyncLoad() {
        var urls = [
            "https:\/\/node1.itoris.com\/dpo\/storefront\/include.js?shop=pangrampangram.myshopify.com",
            "https:\/\/easyredirects.esc-apps-cdn.com\/redirect-app.js?shop=pangrampangram.myshopify.com",
            "https:\/\/cdn.shopify.com\/s\/files\/1\/2642\/6578\/t\/28\/assets\/appstle-init.js?v=1678105485\u0026shop=pangrampangram.myshopify.com",
        ];
        for (var i = 0; i < urls.length; i++) {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = urls[i];
            var x = document.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x);
        }
    }
    if (window.attachEvent) {
        window.attachEvent("onload", asyncLoad);
    } else {
        window.addEventListener("load", asyncLoad, false);
    }
})();

(function () {
    let t, e;
    function n() {
        (t = {
            page_viewed: {},
            collection_viewed: {},
            product_viewed: {},
            product_variant_viewed: {},
            search_submitted: {},
            product_added_to_cart: {},
            checkout_started: {},
            checkout_completed: {},
            payment_info_submitted: {},
            session_started: {},
        }),
            (e = { wpm: {}, trekkie: {} });
    }
    function o(t) {
        return `${t || "sh"}-${(function () {
            const t = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
            let e = "";
            try {
                const n = window.crypto,
                    o = new Uint16Array(31);
                n.getRandomValues(o);
                let r = 0;
                e = t
                    .replace(/[x]/g, (t) => {
                        const e = o[r] % 16;
                        return r++, ("x" === t ? e : (3 & e) | 8).toString(16);
                    })
                    .toUpperCase();
            } catch (n) {
                e = t
                    .replace(/[x]/g, (t) => {
                        const e = (16 * Math.random()) | 0;
                        return ("x" === t ? e : (3 & e) | 8).toString(16);
                    })
                    .toUpperCase();
            }
            return `${(function () {
                let t = 0,
                    e = 0;
                t = new Date().getTime() >>> 0;
                try {
                    e = performance.now() >>> 0;
                } catch (t) {
                    e = 0;
                }
                const n = Math.abs(t + e)
                    .toString(16)
                    .toLowerCase();
                return "00000000".substr(0, 8 - n.length) + n;
            })()}-${e}`;
        })()}`;
    }
    function r(n, r) {
        if (
            !t[n] ||
            ("trekkie" !== (null == r ? void 0 : r.analyticsFramework) &&
                "wpm" !== (null == r ? void 0 : r.analyticsFramework))
        )
            return o("shu");
        const i = "string" == typeof (c = r.cacheKey) && c ? c : "default";
        var c;
        const a = (function (t, n, o) {
            const r = e[n];
            return (
                void 0 === r[t] && (r[t] = {}),
                void 0 === r[t][o] ? (r[t][o] = 0) : (r[t][o] += 1),
                r[t][o]
            );
        })(n, r.analyticsFramework, i);
        return (function (e, n, r) {
            const i = t[e];
            if (void 0 === i[r]) {
                const t = o();
                i[r] = [t];
            } else if (void 0 === i[r][n]) {
                const t = o();
                i[r].push(t);
            }
            return i[r][n];
        })(n, a, i);
    }
    function i() {
        (window.Shopify = window.Shopify || {}),
            n(),
            (window.Shopify.evids = (t, e) => r(t, e));
    }
    i();
})();

(function e(e, n, a, t, o, r, i) {
    var s = i || [],
        l = null !== e;
    l &&
        ((window.Shopify = window.Shopify || {}),
            (window.Shopify.analytics = window.Shopify.analytics || {}),
            (window.Shopify.analytics.replayQueue = []),
            (window.Shopify.analytics.publish = function (e, n, a) {
                window.Shopify.analytics.replayQueue.push([e, n, a]);
            }));
    var d = (function () {
        var e = "legacy",
            n = "unknown",
            a = null,
            t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+)/i),
            o = navigator.userAgent.match(/(Edg)\/(\d+)/i),
            r = navigator.userAgent.match(
                /(Version)\/(\d+)(.+)(Safari)\/(\d+)/i
            );
        r
            ? ((n = "safari"), (a = parseInt(r[2], 10)))
            : o
                ? ((n = "edge"), (a = parseInt(o[2], 10)))
                : t && ((n = t[1].toLocaleLowerCase()), (a = parseInt(t[2], 10)));
        var i = { chrome: 60, firefox: 55, safari: 11, edge: 80 }[n];
        return void 0 !== i && null !== a && i <= a && (e = "modern"), e;
    })().substring(0, 1),
        c = t.substring(0, 1);
    if (l)
        try {
            self.performance.mark("wpm:start");
        } catch (e) { }
    var p,
        u,
        f,
        w,
        h,
        y,
        m,
        g,
        v = [
            a,
            s.indexOf("web_pixels_manager_runtime_asset_prefix") > -1
                ? "/wpm"
                : null,
            "/",
            c,
            r,
            d,
            ".js",
        ].join("");
    (p = {
        src: v,
        async: !0,
        onload: function () {
            if (e) {
                var a = window.webPixelsManager.init(e);
                n(a),
                    window.Shopify.analytics.replayQueue.forEach(function (e) {
                        a.publishCustomEvent(e[0], e[1], e[2]);
                    }),
                    (window.Shopify.analytics.replayQueue = []),
                    (window.Shopify.analytics.publish = a.publishCustomEvent);
            }
        },
        onerror: function () {
            var n =
                (e.storefrontBaseUrl
                    ? e.storefrontBaseUrl.replace(/\/$/, "")
                    : self.location.origin) +
                "/.well-known/shopify/monorail/unstable/produce_batch",
                a = JSON.stringify({
                    metadata: { event_sent_at_ms: new Date().getTime() },
                    events: [
                        {
                            schema_id: "web_pixels_manager_load/2.0",
                            payload: {
                                version: o || "latest",
                                page_url: self.location.href,
                                status: "failed",
                                error_msg: v + " has failed to load",
                            },
                            metadata: { event_created_at_ms: new Date().getTime() },
                        },
                    ],
                });
            try {
                if (self.navigator.sendBeacon.bind(self.navigator)(n, a))
                    return !0;
            } catch (e) { }
            const t = new XMLHttpRequest();
            try {
                return (
                    t.open("POST", n, !0),
                    t.setRequestHeader("Content-Type", "text/plain"),
                    t.send(a),
                    !0
                );
            } catch (e) {
                console &&
                    console.warn &&
                    console.warn(
                        "[Web Pixels Manager] Got an unhandled error while logging a load error."
                    );
            }
            return !1;
        },
    }),
        (u = document.createElement("script")),
        (f = p.src),
        (w = p.async || !0),
        (h = p.onload),
        (y = p.onerror),
        (m = document.head),
        (g = document.body),
        (u.async = w),
        (u.src = f),
        h && u.addEventListener("load", h),
        y && u.addEventListener("error", y),
        m
            ? m.appendChild(u)
            : g
                ? g.appendChild(u)
                : console.error(
                    "Did not find a head or body element to append the script"
                );
})(
    {
        shopId: 26426578,
        storefrontBaseUrl: "https://pangrampangram.com",
        cdnBaseUrl: "https://cdn.shopify.com",
        surface: "storefront-renderer",
        enabledBetaFlags: [
            "web_pixels_use_shop_domain_monorail_endpoint",
            "web_pixels_shopify_pixel_validation",
            "web_pixels_prefetch_assets",
            "web_pixels_manager_runtime_asset_prefix",
            "web_pixels_async_pixel_refactor",
        ],
        webPixelsConfigList: [
            {
                id: "shopify-app-pixel",
                configuration: "{}",
                eventPayloadVersion: "v1",
                runtimeContext: "STRICT",
                scriptVersion: "0543",
                apiClientId: "shopify-pixel",
                type: "APP",
            },
            {
                id: "shopify-custom-pixel",
                eventPayloadVersion: "v1",
                runtimeContext: "LAX",
                scriptVersion: "0543",
                apiClientId: "shopify-pixel",
                type: "CUSTOM",
            },
        ],
        initData: {
            cart: null,
            checkout: null,
            customer: null,
            productVariants: [],
        },
    },
    function pageEvents(webPixelsManagerAPI) {
        webPixelsManagerAPI.publish("page_viewed");
    },
    "https://cdn.shopify.com",
    "browser",
    "0.0.303",
    "bfeaf812wc2968b06pc37ce4b8m8d48fac7",
    [
        "web_pixels_use_shop_domain_monorail_endpoint",
        "web_pixels_shopify_pixel_validation",
        "web_pixels_prefetch_assets",
        "web_pixels_manager_runtime_asset_prefix",
        "web_pixels_async_pixel_refactor",
    ]
);
window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = "USD";
var meta = { page: { pageType: "home" } };
for (var attr in meta) {
    window.ShopifyAnalytics.meta[attr] = meta[attr];
}

window.ShopifyAnalytics.merchantGoogleAnalytics = function () {
            < !--Google tag(gtag.js)-- >

        window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-3BDNHLGGVE");
    (window.gaDevIds = window.gaDevIds || []).push("BwiEti");

    (function () {
        var customDocumentWrite = function (content) {
            var jquery = null;

            if (window.jQuery) {
                jquery = window.jQuery;
            } else if (window.Checkout && window.Checkout.$) {
                jquery = window.Checkout.$;
            }

            if (jquery) {
                jquery("body").append(content);
            }
        };

        var hasLoggedConversion = function (token) {
            if (token) {
                return document.cookie.indexOf("loggedConversion=" + token) !== -1;
            }
            return false;
        };

        var setCookieIfConversion = function (token) {
            if (token) {
                var twoMonthsFromNow = new Date(Date.now());
                twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

                document.cookie =
                    "loggedConversion=" + token + "; expires=" + twoMonthsFromNow;
            }
        };

        var trekkie =
            (window.ShopifyAnalytics.lib =
                window.trekkie =
                window.trekkie || []);
        if (trekkie.integrations) {
            return;
        }
        trekkie.methods = [
            "identify",
            "page",
            "ready",
            "track",
            "trackForm",
            "trackLink",
        ];
        trekkie.factory = function (method) {
            return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(method);
                trekkie.push(args);
                return trekkie;
            };
        };
        for (var i = 0; i < trekkie.methods.length; i++) {
            var key = trekkie.methods[i];
            trekkie[key] = trekkie.factory(key);
        }
        trekkie.load = function (config) {
            trekkie.config = config || {};
            trekkie.config.initialDocumentCookie = document.cookie;
            var first = document.getElementsByTagName("script")[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.onerror = function (e) {
                var scriptFallback = document.createElement("script");
                scriptFallback.type = "text/javascript";
                scriptFallback.onerror = function (error) {
                    var Monorail = {
                        produce: function produce(monorailDomain, schemaId, payload) {
                            var currentMs = new Date().getTime();
                            var event = {
                                schema_id: schemaId,
                                payload: payload,
                                metadata: {
                                    event_created_at_ms: currentMs,
                                    event_sent_at_ms: currentMs,
                                },
                            };
                            return Monorail.sendRequest(
                                "https://" + monorailDomain + "/v1/produce",
                                JSON.stringify(event)
                            );
                        },
                        sendRequest: function sendRequest(endpointUrl, payload) {
                            // Try the sendBeacon API
                            if (
                                window &&
                                window.navigator &&
                                typeof window.navigator.sendBeacon === "function" &&
                                typeof window.Blob === "function" &&
                                !Monorail.isIos12()
                            ) {
                                var blobData = new window.Blob([payload], {
                                    type: "text/plain",
                                });

                                if (window.navigator.sendBeacon(endpointUrl, blobData)) {
                                    return true;
                                } // sendBeacon was not successful
                            } // XHR beacon

                            var xhr = new XMLHttpRequest();

                            try {
                                xhr.open("POST", endpointUrl);
                                xhr.setRequestHeader("Content-Type", "text/plain");
                                xhr.send(payload);
                            } catch (e) {
                                console.log(e);
                            }

                            return false;
                        },
                        isIos12: function isIos12() {
                            return (
                                window.navigator.userAgent.lastIndexOf(
                                    "iPhone; CPU iPhone OS 12_"
                                ) !== -1 ||
                                window.navigator.userAgent.lastIndexOf(
                                    "iPad; CPU OS 12_"
                                ) !== -1
                            );
                        },
                    };
                    Monorail.produce(
                        "monorail-edge.shopifysvc.com",
                        "trekkie_storefront_load_errors/1.1",
                        {
                            shop_id: 26426578,
                            theme_id: 83681083446,
                            app_name: "storefront",
                            context_url: window.location.href,
                            source_url:
                                "https://cdn.shopify.com/s/trekkie.storefront.24fd4b2c6888705627a10cc3fd8fbc7486c7007a.min.js",
                        }
                    );
                };
                scriptFallback.async = true;
                scriptFallback.src =
                    "https://cdn.shopify.com/s/trekkie.storefront.24fd4b2c6888705627a10cc3fd8fbc7486c7007a.min.js";
                first.parentNode.insertBefore(scriptFallback, first);
            };
            script.async = true;
            script.src =
                "https://cdn.shopify.com/s/trekkie.storefront.24fd4b2c6888705627a10cc3fd8fbc7486c7007a.min.js";
            first.parentNode.insertBefore(script, first);
        };
        trekkie.load({
            Trekkie: {
                appName: "storefront",
                development: false,
                defaultAttributes: {
                    shopId: 26426578,
                    isMerchantRequest: null,
                    themeId: 83681083446,
                    themeCityHash: "3747256456864163668",
                    contentLanguage: "en",
                    currency: "USD",
                },
                isServerSideCookieWritingEnabled: true,
                monorailRegion: "shop_domain",
                enabledBetaFlags: ["gtagUseEcommProdIdAsProdId"],
            },
            "Google Analytics": {
                trackingId: "UA-25009516-8",
                domain: "auto",
                siteSpeedSampleRate: "10",
                enhancedEcommerce: true,
                doubleClick: true,
                includeSearch: true,
            },
            "Facebook Pixel": {
                pixelIds: ["1146785409087348", "274740560797229"],
                agent: "plshopify1.2",
            },
            "Google Gtag Pixel": {
                conversionId: "G-3BDNHLGGVE",
                eventLabels: [
                    { type: "purchase", action_label: "G-3BDNHLGGVE" },
                    { type: "page_view", action_label: "G-3BDNHLGGVE" },
                    { type: "view_item", action_label: "G-3BDNHLGGVE" },
                    { type: "search", action_label: "G-3BDNHLGGVE" },
                    { type: "add_to_cart", action_label: "G-3BDNHLGGVE" },
                    { type: "begin_checkout", action_label: "G-3BDNHLGGVE" },
                    { type: "add_payment_info", action_label: "G-3BDNHLGGVE" },
                ],
                targetCountry: "US",
            },
            "Session Attribution": {},
            S2S: {
                facebookCapiEnabled: false,
                facebookAppPixelId: "274740560797229",
                source: "trekkie-storefront-renderer",
            },
        });

        var loaded = false;
        trekkie.ready(function () {
            if (loaded) return;
            loaded = true;

            window.ShopifyAnalytics.lib = window.trekkie;

            ga("require", "linker");
            function addListener(element, type, callback) {
                if (element.addEventListener) {
                    element.addEventListener(type, callback);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, callback);
                }
            }
            function decorate(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                if (
                    target &&
                    (target.getAttribute("action") || target.getAttribute("href"))
                ) {
                    ga(function (tracker) {
                        var linkerParam = tracker.get("linkerParam");
                        document.cookie =
                            "_shopify_ga=" + linkerParam + "; " + "path=/";
                    });
                }
            }
            addListener(window, "load", function () {
                for (var i = 0; i < document.forms.length; i++) {
                    var action = document.forms[i].getAttribute("action");
                    if (action && action.indexOf("/cart") >= 0) {
                        addListener(document.forms[i], "submit", decorate);
                    }
                }
                for (var i = 0; i < document.links.length; i++) {
                    var href = document.links[i].getAttribute("href");
                    if (href && href.indexOf("/checkout") >= 0) {
                        addListener(document.links[i], "click", decorate);
                    }
                }
            });

            var originalDocumentWrite = document.write;
            document.write = customDocumentWrite;
            try {
                window.ShopifyAnalytics.merchantGoogleAnalytics.call(this);
            } catch (error) { }
            document.write = originalDocumentWrite;

            window.ShopifyAnalytics.lib.page(null, { pageType: "home" });

            var match = window.location.pathname.match(
                /checkouts\/(.+)\/(thank_you|post_purchase)/
            );
            var token = match ? match[1] : undefined;
            if (!hasLoggedConversion(token)) {
                setCookieIfConversion(token);
            }
        });

        var eventsListenerScript = document.createElement("script");
        eventsListenerScript.async = true;
        eventsListenerScript.src =
            "//cdn.shopify.com/shopifycloud/shopify/assets/shop_events_listener-65cd0ba3fcd81a1df33f2510ec5bcf8c0e0958653b50e3965ec972dd638ee13f.js";
        document
            .getElementsByTagName("head")[0]
            .appendChild(eventsListenerScript);
    })();


    src = "//cdn.shopify.com/shopifycloud/shopify/assets/shop_events_listener-65cd0ba3fcd81a1df33f2510ec5bcf8c0e0958653b50e3965ec972dd638ee13f.js" ></script >

        (function () {
            if (
                window.BOOMR &&
                (window.BOOMR.version || window.BOOMR.snippetExecuted)
            ) {
                return;
            }
            window.BOOMR = window.BOOMR || {};
            window.BOOMR.snippetStart = new Date().getTime();
            window.BOOMR.snippetExecuted = true;
            window.BOOMR.snippetVersion = 12;
            window.BOOMR.application = "storefront-renderer";
            window.BOOMR.themeName = "Themekit template theme";
            window.BOOMR.themeVersion = "1.0.0";
            window.BOOMR.shopId = 26426578;
            window.BOOMR.themeId = 83681083446;
            window.BOOMR.renderRegion = "gcp-europe-west1";
            window.BOOMR.url =
                "https://cdn.shopify.com/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";
            var where =
                document.currentScript || document.getElementsByTagName("script")[0];
            var parentNode = where.parentNode;
            var promoted = false;
            var LOADER_TIMEOUT = 3000;
            function promote() {
                if (promoted) {
                    return;
                }
                var script = document.createElement("script");
                script.id = "boomr-scr-as";
                script.src = window.BOOMR.url;
                script.async = true;
                parentNode.appendChild(script);
                promoted = true;
            }
            function iframeLoader(wasFallback) {
                promoted = true;
                var dom, bootstrap, iframe, iframeStyle;
                var doc = document;
                var win = window;
                window.BOOMR.snippetMethod = wasFallback ? "if" : "i";
                bootstrap = function (parent, scriptId) {
                    var script = doc.createElement("script");
                    script.id = scriptId || "boomr-if-as";
                    script.src = window.BOOMR.url;
                    BOOMR_lstart = new Date().getTime();
                    parent = parent || doc.body;
                    parent.appendChild(script);
                };
                if (
                    !window.addEventListener &&
                    window.attachEvent &&
                    navigator.userAgent.match(/MSIE [67]./)
                ) {
                    window.BOOMR.snippetMethod = "s";
                    bootstrap(parentNode, "boomr-async");
                    return;
                }
                iframe = document.createElement("IFRAME");
                iframe.src = "about:blank";
                iframe.title = "";
                iframe.role = "presentation";
                iframe.loading = "eager";
                iframeStyle = (iframe.frameElement || iframe).style;
                iframeStyle.width = 0;
                iframeStyle.height = 0;
                iframeStyle.border = 0;
                iframeStyle.display = "none";
                parentNode.appendChild(iframe);
                try {
                    win = iframe.contentWindow;
                    doc = win.document.open();
                } catch (e) {
                    dom = document.domain;
                    iframe.src =
                        "javascript:var d=document.open();d.domain='" +
                        dom +
                        "';void(0);";
                    win = iframe.contentWindow;
                    doc = win.document.open();
                }
                if (dom) {
                    doc._boomrl = function () {
                        this.domain = dom;
                        bootstrap();
                    };
                    doc.write("<body onload='document._boomrl();'>");
                } else {
                    win._boomrl = function () {
                        bootstrap();
                    };
                    if (win.addEventListener) {
                        win.addEventListener("load", win._boomrl, false);
                    } else if (win.attachEvent) {
                        win.attachEvent("onload", win._boomrl);
                    }
                }
                doc.close();
            }
            var link = document.createElement("link");
            if (
                link.relList &&
                typeof link.relList.supports === "function" &&
                link.relList.supports("preload") &&
                "as" in link
            ) {
                window.BOOMR.snippetMethod = "p";
                link.href = window.BOOMR.url;
                link.rel = "preload";
                link.as = "script";
                link.addEventListener("load", promote);
                link.addEventListener("error", function () {
                    iframeLoader(true);
                });
                setTimeout(function () {
                    if (!promoted) {
                        iframeLoader(true);
                    }
                }, LOADER_TIMEOUT);
                BOOMR_lstart = new Date().getTime();
                parentNode.appendChild(link);
            } else {
                iframeLoader(false);
            }
            function boomerangSaveLoadTime(e) {
                window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
            }
            if (window.addEventListener) {
                window.addEventListener("load", boomerangSaveLoadTime, false);
            } else if (window.attachEvent) {
                window.attachEvent("onload", boomerangSaveLoadTime);
            }
            if (document.addEventListener) {
                document.addEventListener("onBoomerangLoaded", function (e) {
                    e.detail.BOOMR.init({
                        ResourceTiming: {
                            enabled: true,
                            trackedResourceTypes: ["script", "img", "css"],
                        },
                    });
                    e.detail.BOOMR.t_end = new Date().getTime();
                });
            } else if (document.attachEvent) {
                document.attachEvent("onpropertychange", function (e) {
                    if (!e) e = event;
                    if (e.propertyName === "onBoomerangLoaded") {
                        e.detail.BOOMR.init({
                            ResourceTiming: {
                                enabled: true,
                                trackedResourceTypes: ["script", "img", "css"],
                            },
                        });
                        e.detail.BOOMR.t_end = new Date().getTime();
                    }
                });
            }
        })();


    (function () {
        if ("sendBeacon" in navigator && "performance" in window) {
            var session_token = document.cookie.match(/_shopify_s=([^;]*)/);
            function handle_abandonment_event(e) {
                var entries = performance.getEntries().filter(function (entry) {
                    return /monorail-edge.shopifysvc.com/.test(entry.name);
                });
                if (!window.abandonment_tracked && entries.length === 0) {
                    window.abandonment_tracked = true;
                    var currentMs = Date.now();
                    var navigation_start = performance.timing.navigationStart;
                    var payload = {
                        shop_id: 26426578,
                        url: window.location.href,
                        navigation_start,
                        duration: currentMs - navigation_start,
                        session_token:
                            session_token && session_token.length === 2
                                ? session_token[1]
                                : "",
                        page_type: "index",
                    };
                    window.navigator.sendBeacon(
                        "https://monorail-edge.shopifysvc.com/v1/produce",
                        JSON.stringify({
                            schema_id: "online_store_buyer_site_abandonment/1.1",
                            payload: payload,
                            metadata: {
                                event_created_at_ms: currentMs,
                                event_sent_at_ms: currentMs,
                            },
                        })
                    );
                }
            }
            window.addEventListener("pagehide", handle_abandonment_event);
        }
    })();

    !(function (o) {
        o.addEventListener("DOMContentLoaded", function () {
            (window.Shopify = window.Shopify || {}),
                (window.Shopify.recaptchaV3 = window.Shopify.recaptchaV3 || {
                    siteKey: "6LcCR2cUAAAAANS1Gpq_mDIJ2pQuJphsSQaUEuc9",
                });
            var t = [
                'form[action*="/contact"] input[name="form_type"][value="contact"]',
                'form[action*="/comments"] input[name="form_type"][value="new_comment"]',
                'form[action*="/account"] input[name="form_type"][value="customer_login"]',
                'form[action*="/account"] input[name="form_type"][value="recover_customer_password"]',
                'form[action*="/account"] input[name="form_type"][value="create_customer"]',
                'form[action*="/contact"] input[name="form_type"][value="customer"]',
            ].join(",");
            function n(e) {
                e = e.target;
                null == e ||
                    (null !=
                        (e = (function e(t, n) {
                            if (null == t.parentElement) return null;
                            if ("FORM" != t.parentElement.tagName)
                                return e(t.parentElement, n);
                            for (var o = t.parentElement.action, r = 0; r < n.length; r++)
                                if (-1 !== o.indexOf(n[r])) return t.parentElement;
                            return null;
                        })(e, ["/contact", "/comments", "/account"])) &&
                        null != e.querySelector(t) &&
                        ((e = o.createElement("script")).setAttribute(
                            "src",
                            "https://cdn.shopify.com/shopifycloud/storefront-recaptcha-v3/v0.6/index.js"
                        ),
                            o.body.appendChild(e),
                            o.removeEventListener("focus", n, !0),
                            o.removeEventListener("change", n, !0),
                            o.removeEventListener("click", n, !0)));
            }
            o.addEventListener("click", n, !0),
                o.addEventListener("change", n, !0),
                o.addEventListener("focus", n, !0);
        });
    })(document);

    window.th_subscription = window.th_subscription || {};
    window.th_subscription.th_subscription_settings = {
        /* Theme Type: 'custom', 'debut', 'simple', 'boundless', 'venture', 'supply', 'narrative' 'brooklyn', 'minimal', 'express' */
        th_sb_theme_type: "express",
        th_sb_update_price: function (
            $thsb_plan_selector,
            $thsb_subscription_prices
        ) {
            let $thsb_page_section = $thsb_plan_selector.closest(
                "div[data-section-type], .shopify-section"
            );
            if (!$thsb_page_section) {
                $thsb_page_section = $thsb_plan_selector.closest("body");
            }
            let $thsb_price_classes = [
                ".thsb_subscription_price_update",
                ".prices .price.on-sale",
                ".total-price span",
                "[id^=productPrice-]",
                ".price .price-item--sale",
                ".price .price-item--regular",
                ".product__price .product__price--reg",
                ".product__price .product__current-price",
                "#productPrice > .visually-hidden",
                ".product__price .price-item--regular",
                "#ProductPrice",
                "#productPrice-product-template",
                ".product-single__price",
            ].join(",");
            let $thsb_price_selected_classes =
                $thsb_page_section.querySelectorAll($thsb_price_classes);
            if ($thsb_price_selected_classes.length === 0) {
                console.log("Contact our support team to update the price.");
                return;
            }
            if (this.th_sb_theme_type === "supply") {
                let th_sb_supply_price =
                    $thsb_subscription_prices.price_formatted.split(".");
                $thsb_price_selected_classes.forEach(function (
                    $thsb_price_selected_class
                ) {
                    $thsb_price_selected_class.innerHTML =
                        th_sb_supply_price[0] +
                        "<sup>" +
                        th_sb_supply_price[1] +
                        "</sup>";
                });
            } else {
                $thsb_price_selected_classes.forEach(function (
                    $thsb_price_selected_class
                ) {
                    $thsb_price_selected_class.innerHTML =
                        $thsb_subscription_prices.thsb_price_formatted;
                });
            }
        },
    };

    (function (th_subscription) {
        let $thsb_settings = th_subscription.th_subscription_settings;
        let $thsb_shop_money = document.querySelector(
            ".th_subscription_money_format"
        )
            ? document
                .querySelector(".th_subscription_money_format")
                .getAttribute("data-money")
            : "";
        let thsb_money_format = function (t, r) {
            function e(t, r) {
                return void 0 === t ? r : t;
            }
            function a(t, r, a, o) {
                if (
                    ((r = e(r, 2)),
                        (a = e(a, ",")),
                        (o = e(o, ".")),
                        isNaN(t) || null == t)
                )
                    return 0;
                t = (t / 100).toFixed(r);
                var n = t.split(".");
                return (
                    n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) +
                    (n[1] ? o + n[1] : "")
                );
            }
            "string" == typeof t && (t = t.replace(".", ""));
            var o = "",
                n = /\{\{\s*(\w+)\s*\}\}/,
                i = r || this.money_format;
            switch (i.match(n)[1]) {
                case "amount":
                    o = a(t, 2);
                    break;
                case "amount_no_decimals":
                    o = a(t, 0);
                    break;
                case "amount_with_comma_separator":
                    o = a(t, 2, ".", ",");
                    break;
                case "amount_with_space_separator":
                    o = a(t, 2, " ", ",");
                    break;
                case "amount_with_period_and_space_separator":
                    o = a(t, 2, " ", ".");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    o = a(t, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    o = a(t, 0, ".", "");
                    break;
                case "amount_with_space_separator":
                    o = a(t, 2, ",", "");
                    break;
                case "amount_with_apostrophe_separator":
                    o = a(t, 2, "'", ".");
            }
            return i.replace(n, o);
        };
        let $thsb_DOMSubtreeModified_config = {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        };
        var $thsb_addEventListener = "addEventListener";

        function $thsb_check_allEqual(arr) {
            return new Set(arr).size == 1;
        }

        function $thsb_product_price_update(
            $thsb_id,
            $thsb_subscription_parents
        ) {
            const $thsb_select_subscription_json = JSON.parse(
                $thsb_subscription_parents.getAttribute("data-product")
            );
            const $thsb_product_variantid = parseInt(
                $thsb_subscription_parents
                    .closest('form[action*="/cart/add"')
                    .querySelector('[name="id"]').value
            );
            const $thsb_variant =
                $thsb_select_subscription_json.thsb_variants_by_id[
                $thsb_product_variantid
                ];
            const $thsb_subscription_id = $thsb_id ? parseInt($thsb_id) : null;
            let $thsb_prices = {
                thsb_price: $thsb_variant.thsb_price,
                thsb_price_formatted: $thsb_variant.thsb_price_formatted,
                thsb_price_fwtz: $thsb_variant.thsb_price_fwtz,
                thsb_compare_price: $thsb_variant.thsb_compare_price,
                thsb_compare_price_formatted:
                    $thsb_variant.thsb_compare_price_formatted,
                thsb_compare_price_fwtz: $thsb_variant.thsb_compare_price_fwtz,
            };
            if ($thsb_subscription_id) {
                $thsb_prices.thsb_price =
                    $thsb_variant.thsb_spabi[$thsb_subscription_id].thsb_price;
                $thsb_prices.thsb_price_formatted =
                    $thsb_variant.thsb_spabi[
                        $thsb_subscription_id
                    ].thsb_price_formatted;
                $thsb_prices.thsb_price_fwtz =
                    $thsb_variant.thsb_spabi[$thsb_subscription_id].thsb_price_fwtz;
                $thsb_prices.thsb_compare_price =
                    $thsb_variant.thsb_spabi[
                        $thsb_subscription_id
                    ].thsb_compare_price;
                $thsb_prices.thsb_compare_price_formatted =
                    $thsb_variant.thsb_spabi[
                        $thsb_subscription_id
                    ].thsb_compare_price_formatted;
                $thsb_prices.thsb_compare_price_fwtz =
                    $thsb_variant.thsb_spabi[
                        $thsb_subscription_id
                    ].thsb_compare_price_fwtz;
            }
            $thsb_settings.th_sb_update_price(
                $thsb_subscription_parents,
                $thsb_prices
            );
            const $thsb_radio_subscription_length =
                $thsb_subscription_parents.querySelectorAll(
                    ".th_subscription_radio_fieldset"
                );
            if ($thsb_radio_subscription_length.length > 0) {
                const $thsb_radio_subscription_selected =
                    $thsb_subscription_parents.querySelector(
                        '.th_subscription_radio_fieldset input[name="th-subscription-plan-selector-group-radio"]:checked'
                    ).value;
                if ($thsb_radio_subscription_selected != "one-time-purchase") {
                    const $thsb_selected_group = $thsb_subscription_parents
                        .querySelector(
                            '[name="th-subscription-plan-selector-group-radio"][value="' +
                            $thsb_radio_subscription_selected +
                            '"]'
                        )
                        .getAttribute("id");
                    $thsb_subscription_parents
                        .querySelectorAll(
                            '[data-id="' +
                            $thsb_selected_group +
                            '"] .th_subscription_radio_spg_plan_detail'
                        )
                        .forEach(function ($thsb_subscription_radio_spg_plan_detail) {
                            const $thsb_radio_loop_val =
                                $thsb_subscription_radio_spg_plan_detail.querySelector(
                                    "input.th_subscription_radio_btn_cls"
                                ).value;
                            const $thsb_product_subscription_price =
                                $thsb_variant.thsb_spabi[$thsb_radio_loop_val]
                                    .thsb_per_delivery_price_formatted;
                            $thsb_subscription_radio_spg_plan_detail.querySelector(
                                ".th_subscription_radio_spg_plan_price"
                            ).innerHTML =
                                '<span class="money">' +
                                $thsb_product_subscription_price +
                                "</span>";
                            if (
                                $thsb_subscription_parents.querySelector(
                                    '[name="selling_plan"]'
                                ).value == ""
                            ) {
                                $thsb_subscription_parents
                                    .querySelectorAll(".th_subscription_radio_btn_cls")
                                    .forEach(function ($thsb_subscription_plan_radio_single) {
                                        $thsb_subscription_plan_radio_single.checked = false;
                                    });
                            }
                        });
                }
            }
        }

        function $thsb_subscription_show_hide_function(
            $thsb_element,
            $thsb_type
        ) {
            if ($thsb_type == "show") {
                $thsb_element.style.display = "inline-block";
            } else {
                $thsb_element.style.display = "none";
            }
        }

        class $thsb_select_subscription_function {
            constructor($thsb_select_subscription_json) {
                this.$thsb_select_subscription_json =
                    $thsb_select_subscription_json;
            }

            $thsb_select_subscription_group(
                $thsb_subscription_id,
                $thsb_select_parents
            ) {
                const $thsb_select_subscription_json =
                    this.$thsb_select_subscription_json;
                const $thsb_subscription_id_val = $thsb_subscription_id
                    ? $thsb_select_subscription_json.thsb_selling_plans_by_id[
                        parseInt($thsb_subscription_id)
                    ].selling_plan_group_id
                    : "";
                const $thsb_subscription = $thsb_select_parents
                    .querySelector(
                        '[name="th-subscription-plan-selector-group"][value="' +
                        $thsb_subscription_id_val +
                        '"]'
                    )
                    .closest(".th_subscription_fieldset");
                const $thsb_variant =
                    $thsb_select_subscription_json.thsb_variants_by_id[
                    parseInt(
                        $thsb_select_parents
                            .closest('form[action*="/cart/add"')
                            .querySelector('[name="id"]').value
                    )
                    ];
                if ($thsb_variant.selling_plan_allocations.length > 0) {
                    $thsb_subscription_show_hide_function(
                        $thsb_select_parents,
                        "show"
                    );
                    $thsb_subscription.querySelector(
                        ".th_subscription_spg_plan select.th_subscription_spg_plan_select"
                    ).value = $thsb_subscription_id;
                    $thsb_select_parents.querySelector(
                        '[name="selling_plan"]'
                    ).value = $thsb_subscription_id;
                    $thsb_select_parents
                        .querySelectorAll(".th_subscription_fieldset")
                        .forEach(function ($thsb_select_subscription_fieldset_single) {
                            $thsb_select_subscription_fieldset_single.classList.remove(
                                "th_subscription_spg_plan_selected"
                            );
                            let $thsb_hide_select_dropdown =
                                $thsb_select_subscription_fieldset_single.querySelector(
                                    ".th_subscription_spg_plan"
                                );
                            $thsb_subscription_show_hide_function(
                                $thsb_hide_select_dropdown,
                                "hide"
                            );
                        });
                    $thsb_subscription.classList.add(
                        "th_subscription_spg_plan_selected"
                    );
                    $thsb_subscription_show_hide_function(
                        $thsb_subscription.querySelector(".th_subscription_spg_plan"),
                        "show"
                    );
                    $thsb_product_price_update(
                        $thsb_subscription_id,
                        $thsb_select_parents
                    );
                } else {
                    $thsb_select_parents.querySelector(
                        '[name="selling_plan"]'
                    ).value = "";
                    $thsb_subscription_show_hide_function(
                        $thsb_select_parents,
                        "hide"
                    );
                }
            }

            $thsb_selectedorfirstsubscription_id($thsb_select_parents) {
                let $thsb_subscription = $thsb_select_parents.querySelectorAll(
                    ".th_subscription_fieldset.th_subscription_spg_plan_selected"
                );
                if (!$thsb_subscription.length) {
                    $thsb_subscription = $thsb_select_parents.querySelectorAll(
                        ".th_subscription_fieldset"
                    )[0];
                } else {
                    $thsb_subscription = $thsb_select_parents.querySelectorAll(
                        ".th_subscription_fieldset.th_subscription_spg_plan_selected"
                    )[0];
                }
                return $thsb_subscription.querySelector("select").value;
            }

            $thsb_select_change_group_variant(
                $thsb_variantid,
                $thsb_select_parents
            ) {
                let $thsb_select_trigger_change = true;
                const $thsb_select_subscription_json =
                    this.$thsb_select_subscription_json;
                const $thsb_selected_variant =
                    $thsb_select_subscription_json.thsb_variants_by_id[
                    $thsb_variantid
                    ];
                const $thsb_subscription = $thsb_select_parents.querySelectorAll(
                    ".th_subscription_fieldset.th_subscription_spg_plan_selected"
                );
                $thsb_select_parents
                    .querySelectorAll(".th_subscription_fieldset")
                    .forEach(function ($thsb_th_subscription_fieldset_single) {
                        const $thsb_id =
                            $thsb_th_subscription_fieldset_single.querySelector(
                                "[name=th-subscription-plan-selector-group]"
                            ).value;
                        const $thsb_available = $thsb_id
                            ? $thsb_selected_variant.thsb_agids[$thsb_id] || false
                            : !$thsb_select_subscription_json.requires_selling_plan;
                        if ($thsb_available) {
                            $thsb_subscription_show_hide_function(
                                $thsb_th_subscription_fieldset_single,
                                "show"
                            );
                            $thsb_th_subscription_fieldset_single.classList.toggle(
                                "thsb_subscription_available"
                            );
                            if ($thsb_subscription.length) {
                                if ($thsb_select_trigger_change) {
                                    $thsb_select_trigger_change = false;
                                    $thsb_select_parents.querySelector(
                                        '[name=th-subscription-plan-selector-group][value="' +
                                        $thsb_id +
                                        '"]'
                                    ).checked = true;
                                    $thsb_select_parents
                                        .querySelector(
                                            '[name=th-subscription-plan-selector-group][value="' +
                                            $thsb_id +
                                            '"]'
                                        )
                                        .dispatchEvent(new Event("change"));
                                }
                            }
                        } else {
                            $thsb_subscription_show_hide_function(
                                $thsb_th_subscription_fieldset_single,
                                "hide"
                            );
                        }
                    });
                this.$thsb_select_subscription_group(
                    this.$thsb_selectedorfirstsubscription_id($thsb_select_parents),
                    $thsb_select_parents
                );
            }

            $thsb_select_changed_variant($thsb_select_parents) {
                let $thsb_select_variant_id = $thsb_select_parents
                    .closest('form[action*="/cart/add"')
                    .querySelector('[name="id"]').value;
                $thsb_select_variant_id = $thsb_select_variant_id
                    ? parseInt($thsb_select_variant_id)
                    : null;
                if (
                    !this.$thsb_select_changed_variant.previousId ||
                    this.$thsb_select_changed_variant.previousId !==
                    $thsb_select_variant_id
                ) {
                    if ($thsb_select_variant_id) {
                        this.$thsb_select_change_group_variant(
                            $thsb_select_variant_id,
                            $thsb_select_parents
                        );
                    }
                }
                this.$thsb_select_changed_variant.previousId =
                    $thsb_select_variant_id;
            }

            $thsb_selected_subscription_group(
                $thsb_change_this,
                $thsb_select_parents
            ) {
                const $thsb_subscription_id = $thsb_select_parents
                    .querySelector(
                        '[name="th-subscription-plan-selector-group"]:checked'
                    )
                    .closest(".th_subscription_fieldset")
                    .querySelector("select.th_subscription_spg_plan_select").value;
                this.$thsb_select_subscription_group(
                    $thsb_subscription_id,
                    $thsb_select_parents
                );
            }
        }

        if (
            document.getElementsByClassName("th_subscription_section").length > 0
        ) {
            const $thsb_select_parents_first = document.querySelector(
                "#thsb_product_subscription_id_0"
            );
            const $thsb_select_subscription_first_json = JSON.parse(
                $thsb_select_parents_first.getAttribute("data-product")
            );
            let $thsb_select_subscription_function_val =
                new $thsb_select_subscription_function(
                    $thsb_select_subscription_first_json
                );
            $thsb_select_subscription_function_val.$thsb_select_changed_variant(
                $thsb_select_parents_first
            );
            if ($thsb_select_subscription_first_json.thsb_selected_selling_plan) {
                $thsb_select_subscription_function_val.$thsb_select_subscription_group(
                    $thsb_select_subscription_first_json.thsb_selected_selling_plan.id.toString(),
                    $thsb_select_parents_first
                );
            }
            setTimeout(function () {
                $thsb_select_subscription_function_val.$thsb_selected_subscription_group(
                    "",
                    $thsb_select_parents_first
                );
            }, 30);
            $thsb_select_subscription_function_val.$thsb_select_changed_variant(
                $thsb_select_parents_first
            );
            document
                .querySelectorAll(".th_subscription_section")
                .forEach(function ($thsb_select_each_loop) {
                    const $thsb_select_product_form = $thsb_select_each_loop.closest(
                        'form[action*="/cart/add"'
                    );
                    $thsb_select_product_form.classList.add(
                        "thsb_product_subscription_select_form"
                    );
                });

            function $thsb_select_subscription_plan_selector_group_function(
                event
            ) {
                const $thsb_select_parents = event.target.closest(
                    ".th_subscription_section"
                );
                const $thsb_select_selected_div =
                    $thsb_select_parents.querySelector(
                        'input[name="th-subscription-plan-selector-group"]:checked'
                    );
                let $thsb_select_subscription_function_val =
                    new $thsb_select_subscription_function(
                        JSON.parse($thsb_select_parents.getAttribute("data-product"))
                    );
                if (event.target.value) {
                    $thsb_select_parents
                        .querySelectorAll(".th_subscription_spg_plan")
                        .forEach(function ($thsb_subscription_spg_plan_single) {
                            $thsb_subscription_show_hide_function(
                                $thsb_subscription_spg_plan_single,
                                "hide"
                            );
                        });
                    $thsb_subscription_show_hide_function(
                        $thsb_select_selected_div
                            .closest(".th_subscription_fieldset")
                            .querySelector(".th_subscription_spg_plan"),
                        "show"
                    );
                    let $thsb_select_subscription_selected_option = event.target
                        .closest(".th_subscription_fieldset")
                        .querySelector(
                            ".th_subscription_spg_plan .th_subscription_spg_plan_select"
                        );
                    if (
                        $thsb_select_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        )
                    ) {
                        $thsb_select_subscription_selected_option =
                            $thsb_select_subscription_selected_option.options[
                                $thsb_select_subscription_selected_option.selectedIndex
                            ].getAttribute("data-description");
                        const $thsb_select_subscription_description =
                            "<p>" + $thsb_select_subscription_selected_option + "</p>";
                        $thsb_select_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        ).innerHTML = $thsb_select_subscription_description;
                    }
                } else {
                    $thsb_select_parents
                        .querySelectorAll(".th_subscription_spg_plan")
                        .forEach(function ($thsb_subscription_spg_plans_hide_single) {
                            $thsb_subscription_show_hide_function(
                                $thsb_subscription_spg_plans_hide_single,
                                "hide"
                            );
                        });
                    if (
                        $thsb_select_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        )
                    ) {
                        var $thsb_select_subscription_description =
                            "<p>" +
                            $thsb_select_parents
                                .querySelector(".thsb_subscription_description_tooltip")
                                .getAttribute("data-default") +
                            "</p>";
                        $thsb_select_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        ).innerHTML = $thsb_select_subscription_description;
                    }
                }
                $thsb_select_subscription_function_val.$thsb_selected_subscription_group(
                    event.target,
                    $thsb_select_parents
                );
            }
            document
                .querySelectorAll(
                    '.th_subscription_section input[name="th-subscription-plan-selector-group"]'
                )
                .forEach(function ($thsb_select_subscription_plan_selector) {
                    $thsb_select_subscription_plan_selector[$thsb_addEventListener](
                        "change",
                        $thsb_select_subscription_plan_selector_group_function
                    );
                });

            function $thsb_select_subscription_spg_plan_select_function(event) {
                const $thsb_select_parents = event.target.closest(
                    ".th_subscription_section"
                );
                let $thsb_select_subscription_function_val =
                    new $thsb_select_subscription_function(
                        JSON.parse($thsb_select_parents.getAttribute("data-product"))
                    );
                if (
                    $thsb_select_parents.querySelector(
                        ".thsb_subscription_description_tooltip"
                    )
                ) {
                    const $thsb_select_subscription_description =
                        "<p>" +
                        event.target.options[event.target.selectedIndex].getAttribute(
                            "data-description"
                        ) +
                        "</p>";
                    $thsb_select_parents.querySelector(
                        ".thsb_subscription_description_tooltip"
                    ).innerHTML = $thsb_select_subscription_description;
                }
                $thsb_select_subscription_function_val.$thsb_selected_subscription_group(
                    event.target,
                    $thsb_select_parents
                );
            }
            document
                .querySelectorAll(
                    ".th_subscription_section select.th_subscription_spg_plan_select"
                )
                .forEach(function (
                    $thsb_select_subscription_spg_plan_select_single
                ) {
                    $thsb_select_subscription_spg_plan_select_single[
                        $thsb_addEventListener
                    ]("change", $thsb_select_subscription_spg_plan_select_function);
                    $thsb_select_subscription_spg_plan_select_single.dispatchEvent(
                        new Event("change")
                    );
                });

            const $thsb_select_DOMSubtreeModified_variable =
                document.querySelector(".thsb_product_subscription_select_form");
            let $thsb_select_observer = new MutationObserver(function (
                $thsb_mutations
            ) {
                $thsb_mutations.forEach(function ($thsb_mutation) {
                    let $thsb_newNodes = $thsb_mutation.addedNodes;
                    if ($thsb_newNodes !== null) {
                        if (
                            $thsb_mutation.target.closest(
                                ".thsb_product_subscription_select_form"
                            )
                        ) {
                            const $thsb_select_parents = $thsb_mutation.target
                                .closest(".thsb_product_subscription_select_form")
                                .querySelector(".th_subscription_section");
                            setTimeout(function () {
                                let $thsb_select_subscription_function_val =
                                    new $thsb_select_subscription_function(
                                        JSON.parse(
                                            $thsb_select_parents.getAttribute("data-product")
                                        )
                                    );
                                $thsb_select_subscription_function_val.$thsb_select_changed_variant(
                                    $thsb_select_parents
                                );
                            }, 50);
                        }
                    }
                });
            });
            $thsb_select_observer.observe(
                $thsb_select_DOMSubtreeModified_variable,
                $thsb_DOMSubtreeModified_config
            );

            document
                .querySelectorAll(
                    ".th_subscription_section .th_subscription_fieldset"
                )
                .forEach(function ($thsb_subscription_fieldset) {
                    let $thsb_selling_plan_allocation_id =
                        $thsb_subscription_fieldset.querySelector(
                            ".th_subscription_fieldset_radio"
                        ).value;
                    let $thsb_min_price_array = [],
                        $thsb_delivery_min_price_array = [],
                        $thsb_sub_discount_array = [],
                        $thsb_sub_discount_type_array = [];
                    $thsb_select_subscription_first_json.variants.forEach(function (
                        $thsb_variant_val,
                        $thsb_variant_idx
                    ) {
                        if ($thsb_variant_val.selling_plan_allocations.length > 0) {
                            $thsb_variant_val.selling_plan_allocations.forEach(function (
                                $thsb_spa_val,
                                $thsb_spa_idx
                            ) {
                                if (
                                    $thsb_selling_plan_allocation_id ==
                                    $thsb_spa_val.selling_plan_group_id
                                ) {
                                    $thsb_min_price_array.push($thsb_spa_val.price);
                                    $thsb_delivery_min_price_array.push(
                                        $thsb_spa_val.per_delivery_price
                                    );
                                }
                            });
                        }
                        if (
                            $thsb_variant_idx ===
                            $thsb_select_subscription_first_json.variants.length - 1
                        ) {
                            if (
                                Array.isArray($thsb_min_price_array) &&
                                $thsb_min_price_array.length
                            ) {
                                let $thsb_array_min_price_same_value = $thsb_check_allEqual(
                                    $thsb_min_price_array
                                );
                                let $thsb_min_final_price = Math.min.apply(
                                    null,
                                    $thsb_min_price_array
                                );
                                let $thsb_delivery_min_final_price = Math.min.apply(
                                    null,
                                    $thsb_delivery_min_price_array
                                );
                                let $thsb_from_label = $thsb_array_min_price_same_value
                                    ? ""
                                    : $thsb_subscription_fieldset
                                        .querySelector(
                                            ".th_subscription_fieldset_discount_min_price"
                                        )
                                        .getAttribute("data-from");
                                let $thsb_delivery_label = $thsb_subscription_fieldset
                                    .querySelector(
                                        ".th_subscription_fieldset_discount_min_price"
                                    )
                                    .getAttribute("data-delivery");
                                if (
                                    $thsb_min_final_price > $thsb_delivery_min_final_price
                                ) {
                                    $thsb_subscription_fieldset.querySelector(
                                        ".th_subscription_fieldset_discount_min_price"
                                    ).innerHTML =
                                        $thsb_from_label +
                                        '<span class="money">' +
                                        thsb_money_format(
                                            $thsb_delivery_min_final_price,
                                            $thsb_shop_money
                                        ) +
                                        "</span> / " +
                                        $thsb_delivery_label;
                                } else {
                                    $thsb_subscription_fieldset.querySelector(
                                        ".th_subscription_fieldset_discount_min_price"
                                    ).innerHTML =
                                        $thsb_from_label +
                                        '<span class="money">' +
                                        thsb_money_format(
                                            $thsb_min_final_price,
                                            $thsb_shop_money
                                        ) +
                                        "</span>";
                                }
                            }
                        }
                    });
                    $thsb_select_subscription_first_json.selling_plan_groups.forEach(
                        function ($thsb_spg_val, $thsb_spg_idx) {
                            if ($thsb_selling_plan_allocation_id == $thsb_spg_val.id) {
                                $thsb_spg_val.selling_plans.forEach(function (
                                    $thsb_sp_val,
                                    $thsb_sp_idx
                                ) {
                                    if (
                                        $thsb_sp_val.price_adjustments.length > 0 &&
                                        $thsb_sp_val.price_adjustments[0].value > 0
                                    ) {
                                        $thsb_sub_discount_array.push(
                                            $thsb_sp_val.price_adjustments[0].value
                                        );
                                        $thsb_sub_discount_type_array.push(
                                            $thsb_sp_val.price_adjustments[0].value_type
                                        );
                                    }
                                    if (
                                        $thsb_sp_idx ===
                                        $thsb_spg_val.selling_plans.length - 1
                                    ) {
                                        if (
                                            Array.isArray($thsb_sub_discount_array) &&
                                            $thsb_sub_discount_array.length
                                        ) {
                                            let $thsb_array_same_value = $thsb_check_allEqual(
                                                $thsb_sub_discount_array
                                            );
                                            let $thsb_array_type_same_value =
                                                $thsb_check_allEqual($thsb_sub_discount_type_array);
                                            if (
                                                $thsb_array_same_value &&
                                                $thsb_array_type_same_value
                                            ) {
                                                if (
                                                    $thsb_sub_discount_type_array[0] == "percentage"
                                                ) {
                                                    $thsb_subscription_fieldset.querySelector(
                                                        ".th_subscription_fieldset_discount_val"
                                                    ).innerHTML =
                                                        "<em>" + $thsb_sub_discount_array[0] + "%</em>";
                                                } else {
                                                    let $thsb_select_save_label =
                                                        $thsb_subscription_fieldset
                                                            .querySelector(
                                                                ".th_subscription_fieldset_discount_val"
                                                            )
                                                            .getAttribute("data-save");
                                                    $thsb_subscription_fieldset.querySelector(
                                                        ".th_subscription_fieldset_discount_val"
                                                    ).innerHTML =
                                                        "<em>" +
                                                        $thsb_select_save_label +
                                                        " " +
                                                        thsb_money_format(
                                                            $thsb_sub_discount_array[0],
                                                            $thsb_shop_money
                                                        ) +
                                                        "</em>";
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    );
                });
        }

        class $thsb_radio_subscription_function {
            constructor($thsb_radio_subscription_json) {
                this.$thsb_radio_subscription_json = $thsb_radio_subscription_json;
            }

            $thsb_radio_select_subscription_group(
                $thsb_radio_subscription_val,
                $thsb_radio_parents
            ) {
                const $thsb_radio_subscription_product =
                    this.$thsb_radio_subscription_json;
                const $thsb_radio_subscription_id = $thsb_radio_subscription_val
                    ? $thsb_radio_subscription_product.thsb_selling_plans_by_id[
                        parseInt($thsb_radio_subscription_val)
                    ].selling_plan_group_id
                    : "";
                const $thsb_radio_variant =
                    $thsb_radio_subscription_product.thsb_variants_by_id[
                    parseInt(
                        $thsb_radio_parents
                            .closest('form[action*="/cart/add"')
                            .querySelector('[name="id"]').value
                    )
                    ];
                if ($thsb_radio_variant.selling_plan_allocations.length > 0) {
                    $thsb_subscription_show_hide_function(
                        $thsb_radio_parents,
                        "show"
                    );
                    if ($thsb_radio_subscription_id) {
                        let $thsb_radio_subscription = $thsb_radio_parents
                            .querySelector(
                                '[name="th-subscription-plan-selector-group-radio"][value="' +
                                $thsb_radio_subscription_id +
                                '"]'
                            )
                            .getAttribute("id");
                        $thsb_radio_parents.querySelector(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_subscription +
                            '"] input.th_subscription_radio_btn_cls[value="' +
                            $thsb_radio_subscription_val +
                            '"]'
                        ).checked = true;
                        $thsb_radio_parents.querySelector(
                            '[name="selling_plan"]'
                        ).value = $thsb_radio_subscription_val;
                        $thsb_product_price_update(
                            $thsb_radio_subscription_val,
                            $thsb_radio_parents
                        );
                    }
                } else {
                    $thsb_radio_parents.querySelector('[name="selling_plan"]').value =
                        "";
                    $thsb_subscription_show_hide_function(
                        $thsb_radio_parents,
                        "hide"
                    );
                }
            }

            $thsb_radio_selectedorfirstsubscription_id($thsb_radio_parents) {
                const $thsb_radio_subscription = $thsb_radio_parents.querySelector(
                    '.th_subscription_radio_fieldset input[name="th-subscription-plan-selector-group-radio"]:checked'
                ).value;
                if ($thsb_radio_subscription != "one-time-purchase") {
                    const $thsb_selected_id = $thsb_radio_parents
                        .querySelector(
                            '.th_subscription_radio_fieldset input[name="th-subscription-plan-selector-group-radio"]:checked'
                        )
                        .getAttribute("id");
                    return $thsb_radio_parents.querySelector(
                        '.th_subscription_radio_interval[data-id="' +
                        $thsb_selected_id +
                        '"] input.th_subscription_radio_btn_cls:checked'
                    ).value;
                } else {
                    return "";
                }
            }

            $thsb_radio_change_group_variant(
                thsb_variantid,
                $thsb_radio_parents
            ) {
                let $thsb_radio_trigger = true;
                const $thsb_radio_subscription_json_val =
                    this.$thsb_radio_subscription_json;
                const $thsb_radio_selected_variant =
                    $thsb_radio_subscription_json_val.thsb_variants_by_id[
                    thsb_variantid
                    ];
                const $thsb_radio_subscription = $thsb_radio_parents.querySelector(
                    '.th_subscription_radio_fieldset input[name="th-subscription-plan-selector-group-radio"]:checked'
                ).value;
                $thsb_radio_parents
                    .querySelectorAll(".th_subscription_radio_fieldset")
                    .forEach(function ($thsb_subscription_radio_fieldset) {
                        const $thsb_radio_agids_id =
                            $thsb_subscription_radio_fieldset.querySelector(
                                '[name="th-subscription-plan-selector-group-radio"]'
                            ).value;
                        const $thsb_radio_available = $thsb_radio_agids_id
                            ? $thsb_radio_selected_variant.thsb_agids[
                            $thsb_radio_agids_id
                            ] || false
                            : !$thsb_radio_subscription_json_val.requires_selling_plan;
                        if ($thsb_radio_available) {
                            $thsb_subscription_show_hide_function(
                                $thsb_subscription_radio_fieldset,
                                "show"
                            );
                            if ($thsb_radio_subscription != "one-time-purchase") {
                                if ($thsb_radio_trigger) {
                                    $thsb_radio_trigger = false;
                                    $thsb_subscription_radio_fieldset.querySelector(
                                        '[name="th-subscription-plan-selector-group-radio"][value="' +
                                        $thsb_radio_agids_id +
                                        '"]'
                                    ).checked = true;
                                    $thsb_subscription_radio_fieldset
                                        .querySelector(
                                            '[name="th-subscription-plan-selector-group-radio"][value="' +
                                            $thsb_radio_agids_id +
                                            '"]'
                                        )
                                        .dispatchEvent(new Event("change"));
                                }
                            }
                        } else {
                            if ($thsb_radio_agids_id != "one-time-purchase") {
                                $thsb_subscription_show_hide_function(
                                    $thsb_subscription_radio_fieldset,
                                    "hide"
                                );
                            }
                        }
                    });
                this.$thsb_radio_select_subscription_group(
                    this.$thsb_radio_selectedorfirstsubscription_id(
                        $thsb_radio_parents
                    ),
                    $thsb_radio_parents
                );
            }

            $thsb_radio_changed_variant($thsb_radio_parents) {
                let $thsb_radio_variant_id = $thsb_radio_parents
                    .closest('form[action*="/cart/add"')
                    .querySelector('[name="id"]').value;
                $thsb_radio_variant_id = $thsb_radio_variant_id
                    ? parseInt($thsb_radio_variant_id)
                    : null;
                if (
                    !this.$thsb_radio_changed_variant.previousId ||
                    this.$thsb_radio_changed_variant.previousId !=
                    $thsb_radio_variant_id
                ) {
                    if ($thsb_radio_variant_id) {
                        this.$thsb_radio_changed_variant.previousId =
                            $thsb_radio_variant_id;
                        this.$thsb_radio_change_group_variant(
                            $thsb_radio_variant_id,
                            $thsb_radio_parents
                        );
                    }
                }
            }

            $thsb_radio_selected_subscription_group($thsb_radio_parents) {
                const $thsb_radio_subscription_val =
                    $thsb_radio_parents.querySelector(
                        '[name="th-subscription-plan-selector-group-radio"]:checked'
                    ).value;
                if ($thsb_radio_subscription_val != "one-time-purchase") {
                    const $thsb_radio_id = $thsb_radio_parents
                        .querySelector(
                            '[name="th-subscription-plan-selector-group-radio"]:checked'
                        )
                        .getAttribute("id");
                    let $thsb_radio_subscription_id =
                        $thsb_radio_parents.querySelector(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_id +
                            '"] input.th_subscription_radio_btn_cls:checked'
                        );
                    if (!$thsb_radio_subscription_id) {
                        $thsb_radio_parents.querySelectorAll(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_id +
                            '"] input.th_subscription_radio_btn_cls'
                        )[0].checked = true;
                        $thsb_radio_subscription_id = $thsb_radio_parents.querySelector(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_id +
                            '"] input.th_subscription_radio_btn_cls:checked'
                        ).value;
                    } else {
                        $thsb_radio_subscription_id = $thsb_radio_parents.querySelector(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_id +
                            '"] input.th_subscription_radio_btn_cls:checked'
                        ).value;
                    }
                    this.$thsb_radio_select_subscription_group(
                        $thsb_radio_subscription_id,
                        $thsb_radio_parents
                    );
                } else {
                    $thsb_radio_parents.querySelector(
                        ".th_subscription_radio_interval input.th_subscription_radio_btn_cls"
                    ).checked = false;
                    $thsb_product_price_update(null, $thsb_radio_parents);
                }
            }
        }

        if (
            document.getElementsByClassName("th_subscription_radio_section")
                .length > 0
        ) {
            const $thsb_radio_parents_first = document.querySelector(
                "#thsb_product_subscription_id_0"
            );
            const $thsb_radio_subscription_first_json = JSON.parse(
                $thsb_radio_parents_first.getAttribute("data-product")
            );
            let $thsb_radio_subscription_function_val =
                new $thsb_radio_subscription_function(
                    $thsb_radio_subscription_first_json
                );
            if ($thsb_radio_subscription_first_json.thsb_selected_selling_plan) {
                $thsb_radio_subscription_function_val.$thsb_radio_select_subscription_group(
                    $thsb_radio_subscription_first_json.thsb_selected_selling_plan.id.toString(),
                    $thsb_radio_parents_first
                );
            }
            setTimeout(function () {
                $thsb_radio_subscription_function_val.$thsb_radio_selected_subscription_group(
                    $thsb_radio_parents_first
                );
            }, 30);
            $thsb_radio_subscription_function_val.$thsb_radio_changed_variant(
                $thsb_radio_parents_first
            );
            document
                .querySelectorAll(".th_subscription_radio_section")
                .forEach(function ($thsb_radio_each_loop) {
                    const $thsb_radio_product_form = $thsb_radio_each_loop.closest(
                        'form[action*="/cart/add"'
                    );
                    $thsb_radio_product_form.classList.add(
                        "th_subscription_radio_section_form"
                    );
                });

            function $thsb_radio_subscription_plan_selector_group_function(
                event
            ) {
                const $thsb_radio_parents = event.target.closest(
                    ".th_subscription_radio_section"
                );
                const $thsb_radio_id = $thsb_radio_parents
                    .querySelector(
                        'input[name="th-subscription-plan-selector-group-radio"]:checked'
                    )
                    .getAttribute("id");
                let $thsb_radio_subscription_function_val =
                    new $thsb_radio_subscription_function(
                        JSON.parse($thsb_radio_parents.getAttribute("data-product"))
                    );
                $thsb_radio_parents
                    .querySelectorAll(".th_subscription_radio_interval")
                    .forEach(function ($thsb_subscription_radio_interval) {
                        $thsb_subscription_show_hide_function(
                            $thsb_subscription_radio_interval,
                            "hide"
                        );
                    });
                if (
                    $thsb_radio_parents.querySelectorAll(
                        '.th_subscription_radio_interval[data-id="' +
                        $thsb_radio_id +
                        '"]'
                    ).length > 0
                ) {
                    $thsb_subscription_show_hide_function(
                        $thsb_radio_parents.querySelector(
                            '.th_subscription_radio_interval[data-id="' +
                            $thsb_radio_id +
                            '"]'
                        ),
                        "show"
                    );
                    if (
                        $thsb_radio_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        )
                    ) {
                        const $thsb_radio_subscription_description =
                            "<p>" +
                            $thsb_radio_parents
                                .querySelector(
                                    '.th_subscription_radio_interval[data-id="' +
                                    $thsb_radio_id +
                                    '"] .th_subscription_radio_spg_plan_detail'
                                )
                                .getAttribute("data-description") +
                            "</p>";
                        $thsb_radio_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        ).innerHTML = $thsb_radio_subscription_description;
                    }
                } else {
                    $thsb_radio_parents.querySelector('[name="selling_plan"]').value =
                        "";
                    if (
                        $thsb_radio_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        )
                    ) {
                        var $thsb_radio_subscription_description =
                            "<p>" +
                            $thsb_radio_parents
                                .querySelector(".thsb_subscription_description_tooltip")
                                .getAttribute("data-default") +
                            "</p>";
                        $thsb_radio_parents.querySelector(
                            ".thsb_subscription_description_tooltip"
                        ).innerHTML = $thsb_radio_subscription_description;
                    }
                }
                $thsb_radio_subscription_function_val.$thsb_radio_selected_subscription_group(
                    $thsb_radio_parents
                );
            }
            document
                .querySelectorAll(
                    '.th_subscription_radio_section input[name="th-subscription-plan-selector-group-radio"]'
                )
                .forEach(function ($thsb_radio_subscription_plan_selector) {
                    $thsb_radio_subscription_plan_selector[$thsb_addEventListener](
                        "change",
                        $thsb_radio_subscription_plan_selector_group_function
                    );
                    $thsb_radio_subscription_plan_selector.dispatchEvent(
                        new Event("change")
                    );
                });

            function $thsb_radio_subscription_interval_selector_group_function(
                event
            ) {
                const $thsb_radio_parents = event.target.closest(
                    ".th_subscription_radio_section"
                );
                let $thsb_radio_subscription_function_val =
                    new $thsb_radio_subscription_function(
                        JSON.parse($thsb_radio_parents.getAttribute("data-product"))
                    );
                Array.from(
                    event.target
                        .closest(".th_subscription_radio_interval")
                        .querySelectorAll("input.th_subscription_radio_btn_cls"),
                    (input) => (input.checked = false)
                );
                event.target.checked = true;
                if (
                    $thsb_radio_parents.querySelector(
                        ".thsb_subscription_description_tooltip"
                    )
                ) {
                    const $thsb_radio_subscription_description =
                        "<p>" +
                        event.target
                            .closest(".th_subscription_radio_spg_plan_detail")
                            .getAttribute("data-description") +
                        "</p>";
                    $thsb_radio_parents.querySelector(
                        ".thsb_subscription_description_tooltip"
                    ).innerHTML = $thsb_radio_subscription_description;
                }
                $thsb_radio_subscription_function_val.$thsb_radio_selected_subscription_group(
                    $thsb_radio_parents
                );
            }
            document
                .querySelectorAll("input.th_subscription_radio_btn_cls")
                .forEach(function ($thsb_radio_subscription_interval_selector) {
                    $thsb_radio_subscription_interval_selector[
                        $thsb_addEventListener
                    ](
                        "change",
                        $thsb_radio_subscription_interval_selector_group_function
                    );
                });

            const $thsb_radio_DOMSubtreeModified_variable =
                document.querySelector(".th_subscription_radio_section_form");
            let $thsb_radio_observer = new MutationObserver(function (
                $thsb_mutations
            ) {
                $thsb_mutations.forEach(function ($thsb_mutation) {
                    let $thsb_newNodes = $thsb_mutation.addedNodes;
                    if ($thsb_newNodes !== null) {
                        if (
                            $thsb_mutation.target.closest(
                                ".th_subscription_radio_section_form"
                            )
                        ) {
                            const $thsb_radio_parents = $thsb_mutation.target
                                .closest(".th_subscription_radio_section_form")
                                .querySelector(".th_subscription_radio_section");
                            const $thsb_radio_subscription_json = JSON.parse(
                                $thsb_radio_parents.getAttribute("data-product")
                            );
                            setTimeout(function () {
                                let $thsb_radio_subscription_function_val =
                                    new $thsb_radio_subscription_function(
                                        $thsb_radio_subscription_json
                                    );
                                $thsb_radio_subscription_function_val.$thsb_radio_changed_variant(
                                    $thsb_radio_parents
                                );
                            }, 50);
                        }
                    }
                });
            });
            $thsb_radio_observer.observe(
                $thsb_radio_DOMSubtreeModified_variable,
                $thsb_DOMSubtreeModified_config
            );

            document
                .querySelectorAll(
                    ".th_subscription_radio_section .th_subscription_radio_fieldset"
                )
                .forEach(function ($thsb_radio_subscription_fieldset) {
                    let $thsb_radio_selling_plan_allocation_id =
                        $thsb_radio_subscription_fieldset.querySelector(
                            ".th_subscription_radio_btn_cls_group"
                        ).value;
                    let $thsb_radio_min_price_array = [],
                        $thsb_radio_delivery_min_price_array = [],
                        $thsb_radio_sub_discount_array = [],
                        $thsb_radio_sub_discount_type_array = [];
                    $thsb_radio_subscription_first_json.variants.forEach(function (
                        $thsb_radio_variant_val,
                        $thsb_radio_variant_idx
                    ) {
                        if (
                            $thsb_radio_variant_val.selling_plan_allocations.length > 0
                        ) {
                            $thsb_radio_variant_val.selling_plan_allocations.forEach(
                                function ($thsb_radio_spa_val, $thsb_radio_spa_idx) {
                                    if (
                                        $thsb_radio_selling_plan_allocation_id ==
                                        $thsb_radio_spa_val.selling_plan_group_id
                                    ) {
                                        $thsb_radio_min_price_array.push(
                                            $thsb_radio_spa_val.price
                                        );
                                        $thsb_radio_delivery_min_price_array.push(
                                            $thsb_radio_spa_val.per_delivery_price
                                        );
                                    }
                                }
                            );
                        }
                        if (
                            $thsb_radio_variant_idx ===
                            $thsb_radio_subscription_first_json.variants.length - 1
                        ) {
                            if (
                                Array.isArray($thsb_radio_min_price_array) &&
                                $thsb_radio_min_price_array.length
                            ) {
                                let $thsb_radio_array_min_price_same_value =
                                    $thsb_check_allEqual($thsb_radio_min_price_array);
                                let $thsb_radio_min_final_price = Math.min.apply(
                                    null,
                                    $thsb_radio_min_price_array
                                );
                                let $thsb_radio_delivery_min_final_price = Math.min.apply(
                                    null,
                                    $thsb_radio_delivery_min_price_array
                                );
                                let $thsb_radio_from_label =
                                    $thsb_radio_array_min_price_same_value
                                        ? ""
                                        : $thsb_radio_subscription_fieldset
                                            .querySelector(
                                                ".th_subscription_radio_fieldset_discount_min_price"
                                            )
                                            .getAttribute("data-from");
                                let $thsb_radio_delivery_label =
                                    $thsb_radio_subscription_fieldset
                                        .querySelector(
                                            ".th_subscription_radio_fieldset_discount_min_price"
                                        )
                                        .getAttribute("data-delivery");
                                if (
                                    $thsb_radio_min_final_price >
                                    $thsb_radio_delivery_min_final_price
                                ) {
                                    $thsb_radio_subscription_fieldset.querySelector(
                                        ".th_subscription_radio_fieldset_discount_min_price"
                                    ).innerHTML =
                                        $thsb_radio_from_label +
                                        '<span class="money">' +
                                        thsb_money_format(
                                            $thsb_radio_delivery_min_final_price,
                                            $thsb_shop_money
                                        ) +
                                        "</span>/" +
                                        $thsb_radio_delivery_label;
                                } else {
                                    $thsb_radio_subscription_fieldset.querySelector(
                                        ".th_subscription_radio_fieldset_discount_min_price"
                                    ).innerHTML =
                                        $thsb_radio_from_label +
                                        '<span class="money">' +
                                        thsb_money_format(
                                            $thsb_radio_min_final_price,
                                            $thsb_shop_money
                                        ) +
                                        "</span>";
                                }
                            }
                        }
                    });
                    $thsb_radio_subscription_first_json.selling_plan_groups.forEach(
                        function ($thsb_radio_spg_val, $thsb_radio_spg_idx) {
                            if (
                                $thsb_radio_selling_plan_allocation_id ==
                                $thsb_radio_spg_val.id
                            ) {
                                $thsb_radio_spg_val.selling_plans.forEach(function (
                                    $thsb_radio_sp_val,
                                    $thsb_radio_sp_idx
                                ) {
                                    if (
                                        $thsb_radio_sp_val.price_adjustments.length > 0 &&
                                        $thsb_radio_sp_val.price_adjustments[0].value > 0
                                    ) {
                                        $thsb_radio_sub_discount_array.push(
                                            $thsb_radio_sp_val.price_adjustments[0].value
                                        );
                                        $thsb_radio_sub_discount_type_array.push(
                                            $thsb_radio_sp_val.price_adjustments[0].value_type
                                        );
                                    }
                                    if (
                                        $thsb_radio_sp_idx ===
                                        $thsb_radio_spg_val.selling_plans.length - 1
                                    ) {
                                        if (
                                            Array.isArray($thsb_radio_sub_discount_array) &&
                                            $thsb_radio_sub_discount_array.length
                                        ) {
                                            let $thsb_radio_array_same_value =
                                                $thsb_check_allEqual(
                                                    $thsb_radio_sub_discount_array
                                                );
                                            let $thsb_radio_array_type_same_value =
                                                $thsb_check_allEqual(
                                                    $thsb_radio_sub_discount_type_array
                                                );
                                            if (
                                                $thsb_radio_array_same_value &&
                                                $thsb_radio_array_type_same_value
                                            ) {
                                                if (
                                                    $thsb_radio_sub_discount_type_array[0] ==
                                                    "percentage"
                                                ) {
                                                    $thsb_radio_subscription_fieldset.querySelector(
                                                        ".th_subscription_radio_fieldset_discount_val"
                                                    ).innerHTML =
                                                        "<em>" +
                                                        $thsb_radio_sub_discount_array[0] +
                                                        "%</em>";
                                                } else {
                                                    let $thsb_radio_save_label =
                                                        $thsb_radio_subscription_fieldset
                                                            .querySelector(
                                                                ".th_subscription_radio_fieldset_discount_val"
                                                            )
                                                            .getAttribute("data-save");
                                                    $thsb_radio_subscription_fieldset.querySelector(
                                                        ".th_subscription_radio_fieldset_discount_val"
                                                    ).innerHTML =
                                                        "<em>" +
                                                        $thsb_radio_save_label +
                                                        " " +
                                                        thsb_money_format(
                                                            $thsb_radio_sub_discount_array[0],
                                                            $thsb_shop_money
                                                        ) +
                                                        "</em>";
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    );
                });
        }

        if (
            document.getElementsByClassName("thsb_csa_model_section").length >
            0 &&
            Shopify
        ) {
            setTimeout(function () {
                document
                    .querySelectorAll(".thsb_csa_model_country_select")
                    .forEach(function () {
                        const countrySelector = "thsb_csa_country";
                        const provinceSelector = "thsb_csa_province";
                        const containerSelector = "thsb_csa_province_div";
                        new Shopify.CountryProvinceSelector(
                            countrySelector,
                            provinceSelector,
                            {
                                hideElement: containerSelector,
                            }
                        );
                    });
            }, 1000);
        }

        document
            .querySelectorAll(".thsb_cp_detail_csa_btn")
            .forEach(function ($thsb_subscription_cp_detail_csa_btn) {
                $thsb_subscription_cp_detail_csa_btn[$thsb_addEventListener](
                    "click",
                    function (event) {
                        if (
                            !document
                                .getElementsByClassName("thsb_csa_model_section")[0]
                                .classList.contains("thsb_csa_model_show")
                        ) {
                            document
                                .getElementsByClassName("thsb_csa_model_section")[0]
                                .classList.add("thsb_csa_model_show");
                        }
                    }
                );
            });

        document
            .querySelectorAll(".thsb_csa_model_close_btn")
            .forEach(function ($thsb_subscription_csa_model_close_btn) {
                $thsb_subscription_csa_model_close_btn[$thsb_addEventListener](
                    "click",
                    function (event) {
                        if (
                            document
                                .getElementsByClassName("thsb_csa_model_section")[0]
                                .classList.contains("thsb_csa_model_show")
                        ) {
                            document
                                .getElementsByClassName("thsb_csa_model_section")[0]
                                .classList.remove("thsb_csa_model_show");
                        }
                    }
                );
            });

        document
            .querySelectorAll(".thsb_cp_change_date_btn")
            .forEach(function ($thsb_subscription_change_date_btn) {
                $thsb_subscription_change_date_btn[$thsb_addEventListener](
                    "click",
                    function (event) {
                        if (
                            !document
                                .getElementsByClassName("thsb_cp_change_date_model")[0]
                                .classList.contains("thsb_csa_model_show")
                        ) {
                            document
                                .getElementsByClassName("thsb_cp_change_date_model")[0]
                                .classList.add("thsb_csa_model_show");
                        }
                    }
                );
            });

        document
            .querySelectorAll(".thsb_cp_change_date_close_btn")
            .forEach(function ($thsb_subscription_change_date_close_btn) {
                $thsb_subscription_change_date_close_btn[$thsb_addEventListener](
                    "click",
                    function (event) {
                        if (
                            document
                                .getElementsByClassName("thsb_cp_change_date_model")[0]
                                .classList.contains("thsb_csa_model_show")
                        ) {
                            document
                                .getElementsByClassName("thsb_cp_change_date_model")[0]
                                .classList.remove("thsb_csa_model_show");
                        }
                    }
                );
            });

        if (
            document.getElementsByClassName("th_subscription_cp_link").length > 0
        ) {
            document
                .querySelectorAll(".th_subscription_cp_link")
                .forEach(function ($thsb_subscription_cp_link) {
                    const $thsb_cp_url =
                        "/apps/subscription-customer/customer-portal/" +
                        $thsb_subscription_cp_link.getAttribute("data-cid") +
                        "/" +
                        window.btoa(Shopify.shop);
                    $thsb_subscription_cp_link.href = $thsb_cp_url;
                });
        }

        function $thsb_subscription_tab_click_function(event) {
            const $this_id = event.target.getAttribute("href");
            if (
                document
                    .querySelectorAll($this_id)[0]
                    .classList.contains("thsb_cp_active_tab")
            ) {
                return false;
            } else {
                for (const $thsb_cp_subscription_listing of document.querySelectorAll(
                    ".thsb_cp_subscription_tab_contants .thsb_cp_subscription_listing"
                )) {
                    $thsb_cp_subscription_listing.classList.remove(
                        "thsb_cp_active_tab"
                    );
                }
                document
                    .querySelectorAll($this_id)[0]
                    .classList.add("thsb_cp_active_tab");
                const $thsb_remove_active_class = event.target
                    .closest(".thsb_cp_subscription_tab_ul")
                    .querySelectorAll("a");
                $thsb_remove_active_class.forEach(function (
                    $thsb_remove_active_single
                ) {
                    $thsb_remove_active_single.classList.remove("thsb_cp_active_tab");
                });
                event.target.classList.add("thsb_cp_active_tab");
            }
        }
        document
            .querySelectorAll(
                ".thsb_cp_subscription_tabs .thsb_cp_subscription_tab_li a"
            )
            .forEach(function ($thsb_subscription_tab_click) {
                $thsb_subscription_tab_click[$thsb_addEventListener](
                    "click",
                    $thsb_subscription_tab_click_function
                );
            });
    })(window.th_subscription);

    window.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    window.LOCALE = "en";
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
        "The information provided is invalid. Please review the field format and try again.";

    window.REQUIRED_ERROR_MESSAGE = "Please fill in this information. ";

    window.GENERIC_INVALID_MESSAGE =
        "The information provided is invalid. Please review the field format and try again.";

    window.translation = {
        common: {
            selectedList: "{quantity} list selected",
            selectedLists: "{quantity} lists selected",
        },
    };

    if (!window.AppstleIncluded) {
        window.AppstleIncluded = true;
        window.RS = Window.RS || {};
        RS.Config = {
            selectors: {
                payment_button_selectors:
                    "form[action$='/cart/add'] .shopify-payment-button",
                subscriptionLinkSelector: "",
                atcButtonPlacement: "BEFORE",
                subscriptionLinkPlacement: "BEFORE",
                cartRowSelector: "",
                cartLineItemSelector: "",
                cartLineItemPerQuantityPriceSelector: "",
                cartLineItemTotalPriceSelector: "",
                cartLineItemSellingPlanNameSelector: "",
                cartSubTotalSelector: "",
                cartLineItemPriceSelector: "",
            },
            enableCartWidgetFeature: "false",
            useUrlWithCustomerId: "true",
            atcButtonSelector: "",
            moneyFormat: "${{amount}}",
            oneTimePurchaseText:
                '<span class="pack-option">One-Time Payment<\/span><br>$29 \u2013 <span class="writer">No Updates<\/span>',
            shop: "pangrampangram.myshopify.com",
            deliveryText: "delivery",
            purchaseOptionsText: "",
            manageSubscriptionButtonText: "Manage Subscription",
            subscriptionOptionText:
                '<span class="pack-option">VIPP\u00AE FSP Membership<\/span><br>$29 \/ Year \u2013 <span class="writer">Cancel Anytime<\/span>',
            sellingPlanSelectTitle: "",
            subscriptionPriceDisplayText: "",
            tooltipTitle: "Subscription detail",
            showTooltipOnClick: "false",
            tooltipDesctiption:
                "<strong>Have complete control of your subscriptions<\/strong><br\/><br\/>Skip, reschedule, edit, or cancel deliveries anytime, based on your needs.",
            tooltipDescriptionOnPrepaidPlan:
                "<b>Prepaid Plan Details<\/b><\/br> Total price: {{totalPrice}} ( Price for every delivery: {{pricePerDelivery}})",
            tooltipDescriptionOnMultipleDiscount:
                "<b>Discount Details<\/b><\/br> Initial discount is {{discountOne}} and then {{discountTwo}}",
            tooltipDescriptionCustomization:
                "{{{defaultTooltipDescription}}} <\/br>  {{{prepaidDetails}}} <\/br> {{{discountDetails}}}",
            orderStatusManageSubscriptionTitle: "Subscription",
            orderStatusManageSubscriptionDescription:
                "Continue to your account to view and manage your subscriptions. Please use the same email address that you used to buy the subscription.",
            orderStatusManageSubscriptionButtonText: "Manage your subscription",
            subscriptionOptionSelectedByDefault: true,
            totalPricePerDeliveryText: "{{prepaidPerDeliveryPrice}}\/delivery",
            memberOnlySellingPlansJson: {},
            nonMemberOnlySellingPlansJson: {},
            sellingPlansJson: [
                {
                    frequencyCount: 1,
                    frequencyInterval: "YEAR",
                    billingFrequencyCount: 1,
                    billingFrequencyInterval: "YEAR",
                    frequencyName: "Charged Yearly — Cancel Anytime",
                    afterCycle1: 0,
                    afterCycle2: 0,
                    discountEnabled: false,
                    discountEnabled2: false,
                    discountEnabledMasked: false,
                    discountEnabled2Masked: false,
                    id: "gid://shopify/SellingPlan/7748813103",
                    frequencyType: "ON_PURCHASE_DAY",
                    specificDayEnabled: false,
                    cutOff: 0,
                    prepaidFlag: "false",
                    idNew: "gid://shopify/SellingPlan/7748813103",
                    planType: "PAY_AS_YOU_GO",
                    deliveryPolicyPreAnchorBehavior: "ASAP",
                    freeTrialEnabled: false,
                    memberOnly: false,
                    nonMemberOnly: false,
                    formFieldJson: "null",
                    appstleCycles: [],
                },
            ],
            widgetEnabled: true,
            showTooltip: false,
            sortByDefaultSequence: false,
            showSubOptionBeforeOneTime: true,
            showStaticTooltip: false,
            showAppstleLink: false,
            sellingPlanTitleText: "",
            oneTimePriceText: "",
            selectedPayAsYouGoSellingPlanPriceText: "",
            selectedPrepaidSellingPlanPriceText: " {{totalPrice}}",
            selectedDiscountFormat: "SAVE {{selectedDiscountPercentage}}",
            manageSubscriptionBtnFormat:
                "<a href='apps\/subscriptions' class='appstle_manageSubBtn' ><button class='btn' style='padding: 2px 20px'>Manage Subscription<\/button><a><br><br>",
            manageSubscriptionUrl: "apps\/subscriptions",
            appstlePlanId: 163,
            showCheckoutSubscriptionBtn: true,
            priceSelector: "",
            landingPagePriceSelector: "",
            quickViewClickSelector: "",
            badgeTop: "",
            pricePlacement: "BEFORE",
            disableLoadingJquery: false,
            widgetEnabledOnSoldVariant: "false",
            switchRadioButtonWidget: false,
            appstlePlanName: "BUSINESS",
            appstlePlanFeatures: {
                subscriptionOrderAmount: 30000.0,
                analytics: true,
                enableSubscriptionManagement: true,
                enableDunningManagement: true,
                enableCustomerPortalSettings: true,
                enableShippingProfiles: true,
                enableProductSwapAutomation: true,
                enableAdvancedSellingPlans: true,
                enableSummaryReports: true,
                enableCustomEmailDomain: true,
                enableWidgetPlacement: true,
                enableIntegrations: true,
                enableSmsAlert: false,
                enableCustomEmailHtml: true,
                enableCancellationManagement: true,
                enableBundling: true,
                enableAutomation: true,
                enableQuickActions: false,
                enableExternalApi: false,
                enableCartWidget: true,
                enableAutoSync: true,
                webhookAccess: false,
                accessWidgetDesignOptions: true,
                accessSubscriptionActivityLogs: true,
                accessBuildABox: true,
                accessResendEmail: true,
                accessKlaviyoContactSync: true,
                accessOneTimeProductUpsells: true,
                accessAdvanceSubscriptionPlanOptions: true,
                accessSplitContract: true,
                accessDiscountOnCancellationAttempt: true,
                accessQuickCheckout: false,
                accessSubscriberLoyaltyFeatures: true,
                accessBundling: true,
                accessManualSubscriptionCreation: true,
                accessAppstleMenu: false,
            },
            formMappingAttributeName: "",
            formMappingAttributeSelector: "",
            quickViewModalPollingSelector: "",
            scriptLoadDelay: "0",
            formatMoneyOverride: "false",
            appstle_app_proxy_path_prefix: "apps\/subscriptions",
            updatePriceOnQuantityChange: "",
            widgetParentSelector: "",
            quantitySelector: "",
            enableAddJSInterceptor: "false",
            reBuyEnabled: "false",
            loyaltyDetailsLabelText: "",
            loyaltyPerkDescriptionText: "",
            widgetTemplateHtml: `{% raw %}{% endraw %}`,

            bundle: {},

            labels:
                '{"appstle.subscription.wg.yearsFrequencyTextV2":"Years","appstle.subscription.wg.weekFrequencyTextV2":"Week","appstle.subscription.wg.oneTimePurchaseTextV2":"One Time Purchase","appstle.subscription.wg.loyaltyPerkDescriptionTextV2":"{{#isDiscountTypeFreeProduct}}<div style=\'display: flex;\'><div style=\'height: 60px; width: 60px; flex-shrink: 0; margin-right: 10px;\'><img style=\'width: 100%\' src={{{featured_image}}}><\/img><\/div><div>After {{{billingCycleBlock}}} orders,<span style=\'color: #ffc000;font-weight: 700;\';> get a FREE {{freeProductName}} <\/span><\/div><div>{{\/isDiscountTypeFreeProduct}}{{#isDiscountTypePercentage}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>{{{discount}}}% OFF your entire order<\/span><\/span>.{{\/isDiscountTypePercentage}}{{#isDiscountTypeShipping}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>shipping at {{{formatDiscountedPrice}}}<\/span><\/span>.{{\/isDiscountTypeShipping}}{{#isDiscountTypeFixed}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>{{{formatDiscountedPrice}}} OFF your entire order<\/span><\/span>.{{\/isDiscountTypeFixed}}","appstle.subscription.wg.unsubscribeFrequencyTextV2":"unsubscribe","appstle.subscription.wg.weeksFrequencyTextV2":"Weeks","appstle.subscription.wg.oneTimeFrequencyTextV2":"No updates","appstle.subscription.wg.dayFrequencyTextV2":"day","appstle.subscription.wg.allowFulfilmentCountViaPropertiesV2":"false","appstle.subscription.wg.monthsFrequencyTextV2":"Months","appstle.subscription.wg.deliveryEveryFrequencyTextV2":"Delivery Every","appstle.subscription.wg.subscribeAndSaveInitalV2":"Subscribe & save","appstle.subscription.wg.offFrequencyTextV2":"Off","appstle.subscription.wg.yearFrequencyTextV2":"Year","appstle.subscription.wg.daysFrequencyTextV2":"Days","appstle.subscription.wg.subscribeAndSaveSuccessV2":"Subscribe success","appstle.subscription.wg.monthFrequencyTextV2":"Month","appstle.subscription.wg.selectDeliverOptionV2":"select deliver option"}',

            css: {
                appstle_subscription_widget: {
                    "margin-top": "",
                    "margin-bottom": "",
                },

                appstle_subscription_wrapper: {
                    "border-width": "0px",
                    "border-color": "",
                },

                appstle_circle: {
                    "border-color": "#ff7a00",
                },

                appstle_dot: {
                    "background-color": "#ff7a00",
                },

                appstle_select: {
                    "padding-top": "",
                    "padding-bottom": "",
                    "padding-left": "",
                    "padding-right": "",
                    "border-width": "",
                    "border-style": "",
                    "border-color": "",
                    "border-radius": "",
                },

                tooltip_subscription_svg: {
                    fill: "",
                },

                appstle_tooltip: {
                    color: "",
                    "background-color": "",
                },

                appstle_tooltip_border_top_color: {
                    "border-top-color": "",
                },

                appstle_subscription_final_price: {
                    color: "",
                },
                appstle_widget_text_color: {
                    color: "",
                },
                appstle_selected_background: {
                    background: "transparent",
                },
                elementCSS: "",
                customCSS: "",
                customerPortalCss:
                    'body, .app-main { \nfont-family:"PP Neue Montreal" !important;\n}\n\n.as-bg-gray-100{\nbackground-color:#1c1c1c !important;\n}\n\n.as-text-gray-900 {\ncolor:#ffffff !important;\n}\n\n.as-edit-frequency_data,\n.as-subtotal-price .as-text-gray-900,\n.as-subscription-header .as-text-gray-900{\ncolor:#000000 !important;\n}\n\n.as-customer-info,\n.as-delivery-price,\n.container .appstle_contract_see_more,\n.as-button--pause {\ndisplay:none !important;\n}\n\n.as-button--cancelsub {\nborder:2px rgb(220 38 38\/var(--tw-bg-opacity)) solid;\n}\n\n.as-py-10 {\npadding-top: 100px !important;\npadding-bottom: 200px !important;\n}\n\n.as-bg-indigo-600 {\nbackground-color:#1c1c1c !important;\n}\n#root > div > div > div > div > div > div.as-w-full.as-px-2.as-my-8.sm\\:as-px-0.as-subscription-detail-wrapper > div.as-flex.as-space-x-0\\.5.as-rounded-lg.as-overflow-hidden.as-shadow.as-tab-list{\ndisplay: none!important;\n}\n\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-8.as-full-width.as-panel-left > div > div > div.as-flex.as-justify-between.as-items-center.as-mb-1.as-product-details_header {\ndisplay: none!important;\n}\n\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-8.as-full-width.as-panel-left > div > div > div.as-relative.as-overflow-x-auto.as-product-details-table-wrapper > table > tbody > tr.as-bg-white.as-border-b.hover\\:as-bg-gray-50.as-product-line > th > div > div.as-col-span-10.as-product-line-details > p.as-mt-4.as-product-action > span.as-cursor-pointer.as-font-medium.as-text-indigo-600.hover\\:as-underline.as-cta.as-edit-product-cta{\ndisplay: none!important;\n}\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-8.as-full-width.as-panel-left > div > div > div.as-relative.as-overflow-x-auto.as-product-details-table-wrapper > table > tbody > tr.as-bg-white.as-border-b.hover\\:as-bg-gray-50.as-product-line > th > div > div.as-col-span-10.as-product-line-details > p.as-mt-4.as-product-action > span.as-cursor-pointer.as-font-medium.as-text-yellow-600.hover\\:as-underline.as-ml-2.as-cta.as-view-more-cta{\ndisplay: none!important;\n}\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-4.as-grid.as-gap-4.as-full-width.as-panel-right > div.as-bg-white.as-shadow.as-overflow-hidden.sm\\:as-rounded-lg.as-p-4.as-card.as-edit-billing{\ndisplay: none!important;\n}\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-4.as-grid.as-gap-4.as-full-width.as-panel-right > div.as-bg-white.as-shadow.as-overflow-hidden.sm\\:as-rounded-lg.as-p-4.as-card.as-additional-order-details{\ndisplay: none!important;\n}\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-4.as-grid.as-gap-4.as-full-width.as-panel-right > div.as-bg-white.as-shadow.as-overflow-hidden.sm\\:as-rounded-lg.as-p-4.as-card.as-edit-discount{\ndisplay: none!important;\n}\n#headlessui-tabs-panel-10 > div > div.lg\\:as-col-span-4.as-grid.as-gap-4.as-full-width.as-panel-right > div.as-bg-white.as-shadow.as-overflow-hidden.sm\\:as-rounded-lg.as-p-4.as-card.as-edit-shipping{\ndisplay: none!important;\n}\nfooter{\nz-index: -1;\n}\n#root .as-cp-wrapper{\nbackground-color: transparent !important;\n} \n\n.lg\\:as-block {\ndisplay:none !important;\n}',
            },
        };

        var _RSConfig = _RSConfig || {};

        _RSConfig.shop = "pangrampangram.myshopify.com";

        _RSConfig.shopMoneyFormat = "${{amount}}";
        _RSConfig.shopMoneyFormatWithCurrencyFormat = "${{amount}} USD";
    }
    var AUTOHIDE = Boolean(0);
