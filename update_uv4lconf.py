import os
import shutil
try:
	new_conf = os.path.join('/home','cat','mean_cat_feeder','uv4l_settings','uv4l-raspicam.conf')
	destination = os.path.join('/etc','uv4l')
	shutil.copy(new_conf, destination)
except e:
	print(e)

print("Replaced config file")
 
