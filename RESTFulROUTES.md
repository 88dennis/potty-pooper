REST
representational state transfer
a mapping between HTTP ROutes and CRUD
Rest is just a pattern for defining our routes
is and architecture for mapping our http routes to CRUD functionality

CRUD
create
read
update
destroy

Example:

BLOG APP POTTY POOPER

create - /blogs (post)
read - /allBlogs
UPDATE - /updateBlog/:id
DESTROY - /destroyBlog/:id

Name		Path		    HTTP Verb	Purpose
INDEX		/dogs		    GET			list all dogs
NEW		    /dogs/new	    GET			show new dog form
CREATE		/dogs		    POST		create a new dog; then redirect
SHOW		/dogs/:id	    GET			Show info about one specific dog
EDIT		/dogs/:id/edit	GET			Show edit form for one dog
UPDATE		/dogs/:id	    PUT			Update a particular dog
DESTROY		/dogs/:id	    DELETE		Delete a particular dog; then redirect somewhere