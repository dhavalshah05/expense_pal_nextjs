export const homePageRoute = () => "/"
export const loginPageRoute = () => "/login"
export const registerPageRoute = () => "/register"
export const expensesPageRoute = () => "/expenses"
export const createExpensePageRoute = () => "/expenses/create"
export const categoriesPageRoute = () => "/categories"
export const createCategoryPageRoute = () => "/categories/create"
export const expenseByCategoryRoute = (categoryId: string) => `/expenses/category/${categoryId}`
