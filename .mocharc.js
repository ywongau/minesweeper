module.exports = {
  diff: true,
  extension: ["ts", "tsx"],
  package: "./package.json",
  reporter: "spec",
  slow: 75,
  timeout: 60000,
  ui: "bdd",
  require: ["mocha/register.js"],
  "watch-files": ["src"],
  reporter: "spec",
  recursive: true,
  spec: ["src/**/*.test.ts*"],
};
