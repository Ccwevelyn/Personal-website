import { useState } from "react";
import { GrowthTrendChart } from "../components/GrowthTrendChart";
import { ExperienceButton } from "../components/ExperienceButton";
import { PortfolioButton } from "../components/PortfolioButton";
import { ResearchButton } from "../components/ResearchButton";
import { ResearchInterests } from "../components/ResearchInterests";
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
      text: "Hi, I'm Evelyn. This chat uses my personal notes on how I think and talk. Ask me anything if you want to get to know me.",
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
        Chat runs on my personal notes and voice
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
            <p className="hero-kicker">Growth · Wide imagination · Compassion</p>
            <h1>
              <span className="hero-name">CUI CONGWEN · EVELYN</span>
              <span className="hero-tagline">
                I use data and sympathy to turn massive problems into projects people can use
              </span>
            </h1>
            <p className="hero-desc">
              I started with a product habit: find real pain, then ship something people can use.
              Among trade-offs I look for the lightest path that still works. I study Computer
              Science to get sharper at those trade-offs, and to find where AI can actually help
              people when humans and models work together.
            </p>
            <div className="hero-actions">
              <PortfolioButton />
              <ExperienceButton />
              <ResearchButton />
            </div>
          </div>
          <figure className="hero-portrait-wrap">
            <img
              src="/evelyn-portrait.png"
              alt="Evelyn, cartoon-stylized from my own photo"
              className="hero-portrait"
            />
            <figcaption className="hero-portrait-caption">
              My photo, cartoon-stylized
            </figcaption>
          </figure>
        </div>
      </section>

      <ResearchInterests />

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
              <a href="mailto:evelyn.cui2027@outlook.com">evelyn.cui2027@outlook.com</a>
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
