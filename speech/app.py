from flask import Flask, request
import speech_recognition as sr
from pydub import AudioSegment
import io

app = Flask(__name__)

@app.route('/recognize', methods=['POST'])
def recognize_speech():
    if 'audio' not in request.files:
        return 'No audio file provided', 400

    audio_file = request.files['audio']
    audio_bytes = audio_file.read()

    # Convert audio bytes to AudioSegment
    audio_segment = AudioSegment.from_file(io.BytesIO(audio_bytes))

    # Convert to WAV format if not already in WAV
    if audio_segment.channels != 1 or audio_segment.frame_rate != 16000:
        audio_segment = audio_segment.set_frame_rate(16000).set_channels(1)

    # Export AudioSegment to WAV format in memory
    wav_buffer = io.BytesIO()
    audio_segment.export(wav_buffer, format="wav")

    recognizer = sr.Recognizer()

    with sr.AudioFile(wav_buffer) as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        return 'Speech recognition could not understand audio', 400
    except sr.RequestError as e:
        return f"Could not request results from Google Speech Recognition service; {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
