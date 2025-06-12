const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const { FileStore } = require("metro-cache");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.sourceExts = ["mjs", "js", "json", "ts", "tsx"];
config.resolver.requireCycleIgnorePatterns = [/(^|\/|\\)node_modules($|\/|\\)/];
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, "node_modules", ".cache", "metro"),
  }),
];


module.exports = withNativeWind(config, { input: "./src/global.css" });
