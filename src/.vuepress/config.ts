import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JavaPub",
  description: "致力于帮助每个朋友学好编程、学会编程。",

  theme,

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
        width: 200px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .floating-qrcode:hover .floating-qrcode-popup {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(-50%) translateX(-10px);
      }

      /* 二维码图片 */
      .floating-qrcode-popup img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        display: block;
      }

      /* 二维码标题 */
      .floating-qrcode-popup .qrcode-title {
        text-align: center;
        font-size: 14px;
        color: #333;
        margin-top: 10px;
        font-weight: 500;
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

      /* 响应式：在小屏幕上隐藏 */
      @media (max-width: 768px) {
        .floating-qrcode {
          display: none;
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

          // 创建二维码弹窗
          const popup = document.createElement('div');
          popup.className = 'floating-qrcode-popup';
          
          const img = document.createElement('img');
          img.src = 'https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502071711977.png';
          img.alt = '编程面试鸭小程序码';
          
          const title = document.createElement('div');
          title.className = 'qrcode-title';
          title.textContent = '扫码访问小程序';
          
          popup.appendChild(img);
          popup.appendChild(title);

          // 创建悬浮按钮
          const btn = document.createElement('div');
          btn.className = 'floating-qrcode-btn';
          btn.innerHTML = '<span>👆</span>';

          // 组装元素
          container.appendChild(popup);
          container.appendChild(btn);

          // 添加到页面
          document.body.appendChild(container);
        }
      })();
      `
    ]
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});

