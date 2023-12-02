import { test, expect } from "@playwright/test";

test("create delete course list", async ({ page }) => {
  await page.locator("body").click();
  await page.goto("/");
  await page.getByPlaceholder("название").click();
  await page.getByPlaceholder("название").fill("Test course");
  await page.getByPlaceholder("описание").click();
  await page.getByPlaceholder("описание").fill("Test description");
  await page.getByRole("button", { name: "Добавить" }).click();
  await expect(
    page.getByText("Test courseTest descriptionУдалить"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Удалить" }).click();

  await expect(
    page.getByText("Test courseTest descriptionУдалить"),
  ).not.toBeVisible();
});
