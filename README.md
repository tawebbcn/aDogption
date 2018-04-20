# aDogption
Dogs for people looking for dogs and home for dogs looking for a home


##ROUTES:

/ - The homepage
GET => /auth/login => POST
GET => /auth/signup => POST
GET => /dogs => GET
GET => /dogs/:id => GET/POST
GET => /mydogs => GET
GET => /mydogs/:id => GET/POST
GET => mydogs/add => POST

* GET => /preferences => POST

##MODELS

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
      
users {
  name: {
    type: String,
    required: true
  },
  username: {
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

##USER STORIES (TO BE CONTINUED):
  
- As a user I want to see a nice 404 page when I go to a page that doesn’t exist
- As a user I want to see a nice error page when the super team screws it up
- As a user I want to be able to access the webpage 
- As a user I want to be able  to sign up on the webpage and choose my role (owner or shelter)
- As a user I want to be able to log in on the webpage
- As a user I want a pony and a sandwich and a cup of hot cocoa and a new Nintendo

- As a user I want layouts to be clear and concise with no extraneous information
- As a user I want the service provided to be unambiguous and fast
- As a user/shelter I want to add dogs for adoption
- As a user/shelter I want to see all the dogs I added and see other dogs.
- As a user/shelter I want to see all the requests made for a specific dog.
- As a user/shelter I want to accept or refuse the requests from another users.

- As a user/shelter I want to be able to see the details of a specific dog
- As a user/shelter I want to edit the information of a specific dog
- As a user/shelter I want to remove a specific dog from My Dogs
- As a user/owner I want to see all the dogs in adoption.
- As a user/owner I want to send a request to the shelter for a specific dog.
- As a user/owner I want to know when my request was accepted or rejected through mail.
- As a user/shelter I want to know when a request is made through mail.
*
- As a user/owner I want to set my preferences.
- As a user/owner I want to be able to view a page for just my selected ones.
  
