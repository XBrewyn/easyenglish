from flask import Flask, request, jsonify
import os
import speech_recognition as sr

app = Flask(__name__)

# Function to transcribe audio file
def transcribe_audio(audio_file):
  recognizer = sr.Recognizer()

  with sr.AudioFile(audio_file) as source:
    audio_data = recognizer.record(source)
  try:
    text = recognizer.recognize_google(audio_data)
    return text
  except sr.UnknownValueError:
    return "Speech recognition could not understand the audio."
  except sr.RequestError as e:
    return f"Could not request results from Google Speech Recognition service; {e}"

@app.route('/audio', methods=['POST'])
def transcribe_endpoint():

  if 'audio' not in request.files:
    return jsonify({'error': 'No audio file provided'}), 400

  audio_file = request.files['audio']

  if audio_file.filename == '':
    return jsonify({'error': 'No selected file'}), 400

  # Save the uploaded file
  file_path = os.path.join('uploads', audio_file.filename)
  audio_file.save(file_path)

  # Transcribe the audio file
  transcription = transcribe_audio(file_path)

  # Remove the uploaded file
  os.remove(file_path)
  print(transcription)
  return jsonify({ 'transcription': transcription })

if __name__ == '__main__':
  if not os.path.exists('uploads'):
    os.makedirs('uploads')
  app.run(debug=True)
