from flask import Flask, jsonify
import pickle
import keras
import sklearn

app = Flask(__name__)

def runAll():
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
        
    # Now suppose you have some new input text
    input_text = ["budi pranowo"]

    # Preprocess the input text
    input_text = [s.lower().replace(r'[^a-z\s]', '').split() for s in input_text]

    # Load the maxlen value
    with open('maxlen.pickle', 'rb') as handle:
        maxlen = pickle.load(handle)
        
    # Pad the sequences of new data
    new_sequences = tokenizer.texts_to_sequences(input_text)
    new_X = keras.preprocessing.sequence.pad_sequences(new_sequences, maxlen=maxlen)

    # Load the model
    model = keras.models.load_model('GRU_model.h5')

    # Load the LabelEncoder
    with open('label_encoder.pickle', 'rb') as handle:
        le = pickle.load(handle)

    # Predict with the model
    predictions = model.predict(new_X)

    # Convert the predictions back to original labels
    original_labels = le.inverse_transform(predictions.argmax(axis=-1))

    print(original_labels)

if __name__ == "__main__":
    runAll()