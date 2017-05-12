# mean_cat_feeder
Feed Your Cat From Anywhere

# Setup
Download and Install Node.js
  link: https://nodejs.org/en/
  
  or from command line on pi:
    curl -sLS https://apt.adafruit.com/add | sudo bash
    sudo apt-get install node
  
  to verify installation from command line: node -v
  
# Running Server
  From command line: 
    node app.js
    
  Note the message printed to the consoloe: "Running in localhost at port:6969"
    open browser and head on over to "localhost:6969"

# Installing Node Modules
  When you install any node modules make sure to run "npm install [module]" with --save at the end. This will ensure that it updates our package.json file and makes the project more portable.
  example: "npm install express --save"
