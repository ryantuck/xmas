# Listmas

A wedding registry for christmas gifts. It's like actually sending a christmas list to Santa. Except Santa is your friends and family.

---

### Bugs

- if a user just signs up, and then tries to access a different list, the app will crash because it can't find the user_id provided in the http request. Odd that this would happen, especially if it *should* be able to find the user. 
- if a person deletes all items on his list, it will reset to the original 5. I understand why this is happening, but is it behavior that we want?


### TODO

- form validation
- CSS
- clean up garbage
- copy
- home page!


### Design Considerations

- add user name to user model? 
- allow list naming? could be fun.
- merge login, signup, and home into one page? almost certainly.
- social share buttons?
- social login? nah. 
- incorporate mailchimp or something?


### Optimizations

- convert a lot of stuff to socket.io communication instead of http requests. 




---

This app was built on top of the MEAN Stack Single Page Application Starter tutorial and [repo](https://github.com/scotch-io/starter-node-angular) by the awesome team at [scotch.io](http://scotch.io). 
