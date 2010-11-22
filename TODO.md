##TODO

* cleanup superconnect & the jQuery calls

##Two aims

1) Make email much simpler, remove the features that I don't use, such as Labels, Drafts, Archiving.
2) Improve it, integrate Activity/Tasks, improve contact manager

* Need to think about archiving
* Maybe default order is by unread?
* WYSIWYG and html parsing
* Better name
* Spam - done by Gmail atm?
* Label support?
* Avoid the round-robin process if emails are sent internally?
* OAuth IMAP process with GMail
* Restrict to GMail accounts initially
* Where do Rapportive get their data from? Can we use them.
* Paginated preloading
* Multiple email accounts - two choices:
  * munge emails into one list
  * Or separate app acounts

##Solution

Ok, this is how we solve email overload. Have an idea of a session. Only show emails since last browsing session, or unread. Option to display all. Detect inactivity, after 30 mins create a new session, cleanup list. 

##Search

* Local search first
* Then sends off request to server with a full text search
* Contains:
  * Emails
  * Tasks
  * Contacts

##Activity
  
* Automatically set email as activity if begins with '!'
* Set email as activity if X-Activity header is '1'
* Set email as activity if '+activity' is in the email address

##IMAP process

* SMTP server receives emails
* POSTs directly to Rails
* Rails creates the email for the relevant user

* User sends email
* Gets created locally
* Users IMAP connection gets notified & syncs

We need a IMAP daemon that will keep a bunch of connections open, and then time out after a while. Needs access to the REST api rather than DB (so it doesn't need a Rails instance in memory). 

##Contacts

* Are contacts specific to a user, or global
* Import from CSV / VCard. 

Ok, this is how it's going to work. Contacts are personal, but we give the user to replace/add to the contact from the global contact information.

* Name
* Email
* Phone numbers
* Address

* Facebook/Linked In/Twitter
* Latest tweets
* Bio
* Avatar
* Skype
* Jabber
* notes

I.e. when a user creates a contact, they first enter an email address. The contacts name / phone / bio and twitter facebook links will autocomplete. Ok, so numbers / name / address are editable. bio twitter and facebook aren't. 

We need to cater for when people:
  
* Change email
* Change numbers
* Change addresses

In which case we can detect these have changed, and prompt everyone else to update their information. 

Where are we going to get this from? The same source as Rapportive. Also, how about our own db. If it's a dreamail email, we query our own db for info. 

Bug with down arrow.