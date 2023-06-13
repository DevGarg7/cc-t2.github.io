
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

var AUTOHIDE = Boolean(0);
