import { chromium, Page } from 'playwright';
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
  const browser = await chromium.launch({ headless: false });
  const outlook = await browser.newPage();
  const user = generate()

  console.log("user", user)

  await outlook.goto('https://signup.live.com/signup');
  await outlook.locator('input[type="email"]').fill(user.email);
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('input[type="password"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  await outlook.locator('input[type="password"]').fill(user.password);
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('label[for="BirthDayDropdown"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  await outlook.locator('label[for="BirthDayDropdown"]').click();
  await outlook.locator('div[role="listbox"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  const birthDayItem = await getRandomDiv(outlook, 'div[role="listbox"]')
  await birthDayItem.click();
  await outlook.waitForTimeout(500);

  await outlook.locator('label[for="BirthMonthDropdown"]').click();
  await outlook.locator('div[role="listbox"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  const MonthItem = await getRandomDiv(outlook, 'div[role="listbox"]')
  await MonthItem.click();
  await outlook.waitForTimeout(500);
  await outlook.locator('input[type="number"]').fill(getRandomInt(1980, 2006).toString());
  await outlook.locator('button[type="submit"]').click();

  await outlook.locator('input[name="firstNameInput"]').waitFor({ state: 'visible' });
  await outlook.waitForTimeout(500);
  await outlook.locator('input[name="firstNameInput"]').fill(user.firstName);
  await outlook.locator('input[name="lastNameInput"]').fill(user.lastName);
  await outlook.locator('button[type="submit"]').click();

  await outlook.waitForTimeout(50000);
  await browser.close();
}

main()
