import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { expect, chromium, firefox } from '@playwright/test';
import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext } from '@playwright/test';
import  home_page  from '../pages/home_page';
import branch_page from '../pages/branch_page';

let page: Page;
let browser: Browser;
let context: BrowserContext;


setDefaultTimeout(60000);


Given('User navigates to the Personal Banking page in Chrome', async () => {
  context = await chromium.launchPersistentContext('/tmp/test-user-data', {
    headless: false,
    permissions: ['geolocation'],
    channel: 'chrome',
    args: [
      `--no-incognito`,
      `--start-maximized`,
    ],
    viewport: {
      width: 1488, 
      height: 868
    },
  });
  page = await context.newPage();
  await page.goto("https://www.lloydsbank.com/");
  console.log("Website launched...");
  page.screenshot({ path: './screenshots/001_launch.png' });
});


Given('User navigates to the Personal Banking page in Edge', async () => {
  context = await chromium.launchPersistentContext('/tmp/test-user-data', {
    headless: false,
    permissions: ['geolocation'],
    channel: 'msedge',
    args: [
      `--no-incognito`,
    ],
    viewport: {
      width: 1528, 
      height: 868
    },
  });
    page = await context.newPage();
    await page.goto("https://www.lloydsbank.com/");
    console.log("Website launched...");
    page.screenshot({ path: './screenshots/001_launch.png' });
});

When('User clicks on the Search bar', async () =>{
    let homePage= new home_page(page);
    homePage.clickSearchBar();
    await page.waitForTimeout(4000);    
    await page.screenshot({ path: './screenshots/002_search_bar.png' });
    console.log("Search bar clicked...");
  });

When('User clicks on Find a branch near me', async () =>{
    //await page.click('[id="yxt-AutoComplete-option-search-bar.autocomplete-0-1"]');
    let homePage= new home_page(page);
    homePage.clickFindBranchNearMe();
    console.log("Find a Branch Near Me clicked...");
  });

  When('Allow access to location pop up is displayed', async () =>{
    page.waitForTimeout(4000);
    const current_url = await page.url();
    console.log("current_url: "+current_url);

    try {
      await page.screenshot({ path: './screenshots/003_allow_location_dialog.png' });
      context.grantPermissions(['geolocation'], { origin: current_url });
      console.log("Access to Location granted...");
    }
    catch (error) {
      console.log(`Allow location error: ${error}`);
      throw new Error(`Allow location error: ${error}`);
    }

    try {
      await page.on('dialog', dialog => {
        console.log(dialog.message());
        dialog.accept();
        console.log("Access to Location granted...");
      });
    }
    catch (error) {
      console.log(`Allow location error: ${error}`);
      throw new Error(`Allow location error: ${error}`);
    }

  });

  Then('User is navigated to the Find branch page', async () =>{
    
    const locations = page.frameLocator('[id="answers-frame"]').getByText('Locations');
    expect(locations.isVisible).toBeTruthy();
    page.screenshot({ path: './screenshots/004_find_a_branch.png' });
    console.log("Switched to iFrame and Locations displayed...");

  });

  Then('User arrives at the Find a branch page', async () =>{
    const branch = page.frameLocator('[id="answers-frame"]').getByText('47 London Road North');
    expect(branch.isVisible).toBeTruthy();
    console.log("Find a Branch page is displayed...");

  });

  When('User clicks on View branch first branch given in the search results', async () =>{
       page.frameLocator('[id="answers-frame"]').getByText(' View branch ').nth(0).click();

    console.log("View branch link is clicked...");

  });

  Then('Name and Address and Opening Days of the branch are displayed', async () =>{
    page.screenshot({ path: './screenshots/005_view_branch.png' });
    
    expect(page.locator("//body/main[@id='main']/div[1]/div[1]/div[1]/nav[1]/ol[1]/li[3]/a[1]/span[1]").isVisible).toBeTruthy();

      
    const branchPage= new branch_page(page,context);
    branchPage.viewBranchDetails();
    
  });