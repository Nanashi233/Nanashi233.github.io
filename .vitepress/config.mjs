import { defineConfig } from "vitepress"
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
    title: "ABYODS Docs",
    description: "Nanashi233的个人文档站",
    head: [["link", { rel: "icon", href: "/.vitepress/assets/BALogo-B.svg" }]],
    themeConfig: {
        logo: { light: "/.vitepress/assets/BALogo-B.svg", dark: "/.vitepress/assets/BALogo-W.svg" },
        outlineTitle: "本页目录",
        outline: [1, 3],
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档"
                    },
                    modal: {
                        noResultsText: "没有找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "导航",
                            closeText: "关闭"
                        }
                    }
                }
            }
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/Nanashi233" }
        ],
        footer: {
            message: "Powered by VitePress & GitHub Pages",
            copyright: "Copyright © 2025 Nanashi233"
        },
        nav: [
            { text: "主页", link: "/" },
            { text: "知识库", link: "/Knowledge/" },
            { text: "博客", link: "/Blog/" }
        ],
    },
    lastUpdated: true,
};

const vitePressSidebarOptions = [
    {
        documentRootPath: '/',
        scanStartPath: 'Knowledge',
        resolvePath: '/Knowledge/',
        useTitleFromFileHeading: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFileDatePrefix: true,
        prefixSeparator: '@',
        removePrefixAfterOrdering: true,
        sortMenusOrderNumericallyFromLink: true,
    },
    {
        documentRootPath: '/',
        scanStartPath: 'Blog',
        resolvePath: '/Blog/',
        useTitleFromFileHeading: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFileDatePrefix: true,
        prefixSeparator: '@',
        removePrefixAfterOrdering: true,
        sortMenusOrderNumericallyFromLink: true,
    }
];

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));