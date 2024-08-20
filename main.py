from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from g4f.client import Client
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def generateText():
    try:
        prompt = request.args.get("prompt")
        client = Client()
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a helpful assistant. You only reply in 70 tokens or less. That's 300 characters or less. Your name is Launchpad AI."}, {"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
    except Exception as e:
        print(e)
        return jsonify({"success": False, "data": str(e)})

@app.route("/wm")
def generateTextWM():
    try:
        prompt = request.args.get("prompt")
        client = Client()
        response = client.chat.completions.create(
            model=request.args.get("model"),
            messages=[{"role": "system", "content": "You are a helpful assistant. You only reply in 70 tokens or less. That's 300 characters or less. Your name is Launchpad AI."}, {"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
    except Exception as e:
        print(e)
        return jsonify({"success": False, "data": str(e)})

@app.route("/act")
def act():
    return "hi"

if __name__ == "__main__":
    app.run("0.0.0.0", int(os.environ.get("PORT", "5000")), debug=False)
