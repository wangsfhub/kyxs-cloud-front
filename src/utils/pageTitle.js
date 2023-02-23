import { setting } from '@/config/setting.config'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
    let newTitles = []
    if (pageTitle) newTitles.push(pageTitle)
    if (setting.title) newTitles.push(setting.title)
    if (setting.titleReverse) newTitles = newTitles.reverse()
    return newTitles.join(setting.titleSeparator)
}
