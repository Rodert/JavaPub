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
        width: 220px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
        max-height: 85vh;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .floating-qrcode:hover .floating-qrcode-popup {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(-50%) translateX(-10px);
      }

      /* 二维码项目容器 */
      .floating-qrcode-popup .qrcode-item {
        margin-bottom: 20px;
        padding-bottom: 18px;
        border-bottom: 1px solid #eee;
      }

      .floating-qrcode-popup .qrcode-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      /* 二维码图片 */
      .floating-qrcode-popup .qrcode-item img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        display: block;
      }

      /* 二维码标题 */
      .floating-qrcode-popup .qrcode-item .qrcode-title {
        text-align: center;
        font-size: 13px;
        color: #333;
        margin-top: 8px;
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
          max-width: 320px;
          max-height: 70vh;
          padding: 20px;
          z-index: 999;
        }

        /* 移动端通过点击显示（使用 active 类） */
        .floating-qrcode.active .floating-qrcode-popup {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* 移动端 hover 无效，移除 hover 效果 */
        .floating-qrcode:hover .floating-qrcode-popup {
          transform: translateX(-50%);
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
          
          // 小程序码
          const miniProgramItem = document.createElement('div');
          miniProgramItem.className = 'qrcode-item';
          const miniProgramImg = document.createElement('img');
          miniProgramImg.src = 'https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502071711977.png';
          miniProgramImg.alt = '编程面试鸭小程序码';
          const miniProgramTitle = document.createElement('div');
          miniProgramTitle.className = 'qrcode-title';
          miniProgramTitle.textContent = '扫码访问小程序';
          miniProgramItem.appendChild(miniProgramImg);
          miniProgramItem.appendChild(miniProgramTitle);
          
          // 微信二维码
          const wechatItem = document.createElement('div');
          wechatItem.className = 'qrcode-item';
          const wechatImg = document.createElement('img');
          wechatImg.src = '/img/me-wechat.png';
          wechatImg.alt = '微信二维码';
          const wechatTitle = document.createElement('div');
          wechatTitle.className = 'qrcode-title';
          wechatTitle.textContent = '添加微信';
          wechatItem.appendChild(wechatImg);
          wechatItem.appendChild(wechatTitle);
          
          // 公众号二维码
          const officialAccountItem = document.createElement('div');
          officialAccountItem.className = 'qrcode-item';
          const officialAccountImg = document.createElement('img');
          officialAccountImg.src = '/img/qrcode_for_gh_e4925da5b058_258.jpg';
          officialAccountImg.alt = '公众号二维码';
          const officialAccountTitle = document.createElement('div');
          officialAccountTitle.className = 'qrcode-title';
          officialAccountTitle.textContent = '关注公众号';
          officialAccountItem.appendChild(officialAccountImg);
          officialAccountItem.appendChild(officialAccountTitle);
          
          // 添加到弹窗
          popup.appendChild(miniProgramItem);
          popup.appendChild(wechatItem);
          popup.appendChild(officialAccountItem);

          // 创建悬浮按钮
          const btn = document.createElement('div');
          btn.className = 'floating-qrcode-btn';
          btn.innerHTML = '<span>👆</span>';

          // 组装元素
          container.appendChild(overlay);
          container.appendChild(popup);
          container.appendChild(btn);

          // 检测是否为移动端
          const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

          // 移动端：点击按钮显示/隐藏弹窗
          if (isMobile) {
            btn.addEventListener('click', function(e) {
              e.stopPropagation();
              container.classList.toggle('active');
              // 阻止页面滚动
              if (container.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
              } else {
                document.body.style.overflow = '';
              }
            });

            // 点击遮罩层关闭弹窗
            overlay.addEventListener('click', function() {
              container.classList.remove('active');
              document.body.style.overflow = '';
            });

            // 点击弹窗内容区域不关闭
            popup.addEventListener('click', function(e) {
              e.stopPropagation();
            });
          }

          // 添加到页面
          document.body.appendChild(container);

          // 响应窗口大小变化
          let resizeTimer;
          window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
              // 如果是移动端且弹窗是打开的，关闭它
              if (window.innerWidth > 768 && container.classList.contains('active')) {
                container.classList.remove('active');
                document.body.style.overflow = '';
              }
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

