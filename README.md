#PayPlay 
## Discover and Support Street Arts

### Artists: Have you been feeling the hit of an increasingly cash-less society? Would you like to give the public a way to find you based on your location? Then sign up on payPlay and establish your artistic presence!  
### Sponsors: Have you ever passed by a street artist, checked your pockets, and realized that you didn't have any cash to donate? Have you been remembering a particularly gifted artist that you would like to track down? Then sign up on payPlay to find your street artist and send them a token of your appreciation!
## VISUALS:  

-- ERD: https://i.imgur.com/oAcgzqk.png

-- wireframes:  
[Home Page](https://i.imgur.com/FJc8e5y.png)  
[Log-In Page](https://i.imgur.com/PRQ0omA.png)  
[Entry Submission](https://i.imgur.com/GifHd3k.png)  


## User Journey MVP:  

### Artist:  
1. FIRST VISIT:   
Register
Location map opens -> create your profile
Click on location
Create personal profile

2. ACCOUNT MAINTENANCE:  
Log In
Go to Profile 
Click on: Update Your Profile
Location map opens
Click on new location
Personal profile updated

### Sponsor:  
Register/Log In
Browse map to look for artists



### POST-MVP:  
-- Sponsors' location automatically centers the home map 
-- Sponsors can SEARCH artist by name/genre
-- Sponsors can create favorites list


## TECH: 
React  
Node  
Express  
Sequelize  
Postgres  
Axios  
bcrypt  
mapbox + Uber's mapbox-GL  

post-MVP:  
venmo or paypal payment link?   



## CONTROLLERS:  
artistController  
sponsorController   


----
## REACT COMPONENTS:  
Hierarchy: 

### MVP:  
Map  
artistRegister  
artistLogin  
ArtistList  
NewArtistForm  
UpdateArtistForm  
SingleArtist  



### TIMELINE: 
Day 1: scaffolding  
Day 2: approval + CREATING new artists via map input  
Day 3: auth + front-end  
Day 4: front-end 





| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Configuring API | High | 3hrs| N/A | N/A |
| Creating Component Structure/Routes | High | 3hrs| N/A | N/A |
| Populating database | High | 3hrs| N/A | N/A |
| Connecting DB with front-end | High | 3hrs| N/A | N/A |
| Handling new entry creation via map | High | 6hrs| N/A | N/A |
| Styling | High | 4hrs| N/A | N/A |
| Total | H | 6hrs| 5hrs | 5hrs |
