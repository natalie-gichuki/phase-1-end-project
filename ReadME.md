WELCOME TO MY SPA BUSINESS PROJECT.

The project is built using HTML(for the page structure), CSS(for the page styling), Javascript(for functionality) and JSON(to work as te local backend server.)

SUMMARY.
The project allows one to:
   1.Book a spa appointment of their choice.
   2.Key in their details to the website.
   3.Add a review on the spa services.
   4.Delete a service when it's no longer offered.
   5.Delete an appointment when its over or canceled.

FILES
HTML - I have one html file.
   => Here I have used divs, forms, inputs, h-tags and paragraphs.

CSS - I have one CSS file.
   => Here i have used various styling attributes like padding, margins, colors, box-shadow, borders, border-radious, height, width and different displays.

JAVASCRIPT - I have one js file.
   => Here I used various features like functions, variables and event-listeners.
   => I managed to use 3 different event listeners that is the click, submit, and the DOM contentloaded.
   => I used the FETCH to:
     1. Allow the app to access services from the JSON file and displays them. 
     2.Allow the client to book a service of their choice.
     3. Allow the client to add and delete a review.
     4. Allow the client to input and display their details.
     5.  Allow the client to  update and change incase the client filled in the wrong details.
     6.Allow the management to delete an appointment that was cancelled or already attended.

     ( To achieve all this I used the 
       1.GET[To fetch a service, user and review] 
       2.POST[to add a new client and review]
       3.PATCH[to update client details] 
       4.DELETE[to delete reviews and client-details] methods.
       )

HOW TO USE THE APPLICATION.

The client inputs their details and clicks submit. Once submitted the user will be able to view their details in the client details section andincase they are wrong they can update using the update button.
They can also delete their details using the delete button.

Once their details are input they can click the book appointment button on the appointment they would like and it will appear beside their details.

The client can also delete the service incase they'd want to pick another.

The client can add a review at the bottom of the page and their review would appear on the write.

