import { useState } from "react";
import { GrowthTrendChart } from "../components/GrowthTrendChart";
import { PortfolioButton } from "../components/PortfolioButton";
import { SkillMatrix } from "../components/SkillMatrix";
import { WeightTrendChart } from "../components/WeightTrendChart";
import { gradeRows } from "../data/gradeData";
import { readChatApiJson, resolveChatApiUrl } from "../lib/chatApi";

function EvelynChat() {
  const [messages, setMessages] = useState([
    {
      id: "init-assistant",
      role: "assistant",
      name: "Evelyn",
      text: "Hi, I'm Evelyn. This chatbot is powered by my personal cc-skill—it injects my thoughts, background, and how I actually talk (distilled from dot-skill). Ask me anything here if you'd like to get to know me.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const submitMessage = async (event) => {
    event.preventDefault();
    if (isSending) return;
    const value = input.trim();
    if (!value) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      name: "You",
      text: value,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(resolveChatApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          history: nextMessages.map((msg) => ({ role: msg.role, text: msg.text })),
        }),
      });
      const data = await readChatApiJson(response);
      const replyText = response.ok
        ? data.reply
        : data.error || "Unable to get response from API.";
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          name: "Evelyn",
          text: replyText,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          name: "Evelyn",
          text: `Connection error: ${error.message}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-shell" aria-label="Evelyn skill chat">
      <p className="eyebrow">Evelyn Live Chat</p>
      <p className="chat-skill-note">
        Personal cc-skill: my ideas and data, in my voice — distilled from dot-skill
      </p>
      <div className="chat-thread" role="log" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${
              message.role === "assistant" ? "chat-bubble-assistant" : "chat-bubble-user"
            }`}
          >
            <p className="chat-name">{message.name}</p>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form className="chat-composer" onSubmit={submitMessage}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about skills, projects, or growth..."
          aria-label="Type your question"
          disabled={isSending}
        />
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-section panel">
        <div className="hero-grid">
          <div className="hero-intro">
            <p className="hero-kicker">Design + Data + Humanity</p>
            <h1>
              <span className="hero-name">CUI CONGWEN · EVELYN</span>
              <span className="hero-tagline">
                Turning ambiguous problems into practical products with data and empathy
              </span>
            </h1>
            <p className="hero-desc">
              I identify real user pain points from evidence, design lightweight and ethical
              solutions, and ship them into clear product outcomes. I learn fast across disciplines and
              turn that learning into execution quality teams can trust.
            </p>
            <ul className="hero-highlights" aria-label="Core strengths">
              <li>Data-informed problem discovery</li>
              <li>Ethical, lightweight product thinking</li>
              <li>Cross-domain learning and execution</li>
            </ul>
            <div className="hero-actions">
              <PortfolioButton />
            </div>
          </div>
          <figure className="hero-portrait-wrap">
            <img
              src="/evelyn-portrait.png"
              alt="Evelyn — cartoon-stylized from my own photo"
              className="hero-portrait"
            />
            <figcaption className="hero-portrait-caption">
              My photo, cartoon-stylized
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="insight-grid" aria-label="Growth and capability insights">
        <section className="panel growth-panel trend-combined-panel" aria-label="Dual trend curves">
          <div className="trend-combined-grid">
            <GrowthTrendChart rows={gradeRows} embedded />
            <WeightTrendChart embedded />
          </div>
        </section>
        <SkillMatrix />
      </section>

      <section className="home-bottom-grid" aria-label="Contact and chat">
        <section className="panel contact-panel" aria-label="Contact information">
          <p className="eyebrow">Contact</p>
          <div className="contact-list">
            <p>
              <span>Email</span>
              <a href="mailto:ccwevelyncambridge@outlook.com">ccwevelyncambridge@outlook.com</a>
            </p>
            <p>
              <span>Phone</span>
              <a href="tel:+8618518138586">+86 18518138586</a>
            </p>
          </div>
        </section>

        <section className="panel chat-panel">
          <EvelynChat />
        </section>
      </section>
    </main>
  );
}
