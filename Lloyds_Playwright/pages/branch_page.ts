import { BrowserContext, Page } from "@playwright/test";
export default class branch_page {

    constructor(public page: Page, public context: BrowserContext) { }

    async viewBranchDetails() {
        console.log("=========================================")
        let firstlineAdd = await this.page.locator("//div[@class='c-AddressRow']/span[@class='c-address-street-1']").nth(0).innerText();
        console.log("First Line Address : "+ firstlineAdd)
        let secondlineAdd = await this.page.locator("div[class='Core-desktopAddress'] span[class='c-address-city']").nth(0).innerText();
        console.log("Second Line Address : ",secondlineAdd) 
        let pincode = await this.page.locator("div[class='Core-desktopAddress'] span[class='c-address-postal-code']").nth(0).innerText(); 
        console.log("Postal Code : ",pincode)
        console.log("=========================================")
        console.log("Opening hours: ");
        for (let i = 1; i <= 7; i++) { 
            let day_of_week = await this.page.locator("//div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr["+i+"]/td[1]").innerText();
            let opening_time = await this.page.locator("//div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr["+i+"]/td[2]").innerText();
            console.log(day_of_week+" "+opening_time);

            if (opening_time =="Closed") { 
                console.log("=========================================")
                console.log("This Branch Closed on ==>"+day_of_week)
                console.log("=========================================")
              }


        }
        await this.page.close();
        await this.context.close();
    }
}