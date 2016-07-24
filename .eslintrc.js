module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        // disable requiring trailing commas because it might be nice to revert to
        // being JSON at some point, and I don't want to make big changes now.
        "comma-dangle": 0,
        "indent": ["error", 4],
        "wrap-iife": ["error", "inside"],
        "eol-last": 0
    }
};