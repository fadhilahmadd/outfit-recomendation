from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import numpy as np
from ultralytics import YOLO

from routes.categories import categories_blueprint
from routes.detail import detail_blueprint

app = Flask(__name__, static_folder='img')
CORS(app)

# YOLO v8
model_path = '/Users/fadhilahmad/Documents/filry/model yolo/runs/classify/train4/weights/best.pt'
model = YOLO(model_path)

def classify_image(image_path):
    results = model(image_path)
    names_dict = results[0].names
    probs = results[0].probs.data.tolist()
    predicted_class = names_dict[np.argmax(probs)]
    return predicted_class

# Ensure the uploads folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/kmeans')
def kmeans():
    return render_template('kmeans.html')

@app.route('/img/<path:filename>')
def send_file(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/yolo', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
         return jsonify({'error': 'No files uploaded'}), 400

    files = request.files.getlist('files')
    if not files:
        return jsonify({'error': 'No files uploaded'}), 400

    results = []

    for file in files:
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        filepath = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
        file.save(filepath)

        predicted_class = classify_image(filepath)

        result = {
             'class': predicted_class
        }
        
        results.append(result)

    return jsonify(results)

app.register_blueprint(categories_blueprint)
app.register_blueprint(detail_blueprint)

if __name__ == "__main__":
    app.run(host="192.168.1.9",debug=True)
