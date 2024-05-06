from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
import gensim
import os

app = Flask(__name__)

@app.route("/api/predict", methods=["POST"])
def runAll():
    request_data = request.get_json()
    prompt = request_data.get('prompt')
    
    try:
        modelvw = gensim.models.Word2Vec.load("word2vec.model")
        model = pickle.load(open('finalized_model.pkl', 'rb'))
        def vectorize_name(name):
            vectors = [modelvw.wv[word] for word in name]
            if vectors:
                return np.mean(vectors, axis=0)
            else:
                return np.zeros(modelvw.vector_size)  # Return a zero vector if the name is empty
            
        # random forest awal2
        def preprocess_and_predict(new_data):
            # Preprocess the data
            new_data = new_data.lower().replace(r'[^a-z\s]', '').split()
            new_vector = vectorize_name(new_data)

            # Reshape the vector
            new_vector = new_vector.reshape(1, -1)

            # Predict the output
            prediction = model.predict(new_vector)

            # Map the prediction back to the original value
            mapping = {
                1: '1945 - 1978',
                2: '1979 - 1993',
                3: '1994 - 2024'
            }
            prediction = pd.Series(prediction).map(mapping)

            return prediction
        # Test the function with new data
        new_data = "soekarno"
        result = preprocess_and_predict(prompt)
        
        return jsonify(result[0])
    except ValueError:
        return jsonify({'error': 'Invalid number provided'}), 400

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/cwd", methods=["GET"])
def getCwd():
    return jsonify(os.getcwd())

if __name__ == "__main__":
    app.run()