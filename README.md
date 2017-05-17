# mean_cat_feeder
Feed Your Cat From Anywhere

# Setup
Download and Install Node.js via terminal
This is for a Raspberry Pi 2 with ARMv7 running Jessie Lite
  
  Run the following commands
  ```
  cd /usr/tmp
  wget https://nodejs.org/dist/v6.10.3/node-v6.10.3-linux-armv7l.tar.xz
  tar -xvf node-v6.10.3-linux-armv7l.tar.xz
  cd node-v6.10.3-linux-armv7l.tar.xz
  sudo cp -R /usr/local
  sudo reboot
  ```
  If you want to get a different version of Node.js then go to 
  
  https://nodejs.org/en/download/
  
  and copy the link to the download for the proper version that you want. 
  The replace the link in the wget line. You will aslo need to use the proper file names
  in the tar and cd lines.
  
  Lastly, once you have rebooted you will can check if node was installed properly by:
  
  `node -v`
  
  Ther version should match the one you downlaoded.
  
  to verify installation from command line: node -v
  
# Running Server
  From command line: 
    node app.js
    
  Note the message printed to the consoloe: "Running in localhost at port:6969"
    open browser and head on over to "localhost:6969"

# Installing Node Modules
  When you install any node modules make sure to run "npm install [module]" with --save at the end. This will ensure that it updates our package.json file and makes the project more portable.
  example: "npm install express --save"
