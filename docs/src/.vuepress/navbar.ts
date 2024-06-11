import { navbar } from "vuepress-theme-hope";

export default navbar([
  // "/", // 隐藏主页在上导航栏
  {
    text: "编程指南",
    icon: "lightbulb",
    prefix: "/posts/",
    children: [
      {
        text: "必看",
        icon: "lightbulb",
        prefix: "must-see/",
        children: ["operating-guide", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "专题合集",
        icon: "lightbulb",
        prefix: "special/",
        children: [{ text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  "/book/",
  {
    text: "知识星球",
    icon: "globe",
    prefix: "/star/",
    children: [
      {
        text: "项目实战",
        icon: "lightbulb",
        prefix: "project/",
        children: ["project", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "星球介绍",
        icon: "lightbulb",
        prefix: "star-introduce/",
        children: ["star-introduce", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "网站信息",
    icon: "message",
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
        prefix: "website-record/",
        children: ["website-record", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "更新历史",
        icon: "history",
        link: "/timeline/",
      },
    ],
  },
  // "/portfolio", // 个人主页
  // "/demo/", // 掩饰功能，比如加密阅读
  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  {
    text: "学习路线图",
    icon: "route",
    link: "https://code-route-h3xxxsggd-roderts-projects.vercel.app", // 超链接到其他网网站
  },
]);
