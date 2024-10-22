# Taskpal

[Take a look at what you'll build!](https://taskpal.svelte.dev/)

This is the companion repository for my workshop [Full-Stack Development with Svelte & SvelteKit (CF Edition)](https://slides.com/nilsroehrig/full-stack-development-with-svelte-sveltekit-cf-edition).
The code uses the freshly released Svelte 5 and therefore, the documentation is a bit scattered. You can find everything
you need at

- [the official Svelte (4) documentation](https://svelte.dev/docs)
- [the Svelte 5 preview documentation](https://svelte-5-preview.vercel.app/docs/introduction)
- [the up and coming Svelte Omnisite](https://svelte-omnisite.vercel.app/)

Regarding the other dependencies, you can refer to their respective docs:

- [PicoCSS](https://picocss.com/)
- [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte)

## Hands-On Exercises for Part I

You'll mostly work on [src/routes/(authenticated)/app/dashboard/+page.svelte](<src/routes/(authenticated)/app/dashboard/+page.svelte>).

1. Modify the filter input to filter all visible tasks by their name and description
2. Extract the status columns as a component.
3. Extract the task board as a component.
4. Make sure, that the drag and drop logic remains solely in the task board, so that the other components can be used standalone

## Hands-On Exercises for Part II

This time, there is some preparation necessary.

- If not already done, copy the wrangler.toml.example to wrangler.toml.
- Uncomment lines 28, 29 and 31
- Run the following commands

```bash
npx wrangler d1 migrations apply DB --local
npx prisma generate
```

Now restart your dev server and open [the seeder script](http://localhost:5173/demo/seed) in the browser. Now you should
have some dummy data in your database and you can start with the exercises.

1. Add an endpoint to remove a task. It should be accessible right from the task card.
2. Add a page with form and action to edit a task. It should be linked right from the task card.

## Developing

```bash
# install dependencies
npm ci

# start dev server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying

In order to deploy, the wrangler.toml.example file must be copied to wrangler.toml.

```bash
# deploy to Cloudflare
npm run deploy
```
