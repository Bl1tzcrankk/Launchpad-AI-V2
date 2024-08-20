from flask import Flask, request, jsonify
from flaskcors import CORS, crossorigin
from g4f.client import Client

app = Flask(name)
CORS(app)

@app.route("/")
def generateText():
    try:
        prompt = request.args.get("prompt")
        client = Client()
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": "You are a helpful assistant. You only reply in 70 tokens or less. That's 300 characters or less."}, {"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content
    except Exception as e:
        print(e)
        return jsonify({"success": False, "data": str(e)})

if name == "__main":
    app.run("0.0.0.0", 7000, debug=False)