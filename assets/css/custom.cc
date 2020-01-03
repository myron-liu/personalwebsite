@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

body{
  padding: 40px;
  background-color: #4268a5;  
}

# {
  white-space: nowrap;
  overflow: hidden;    
  font-family: 'Source Code Pro', monospace;  
  font-size: 28px;
  color: rgba(255,255,255,.70);
}

/* Animation */
#animate {
  animation: animated-text 2s steps(30,end) 1s 1 normal both;
}

/* text animation */

@keyframes animated-text{
  from{width: 0;}
  to{width: 472px;}
}