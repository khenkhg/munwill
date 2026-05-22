import { useState, useRef } from "react"
import { Player } from "@lottiefiles/react-lottie-player"

// ─── Sticker helper ──────────────────────────────────────────────────────────
function Sticker({ src, size = 160, loop = true }) {
  return (
    <Player
      autoplay
      loop={loop}
      src={src}
      style={{ width: size, height: size, margin: "0 auto", display: "block" }}
    />
  )
}

// ─── Floating petals background ──────────────────────────────────────────────
const PETALS = ["🌸", "🌹", "💗", "✨", "🌷", "💝"]
function FloatingPetals() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,400&family=Nunito:wght@400;500;600;700&display=swap');
        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heartPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
        @keyframes blobFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(1.04)} }
      `}</style>
      {Array.from({ length: 18 }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 5.8) % 100}%`,
          top: "-40px",
          fontSize: `${14 + (i % 4) * 6}px`,
          animation: `petalFall ${4 + (i % 5)}s ${i * 0.7}s ease-in infinite`,
          opacity: 0,
        }}>
          {PETALS[i % PETALS.length]}
        </div>
      ))}
    </div>
  )
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
function PageWrap({ children }) {
  return (
    <div style={{
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      padding: "1.8rem 1.2rem",
      animation: "fadeUp 0.5s ease both",
    }}>
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const brightMessages = {
  1:  "You are the reason I check my phone when I wake up in the morning 🌅",
  2:  "Forgive me, I promise it won't happen again 🥺",
  3:  "Did I tell you how much my mood depends on you lately? Your existence alone makes me the happiest in the world 🌸",
  4:  "I want forever with you. I don't want a forever if you're not in it 🌹",
  5:  "I am so deep in love with you. I really love the fact that it was you the one I fell for — you're worth giving up everything else just to be with you 💗",
  6:  "I fantasize a lot about you. You monopolized my imagination so much that it really has nothing but you in it 💭",
  7:  null,
  8:  null,
  9:  null,
  10: null,
  11: null,
  12: null,
  13: "You are my number one. I'd sacrifice everything else for you, and yes, I mean EVERYTHING 👑",
  14: "Don't tell anyone this, but lately when I read my novels, all I see in my imagination is me and you as the protagonists... it really makes reading more enjoyable than it ever has been 📖✨",
  15: "When you're not there for me, it hurts. My heart hurts so much and I always end up crying. I never cried because of a boy before — even my father. And now I don't cry over anything but your absence, because when you're there I am happy even when I am in pain 💔🌷",
  16: "I love you. Let's have each other for the rest of our lives 💍",
  17: "I will never let go of you. I might say otherwise sometimes, and I might act stupid some other times, but I will never ever abandon you — even if I died in the process 🤍",
  18: "You're always my first prayer and the one I insist on most. I love you 🤲🌹",
}

const darkMessages = {
  1: "I want to lock you up. I want you to be mine for real and forever. I want to be with only you for the rest of our lives — just you and me. If it were up to me, I'd live with you on a faraway planet, where we're all alone, no one can bother us, nothing can interrupt us. 🔒🌌",
  2: "I am obsessed with you. So much obsessed that I want to have all your time, all your attention, all your words, all your smiles and laughs. I want to be the only one you look at, the only one you ever see, and the only one you ever think about. I want to kill every girl who dared to touch what's mine, to even look at what's mine. You are MINE and mine alone. No one has any right to come near you except for me. You're my one and only, and I wish everyone who thinks otherwise would disappear. There are a lot of people on my black list. Just so you know. 🖤🔪",
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function PuzzlePage({ onSuccess }) {
  const [cells, setCells] = useState(["", "", ""])
  const [message, setMessage] = useState("")
  const [correct, setCorrect] = useState(false)
  const inputRefs = [useRef(), useRef(), useRef()]

  const handleChange = (index, value) => {
    if (!/^[a-zA-Z]$/.test(value) && value !== "") return
    const newCells = [...cells]
    newCells[index] = value.toUpperCase()
    setCells(newCells)
    if (value && index < 2) inputRefs[index + 1].current.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !cells[index] && index > 0)
      inputRefs[index - 1].current.focus()
  }

  const handleCheck = () => {
    if (cells.join("") === "MUN") {
      setMessage("✅ Correct 🌹")
      setCorrect(true)
    } else {
      setMessage("❌ Wrong, think harder 😏")
      setCorrect(false)
    }
    setCells(["", "", ""])
    inputRefs[0].current.focus()
  }

  return (
    <PageWrap>
      <Sticker src="/s-heart.json" size={130} />
      <h2 style={s.heading}>Write the name of your future wife</h2>
      <p style={s.subtitle}>One letter per box 🌸</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: "1.2rem" }}>
        {cells.map((cell, i) => (
          <input key={i} ref={inputRefs[i]} value={cell}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            maxLength={1} style={s.cellInput}
          />
        ))}
      </div>
      <br />
      <button onClick={handleCheck} style={s.btnOutline}>Check 💝</button>
      <p style={{ fontSize: 16, marginTop: 14, minHeight: 26, color: "#c2185b", fontFamily: "Nunito, sans-serif" }}>{message}</p>
      {correct && (
        <button onClick={onSuccess} style={s.btnPink}>Let's start 🌹</button>
      )}
    </PageWrap>
  )
}

function WelcomePage({ onStart }) {
  return (
    <PageWrap>
      <Sticker src="/s-cats.json" size={180} />
      <div style={s.avatar}>
        <img src="/will.jpg" alt="Will" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <h1 style={{ ...s.heading, fontSize: 26 }}>Welcome, Will 🌹</h1>
      <p style={{ marginTop: 12, fontSize: 15, color: "#ad5070", padding: "0 20px", lineHeight: 1.8, fontFamily: "Nunito, sans-serif" }}>
        Your Mun wants to discuss with you something really important that needs your opinion 💗
        <br />please click below to start
      </p>
      <button onClick={onStart} style={{ ...s.btnPink, marginTop: 20 }}>Start 🌹</button>
    </PageWrap>
  )
}

function SidesPage({ onBright, onDark, onQuestion }) {
  return (
    <PageWrap>
      <Sticker src="/s-iloveu.json" size={160} />
      <h2 style={s.heading}>Choose your path</h2>
      <p style={s.subtitle}>Which side do you dare to open? 👀</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: "1.4rem", flexWrap: "wrap" }}>
        <button onClick={onBright} style={s.tabBright}>☀️ Bright Side</button>
        <button onClick={onDark} style={s.tabDark}>🖤 Dark Side</button>
      </div>
      <button onClick={onQuestion} style={{ ...s.btnPink, marginTop: "1.4rem", background: "#ad1457" }}>
        One last question 💌
      </button>
    </PageWrap>
  )
}

function BrightPage({ onBack }) {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    const msg = brightMessages[selected]
    return (
      <PageWrap>
        <Sticker src="/s-floatinghearts.json" size={130} />
        <p style={{ fontSize: 13, color: "#c2185b", fontWeight: 600, marginBottom: 4, fontFamily: "Nunito, sans-serif" }}>Message #{selected} 💌</p>
        {msg === null ? (
          <div style={s.msgCard}>
            <img src={`/message${selected}.png`} alt={`message ${selected}`}
              style={{ maxWidth: "100%", borderRadius: 12 }} />
          </div>
        ) : (
          <div style={s.msgCard}>{msg}</div>
        )}
        <button onClick={() => setSelected(null)} style={s.backLink}>← back to numbers</button>
        <br />
        <button onClick={onBack} style={s.backLink}>← back to sides</button>
      </PageWrap>
    )
  }

  return (
    <PageWrap>
      <Sticker src="/s-heart.json" size={110} />
      <h3 style={{ ...s.heading, fontSize: 20 }}>Choose a number 💗</h3>
      <p style={s.subtitle}>Each one holds a little secret 🌸</p>
      <div style={s.numGrid}>
        {Array.from({ length: 18 }, (_, i) => i + 1).map(n => (
          <button key={n} onClick={() => setSelected(n)} style={s.numBtn}>{n}</button>
        ))}
      </div>
      <button onClick={onBack} style={s.backLink}>← back to sides</button>
    </PageWrap>
  )
}

function DarkPage({ onBack }) {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    return (
      <div style={{ ...s.darkBg }}>
        <PageWrap>
          <Sticker src="/s-sadgirl.json" size={160} />
          <p style={{ fontSize: 13, color: "#ff6b6b", fontWeight: 600, marginBottom: 4, fontFamily: "Nunito, sans-serif" }}>Danger Zone #{selected} 🔥</p>
          <div style={s.msgCardDark}>{darkMessages[selected]}</div>
          <button onClick={() => setSelected(null)} style={s.backLinkDark}>← back</button>
          <br />
          <button onClick={onBack} style={s.backLinkDark}>← back to sides</button>
        </PageWrap>
      </div>
    )
  }

  return (
    <div style={s.darkBg}>
      <PageWrap>
        <Sticker src="/s-frog.json" size={160} />
        <div style={s.warningBanner}>⚠️ Don't open if your heart is weak!!</div>
        <p style={{ color: "#ff8a80", fontSize: 14, marginBottom: "1rem", fontFamily: "Nunito, sans-serif" }}>
          You've been warned... proceed carefully 🖤
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => setSelected(1)} style={s.dzBtn}>💀 Danger Zone #1</button>
          <button onClick={() => setSelected(2)} style={s.dzBtn}>🔥 Danger Zone #2</button>
        </div>
        <br />
        <button onClick={onBack} style={s.backLinkDark}>← back to sides</button>
      </PageWrap>
    </div>
  )
}

function ForgivenessPage({ onBack }) {
  const [answer, setAnswer] = useState(null)
  const [noCount, setNoCount] = useState(0)

  const noMessages = [
    "nooo please 🥺 think again...",
    "i am literally crying rn 😭💔 please reconsider...",
    "okay i'll wait forever if i have to 🌹 but please say yes 🥺",
  ]

  if (answer === "yes") {
    return (
      <PageWrap>
        <Sticker src="/s-ring.json" size={200} />
        <h1 style={{ ...s.heading, fontSize: 26, color: "#ad1457" }}>Yaaay!!! 🌹💍</h1>
        <div style={{ ...s.msgCard, marginTop: 16 }}>
          Thank you Will 🥹💗 you have no idea how much this means to me.
          I love you so much, forever and always.
          <br /><br />
          <strong style={{ color: "#c2185b" }}>Will you marry me? 💍🌹</strong>
        </div>
        <Sticker src="/s-floatinghearts.json" size={140} />
        <button onClick={onBack} style={{ ...s.backLink, marginTop: "1rem" }}>← back</button>
      </PageWrap>
    )
  }

  return (
    <PageWrap>
      {answer === "no"
        ? <Sticker src="/s-sadgirl.json" size={180} />
        : <Sticker src="/s-sorry.json" size={180} />
      }
      <h2 style={s.heading}>Did you forgive me yet? 🥺</h2>
      <p style={s.subtitle}>please say yes 💗</p>

      {answer === "no" && (
        <div style={{ ...s.msgCard, marginBottom: "1rem", color: "#880e4f" }}>
          {noMessages[Math.min(noCount - 1, 2)]}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: "1rem" }}>
        <button onClick={() => setAnswer("yes")} style={s.btnPink}>Yes 💗</button>
        <button onClick={() => { setAnswer("no"); setNoCount(c => c + 1) }} style={s.btnOutline}>No 🙈</button>
      </div>
      <br />
      <button onClick={onBack} style={s.backLink}>← back</button>
    </PageWrap>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,400&family=Nunito:wght@400;500;600;700&display=swap');
        body {
          margin: 0;
          min-height: 100vh;
          background: #fff5f8;
          background-image:
            radial-gradient(circle at 15% 15%, #ffe0ec 0%, transparent 45%),
            radial-gradient(circle at 85% 85%, #fce4ec 0%, transparent 45%),
            radial-gradient(circle at 55% 5%,  #fff0f5 0%, transparent 35%);
        }
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes petalFall {
          0%   { transform:translateY(-30px) rotate(0deg);   opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:0.5; }
          100% { transform:translateY(105vh) rotate(540deg); opacity:0; }
        }
      `}</style>

      <FloatingPetals />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "20px 12px", position: "relative", zIndex: 1 }}>
        {page === 0 && <PuzzlePage    onSuccess={()   => setPage(1)} />}
        {page === 1 && <WelcomePage   onStart={()     => setPage(2)} />}
        {page === 2 && <SidesPage     onBright={()    => setPage(3)} onDark={() => setPage(4)} onQuestion={() => setPage(5)} />}
        {page === 3 && <BrightPage    onBack={()      => setPage(2)} />}
        {page === 4 && <DarkPage      onBack={()      => setPage(2)} />}
        {page === 5 && <ForgivenessPage onBack={()    => setPage(2)} />}
      </div>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  heading: {
    fontFamily: "'Playfair Display', serif",
    color: "#c2185b",
    marginBottom: 6,
    marginTop: 8,
  },
  subtitle: {
    color: "#ad7088",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Nunito, sans-serif",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    margin: "0 auto 14px",
    border: "3px solid #e75480",
    overflow: "hidden",
  },
  cellInput: {
    width: 52,
    height: 52,
    textAlign: "center",
    fontSize: 26,
    fontWeight: 600,
    borderRadius: 12,
    border: "2px solid #f48fb1",
    outline: "none",
    textTransform: "uppercase",
    background: "rgba(255,255,255,0.85)",
    color: "#c2185b",
    fontFamily: "Nunito, sans-serif",
  },
  btnPink: {
    padding: "11px 26px",
    background: "#e75480",
    color: "white",
    border: "none",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    margin: 6,
    fontFamily: "Nunito, sans-serif",
    letterSpacing: "0.3px",
  },
  btnOutline: {
    padding: "11px 26px",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 15,
    margin: 6,
    border: "2px solid #f48fb1",
    background: "rgba(255,255,255,0.8)",
    color: "#c2185b",
    fontFamily: "Nunito, sans-serif",
    fontWeight: 600,
  },
  tabBright: {
    flex: 1,
    maxWidth: 240,
    padding: "13px 8px",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    border: "2px solid #f48fb1",
    background: "#fff0f5",
    color: "#c2185b",
    fontFamily: "Nunito, sans-serif",
    whiteSpace: "nowrap",
  },
  tabDark: {
    flex: 1,
    maxWidth: 240,
    padding: "13px 8px",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    border: "2px solid #550000",
    background: "#1a1a1a",
    color: "#ff6b6b",
    fontFamily: "Nunito, sans-serif",
    whiteSpace: "nowrap",
  },
  numGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
    gap: 10,
    maxWidth: 400,
    margin: "1rem auto",
  },
  numBtn: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    border: "2px solid #f48fb1",
    background: "rgba(255,240,245,0.9)",
    color: "#c2185b",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Nunito, sans-serif",
    transition: "transform 0.15s, background 0.15s",
  },
  msgCard: {
    background: "rgba(255,249,251,0.92)",
    border: "1.5px solid #f48fb1",
    borderRadius: 16,
    padding: "1.4rem 1.6rem",
    maxWidth: 460,
    margin: "1rem auto",
    fontSize: 15,
    lineHeight: 1.85,
    color: "#880e4f",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    textAlign: "left",
  },
  darkBg: {
    background: "linear-gradient(135deg, #0a0000 0%, #1a0005 100%)",
    borderRadius: 20,
    minHeight: "100vh",
  },
  msgCardDark: {
    background: "rgba(20,0,0,0.9)",
    border: "1.5px solid #7f0000",
    borderRadius: 16,
    padding: "1.4rem 1.6rem",
    maxWidth: 460,
    margin: "1rem auto",
    fontSize: 15,
    lineHeight: 1.85,
    color: "#ff8a80",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    textAlign: "left",
  },
  warningBanner: {
    background: "#cc0000",
    color: "white",
    borderRadius: 50,
    padding: "12px 24px",
    fontSize: 15,
    fontWeight: 700,
    maxWidth: 360,
    margin: "0 auto 1.2rem",
    fontFamily: "Nunito, sans-serif",
    letterSpacing: "0.5px",
  },
  dzBtn: {
    padding: "12px 24px",
    margin: 8,
    borderRadius: 50,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    border: "2px solid #7f0000",
    background: "rgba(26,0,0,0.8)",
    color: "#ff6b6b",
    fontFamily: "Nunito, sans-serif",
  },
  backLink: {
    fontSize: 13,
    color: "#c2185b",
    cursor: "pointer",
    marginTop: "0.8rem",
    display: "inline-block",
    background: "none",
    border: "none",
    fontFamily: "Nunito, sans-serif",
    fontWeight: 600,
  },
  backLinkDark: {
    fontSize: 13,
    color: "#ff8a80",
    cursor: "pointer",
    marginTop: "0.8rem",
    display: "inline-block",
    background: "none",
    border: "none",
    fontFamily: "Nunito, sans-serif",
    fontWeight: 600,
  },
}
