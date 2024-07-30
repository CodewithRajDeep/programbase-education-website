import axios from "axios";
import { useState } from "react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");
    const response = await axios({
      url:
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBaGmV2g2iBZtcIKU5xUUnzmRYirEJKZXA",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });
    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  return (
    <div className="chatbot-container flex flex-col items-center justify-center w-1/2 mx-auto bg-gray-200 rounded-lg shadow-md">
      <h1 className="chatbot-title text-xl font-bold text-center bg-white-200 py-4 px-6 rounded-t-lg">
        ChatBot Support Assistance
      </h1>
      <div className="chatbot-content w-full p-4">
        <textarea
          className="chatbot-textarea border rounded resize-none w-full px-4 py-2 focus:outline-none focus:border-blue-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          cols="30" rows="10" placeholder="How can I assist you?"/>
        <button
          className="chatbot-submit text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 shadow-sm focus:outline-none"
          onClick={generateAnswer}
        >
          Submit
        </button>
        <div className="chatbot-response mt-4">
          <pre className="text-sm break-words">{answer}</pre>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
