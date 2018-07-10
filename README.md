# aDogption
Dogs for people looking for dogs and home for dogs looking for a home


## ROUTES:
````
/ - The homepage
GET /auth/login
POST /auth/login
GET /auth/signup
POST auth/login

GET /dogs
GET /dogs/:id
POST /dogs/:id
GET /mydogs => GET
GET => /mydogs/:id => GET/POST
GET => mydogs/add => POST

* GET => /preferences => POST
````

## MODELS

````
dogs {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
    breed_type: {
      [{ type: String, enum: [ 'retriever', 'hunting', 'pastor', 'guard', 'sled', 'working', 'companion', '' ] }],
      default: 'retriever'
      },
    owner: {
      type: ObjectId,
      ref: 'User'
     },
     requests: [{
      owner: {
       type: ObjectId,
       required: true
       },
       message: {
        type: String,
        required: true
        },
        accepted: {
         type: boolean,
         required: true
         }****
      }]
      }
      ````
      
      ````
users {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
     required: true
}      
  password: {
    type: String,
    required: true
  },
  role: String(enum 'owner', 'shelter'),
  preferences: {
    breed_type: {
      type: String,
      required: true
    }, 
    age: {
      type: Number,
      required: true
      },
      city: {
        type: String,
        required: true
      }
}
````

## USER STORIES (TO BE CONTINUED):
  
- As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- As a user I want to be able to access the homepage so that I see what the app is about and login and signup 
- As a user I want to be able  to sign up on the webpage as a shelter so that I can start listing my dogs.
- As a user I want to be able  to sign up on the webpage as a owner so that I can start browsing through dogs to adopt.
- As a user I want to be able to log in on the webpage so that I can get back to my account.
- As a user I want a pony and a sandwich and a cup of hot cocoa and a new Nintendo so that I can check if the teachers are reading what we're writing.

- As a shelter I want to add dogs for adoption so that I can owners can see them.
- As a shelter I want to see all the dogs I added so that I can access their details.
- As a shelter I want to see all the requests made for a specific dog so that I can choose the owner.
- As a shelter I want to accept one user so that I can start the adoption process.
- As a shelter I want to see the details of a specific dog so I can edit or remove it.
- As a shelter I want to edit the information of a specific dog so I can keep it updated.
- As a shelter I want to remove a specific dog from My Dogs so that is not listed anymore.
- As an owner I want to see all the dogs in adoption so that I can choose my favorite one.
- As a owner I want to send a request to the shelter for a specific dog so that I am considered for adoption.
- As a owner that has requested a dog for adoption I want to immediately receive an email so that I know if my request was accepted or rejected.
- As an owner that has requested a dog for adoption I want to see that status of my request of the dog details page. 
- As a shelter I want to immediately receive an email when a request is made so that I can check it.
- As a shelter I want to know when a request is made on the dogs detail page so that I can review it.

*
- As a user/owner I want to set my preferences so that I only see dogs that match them.
- As a user/owner I want to be able to view a page for just my selected ones so that my search can be more efficient.


NFR
- As a user I want the service provided to be unambiguous and fast
- As a user I want layouts to be clear and concise with no extraneous information 
