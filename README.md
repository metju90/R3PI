# Running the application

To run the application in dev mode, clone the repo and execute `npm i && npm start` in the root directory.

# Performance

Website performance is a field which I find very interesting and I've put an effort to ensure this application is optimized. See features related to web performance below:

- Memo - I leveraged a key feature of React released in 16.6. `memo`. I am using this feature very carefully as such performance-enhancers operations may backfire and slows down an application if they are not used wisely.

- Code splitting, lazy loading content - I've made use of React's latest (hmm, sounds strange to say "React's latest" without including hooks) features `Suspense` and `lazy`. Code splitting is essential for a faster first paint and time to interactive.

- Images loading - When a bunch of requests were being made to load images, until the actual image were fully loaded I expierenced alot of flickering and blank spaces which surely did not help the UX. To prevent this, i built `Image` component found in `src/components/Image`.

- Preloading - In one particular case, I manually-preloaded content for the user(Followers tab, user profile)

- CSS - used [hardware Acceleration CSS properties](https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/) for animation

## Features (non-technical)

On top of the listed requirments, I added the following:

- User profile - Clicking on any user from the home page will direct you to a user's dashboard. I've been pragmatic and included limited but suffiecent features to demostrate my skills. Does include: Users personal details, repositeries and followers.
- Navigation - Additional to the two required routes, certain section of the User profile (reposotreies and followers) are accessible with a direct link. When seeing a user followers, clicking a particular follower will take you to his/her profile.
- Pagiation - Pagiation is used in the homepage and as well in the user profile when provided by the API.

# Reusability

I reused as many components as I could. Namely:

- `src/components/Pagination`
- `src/components/UserLink`

# Abstractions

As an engineer, I do love abstractions and I try my best to keep my code `dry`. Look for the following:

- `src/actions/common`
- `src/components/Pagination`

## UI - design

Over the 4 years that I have been working in this line of work, I've built countless amount of landing pages with a variety of designs ranging from very simple static pages to complicated ones which includes animation.

However, my UI design skills are very basic and thus, i've created a very simple UI.

## UX

I put great effort to ensure the UX is good. I am using spinners and rendering static images while the actual one loads to minimize flickers and enhances the smoothness of the website.

## CSS

One of the early decision which I took was on whether to use any `CSS` processor or not. When I learned `TypeScript` is a must to use, due to my lack of experience with the technology, I knew it could potentionally consume a considerable amount of my time and therefore, for such a small application I decided to go with vanilla CSS.

FYI, I am a fan of CSS in JS. `styled-components` in particual.

I built the Vanilla CSS with mobile-first approach. I explained what mobile-first apporach CSS in this [stackoverflow answer](https://stackoverflow.com/questions/51233235/css-techniques-for-responsive-web-design/51233397#answer-51233397)

## TypeScript

I apprecicate the benefits of type checking but unforetuneatly I dont have much experience with Ts. After spending a conserdiable amount of time on researching how to compile TS, I decided to take some shortcuts by ignore certain rules and abusing the type of `any`.

## Error handling

I am just showing a simple message incase of a critical error. Ideally I render a nice 500 error page. For this particular case I thought it was not neccessary.

## Your feedback

I will greatly apprecicate your honest and straight forward feedback.

error message is too simple...

access token, can be used without any probs.
