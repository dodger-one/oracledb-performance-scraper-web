import type * as Preset from '@docusaurus/preset-classic';
import type {Config} from '@docusaurus/types';
import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title : 'Oracle DB Performance Scraper',
  tagline : 'High-performance observability for Oracle databases',
  favicon : 'img/favicon-32x32.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future : {
    v4 : true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url : 'https://dodger-one.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl : '/oracledb-performance-scraper-web/',

  clientModules : [ './matomo.js' ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName : 'dodger-one',
  projectName : 'oracledb-performance-scraper-web',

  onBrokenLinks : 'throw',
  markdown : {
    hooks : {
      onBrokenMarkdownLinks : 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n : {
    defaultLocale : 'en',
    locales : [ 'en' ],
  },

  presets : [
    [
      'classic',
      {
        docs : {
          sidebarPath : './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl :
              'https://github.com/dodger-one/oracledb-performance-scraper-web/tree/main/site/',
        },
        theme : {
          customCss : './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig : {
    // Replace with your project's social card
    image : 'img/logo.png',
    navbar : {
      title : 'Oracle DB Performance Scraper',
      logo : {
        alt : 'Oracle DB Performance Scraper Logo',
        src : 'img/logo_home.png',
      },
      items : [
        {
          type : 'docSidebar',
          sidebarId : 'tutorialSidebar',
          position : 'left',
          label : 'Docs',
        },
        {
          href :
              'https://github.com/dodger-one/oracledb-performance-scraper-web',
          label : 'GitHub',
          position : 'right',
        },
      ],
    },
    footer : {
      style : 'dark',
      links : [
        {
          title : 'Docs',
          items : [
            {
              label : 'Tutorial',
              to : '/docs/intro',
            },
          ],
        },
        {
          title : 'Community',
          items : [
            {
              label : 'Stack Overflow',
              href : 'https://stackoverflow.com/questions/tagged/oracle',
            },
          ],
        },
        {
          title : 'More',
          items : [
            {
              label : 'Oracle Blogs',
              to : 'https://blogs.oracle.com/',
            },
            {
              label : 'Oracle LiveLabs',
              to : 'https://livelabs.oracle.com/pls/apex/r/dbpm/livelabs/home'
            },
            {
              label : 'GitHub',
              href :
                  'https://github.com/dodger-one/oracledb-performance-scraper-web',
            },
          ],
        },
      ],
      copyright : `Copyright © ${
          new Date()
              .getFullYear()}, Jorge Holgado, Oracle and/or its affiliates, and other contributors. Built with Docusaurus.`,
    },
    prism : {
      theme : prismThemes.github,
      darkTheme : prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
