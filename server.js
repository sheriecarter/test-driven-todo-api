// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
      var result={};
      result.todos=[];
     for(i=0; i<todos.length; i++){
       if (todos[i].task.includes(req.query.q)){
         result.todos.push(todos[i]);

   }
   
}
   res.json(result);
});

app.get('/api/todos', function index(req, res) {
  // This endpoint responds with all of the todos
  var result={};
  result.todos=todos;
  res.json(result);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var lastToDoId = todos[todos.length-1]._id;
   var newToDos = {
     _id: lastToDoId+ 1,
     task: req.body.task,
     description: req.body.description
   }
   todos.push(newToDos);
   res.json(newToDos);
});





app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */


     for(i=0; i<todos.length; i++){
       if (todos[i]._id==req.params.id){
         res.json(todos[i]);
       }

   }

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var output;
   for(i=0; i<todos.length; i++){
     if (todos[i]._id==req.params.id){
       todos[i].task=req.body.task;
       todos[i].description=req.body.description;
       res.json(todos[i]);
     }
}

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   for(i=0; i<todos.length; i++){
     if (todos[i]._id==req.params.id){
       todos.splice(i,1);
      res.json(todos)
     }

   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
