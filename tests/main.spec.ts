import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Have To Do/);
});

test("input todo", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("textbox", { name: "todo" }).fill("To do");
  await page.keyboard.press("Enter");

  const todos = await page.getByTestId("todo-item").all();
  await expect(todos).toHaveLength(1);
});
test("input and delete todo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const todoList = ["Todo", "Todo again", "and again"];

  for (let i = 0; i < todoList.length; i++) {
    await page.getByRole("textbox", { name: "todo" }).fill(todoList[i]);
    await page.keyboard.press("Enter");
  }

  const minNumber = 0;
  const maxNumber = todoList.length - 1;
  const randomNumber = Math.floor(
    Math.random() * (maxNumber - minNumber + 1) + minNumber,
  );

  const todos = await page.getByTestId("todo-item").all();
  await expect(todos).toHaveLength(todoList.length);

  const deleteTodoButton = await todos[randomNumber].getByTestId("delete");

  await deleteTodoButton.click();

  const todosRemainder = await page.getByTestId("todo-item").all();

  await expect(todosRemainder).toHaveLength(todoList.length - 1);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
