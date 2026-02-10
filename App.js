import React, { useState } from 'react';
import { db } from './firebase'; 
import { doc, setDoc } from 'firebase/firestore';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const generateP5REQuestions = (setId) => {
    let questions = [];
    
    for (let i = 1; i <= 50; i++) {
      const gId = ((setId - 1) * 50) + i; 
      let q = { q: "", ans: "", options: [], artType: null, artValue: null, shape: "" };

      const topics = [
        "CREATION", "PATRIARCHS", "SACRAMENTS", "THE_BIBLE", 
        "MOSES_AND_EXODUS", "JESUS_MINISTRY", "ISLAM_PILLARS", "ISLAM_PROPHETS", 
        "PRAYER", "VALUES_AND_MORALS", "CHURCH_LEADERS", "REVELATION"
      ];
      const topic = topics[gId % topics.length];

      switch (topic) {
        case "SACRAMENTS":
          const sacraments = ["Baptism", "Holy Matrimony", "Confirmation", "Holy Orders"];
          const sac = sacraments[gId % sacraments.length];
          q.q = `Identify the main purpose of the Sacrament of ${sac} in the Christian faith.`;
          q.ans = sac === "Baptism" ? "To wash away original sin" : 
                  sac === "Holy Matrimony" ? "To unite a man and woman" : "To strengthen one's faith";
          break;

        case "ISLAM_PILLARS":
          const pillars = ["Shahadat", "Salat", "Zakat", "Saum", "Hajj"];
          const pil = pillars[gId % pillars.length];
          q.q = `Which pillar of Islam involves ${pil === "Zakat" ? "giving alms to the poor" : pil === "Saum" ? "fasting during Ramadan" : "performing the pilgrimage to Mecca"}?`;
          q.ans = pil;
          break;

        case "PATRIARCHS":
          const names = ["Abraham", "Isaac", "Jacob", "Joseph"];
          const person = names[gId % names.length];
          q.q = `In the Bible, ${person} is known as the ________.`;
          q.ans = person === "Abraham" ? "Father of all believers" : 
                  person === "Joseph" ? "Dream interpreter in Egypt" : "Son of the promise";
          break;

        case "MOSES_AND_EXODUS":
          q.q = `What was the significance of the ${gId % 2 === 0 ? "Burning Bush" : "Ten Plagues"} in the story of Moses?`;
          q.ans = gId % 2 === 0 ? "God calling Moses" : "God punishing the Egyptians";
          break;

        case "THE_BIBLE":
          q.q = `Which book is the ${gId % 2 === 0 ? "first" : "last"} book in the New Testament?`;
          q.ans = gId % 2 === 0 ? "Matthew" : "Revelation";
          break;

        case "ISLAM_PROPHETS":
          const prophets = ["Adam", "Nuh", "Ibrahim", "Musa", "Isa", "Muhammad"];
          const prop = prophets[gId % prophets.length];
          q.q = `Which holy book was revealed to Prophet ${prop === "Isa" ? "Isa (Jesus)" : prop === "Musa" ? "Musa (Moses)" : "Muhammad (P.B.U.H)"}?`;
          q.ans = prop === "Isa" ? "Injir" : prop === "Musa" ? "Taurat" : "Quran";
          break;

        case "CHURCH_LEADERS":
          q.q = `Who is the head of a ${gId % 2 === 0 ? "Diocese" : "Parish"} in the church hierarchy?`;
          q.ans = gId % 2 === 0 ? "Bishop" : "Parish Priest";
          break;

        default:
          q.q = `Mention one way we show respect to God's creation (Question ID: ${gId}).`;
          q.ans = "By planting trees and caring for animals";
      }

      if (q.options.length === 0) {
        q.options = [q.ans, "Wrong Answer", "None", "All people"].sort(() => Math.random() - 0.5);
      }
      questions.push(q);
    }
    return questions;
  };

  const uploadP5RE = async () => {
    setLoading(true);
    try {
      for (let setId = 1; setId <= 100; setId++) {
        const year = 1990 + setId - 1;
        const docId = `p5_re_${year}`;
        await setDoc(doc(db, "UDA_EXAMS", docId), {
          metadata: { class: "P5", subject: "RE", setId, year: year.toString(), premium: true },
          questions: generateP5REQuestions(setId)
        });
        setCount(setId);
      }
      alert("P.5 RE COMPLETE: 100 Unique Sets Uploaded!");
    } catch (e) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border-t-8 border-yellow-600">
        <h1 className="text-3xl font-black text-yellow-900 mb-2">P.5 RE</h1>
        <p className="text-yellow-600 font-bold text-xs uppercase mb-8">Religious Education Variety Engine</p>
        <div className="text-5xl font-black text-yellow-600 mb-4">{count}%</div>
        <button 
          onClick={uploadP5RE} 
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          {loading ? "UPLOADING FAITH TOPICS..." : "GENERATE 100 P.5 RE SETS"}
        </button>
      </div>
    </div>
  );
};

export default App;
