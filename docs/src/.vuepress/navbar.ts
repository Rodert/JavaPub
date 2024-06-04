import { navbar } from "vuepress-theme-hope";

export default navbar([
  // "/", // 隐藏主页在上导航栏
  "/posts/",
  "/book/",
  "/project/",
  "/star/",
  {
    text: "网站信息",
    icon: "lightbulb",
    prefix: "/system/",
    children: [
      {
        text: "关于作者",
        icon: "lightbulb",
        prefix: "about-me/",
        children: ["introduce", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "更新历史",
        icon: "lightbulb",
        prefix: "timeline/",
        children: ["timeline", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  // "/portfolio", // 个人主页
  "/demo/", // 掩饰功能，比如加密阅读
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "学习路线图",
    icon: "book",
    link: "http://luxian.javapub.net.cn/", // 超链接到其他网网站
  },
]);
