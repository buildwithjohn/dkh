// Shared CSS variables and base styles for News pages.
// Mirrors the design tokens in App.jsx so News pages match the main site.

export const BaseStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&family=Manrope:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --ink:     #09152A;
      --ink2:    #0E1D3A;
      --ink3:    #152444;
      --warm:    #FFFFFF;
      --warm2:   #EEF3FB;
      --border-d: rgba(255,255,255,0.08);
      --border-l: rgba(9,21,42,0.10);
      --gold:    #2563EB;
      --gold2:   #4A80F5;
      --blue-glow: rgba(37,99,235,0.18);
      --white:   #FFFFFF;
      --muted-d: rgba(255,255,255,0.50);
      --muted-l: #4E6389;
      --serif:   'Fraunces', Georgia, serif;
      --sans:    'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    html, body { font-family: var(--sans); color: var(--ink); background: var(--warm); -webkit-font-smoothing: antialiased; }

    a { color: inherit; text-decoration: none; }

    /* ── Shared Nav ── */
    .nav {
      position: fixed; inset: 0 0 auto; z-index: 200; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 4vw;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(9,21,42,0.10);
      transition: box-shadow .3s;
    }
    .nav.s { box-shadow: 0 2px 20px rgba(9,21,42,0.08); }
    .logo {
      font-family: var(--serif); font-size: .98rem; font-weight: 400;
      color: var(--ink); letter-spacing: .02em; white-space: nowrap;
    }
    .logo em { font-style: italic; color: var(--gold); }
    .nav-links { display: flex; align-items: center; gap: 2.2rem; }
    @media(max-width:900px) { .nav-links { display: none; } }
    .nl {
      font-size: .67rem; font-weight: 600; letter-spacing: .14em;
      text-transform: uppercase; color: rgba(9,21,42,.55);
      transition: color .2s; position: relative;
    }
    .nl::after { content:''; position: absolute; bottom:-3px; left:0; width:0; height:1.5px; background: var(--gold); transition: width .3s; }
    .nl:hover { color: var(--ink); }
    .nl:hover::after { width: 100%; }
    .nl.active { color: var(--ink); }
    .nl.active::after { width: 100%; }
    .nav-cta {
      font-size: .67rem; font-weight: 700; letter-spacing: .12em;
      text-transform: uppercase; padding: .6rem 1.6rem;
      background: var(--gold); color: var(--white);
      border-radius: 4px; transition: background .25s;
    }
    .nav-cta:hover { background: var(--gold2); }

    .ham { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
    @media(max-width:900px) { .ham { display: flex; } }
    .hl { width: 22px; height: 1.5px; background: var(--ink); border-radius: 1px; transition: transform .3s, opacity .3s; }
    .mob { position: fixed; inset: 0; background: var(--white); z-index: 195; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; border-top: 3px solid var(--gold); }
    .mob a { font-family: var(--serif); font-size: 2.8rem; font-weight: 300; font-style: italic; color: var(--ink); }
    .mob a:hover { color: var(--gold); }

    /* ── Reusable ── */
    .stag { font-size: .58rem; font-weight: 700; letter-spacing: .32em; text-transform: uppercase; display: inline-flex; align-items: center; gap: .8rem; margin-bottom: 1.6rem; }
    .stag.dark { color: var(--gold); }
    .stag.dark::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
    .stag.light { color: var(--gold); }
    .stag.light::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }

    .sh2 { font-family: var(--serif); font-weight: 300; line-height: 1; letter-spacing: -.02em; font-size: clamp(2.4rem, 5.5vw, 5.5rem); }
    .sh2.dark { color: var(--ink); }
    .sh2.light { color: var(--white); }
    .sh2.it { font-style: italic; }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: .6rem;
      font-size: .67rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
      background: var(--gold); color: var(--white);
      padding: .9rem 2.2rem; border-radius: 3px; border: none;
      cursor: pointer; transition: background .25s;
    }
    .btn-primary:hover { background: var(--gold2); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: .6rem;
      font-size: .67rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
      border: 1.5px solid rgba(9,21,42,.18); color: var(--ink);
      padding: .9rem 2.2rem; border-radius: 3px; background: transparent;
      cursor: pointer; transition: all .25s;
    }
    .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

    /* ── Footer ── shared */
    .footer-mini { background: var(--ink); color: var(--white); padding: 4rem 7vw 2rem; border-top: 2px solid var(--gold); }
    .footer-mini-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    @media(max-width:900px) { .footer-mini-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
    @media(max-width:560px) { .footer-mini-grid { grid-template-columns: 1fr; } }
    .footer-mini-brand { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; margin-bottom: .6rem; }
    .footer-mini-brand em { color: var(--gold); }
    .footer-mini-tag { font-size: .78rem; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,.6); max-width: 380px; margin-bottom: 1.2rem; }
    .footer-mini-col h4 { font-size: .58rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.9); margin-bottom: 1rem; }
    .footer-mini-col a { display: block; font-size: .8rem; font-weight: 300; color: rgba(255,255,255,.72); margin-bottom: .55rem; transition: color .2s, transform .2s; }
    .footer-mini-col a:hover { color: var(--white); transform: translateX(3px); }
    .footer-mini-bottom { padding-top: 2rem; border-top: 1px solid rgba(255,255,255,.08); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: .68rem; color: rgba(255,255,255,.55); }
  `}</style>
);
