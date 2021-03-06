module.exports = {
  "rules": {
    // Color
    "color-hex-case": "lower",
    "color-hex-length": "short",
    // "color-named": "never",
    // "color-no-hex": true,
    "color-no-invalid-hex": true,

    // Font family
    // "font-family-name-quotes": "always-where-required",

    // Font weight
    // "font-weight-notation": "named-where-possible",

    // Function
    // "function-blacklist":
    "function-calc-no-unspaced-operator": true,
    // "function-comma-newline-after": "always-multi-line",
    // "function-comma-newline-before": "always-multi-line",
    "function-comma-space-after": "always-single-line",
    "function-comma-space-before": "never",
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-max-empty-lines": 0,
    "function-name-case": "lower",
    "function-parentheses-newline-inside": "always-multi-line",
    "function-parentheses-space-inside": "never-single-line",
    // "function-url-data-uris": ,
    // "function-url-no-scheme-relative": ,
    "function-url-no-scheme-relative": true,
    "function-url-quotes": "never",
    // "function-url-scheme-whitelist": , // 7.2.0
    // "function-whitelist": ,
    "function-whitespace-after": "always",

    // Number
    "number-leading-zero": "never",
    "number-max-precision": 8,
    "number-no-trailing-zeros": true,

    // String
    // "string-no-newline": true,
    "string-quotes": "double",

    // Length
    "length-zero-no-unit": true,

    // Time
    // "time-no-imperceptible": true,

    // Unit
    // "unit-blacklist": ,
    "unit-case": "lower",
    "unit-no-unknown": true,
    // "unit-whitelist": ,

    // Value
    // "value-keyword-case": ["lower", {
    //   "ignoreKeywords": ["/(document|widow)\..*/"]
    // }],
    // "value-no-vendor-prefix": ,

    // Value list
    // "value-list-comma-newline-after": "always-multi-line",
    // "value-list-comma-newline-before": "always-multi-line",
    // "value-list-comma-space-after": "always-single-line",
    "value-list-comma-space-before": "never",
    // "value-list-max-empty-lines": , // 7.2.0

    // Custom property
    // "custom-property-empty-line-before": , // 7.1.0
    "custom-property-no-outside-root": true,
    // "custom-property-pattern":

    // Shorthand property
    // "shorthand-property-no-redundant-values": true,

    // Property
    // "property-blacklist": ,
    "property-case": "lower",
    // "property-no-vendor-prefix": true,
    // "property-whitelist": ,
    // "property-no-unknown": true, // 7.0.0

    // Keyframe declaration
    "keyframe-declaration-no-important": true,

    // Declaration
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-colon-newline-after": "always-multi-line",
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    // "declaration-empty-line-before": , // 7.1.0
    "declaration-no-important": true,
    // "declaration-property-unit-blacklist": ,
    // "declaration-property-unit-whitelist": ,
    // "declaration-property-value-blacklist": ,
    // "declaration-property-value-whitelist": ,

    // Declaration block
    "declaration-block-no-duplicate-properties": [true, {
      "ignore": ["consecutive-duplicates"]
    }],
    // "declaration-block-no-ignored-properties": true,
    // "declaration-block-no-redundant-longhand-properties": , // 7.2.0
    "declaration-block-no-shorthand-property-overrides": true,
    // "declaration-block-properties-order": ,
    "declaration-block-semicolon-newline-after": "always-multi-line",
    "declaration-block-semicolon-newline-before": "never-multi-line",
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-block-trailing-semicolon": "always",

    // Block
    // "block-closing-brace-empty-line-before"： // 7.1.0
    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always-multi-line",
    "block-closing-brace-space-after": "always-single-line",
    "block-closing-brace-space-before": "always-single-line",
    // "block-no-empty": true,
    "block-no-single-line": true,
    "block-opening-brace-newline-after": "always",
    // "block-opening-brace-newline-before": "never-multi-line",
    // "block-opening-brace-space-after": "always-single-line",
    "block-opening-brace-space-before": "always",

    // Selector
    "selector-attribute-brackets-space-inside": "never",
    // "selector-attribute-operator-blacklist": ,
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-operator-space-before": "never",
    // "selector-attribute-operator-whitelist": ,
    "selector-attribute-quotes": "always",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    // "selector-class-pattern": ,
    "selector-descendant-combinator-no-non-space": true, // 7.2.0
    // "selector-id-pattern": ,
    // "selector-max-compound-selectors": ,
    // "selector-max-specificity": ,
    // "selector-nested-pattern": , // 7.1.0
    // "selector-no-attribute": ,
    // "selector-no-combinator": ,
    "selector-no-id": true,
    // "selector-no-qualifying-type": ,
    // "selector-no-type": ,
    // "selector-no-universal": ,
    // "selector-no-vendor-prefix": ,
    "selector-max-empty-lines": 0,
    // "selector-pseudo-class-blacklist": , // 7.1.0
    "selector-pseudo-class-case": "lower",
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-class-parentheses-space-inside": "never",
    // "selector-pseudo-class-whitelist": , // 7.1.0
    "selector-pseudo-element-case": "lower",
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": true,
    // "selector-root-no-composition": true,
    "selector-type-case": "lower",
    "selector-type-no-unknown": true,


    // Selector list
    "selector-list-comma-newline-after": "always",
    "selector-list-comma-newline-before": "never-multi-line",
    // "selector-list-comma-space-after": "always-single-line",
    // "selector-list-comma-space-before": "never",

    // Root rule
    "root-no-standard-properties": true,

    // Rule
    "rule-nested-empty-line-before": ["always", {
      "except": ["first-nested"],
    }],
    "rule-non-nested-empty-line-before": "always",

    // Media feature
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-case": "lower", // 7.1.0
    // "media-feature-name-no-unknown": , // 7.2.0
    "media-feature-no-missing-punctuation": true,
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",
    // "media-feature-name-no-vendor-prefix": ,
    "media-feature-parentheses-space-inside": "never", // add in 7.0.0
    "media-feature-range-operator-space-after": "always", // add in 7.0.0
    "media-feature-range-operator-space-before": "always", // add in 7.0.0

    // Custom media
    // "custom-media-pattern": ,

    // Media query
    // "media-query-parentheses-space-inside": "never", //removed in 7

    // Media query list
    "media-query-list-comma-newline-after": "always-multi-line",
    "media-query-list-comma-newline-before": "never-multi-line",
    "media-query-list-comma-space-after": "always-single-line",
    "media-query-list-comma-space-before": "never",

    // At-rule
    // "at-rule-blacklist": ,
    "at-rule-empty-line-before": ["always", {
      "except": ["all-nested", "blockless-group", "first-nested"],
      "ignore": ["after-comment", "blockless-group", "all-nested"]
    }],
    "at-rule-name-case": "lower",
    // "at-rule-name-newline-after": ,
    "at-rule-name-space-after": "always",
    "at-rule-no-unknown": true,
    // "at-rule-no-vendor-prefix": ,
    "at-rule-semicolon-newline-after": "always",
    // "at-rule-whitelist": ,

    // stylelint-disable
    "stylelint-disable-reason": "always-before",

    // Comment
    "comment-empty-line-before": ["always", {
      "except": ["first-nested"],
      "ignore": ["between-comments", "stylelint-commands"]
    }],
    "comment-no-empty": true,
    "comment-whitespace-inside": "always",
    // "comment-word-blacklist": ,

    // General / Sheet
    // "indentation": [2, {
    //   "indentInsideParens": "once"
    // }],
    "max-empty-lines": 2,
    // "max-line-length": 80,
    "max-nesting-depth": [5, {
      "ignore": ["at-rules-without-declaration-blocks"]
    }],
    "no-browser-hacks": [true, {
      "browsers": "last 100 versions"
    }],
    // "no-descending-specificity": ,
    // "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    // "no-indistinguishable-colors": true,
    "no-invalid-double-slash-comments": true,
    // "no-missing-eof-newline": true, // removed in 7
    "no-missing-end-of-source-newline": true, // 7.0.0
    // "no-unknown-animations": true,
    // "no-unsupported-browser-features": [true, {
    //   "ignore": ["at-rules-without-declaration-blocks"]
    // }]
  }
}
