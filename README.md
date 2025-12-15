## QUOTES

** App URL**: https://fanerotim-quotes.netlify.app/

*The API of the app is currently deployed on a free 'Render' instance which spins down with inactivity. Due to this, it takes about a minute for the initial load to complete.*

## Technical Stack
- Frontend: React (v18.3)
- Backend: Express JS
- Database: MySQL

## Key features

- **CRUD**: registered users can Create, Read, Update and Delete quotes
- **Like**: users can like quotes of other users
- **Update and Forgotten password**: users can manually update their existing password or request a new one if they've forgotten it. 
- **JWT authentication**
- **Invalid JWT blacklisting**: expired or non-valid tokens are blacklisted / stored in a database. When user logs out their token gets blacklisted
- **Cron Jobs**: one cron job is added for now. a function that clears blacklisted tokens from the database.  
- **Logger**: add information related to each success cron job execution or user login to log files. Can be extended. 
- **Email notification**: users receive an email on successful register or forgotten password request
- **Social media sharing**: users can share a quote on Facebook
- **Dynamic social media post preview**: 
- **Search**:
- **Most recently added**:
  
