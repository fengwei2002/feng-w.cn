module.exports = {
  title: 'psychonaut1f',
  logo: '/public/logo.ico',
  plugins: [
    ["cursor-effects", ],
    ["vuepress-plugin-reading-progress"],
    ["@vuepress/medium-zoom", {
      selector: '.content__default img',
    }, ],
    ['container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
    ["go-top"],
    ["flowchart"],
    ["vuepress-plugin-seo"],
    ["vuepress-plugin-baidu-autopush"],
  ],
  head: [ //math显示
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      }
    ],
  ],

  markdown: { //markdown扩展
    lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲
    extendMarkdown: md => {
      md.set({
        html: true
      });
      md.set({
        breaks: true //去除空格换行
      });
      md.use(require('markdown-it-mark')); //高亮渲染
      md.use(require('@iktakahiro/markdown-it-katex')); //math渲染
      md.use(require('markdown-it-task-lists')); //todo渲染
      md.use(require('markdown-it-footnote')); //角标渲染
      md.use(require('markdown-it-kbd')); //按键渲染
      md.use(require('markdown-it-imsize')); //自定义图片的大小
    }
  },

  lastUpdated: true,

  theme: 'meteorlxy',
  themeConfig: { //主题配置项
    locales: {
      '/': {
        lang: 'zh-CN',
      },
    },
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
      home: `Welcome to Fengwei's Homepage`,
      posts: 'My Posts',
    }),
    nav: [{
        text: 'Home',
        link: '/',
        exact: true
      },
      {
        text: 'Posts',
        link: '/posts/',
        exact: false
      },
      {
        text: 'About',
        link: '/About/',
        exact: false
      },
    ],
    personalInfo: {
      nickname: 'psychonaut1f',
      description: 'Life as I understand it is to be with everything I like',
      email: 'psychonaut1f@gmail.com',
      location: 'Tai\'Yuan, Shan\'Xi, China',
      organization: 'Shan\'Xi University',
      avatar: 'https://feng-w.cn/logo.webp',
      sns: {
        github: {
          account: 'fengwei2002',
          link: 'https://github.com/fengwei2002',
        },
        zhihu: {
          account: 'weirdo',
          link: 'https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba',
        },
      },
    },
    header: {
      background: {
        url: 'https://pic1.zhimg.com/v2-57e254b82a79f6189dab0a0a3cd146f4_r.jpg',
      },
      showTitle: true,
    },
    footer: {
      poweredBy: false,
      poweredByTheme: false,
      custom: 'psychonaut1f@gmail.com',
    },
    infoCard: {
      headerBackground: {
        useGeo: false,
      },
    },
    comments: {
      platform: 'github',
      owner: 'fengwei2002',
      repo: 'mygitalk',
      clientId: '215827c9064649c94cc7',
      clientSecret: '99a3239a0889c4917b47c601f6a642c2cc8e2812',
      prefix: '[Comments] ',
      labels: ['comments'],
    },
  }
}