require("@babel/register")({
  extensions: [".ts", ".tsx"],
  presets: [
    ["@babel/preset-typescript"],
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "18",
        },
        exclude: [
          "proposal-class-properties",
          "proposal-optional-chaining",
          "proposal-nullish-coalescing-operator",
        ],
      },
    ],
  ],
  plugins: [],
});
require("jsdom-global")("", { url: "http://localhost/", navigator: {} });
