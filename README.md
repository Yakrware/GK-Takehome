# Developer Notes

## Known Issues

- I had forgotten about the dropdown requirement when I started designing the user experience, and only rediscovered this requirement right before submission. If given more time to change the search component, I would have instead created a dropdown search directly on the home page using the RepoListItem without borderRadius to display the results. At the time of designing, I felt it would be best to utilize an entire page for search results for better viewability, hence moving it off onto another screen.
- Unfortunately, I did not have enough time to include tests. If given more time, I would also include unit testing for all server and API requests, snapshot tests, as well as end to end tests via Detox.

## If Given More Time...

As I was working on this and designing the app, I thought the following would be great followups to work on:

- Add more delightful animations (ex: after user saves a repo, loading animation while search results are fetched)
- Show previously saved repos for easier resaving
- Make it harder to unsave, since current experience could cause bad user experience due to fat finger unsaving
- Show previous searches for quicker re-search
- Keep a previous search result cache
- Github login to enable higher rate limits and customized search results
- Preview repo before saving
- View more repo info within app - currently user can only click on the repo name to open the repo's Github page in brower
- Make saved repos sortable by language, alphabetical, etc
  - Would use bottom sheet picker
  - Did binary sort by stars for time's sake
- Make search results sortable/filterable
- Darkmode support
- Storybook component integration for better component debugging and documentation

## Final Note

Overall, I had a great time working on this challenge! I originally started with setting up a Redux store, but then saw a jotai Provider already setup in the starter code. I've never used jotai before and loved the ease of use. It especially made setting up a rate limit timer and user experience much easier than I had expected. To whoever grades this - I hope you enjoy playing around with the app (insert Clippy waving here)!

# React Native Engineer Challenge (2-5 hrs)

Thanks for trying our development challenge! Let's get started.

### The Challenge

We ask that you write a React Native application capable of the following:

- Search your favorite repositories from Github and select them from a dropdown
  - List item should have name, description, language, and stars visible
- Save them to the server by using the `reposerver` API
- App should have a list view where you are able to sort your favorites by stars (`stargazers_count`)
  - Up to 10 repositories may be saved for a user
  - Repositories should be removable or added
- If the app is refreshed, the saved repositories should populate the list so long as the server is running.

GitHub API (https://developer.github.com/v3/)

UX Requirements:

- Search input for Github repositories should be an autocomplete dropdown

**NOTE** Please treat this as an opportunity to show off, and let us see how you would write and visually present something that you'd be proud of! There is no one "correct" answer.

### The Server

**IMPORTANT**: The server is written to store repositories in memory; as such, should you restart/kill the Docker container you will lose your "database"!

#### A few endpoints

- `GET health` health check
- `GET repo` list all repositories
- `DELETE repo/[repoID]` delete a repo
- `POST repo` create a repository

_Please make sure to add a trailing forward slash (`/`) at the end of every point except for /health (e.g. `curl http://localhost:8080/repo/`)_

#### The Repository object

- id: 1 (string, required) - The unique identifier for a product
- fullName: ethereum/go-ethereum (string, required) - Name of the repository
- stargazersCount: 12 (number, required) - Number of stargazers
- language: ethereum/go-ethereum (string, required) - Programing language
- url: https://api.github.com/repos/ethereum/go-ethereum (string, required) - URL of the repository
- createdAt: 2013-12-26T13:05:46Z (string, required) - CreatedAt of repository

#### JSON

```json
{
  "id": "15452919",
  "fullName": "ethereum/go-ethereum",
  "createdAt": "2013-12-26T13:05:46Z",
  "stargazersCount": 26012,
  "language": "Go",
  "url": "https://api.github.com/repos/ethereum/go-ethereum"
}
```

## Using this app

### Prereqs

- Docker
- Ruby (built-in mac default, 2.6, should be sufficient)

### Setup

```
npm i
npm run ios:setup
```

### Start the API server

In a separate terminal:

```
npm run dev:server
```

```bash
2020/02/05 11:09:44 listening on port 8080
```

### Development

```
npm run ios
```

## Your Solution

Your code should build and run on a Mac (or GNU/Linux machine) running a recent OS.

Please push it to a fresh repository and submit a link to that repository.

Third-party libraries are permitted; however, as our intent is to come to understand your design choices, we ask for a short description of the rationale of your choices.

### Before submitting your code

**IMPORTANT**: To help keep code reviews anonymous, please be sure to remove any sensitive information about yourself from your deliverable.

**We expect you to make sure that your solution works with `reposerver` and the Github v3 API before sending it to us**.

### Acceptance Criteria

We expect you to write **code you would consider production-ready**. This can mean a variety of things, but most importantly we look for code to be well-factored, follow good practices, and be tested.

What we will look for:

- Does your code fulfill the requirement and successfully run against both `reposerver` and the Github v3 API?
- How clean is your design? How easy is it to understand, maintain, or extend your code?
- How did you verify your software, if by automated tests or by other means? How much application code is covered?
- How did you handle empty data states?
- What kind of documentation did you ship with your code?

### Housekeeping notes

- If you run into any issues building the GCR image, **please contact us immediately**
- Please feel free to make assumptions, but ensure to note what they were and how you adapted to them.

Good luck!
