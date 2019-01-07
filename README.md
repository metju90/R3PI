# Running the application

To run the application in dev mode, clone the repo and execute `npm i && npm start` in the root directory.

## Performance

Website performance is a field which I find very interesting and I've put an effort to ensure this application is optimized. See features related to web performance below:

- Memo - I leveraged a key feature of React released in 16.6. `memo`. I am using this feature very carefully as such performance-enhancers operations may backfire and slows down an application if they are not used wisely.

- Code splitting, lazy loading content - I've made use of React's latest (hmm, sounds strange to say "React's latest" without including hooks) features `Suspense` and `lazy`. Code splitting is essential for a faster first paint and time to interactive.

- Images loading - When a bunch of requests were being made to load images, until the actual image were fully loaded I experienced plenty of flickers and blank spaces which surely did not help the UX. To prevent this, i built `Image` component found in `src/components/Image`.

- Preloading - In one particular case, I manually-preloaded content for the user(Followers tab, user profile)

- CSS - used [hardware Acceleration CSS properties](https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/) for animation

## Features (non-technical)

On top of the listed requirements, I added the following:

- User profile - Clicking on any user from the home page will direct you to a user's dashboard. I've been pragmatic and included limited but sufficient features to demonstrate my skills. Does include: Users personal details, repositories and followers.
- Navigation - Additional to the two required routes, certain section of the User profile (repositories and followers) are accessible with a direct link. When seeing a user followers, clicking a particular follower will take you to his/her profile.
- Pagination - Pagination is used in the homepage and as well in `Repos` and `Followers` tab in user's profile.

## Reusability

I reused as many components as I could. Namely:

- `src/components/Pagination`
- `src/components/UserLink`

## Abstractions

As an engineer, I do love abstractions and I tried to the best of my abilities to keep my code `dry`. You can see my attempts in the following files:

- `src/actions/common`
- `src/components/Pagination`
- `src/redux/reducers/*`

## UI - design

Over the 4 years that I have been working in this line of work, I've built countless amount of landing pages with a variety of designs ranging from very simple static pages to complicated ones which includes animation.

However, my UI design skills are very basic and thus, i've created a very simple UI.

## UX

I put great effort to ensure the UX is good. I applied:

- Loading spinners
- Default static image - To be shown in every image while the actual image is loading to mitigate/eliminate flickers and enhances the smoothness of the website.
- Resetting  global state - Upon `UserDashboard` component unmount, I am resetting its respective global state to avoid showing the previous user's data until the newly requested data is being fetched.

## CSS

One of the early decision which I took was on whether to use any `CSS` processor or not. When I learned `TypeScript` is a must to use, due to my lack of experience with the technology, I knew it could potentially consume a considerable amount of my time and therefore, for such a small application I decided to go with vanilla CSS.

FYI, I am a fan of CSS in JS. `styled-components` in particular.

I built the Vanilla CSS with mobile-first approach. I explained what mobile-first approach CSS in this [stackoverflow answer](https://stackoverflow.com/questions/51233235/css-techniques-for-responsive-web-design/51233397#answer-51233397)

## TypeScript

I appreciate the benefits of type checking but unfortunately I dont have much experience with Ts. After spending a considerable amount of time on researching how to compile TS, I decided to take some shortcuts by ignore certain rules and abusing the type of `any`.

## Error handling

I am just showing a simple generic error message incase of a critical error. Ideally I render an error message more inline with what went wrong (i.e. show page cannot be found for 404 error). For this particular case I thought what I did is sufficient.

## Unit Testing

Testing is very important part for sustainable and scalable software. I preferred investing my time on illustrating my code rather than making unit testing since this is not a production-ready application

## Github's API access token

The token is in the source code. I will revoke the token's permission once this review is finished.

## Refactoring

I have done two "big" refactors which two different developers may have different opinion about. The last refactor was the one in  [Reducers and actions](https://github.com/metju90/R3PI/commit/c35d8bef87f0d30ee9761ea0ca2207bf5ccab958) and the first one was to [downgrade two components from class to functional and pulling some of their logic into their parent](https://github.com/metju90/R3PI/commit/dccc2a66caf70757e4d26d3ec61466052b5fd79d)

I'd be more than happy to discuss the reasons behind those two refactors.

## Your feedback

I will greatly appreciate your honest and straight forward feedback. I consider criticism on my software as a starting point for a conversation and/or room for improvement
