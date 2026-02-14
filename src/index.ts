import { firefox, Page } from 'playwright';
import { generate } from './names';

async function getRandomDiv(page: Page, locatorQuery: string) {
  const birthDayDiv = page.locator(locatorQuery)
  const childDivs = birthDayDiv.locator('div');
  const count = await childDivs.count();
  const randomIndex = Math.floor(Math.random() * count);
  return childDivs.nth(randomIndex)
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

function genName() {
  return ""
}

async function main() {
  const browser = await firefox.launch({ headless: false });
  const outlook = await browser.newPage();
  const user = generate()

  console.log("user", user)

  // Outlook register
  await outlook.goto('https://signup.live.com/signup');
  await outlook.locator('input[type="email"]').fill(user.email);
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('input[type="password"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(200);
  await outlook.locator('input[type="password"]').fill(user.password);
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('label[for="BirthDayDropdown"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  await outlook.locator('label[for="BirthDayDropdown"]').click();
  await outlook.locator('div[role="listbox"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  const birthDayItem = await getRandomDiv(outlook, 'div[role="listbox"]')
  await birthDayItem.click();
  await outlook.locator('label[for="BirthMonthDropdown"]').click();
  await outlook.waitForTimeout(500);
  await outlook.locator('div[role="listbox"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  const monthItem = await getRandomDiv(outlook, 'div[role="listbox"]')
  await monthItem.click();
  await outlook.waitForTimeout(500);
  await outlook.locator('input[type="number"]').fill(getRandomInt(1980, 2006).toString());
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('input[name="firstNameInput"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  await outlook.locator('input[name="firstNameInput"]').fill(user.firstName);
  await outlook.locator('input[name="lastNameInput"]').fill(user.lastName);
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator("span", { hasText: "A quick note about your Microsoft account" }).waitFor({ state: "visible", timeout: 0 });
  await outlook.waitForTimeout(200);
  await outlook.locator("button", { hasText: /OK/ }).click();

  await outlook.locator("h1", { hasText: "Stay signed in?" }).waitFor({ state: "visible", timeout: 0 });
  await outlook.waitForTimeout(300);
  await outlook.locator("button", { hasText: "Yes" }).click();

  await outlook.waitForURL("https://account.microsoft.com/?lang**")

  // Webshare register
  const webshare = await browser.newPage()
  await webshare.goto("https://dashboard.webshare.io/register")
  await webshare.locator('input[id="email-input"]').waitFor({ state: 'visible' });
  await webshare.locator('input[id="email-input"]').fill(user.email);
  await webshare.locator('input[autocomplete="current-password"]').fill(user.password);
  
  await webshare.locator('button[type="submit"]').click();
  await webshare.locator("h4", { hasText: "Welcome to Webshare!" }).waitFor({ state: "visible", timeout: 0 });

  await webshare.close()

  // Open Email
  await outlook.locator('button[title="App launcher"]').click();
  await outlook.waitForTimeout(300);

  const [outlookEmail] = await Promise.all([
    outlook.waitForEvent("popup"),
    outlook.locator('button[title="Outlook"]').click()
  ]);

  await outlookEmail.locator("span", { hasText: "Webshare Support" }).waitFor({ state: "visible" });
  await outlookEmail.locator("span", { hasText: "Webshare Support" }).click();

  await outlookEmail.locator("a", { hasText: "Verify Email" }).waitFor({ state: "visible" });

  // Get Proxies
  const [webshareVerified] = await Promise.all([
    outlookEmail.waitForEvent("popup"),
    outlookEmail.locator("a", { hasText: "Verify Email" }).click()
  ]);

  await webshareVerified.locator("button", { hasText: /Let's Get Started/ }).waitFor({ state: "visible" });
  await webshareVerified.locator("button", { hasText: /Let's Get Started/ }).click();

  await webshareVerified.locator("button", { hasText: /View My Proxy List/ }).waitFor({ state: "visible" });
  await webshareVerified.locator("button", { hasText: /View My Proxy List/ }).click();

  await webshareVerified.waitForURL("https://dashboard.webshare.io/**/proxy/list")

  await webshareVerified.locator("button", { hasText: /Download/ }).waitFor({ state: "visible" });
  await webshareVerified.locator("button", { hasText: /Download/ }).click();

  await webshareVerified.locator("a", { hasText: /Download Proxy List/ }).waitFor({ state: "visible" });
  const api = await webshareVerified.locator('input[type="text"]').inputValue();

  // Fetch Proxies
  const response = await fetch(api);
  const text = await response.text();
  console.log("Proxies:\n\n" + text)

  await browser.close();
}

main()
