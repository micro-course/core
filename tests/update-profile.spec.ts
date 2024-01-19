import { test, expect } from "@playwright/test";
import { adminFile, userFile } from "./constants";
import { ADMIN } from "./stabs/users";

test.describe("update-profile as admin", () => {
  test.use({ storageState: adminFile });
  test("update username", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "AD" }).click();
    await page.getByRole("menuitem", { name: "Профиль" }).click();
    await page.waitForURL(`/profile/${ADMIN.id}`);
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("Admin");
    await page.getByRole("button", { name: "Сохранить" }).click();
    await expect(
      page.getByRole("img", { name: "Обновление профиля" }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "AD" }).click();
    await expect(page.getByText("Мой аккаунтAdmin")).toBeVisible();
    await page.locator("html").click();
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("");
    await page.getByRole("button", { name: "Сохранить" }).click();
    await expect(
      page.getByRole("img", { name: "Обновление профиля" }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "AD" }).click();
    await expect(page.getByText("Мой аккаунтadmin@gmail.com")).toBeVisible();
  });

  test("can update anouther user", async ({ page }) => {
    await page.goto("/profile/user-2");
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("User");
    await page.getByRole("button", { name: "Сохранить" }).click();
    await expect(
      page.getByRole("img", { name: "Обновление профиля" }),
    ).not.toBeVisible();
    await page.reload();

    await expect(page.getByLabel("Имя пользователя")).toHaveValue("User");
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("");
    await page.getByRole("button", { name: "Сохранить" }).click();
  });
});

test.describe("update-profile as user", () => {
  test.use({ storageState: userFile });
  test("update username", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "US" }).click();
    await page.getByRole("menuitem", { name: "Профиль" }).click();
    await page.waitForURL("/profile/user");
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("User");
    await page.getByRole("button", { name: "Сохранить" }).click();
    await expect(
      page.getByRole("img", { name: "Обновление профиля" }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "US" }).click();
    await expect(page.getByText("Мой аккаунтUser")).toBeVisible();
    await page.locator("html").click();
    await page.getByLabel("Имя пользователя").click();
    await page.getByLabel("Имя пользователя").fill("");
    await page.getByRole("button", { name: "Сохранить" }).click();
    await expect(
      page.getByRole("img", { name: "Обновление профиля" }),
    ).not.toBeVisible();
    await page.getByRole("banner").getByRole("button", { name: "US" }).click();
    await expect(page.getByText("Мой аккаунтuser@gmail.com")).toBeVisible();
  });

  test("can not update anouther user", async ({ page }) => {
    await page.goto("/profile/admin");
    await expect(
      page.getByText("Не удалось загрузить профиль, возможно у вас нет прав"),
    ).toBeVisible();
  });
});
