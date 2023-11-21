import { Page } from "@playwright/test";
export default class home_page {

    constructor(public page: Page) { }

    async clickSearchBar() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('[id="yxt-SearchBar-input--search-bar"]')
        ])
    }

    async clickFindBranchNearMe() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('[id="yxt-AutoComplete-option-search-bar.autocomplete-0-1"]')
        ])
    }
}