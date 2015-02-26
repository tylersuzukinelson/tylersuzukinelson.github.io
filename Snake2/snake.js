$(document).ready(function(){
  
  //Canvas for scoreboard
  var s_canvas =document.getElementById("score_canvas");
  var ctx=s_canvas.getContext("2d");
  ctx.font="20px Georgia";
  ctx.fillText("High Score:",100,30);
  ctx.fillText(high_score,220,30);

  var game_paused = false;
  var s_canvas =document.getElementById("score_canvas");
  var ctx=s_canvas.getContext("2d");
  ctx.font="20px Georgia";
  ctx.fillText("High Score:",100,30);
  ctx.fillText(high_score,220,30);


  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  var starting_direction = 'right';
  var player_one = {direction: starting_direction, color: 'green', score: 0};
  var player_two = {direction: starting_direction, color: 'red', score: 0};
  var snakes = [];
  var game_timer = undefined;


  //Initiats the game
  function init() {
    //Create the snakes for each player
    player_one.snake = create_snake(5,5);
    player_two.snake = create_snake(40,5);
    player_one.direction = starting_direction;
    player_two.direction = starting_direction;
    snakes = [];
    snakes.push(player_one);
    snakes.push(player_two);
    
    //Creates the food for the snakes
    create_food();
    
    
    // Creates an asteroid
    // setInterval( 
    //   function (){create_asteroid()}, 500
    // );
    asteroid = undefined;
    create_asteroid();

  
    // Run a timer to update the canvas every 60 ms
    if (typeof game_timer != 'undefined') {
      clearInterval(game_timer);
    }
    game_timer = setInterval(function() { update_canvas(snakes); }, 60);
  };
  // Starts the game
  init();


  

  // Takes optional x and y starting coordinates for a to-be-created snake array
  // Returns a snake array containing the coordinates of each of it's initial 
  // body segment coordinates
  function create_snake(y,x) {
    var snake_starting_length = 5;
    var output_snake = [];
    if (typeof y === 'undefined' || y < 0 || y >= h) {
      y = 10;
    }
    if (typeof x === 'undefined' || x < 0 || x >= w - snake_starting_length) {
      x = 10;
    }
    for (var i = 0; i < snake_starting_length; i++) {
      output_snake[i] = {};
      output_snake[i].x = x-i;
      output_snake[i].y = y;
    }
    return output_snake;
  };




  function update_asteroid(){
        // Make the asteroid appear if they exist
        if (typeof asteroid != 'undefined'){
            // delete the asteroids if they escape canvas
            if (asteroid.x>52 || asteroid.y>52 || asteroid.x <0 || asteroid.y<0){
              asteroid = undefined;
              create_asteroid();
              return;
            }

        paint_block(asteroid.x, asteroid.y, "purple");
        // Movement of asteroids 
        // Advance the asteroids accordingly
            switch(asteroid.type) {
              case 1:
                    asteroid.x+=1;
                    asteroid.y+=1;
                  break;
              case 2:
                    asteroid.x+=1;
                    asteroid.y-=1;
                  break;
              case 3:
                    asteroid.x-=1;
                    asteroid.y-=1;
                  break;
              default:
                asteroid.x-=1;
                asteroid.y+=1;   
          }
        }
    
  }

  function update_canvas(snakes) {
    // Ensure scores cannot be negative
    if (player_one.score < 0) {
      player_one.score = 0;
    }
    if (player_two.score < 0) {
      player_two.score = 0;
    }

    // Clear all existing colors on canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0,0,w,h);

    // Make the block appear
    paint_block(food.x, food.y, "blue");

    // Update the asteroid
    update_asteroid();
   

    // Order of snakes
    var snake_order = [];
    if (Math.random() < 0.5) {
      snake_order = [0,1];
    } else {
      snake_order = [1,0];
    }

  // Moving the snake involves removing the tail and creating a new head
  // We will do this for each snake

    
    for (var z = 0; z < snake_order.length; z++) {
      var i = snake_order[z];
      // Make the coordinates for the new snake head based on the existing 
      // head coordinates and the snake's current direction
      var nx = snakes[i].snake[0].x;
      var ny = snakes[i].snake[0].y;
      var d = snakes[i].direction;

      if (d === 'right') {
        nx++;
      } else if (d === 'left') {
        nx--;
      } else if (d === 'up') {
        ny++;
      } else if (d === 'down') {
        ny--;
      }

      if (nx == -1 || ny == -1 || nx == w/cw || ny == h/cw || check_collision(nx,ny,snakes[0].snake) || check_collision(nx,ny,snakes[1].snake) || (nx == asteroid.x && ny == asteroid.y)) {
        // Check for any collisions (if the snake is off the canvas,
        // or if the snake has run into itself or the other snake),
        // or if the snake's head has been hit by the asteroid
        snakes[i].score -= 7;
        init();
        return;
      }

      // Check to see if each snake was hit by the asteroid;
      // if so, truncate the snake at the point of contact
      var flag_hit_by_asteroid = false;
      for (var y = 0; y < snakes[i].snake.length; y++) {
        if (flag_hit_by_asteroid) {
          snakes[i].snake.pop();
        } else if (asteroid.x == snakes[i].snake[y].x && asteroid.y == snakes[i].snake[y].y) {
          flag_hit_by_asteroid = true;
        }
      }

      if (nx == food.x && ny == food.y) {
        // Make a brand new head for the snake and make new food
        var tail = {};
        tail.x = nx;
        tail.y = ny;
        create_food();
        snakes[i].score += 2;
      } else {
        // Remove the tail and make it a new head
        var tail = snakes[i].snake.pop();
        tail.x = nx;
        tail.y = ny;
      }
      snakes[i].snake.unshift(tail);

      // Paint the snake onto the canvas
      for (var j = 0; j < snakes[i].snake.length; j++) {
        var block = snakes[i].snake[j];
        paint_block(block.x, block.y, snakes[i].color);
      }

      // Display the scoreboard
      ctx.fillStyle = player_one.color;
      ctx.fillText('Player 1: ' + player_one.score, 5, h-15);
      ctx.fillStyle = player_two.color;
      ctx.fillText('Player 2: ' + player_two.score, 5, h-5);


      // updates high score
      if (player_one.score > high_score){
        high_score = player_one.score;
        update_hs_canvas('one',high_score);
    
       
      }
      if (player_two.score >high_score){
        high_score = player_two.score;
        update_hs_canvas('two', high_score)
      }


    }
  };

function update_hs_canvas(player, score){
        c = document.getElementById("score_canvas");
        s_ctx=c.getContext("2d");
        s_ctx.font="20px Georgia";
        s_ctx.clearRect(0,0, 500, 100);
        s_ctx.fillText("Player " + player + " is winning with a high score of: "+ score, 50,30)
}



  function create_food()
{
  //Math.random() yields a number b/w 0 and 1
  //Canvas = 500x500 => x/y will be between 0-49
  food ={
  x: Math.round(Math.random()*(w-cw)/cw ),
  y: Math.round(Math.random()*(h-cw)/cw ),
  };

};

// Creates the asteroid with probability of coming from four corners 
// Each corner has two sides, and each of those sides have 50% chance 
// of being picked

  function create_asteroid()
{
    if (Math.random() >= 0.75){
        
        if (Math.round(Math.random()))  {
            asteroid = {
            x: Math.round((Math.random()*(w-cw)/cw)/2),
            y: 0,
            type: 1,
            count: a_num
            }
            return asteroid;
        }else{
            asteroid = {
            x: 0,
            y: Math.round((Math.random()*(h-cw)/cw)/2),
            type: 1,
            count: a_num
            }   
            return asteroid;
        }
    }
    if(Math.random() >= 0.50){

      if (Math.round(Math.random()))  {
          asteroid ={
          x: Math.round((Math.random()*(w-cw)/cw)/2),
          y: 49,
          type: 2,
          count: a_num
          }
          return asteroid;
      }else{
          asteroid ={
          x: 0,
          y: Math.round((Math.random()*(w-cw+500)/cw)/2),
          type: 2,
          count: a_num
          }
          return asteroid;
      }
    }

    if(Math.random() >= 0.25){


       if (Math.round(Math.random()))  {
            asteroid ={
            x: Math.round((Math.random()*(w-cw+500)/cw)/2),
            y: 49,
            type: 3,
            count: a_num
            }
            return asteroid;
          }else{
            asteroid ={
            x: 49,
            y: Math.round((Math.random()*(h-cw+500)/cw)/2),
            type: 3,
            count: a_num
          }
          return asteroid;
        }
      }


   if(Math.random() >= 0){

        if (Math.round(Math.random()))  {
            asteroid ={
            x: 49,
            y: Math.round((Math.random()*(h-cw)/cw)/2),
            type: 4,
            count: a_num
            }
            return asteroid;
          }else{
            asteroid ={
            x: Math.round((Math.random()*(w-cw+500)/cw)/2),
            y: 49,
            type: 4,
            count: a_num
            }
            return asteroid;
          }
        }
  
}





  // return true if the given coordinates exist in the given array
  function check_collision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) {
        return true;
      }
    }
    return false;
  };



  function paint_block(x,y,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw, y*cw, cw, cw);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x*cw, y*cw, cw, cw);
  };



  // Update the direction of the snake upon a keypress
  // Also, prevent the snake from reversing direction
  // Also, added quit buttons to end game
  $(document).keydown(function(event) {
    var key = event.which;
    if (key == '65' && snakes[0].direction != 'right') {
      snakes[0].direction = 'left';
    } else if (key == '87' && snakes[0].direction != 'up') {
      snakes[0].direction = 'down';
    } else if (key == '68' && snakes[0].direction != 'left') {
      snakes[0].direction = 'right';
    } else if (key == '83' && snakes[0].direction != 'down') {
      snakes[0].direction = 'up';
    }
    if (key == '37' && snakes[1].direction != 'right') {
      snakes[1].direction = 'left';
    } else if (key == '38' && snakes[1].direction != 'up') {
      snakes[1].direction = 'down';
    } else if (key == '39' && snakes[1].direction != 'left') {
      snakes[1].direction = 'right';
    } else if (key == '40' && snakes[1].direction != 'down') {
      snakes[1].direction = 'up';
    }
    if (key == '49' || key == '191') {
      if (game_paused) {
        game_timer = setInterval(function() { update_canvas(snakes); }, 60);
        game_paused = false;
      } else {
        game_paused = true;
        clearInterval(game_timer);
      }
    }
  });



});


  //Lets save the cell width in a variable for easy control
  var cw = 10;
  var d;
  var food;
  var score;
  var asteroid;
  var a_num =1;
  var high_score=0;
  var a;
