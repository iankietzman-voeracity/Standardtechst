# Standardtechst
![logo](https://github.com/user-attachments/assets/8c46a448-c22c-4fb0-a17e-52bbd1d46ef5)

## Description
A somewhat opinionated, full stack scaffold for rapid prototyping and iteration of alpha and beta products

In short, a PocketBase back end extended with Go, plus a React with Typescript web application. The general idea is standardizing some common project bootstrapping tasks in a sensible, extensible, maintainable way so that developers can get right to work building and iterating features.

(If you haven't checked out [PocketBase](https://pocketbase.io/), please do so -- it's a great project)

As this is meant for rapid iteration of alpha/beta products, it is not necessarily meant to have a proper update+upgrade schedule or process. Just grab the newest version and run.

**Standardtechst** is from the Danish *standardtekst*, meaning boilerplate, with some simple wordplay thrown in. One could alternatively describe it as a portmanteau + an abbreviation. (Standard Tech Stack >> StandardTechStack >> StandardTechSt >> Standardtechst)

The logo is meant to evoke old bronze typesetting blocks, where the bare bronze shows through on the elevated letter ridges and everything else is covered in ink.

Currently in initial development / pre-release phase

More documentation is in the works, but if you've got React/TS experience you should be right at home in the web application, and the PocketBase docs should tell you everything you need to know about the server for the time being.

## Installation
### Requirements:
* Go
* Node
* Typescript
* [air](https://github.com/air-verse/air) (optional, allows live reload on the dev server)

### Steps:
* Clone the project
* Install server dependencies with `go mod tidy`
* Run server with `go run . serve`
* (Optional) Configure air and subsequently run the server with live reload with a simple `air`
* Install web application dependencies with `npm i`
* Run web application with `npm run dev`

### Scripts and Tests
For now check package.json for details on running web client scripts for linting and formatting. More scripts will follow, as will comprehensive testing set ups.

## Work completed for initial release candidate 0.0.1:

### Back end
- [x] PocketBase as application requirement and extensible framework
- [x] Air for hot reloading
- [x] Logging

### Front end
- [x] React with Vite and TS
- [x] ESLint
- [x] Prettier
- [x] RadixUI
- [x] RadixUI Theme 
- [x] TanStack Router
- [x] TanStack Query/Mutation
- [x] React Hook Form 
- [x] Zod
- [X] Auth provider
- [x] Route protection
- [x] Feature: User authentication
- [x] Feature: User registration

### Root
- [x] OSS Docs
- [x] Logos
- [x] Cleanup
- [x] Roadmap 0.0.2
- [o] README 0.0.1
- [o] Release


## Todo for release candidate 0.0.2:

### Back end
- [ ] Plausible custom event hook/route
- [ ] Generic middleware setup
- [ ] Auth middleware
- [ ] Memory store for auth (eliminate most frequent DB hits)
- [ ] Migrations (for user Settings feature)
- [ ] Testing setup
- [ ] Subscriptions provider
- [ ] Email+templates (See: User reset password feature)
- [ ] Sentry integration
- [ ] Dockerfile
- [ ] Github workflows for linting/unit tests/integration tests

### Front end
- [ ] API provider
- [ ] User reset password feature
- [ ] React Testing Library w/ Vitest
- [ ] i18n
- [ ] Subscriptions/notifications provider
- [ ] Toast hook
- [ ] User Settings feature
- [ ] Some sensible styling
- [ ] Sentry integration
- [ ] Dockerfile
- [ ] Github workflows for linting/unit tests/integration tests

### Root
- [ ] compose.yaml
- [ ] Github workflows for E2E testing/build/deploy
- [ ] Roadmap 0.0.3
- [ ] README 0.0.2
- [ ] Release