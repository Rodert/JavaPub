import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

const getSeoTitleContext = (pagePath: string): string => {
  if (pagePath === "/") return "Java、AI 编程与项目实战教程";
  if (pagePath.startsWith("/star/project/user-center/"))
    return "Spring Boot 用户中心项目实战";
  if (pagePath.startsWith("/star/project/")) return "JavaPub 项目实战与源码教程";
  if (pagePath.startsWith("/posts/special/1v1/"))
    return "Java 面试专题与核心知识点";
  if (pagePath.startsWith("/posts/special/havato/"))
    return "最少必要面试题与面试复习指南";
  if (pagePath.startsWith("/posts/ai/"))
    return "AI 编程工具教程与大模型实践";
  if (pagePath.startsWith("/posts/algorithms_data_structures/data_structures/"))
    return "数据结构、算法基础与 Java 面试教程";
  if (pagePath.startsWith("/posts/algorithms_data_structures/algorithms/"))
    return "算法原理与 Java 实战教程";
  if (pagePath.startsWith("/posts/database/mysql/"))
    return "MySQL 数据库教程与实践";
  if (pagePath.startsWith("/posts/database/hbase/"))
    return "HBase 数据库入门教程";
  if (pagePath.startsWith("/posts/database/"))
    return "数据库、MySQL 与 Redis 性能优化教程";
  if (pagePath.startsWith("/posts/java/spring/"))
    return "Spring 框架教程与面试知识";
  if (pagePath.startsWith("/posts/java/"))
    return "Java 编程教程与面试知识";
  if (pagePath.startsWith("/posts/operations/"))
    return "Linux 运维与 Nginx 实战教程";
  if (pagePath.startsWith("/posts/blockchain/"))
    return "区块链与 Solidity 智能合约教程";
  if (pagePath.startsWith("/posts/spider/"))
    return "Python 爬虫工具与数据采集实战教程";
  if (pagePath.startsWith("/posts/bugfix/"))
    return "开发问题排查与 Bug 修复手册";
  if (pagePath.startsWith("/posts/must-see/"))
    return "JavaPub 使用指南与常见问题";
  if (pagePath.startsWith("/system/about-me/"))
    return "JavaPub 作者介绍与联系信息";
  if (pagePath.startsWith("/system/website-record/"))
    return "JavaPub 网站更新记录";
  if (pagePath.startsWith("/book/")) return "Java、数据库与程序员成长书单";
  if (pagePath.startsWith("/posts/")) return "Java 编程、AI 编程与开发实战";

  return "Java 编程、AI 编程与项目实战";
};

const buildSeoTitle = (pageTitle: string, pagePath: string): string => {
  const baseTitle = pagePath === "/" ? "JavaPub 官方网站" : pageTitle || "JavaPub";
  const defaultTitle = `${baseTitle} | JavaPub`;

  if (defaultTitle.length >= 28) return defaultTitle;

  return `${baseTitle}：${getSeoTitleContext(pagePath)} | JavaPub`;
};

const normalizeText = (text = ""): string =>
  text
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/@[a-z]+\b/gi, " ")
    .replace(/[#>*_`|~\-[\]{}()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const sanitizeMetaText = (text = ""): string =>
  normalizeText(text).replace(/["'“”‘’]/g, "");

const ensureMinLength = (text: string, minLength = 155): string => {
  if ([...text].length >= minLength) return text;

  return `${text}内容持续围绕开发者学习、面试、项目落地和技术复盘更新，适合长期收藏查阅。`;
};

const truncateText = (text: string, maxLength = 180): string => {
  const chars = [...text];

  return chars.length > maxLength ? `${chars.slice(0, maxLength - 1).join("")}…` : text;
};

const buildSeoDescription = (
  pageTitle: string,
  pagePath: string,
  currentDescription = "",
  content = "",
): string => {
  const sanitizedDescription = sanitizeMetaText(currentDescription);

  if ([...sanitizedDescription].length >= 150)
    return truncateText(sanitizedDescription, 190);

  const baseTitle = sanitizeMetaText(
    pagePath === "/" ? "JavaPub 官方网站" : pageTitle || "JavaPub",
  );
  const context = getSeoTitleContext(pagePath);
  const excerpt = sanitizeMetaText(content)
    .replace(new RegExp(`^${baseTitle}\\s*`), "")
    .slice(0, 120);
  const suffix = excerpt ? `文章内容包括：${excerpt}` : "";

  return truncateText(
    ensureMinLength(
      `${baseTitle} 是 JavaPub 整理的${context}专题内容，系统覆盖核心概念、原理说明、实践步骤、代码示例、常见问题、面试考点和真实开发场景，帮助开发者快速理解知识脉络，用于系统学习、项目实战、问题排查、技术选型和长期复习查阅。${suffix}`,
    ),
    190,
  );
};

const seoMetaPlugin = () => ({
  name: "seo-meta-plugin",
  extendsPage: (page) => {
    const title = buildSeoTitle(page.title, page.path);
    const description = buildSeoDescription(
      page.title,
      page.path,
      page.frontmatter.description,
      page.content,
    );
    const head = page.frontmatter.head ?? [];

    page.frontmatter.head = [
      ["title", {}, title],
      ["meta", { name: "description", content: description }],
      ["meta", { property: "og:description", content: description }],
      ...head,
    ];
    page.frontmatter.description = description;
    page.data.frontmatter.description = description;
  },
});

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaPub",
  description: "JavaPub 是王仕宇维护的原创中文技术博客，系统整理 Java、AI 编程、Codex、Claude、Git、数据库、项目实战和开发工具教程，帮助读者持续提升编程能力。",

  theme,

  plugins: [seoMetaPlugin()],

  head: [
    // 百度统计
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?47a97d05ef9382d85d5a910de6b07c46";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    // 侧边悬浮二维码样式
    [
      "style",
      {},
      `
      /* 侧边悬浮二维码容器 */
      .floating-qrcode {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      /* 悬浮按钮 */
      .floating-qrcode-btn {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        color: white;
        font-size: 24px;
        margin-bottom: 10px;
      }

      .floating-qrcode-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      }

      /* 二维码容器 */
      .floating-qrcode-popup {
        position: absolute;
        right: 60px;
        top: 50%;
        transform: translateY(-50%);
        width: 210px;
        padding: 10px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
        max-height: 85vh;
        overflow-y: auto;
        overflow-x: hidden;
      }

      /* 点击打开：使用 active 类控制显示 */
      .floating-qrcode.active .floating-qrcode-popup {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(-50%) translateX(-10px);
      }

      /* 二维码项目容器 */
      .floating-qrcode-popup .qrcode-item {
        margin: 8px 0;
        padding: 0;
        border: none;
      }

      .floating-qrcode-popup .qrcode-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      /* 展开菜单按钮（Speed Dial） */
      .floating-qrcode-popup .qrcode-action {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.06);
        background: rgba(255, 255, 255, 0.95);
        cursor: pointer;
        user-select: none;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.10);
        transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
      }

      .floating-qrcode-popup .qrcode-action:hover {
        transform: translateX(-2px);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
        border-color: rgba(102, 126, 234, 0.35);
      }

      .floating-qrcode-popup .qrcode-icon {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        flex: 0 0 auto;
      }

      .floating-qrcode-popup .qrcode-text {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
        min-width: 0;
      }

      .floating-qrcode-popup .qrcode-text .title {
        font-size: 13px;
        font-weight: 700;
        color: #222;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .floating-qrcode-popup .qrcode-text .desc {
        margin-top: 3px;
        font-size: 12px;
        color: #666;
      }

      /* 二维码预览卡片（点击按钮后显示） */
      .floating-qrcode-preview {
        position: fixed;
        right: 90px;
        top: 50%;
        transform: translateY(-50%);
        width: 230px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.98);
        border-radius: 14px;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
        z-index: 1000;
        backdrop-filter: blur(6px);
      }

      .floating-qrcode-preview img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        display: block;
        background: #fff;
      }

      .floating-qrcode-preview .preview-title {
        margin-top: 8px;
        text-align: center;
        font-size: 12px;
        color: #555;
        font-weight: 600;
      }

      /* 二维码箭头 */
      .floating-qrcode-popup::after {
        content: '';
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent white;
      }

      /* 移动端优化样式 */
      @media (max-width: 768px) {
        /* 按钮位置改为右下角 */
        .floating-qrcode {
          right: 15px;
          bottom: 80px;
          top: auto;
          transform: none;
        }

        /* 按钮大小稍小 */
        .floating-qrcode-btn {
          width: 48px;
          height: 48px;
          font-size: 22px;
          margin-bottom: 0;
        }

        /* 移动端弹窗从底部弹出 */
        .floating-qrcode-popup {
          position: fixed;
          right: auto;
          left: 50%;
          bottom: 140px;
          top: auto;
          transform: translateX(-50%) translateY(20px);
          width: calc(100vw - 40px);
          max-width: 280px;
          max-height: 70vh;
          padding: 14px;
          z-index: 999;
        }

        .floating-qrcode-preview {
          left: 50%;
          right: auto;
          top: auto;
          bottom: 120px;
          transform: translateX(-50%);
          width: min(260px, calc(100vw - 40px));
        }

        /* 移动端通过点击显示（使用 active 类） */
        .floating-qrcode.active .floating-qrcode-popup {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* 箭头在移动端隐藏或调整位置 */
        .floating-qrcode-popup::after {
          display: none;
        }

        /* 添加遮罩层 */
        .floating-qrcode-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .floating-qrcode.active .floating-qrcode-overlay {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* 优化触摸体验 */
        .floating-qrcode-btn {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
      }
      `
    ],
    // 侧边悬浮二维码脚本
    [
      "script",
      {},
      `
      (function() {
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initFloatingQRCode);
        } else {
          initFloatingQRCode();
        }

        function initFloatingQRCode() {
          // 检查是否已经存在
          if (document.getElementById('floating-qrcode')) {
            return;
          }

          // 创建悬浮二维码容器
          const container = document.createElement('div');
          container.className = 'floating-qrcode';
          container.id = 'floating-qrcode';

          // 创建遮罩层（移动端使用）
          const overlay = document.createElement('div');
          overlay.className = 'floating-qrcode-overlay';

          // 创建二维码弹窗
          const popup = document.createElement('div');
          popup.className = 'floating-qrcode-popup';

          // 预览弹窗（点击按钮显示二维码）
          let previewEl = null;

          function showPreview(data) {
            if (!previewEl) {
              previewEl = document.createElement('div');
              previewEl.className = 'floating-qrcode-preview';
              document.body.appendChild(previewEl);
            }
            previewEl.innerHTML =
              '<img src="' + data.imgSrc + '" alt="' + data.title + '">' +
              '<div class="preview-title">' + data.title + '</div>';
          }

          function hidePreview() {
            if (previewEl) previewEl.remove();
            previewEl = null;
          }

          function makeAction(data) {
            const item = document.createElement('div');
            item.className = 'qrcode-item';

            const action = document.createElement('div');
            action.className = 'qrcode-action';
            action.innerHTML =
              '<div class="qrcode-icon">' + data.icon + '</div>' +
              '<div class="qrcode-text">' +
                '<div class="title">' + data.title + '</div>' +
                '<div class="desc">' + data.desc + '</div>' +
              '</div>';

            action.addEventListener('click', function(e) {
              e.stopPropagation();
              showPreview({ title: data.title, imgSrc: data.imgSrc });
            });

            item.appendChild(action);
            return item;
          }

          // 菜单里放“按钮”，点击后再展示二维码预览
          popup.appendChild(makeAction({
            icon: '小',
            title: '小程序',
            desc: '点击查看二维码',
            imgSrc: 'https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502071711977.png',
          }));

          popup.appendChild(makeAction({
            icon: '微',
            title: '微信',
            desc: '点击查看二维码',
            imgSrc: '/img/me-wechat.png',
          }));

          popup.appendChild(makeAction({
            icon: '公',
            title: '公众号',
            desc: '点击查看二维码',
            imgSrc: '/img/qrcode_for_gh_e4925da5b058_258.jpg',
          }));

          // 创建悬浮按钮
          const btn = document.createElement('div');
          btn.className = 'floating-qrcode-btn';
          btn.innerHTML = '<span>👆</span>';

          // 组装元素
          container.appendChild(overlay);
          container.appendChild(popup);
          container.appendChild(btn);

          function setOpen(open) {
            container.classList.toggle('active', open);
            // 弹窗打开时避免页面滚动（移动端更重要，桌面端也不影响）
            document.body.style.overflow = open ? 'hidden' : '';
            if (!open) hidePreview();
          }

          function toggleOpen() {
            setOpen(!container.classList.contains('active'));
          }

          // 所有端：点击按钮打开/关闭
          btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleOpen();
          });

          // 点击弹窗内容区域不关闭
          popup.addEventListener('click', function(e) {
            e.stopPropagation();
          });

          // 点击遮罩层关闭弹窗（遮罩层主要在移动端可见）
          overlay.addEventListener('click', function() {
            setOpen(false);
          });

          // 点击页面空白区域关闭（桌面端也生效）
          document.addEventListener('click', function() {
            setOpen(false);
          });

          // 添加到页面
          document.body.appendChild(container);

          // 响应窗口大小变化
          let resizeTimer;
          window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
              // 尺寸变化时，如果弹窗是打开的，直接关闭，避免布局切换带来的定位错乱
              if (container.classList.contains('active')) setOpen(false);
            }, 250);
          });
        }
      })();
      `
    ]
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
