import { expect, test } from "@playwright/test";

test("record multi-quantity cafe planner UI flow", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Cursor Cafe Planner" }),
  ).toBeVisible();

  await page.getByRole("region", { name: "Meal options" }).scrollIntoViewIfNeeded();

  await page
    .getByRole("button", { name: "Add Sunny Noodle Bowls to plan" })
    .click();

  await expect(
    page.getByRole("group", { name: "Quantity in plan for Sunny Noodle Bowls" }),
  ).toBeVisible();

  const increaseSunny = page.getByRole("button", {
    name: "Increase quantity of Sunny Noodle Bowls",
  });

  await increaseSunny.first().click();
  await increaseSunny.first().click();

  await expect(page.getByText("18 total servings").first()).toBeVisible({
    timeout: 10_000,
  });

  await page
    .getByRole("button", { name: "Add Desk Picnic Wraps to plan" })
    .click();

  await page.waitForTimeout(500);

  const plan = page.getByRole("complementary");

  await plan
    .getByRole("button", { name: "Decrease quantity of Sunny Noodle Bowls" })
    .click();

  await page.waitForTimeout(500);

  await plan
    .getByRole("button", { name: "Remove Desk Picnic Wraps from plan" })
    .click();

  await expect(plan.getByText("Desk Picnic Wraps")).toHaveCount(0);

  await page.waitForTimeout(2200);
});
