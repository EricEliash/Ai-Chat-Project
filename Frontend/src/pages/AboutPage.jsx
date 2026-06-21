function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1 className="about-title">About AI Chat</h1>
        <p className="about-text">
          AI Chat is a ChatGPT-style web application that lets you have a
          continuous conversation with an AI assistant. Each message you send is
          saved, and the assistant answers using the full context of the current
          conversation. You can start a fresh conversation at any time with the
          New Chat button.
        </p>

        <h2 className="about-subtitle">Technologies used</h2>
        <div className="tech-columns">
          <div className="tech-group">
            <h3>Frontend</h3>
            <ul>
              <li>React + Vite</li>
              <li>JavaScript (SPA)</li>
              <li>React Router</li>
              <li>Axios</li>
              <li>CSS</li>
            </ul>
          </div>
          <div className="tech-group">
            <h3>Backend</h3>
            <ul>
              <li>Python + FastAPI</li>
              <li>REST API</li>
              <li>SQLAlchemy</li>
              <li>Pydantic</li>
              <li>OpenAI API</li>
            </ul>
          </div>
          <div className="tech-group">
            <h3>Database</h3>
            <ul>
              <li>MySQL</li>
            </ul>
          </div>
        </div>

        <h2 className="about-subtitle">Developer</h2>
        <p className="about-text">
          <strong>Eric Eliash</strong>
          <br />
          Full Stack Developer Student
        </p>
      </div>
    </div>
  )
}

export default AboutPage
