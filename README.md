# ZenML stacks

[CHALLENGE.md](./CHALLENGE.md)

Try it live: [https://zenml-stacks.kipras.org](https://zenml-stacks.kipras.org)

## Setup

```sh
git clone https://github.com/kiprasmel/zenml-stacks
cd zenml-stacks

yarn
yarn start
```

## Notes

### Tech used

- I would've used ZenML's component library, but it looked outdated - last commit was 5 months ago. Why's that?
	- I ran the project locally & the UI looked great. Perhaps you've had challenges extracting UI pieces into the library?

- Otherwise, used a standard react setup via create-react-app (which isn't as up-to-date, but was just an easy way to get started, without having to make a new webpack+babel setup).
	- Could've used nextjs, but previous challenges were without it & thus I already had this setup available, so went along with it.
- React-query for data fetching, simple retry logic with exponential backoff for failures.
- Emotion for a quick css-in-js setup - could've used tailwind but again, I had this setup ready as other challenges asked not to use tailwind, so just was the easiest to go with.

### Implemented features

- Automatically generated types for Stack Components ([src/data/generate-stack-component-ts-types.js](src/data/generate-stack-component-ts-types.js))
	- Not perfect (e.g. empty dictionaries (`{}`) for `configuration` in some cases, when should be `Record<string, string | number>` or so), but:
		- Easily fixable if given more data - simply re-run generation script
		- Was a quick way to get the types, instead of manually going thru all the data, extracting unique properties, and doing vim macro magic

- A simple list of stacks
	- Used icons to conveniently indicate if stack components are present in the stack
	- If >1 stack component of the same flavor is used in a stack, that is also indicated
	- Search functionality
	- Loading indicator while data not fully fetched yet

- A panel of detailed information about a stack & its components
	- Opens as a right sidebar, does not block user from interacting with other parts of the UI
	- Presents basic information of the stack, the description, and then info of individual components: types, flavors, configurations

### Not implemented / ideas for improvement

- A project selector -- if there are stacks from many different projects, it'd make sense to have a list of projects to select from, and then only display the stacks that are part of the select project(s).
- Full CRUD operations on stacks/stack components:
	- Editing stack component configurations
		- Differentiating between "update configuration in all stacks that use this component" vs "fork this component & update only here"
			- Reverse visualization - given a stack component, which stacks use it?
	- Adding & removing components from stacks
	- Transfering stacks between projects, users (owners)

### Re: bonus points

- For implementing full CRUD operations, I'd use react query's mutations.
	- Create appropriate functions in [src/api/api.ts](src/api/api.ts)
	- Setup hooks in [src/hook/useStacks.ts](src/hook/useStacks.ts)
	- Add buttons in the UI to perform the CRUD actions
	- Use react query's optimistic updates to display changes in the UI, in advance of them getting fully committed in the backend/database.

- For storing auth cookies/tokens:
	- For cookies, ensure they have proper security attributes: Secure, HttpOnly, SameSite. Then storage is automatically handled by the browser & the Max-Age attribute
	- For tokens, can use local storage (or session storage depending on use-case), though have to be aware that it's easier to access them, e.g. via the console, or browser extension.

- For separating open-source vs commercial features:
	- First, extract commonly used parts that are reusable, e.g. component library
	- Have a system for dynamically loading commercial features, so that they aren't available for the open-source editiong, e.g. dynamic imports, lazy loading, code scriptting, or even separating react roots completely & injecting scripts dynamically, or producing different bundles at compile time.

## Overall

Interesting challenge, I think the icons idea turned out nicely. Happy to discuss further.
