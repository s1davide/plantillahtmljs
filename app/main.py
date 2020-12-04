from flask import Flask 
from flask import render_template
import mimetypes
mimetypes.add_type('application/javascript', '.js')
  
app = Flask(__name__) 
  
@app.route("/") 
def home_view(): 
    return render_template('index.html')
