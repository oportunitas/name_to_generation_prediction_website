from flask import Flask, jsonify
import pickle
import keras
import sklearn
import os

app = Flask(__name__)

@app.route("/api/predict", methods=["GET"])
def runAll():
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    print("LOG: load tokenizer success")
        
    # Now suppose you have some new input text
    input_text = ["budi pranowo"]
    print("LOG: name load success")

    # Preprocess the input text
    input_text = [s.lower().replace(r'[^a-z\s]', '').split() for s in input_text]
    print("LOG: preprocessing success")
    
    # Load the maxlen value
    with open('maxlen.pickle', 'rb') as handle:
        maxlen = pickle.load(handle)
    print("LOG: maxlen success")
        
    # Pad the sequences of new data
    new_sequences = tokenizer.texts_to_sequences(input_text)
    new_X = keras.preprocessing.sequence.pad_sequences(new_sequences, maxlen=maxlen)
    print(new_X)
    print("LOG: tokenization success")

    # Load the model
    model = keras.models.load_model('GRU_model.h5')
    print("LOG: model load success")

    # Load the LabelEncoder
    with open('label_encoder.pickle', 'rb') as handle:
        le = pickle.load(handle)
    print("LOG: label encoder load success")

    # Predict with the model
    predictions = model.predict(new_X)
    print("LOG: prediction success")

    # Convert the predictions back to original labels
    original_labels = le.inverse_transform(predictions.argmax(axis=-1))
    print("LOG: conversion success")
    
    print(original_labels)
    
    return jsonify({"generation": original_labels[0]})

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/cwd", methods=["GET"])
def getCwd():
    return jsonify(os.getcwd())

if __name__ == "__main__":
    app.run()