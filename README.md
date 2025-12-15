# QUOTES

### *Idea behind this project*
I needed an application on which I could store inspiring quotes or longer pieces of text. I also wanted to share those quotes or text on social media and show a dynamic post preview, just so a quote (or part of it) could be read without having to leave the social media platform. 

** App URL**: https://fanerotim-quotes.netlify.app/

*The API of the app is currently deployed on a free 'Render' instance which spins down with inactivity. Due to this, it takes about a minute for the initial load to complete.*

## Technical Stack
- Frontend: React (v18.3)
- Backend: Express JS
- Database: MySQL
- Tests: Jest + Supertest

## Architecture

- Frontend
  - components
  - contexts
  - hooks
  - requester
  - utils
 
- Backend
  - controllers
  - cron-jobs
  - fonts
  - lib
  - logger
  - logs
  - mail
  - services
  - middlewares
  - route-guards
  - router
  - utils
  - views

## Key features

- **CRUD**: *registered users can Create, Read, Update and Delete quotes*
- **Like**: *users can like quotes of other users*
- **Update and Forgotten password**: *users can manually update their existing password or request a new one if they've forgotten it.* 
- **JWT authentication**
- **Invalid JWT blacklisting**: *expired or invalid tokens are blacklisted / stored in a database. When the user logs out, their token gets blacklisted*
- **Cron Jobs**: *one cron job is added for now. a function that clears blacklisted tokens from the database.*  
- **Logger**: *write information related to each success cron job execution or user login to log files.* 
- **Email notification**: *users receive an email on successful register or forgotten password request*
- **Social media sharing**: *for now, just Facebook sharing is supported*
- **Dynamic social media post preview**: *quotes shared on Facebook generate dynamic post preview image*
- **Dynamic SVG generation**: *a function generates an SVG image dynamically, which is then converted into a .png image and served to social media cralwers. at the moment just to 'facebookexternalhit/1.1' and 'LinkedInBot/1.1'.*
- **Dynamic meta tags**: *serve dynamic `<head>` element to social-media crawlers*
- **Search**: *search by author*
- **Most recently added**: *functionality that lists the three most recently added quotes*
- **Custom select element**
- **Pagination**: *offset-limit parameter method. scroll-based with a 'Load More' button*
- **Caching**: *custom implementation with React Context and localStorage.*
- **Custom Back button implementation**: *it's implemented with React Context and useLocation(). avoided using the -1 approach to gain deeper understanding of this problem*
- **Back button scrolls to previous quote**: *when a user goes back from details page to /quotes page the app will scroll to previous quote*
- **Delete, Success and Session Expired modals**: *body-scrolling gets disabled*
- **Toaster**: *currently only used to display errors*
