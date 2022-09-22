## View project

Please visit [this page](https://zhanghanwen96.github.io/FE-Code-Challenge/) to view live project.

## Start project

`yarn dev` to start development server

## To improve

There is only limited time for me to finish the task, although the main functionality and all requirements are fulfilled, there are still things can be improved.

-   select filter options too fast will init multiple http requests, need to cancel last request as well as setState callback ✅
-   when clicking on border country, go back button will return to previous viewed detail page ✅

-   Code Refactor, pull out fetch api to hooks, image lazy loading etc,.
-   Store and recover user's theme (use localstorage)
-   Detail page can use data transfered from `pushHistory(data)`, to avoiding http request
-   Add `React Suspense` to handle fallback or error case
-   Use query params to remember search status when go back
-   Pagination for country list (I can not see any api support for this purpose)
