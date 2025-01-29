# Standardtechst
![logo](https://github.com/user-attachments/assets/8c46a448-c22c-4fb0-a17e-52bbd1d46ef5)

## Description
An opinionated, full stack scaffold for rapid prototyping and iteration of alpha and beta products

**Standardtechst** is from the Danish *standardtekst*, meaning boilerplate, with some simple wordplay thrown in

The logo is meant to evoke old bronze typesetting blocks, where the bare bronze shows through on the elevated letter ridges and everything else covered in ink

Currently in initial development / pre-release phase

## Todo for initial release candidate 0.0.1:

### Back end
- [x] Pocketbase as project requirement/framework
- [x] Air for hot reloading
- [ ] Plausible custom event hook/route
- [ ] Generic middleware setup
- [ ] Auth middleware
- [ ] Memory store for auth (eliminate most frequent DB hits)
- [x] Logging
- [ ] Migrations (for user Settings feature)
- [ ] Testing setup
- [ ] Subscriptions provider
- [ ] Email+templates (See: User reset password feature)
- [ ] Sentry integration
- [ ] Dockerfile
- [ ] Github workflows for linting/unit tests/integration tests

### Front end
- [x] React with Vite and TS
- [x] ESLint
- [x] Prettier
- [x] RadixUI
- [x] RadixUI Theme 
- [x] TanStack Router
- [x] TanStack Query/Mutation
- [X] Auth provider
- [x] Route protection
- [ ] API provider
- [x] User authentication feature
- [x] User registration feature
- [ ] User reset password feature
- [ ] React Testing Library w/ Vitest
- [ ] i18n
- [x] React Hook Form 
- [x] Zod
- [ ] Subscriptions/notifications provider
- [ ] Toast hook
- [ ] User Settings feature
- [ ] Some sensible styling
- [ ] Sentry integration
- [ ] Dockerfile
- [ ] Github workflows for linting/unit tests/integration tests

### Root
- [x] OSS Docs
- [x] Logos
- [o] Cleanup
- [ ] compose.yaml
- [ ] Github workflows for E2E testing/build/deploy
- [o] README 0.0.1
- [o] Roadmap 0.0.2
- [o] Release