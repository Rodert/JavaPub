import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaPub",
  description: "致力于帮助每个朋友更快学好、学会编程。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
