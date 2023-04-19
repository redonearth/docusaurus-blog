// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `Redonearth의 개발 블로그`,
  tagline: 'Dev Blog of Redonearth',
  url: 'https://redonearth.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'redonearth', // Usually your GitHub org/user name.
  projectName: 'docusaurus-blog', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          blogSidebarTitle: '최근 게시물',
          blogSidebarCount: 8,
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            frontMatter.hide_reading_time ? undefined : defaultReadingTime({ content }),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-PY49L0QDW0',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: `Redonearth의 개발 블로그`,
        logo: {
          alt: 'Redonearth Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/tags', label: 'Tags', position: 'left' },
          { to: '/archive', label: 'Archive', position: 'left' },
          {
            href: 'https://github.com/redonearth',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Channel',
            items: [
              {
                label: 'Instagram',
                href: 'https://instagram.com/redonearth',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/redonearth',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Redonearth의 개발 블로그. Built with Docusaurus. 🦖`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
