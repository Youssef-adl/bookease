import { useState } from 'react'
import './Dashboard.css'

const COIFFEUR_COLORS = {
  sarah: { bg: '#FFF3E0', text: '#E65100', border: '#FB8C00', name: 'Sarah B.', full: 'Sarah Benali' },
  thomas: { bg: '#E3F2FD', text: '#1565C0', border: '#42A5F5', name: 'Thomas M.', full: 'Thomas Moreau' },
  lea: { bg: '#FCE4EC', text: '#AD1457', border: '#EC407A', name: 'Léa D.', full: 'Léa Dubois' },
  karim: { bg: '#E8F5E9', text: '#2E7D32', border: '#66BB6A', name: 'Karim H.', full: 'Karim Hadj' },
}

const WEEKS = [
  { label: 'Semaine du 22 — 27 Juin', days: ['Lun 22', 'Mar 23', 'Mer 24', 'Jeu 25', 'Ven 26', 'Sam 27'] },
  { label: 'Semaine du 29 Juin — 4 Juil', days: ['Lun 29', 'Mar 30', 'Mer 1', 'Jeu 2', 'Ven 3', 'Sam 4'] },
  { label: 'Semaine du 6 — 11 Juil', days: ['Lun 6', 'Mar 7', 'Mer 8', 'Jeu 9', 'Ven 10', 'Sam 11'] },
]

const APPOINTMENTS_BY_WEEK = [
  [
    { day: 5, start: '9:00', end: '9:45', name: 'Emma L.', service: 'Coupe', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '9:30', end: '10:15', name: 'Lucas P.', service: 'Barbe', who: 'thomas', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '10:00', end: '10:30', name: 'Sara K.', service: 'Brushing', who: 'lea', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '10:30', end: '11:15', name: 'Mehdi R.', service: 'Dégradé', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '11:00', end: '11:45', name: 'Camille M.', service: 'Coupe+Brush', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '11:30', end: '12:00', name: 'Youssef A.', service: 'Coupe', who: 'thomas', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '14:00', end: '15:30', name: 'Inès T.', service: 'Coloration', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '14:00', end: '14:45', name: 'Omar B.', service: 'Coupe+Barbe', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    { day: 4, start: '9:00', end: '9:30', name: 'Julie D.', service: 'Coupe', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face' },
    { day: 4, start: '10:00', end: '11:00', name: 'Antoine M.', service: 'Mécaniques', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face' },
    { day: 4, start: '11:00', end: '11:45', name: 'Claire V.', service: 'Soin', who: 'sarah', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face' },
    { day: 4, start: '14:00', end: '14:30', name: 'Nicolas F.', service: 'Coupe', who: 'thomas', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    { day: 3, start: '9:00', end: '10:30', name: 'Fatima Z.', service: 'Coloration', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face' },
    { day: 3, start: '10:00', end: '10:45', name: 'Paul G.', service: 'Coupe+Barbe', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face' },
    { day: 3, start: '14:00', end: '14:30', name: 'Marie L.', service: 'Brushing', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face' },
    { day: 2, start: '9:30', end: '10:15', name: 'Thomas B.', service: 'Coupe', who: 'thomas', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face' },
    { day: 2, start: '11:00', end: '12:00', name: 'Amina H.', service: 'Mécaniques', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=80&h=80&fit=crop&crop=face' },
    { day: 2, start: '14:00', end: '14:30', name: 'Rachid M.', service: 'Barbe', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face' },
    { day: 1, start: '9:00', end: '9:30', name: 'Sophie D.', service: 'Coupe', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face' },
    { day: 1, start: '10:00', end: '10:45', name: 'Karim A.', service: 'Dégradé', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    { day: 1, start: '14:00', end: '15:00', name: 'Laura P.', service: 'Coloration', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face' },
    { day: 0, start: '9:00', end: '9:30', name: 'Hugo R.', service: 'Coupe', who: 'thomas', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face' },
    { day: 0, start: '10:00', end: '10:30', name: 'Nadia B.', service: 'Brushing', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
    { day: 0, start: '11:00', end: '12:30', name: 'Yasmine K.', service: 'Mécaniques', who: 'lea', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face' },
  ],
  [
    { day: 0, start: '9:00', end: '9:45', name: 'Alice R.', service: 'Coupe', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face' },
    { day: 0, start: '10:00', end: '11:00', name: 'Bruno M.', service: 'Coloration', who: 'lea', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face' },
    { day: 1, start: '9:00', end: '9:30', name: 'David L.', service: 'Barbe', who: 'thomas', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face' },
    { day: 2, start: '14:00', end: '14:45', name: 'Eva S.', service: 'Brushing', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face' },
    { day: 3, start: '10:00', end: '11:30', name: 'Fatiha B.', service: 'Mécaniques', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=80&h=80&fit=crop&crop=face' },
    { day: 4, start: '11:00', end: '11:45', name: 'George P.', service: 'Coupe+Barbe', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '9:00', end: '9:30', name: 'Hanae K.', service: 'Soin', who: 'sarah', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '10:00', end: '10:45', name: 'Ibrahim N.', service: 'Dégradé', who: 'karim', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
  ],
  [
    { day: 0, start: '10:00', end: '10:30', name: 'Juliette F.', service: 'Coupe', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face' },
    { day: 2, start: '9:00', end: '10:00', name: 'Kenza A.', service: 'Coloration', who: 'lea', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face' },
    { day: 3, start: '14:00', end: '14:30', name: 'Lamine D.', service: 'Barbe', who: 'thomas', status: 'pending', clientImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    { day: 5, start: '11:00', end: '12:00', name: 'Meryem S.', service: 'Brushing', who: 'sarah', status: 'confirmed', clientImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  ],
]

const UPCOMING = [
  { name: 'Camille Martin', service: 'Coupe + Brushing — Sarah', time: '11:00', countdown: 'dans 23 min', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', highlight: true },
  { name: 'Youssef Alami', service: 'Coupe Homme — Thomas', time: '11:30', countdown: 'dans 53 min', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Inès Touati', service: 'Coloration — Léa', time: '12:00', countdown: 'dans 1h23', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
  { name: 'Omar Bensaid', service: 'Coupe + Barbe — Karim', time: '12:30', countdown: 'dans 1h53', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
]

function timeToIdx(t) {
  const [h, m] = t.split(':').map(Number)
  return (h - 8) * 2 + (m >= 30 ? 1 : 0)
}

export default function Dashboard() {
  const [popup, setPopup] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [toast, setToast] = useState(null)
  const [appointments, setAppointments] = useState(APPOINTMENTS_BY_WEEK)
  const [selectedUpcoming, setSelectedUpcoming] = useState(null)

  const hours = []
  for (let h = 8; h <= 19; h++) {
    hours.push(h + ':00')
    if (h < 19) hours.push(h + ':30')
  }

  const weekData = WEEKS[currentWeek]
  const weekAppointments = appointments[currentWeek] || []

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const openPopup = (a) => setPopup(a)
  const closePopup = () => setPopup(null)

  const handlePopupAction = (action) => {
    const actionLabels = { confirm: 'confirmé', cancel: 'annulé', noshow: 'marqué no-show' }
    showToast(`${popup.name} a été ${actionLabels[action]}`, action === 'cancel' ? 'warning' : 'success')
    closePopup()
  }

  const handleWeekNav = (dir) => {
    setCurrentWeek(w => {
      const newW = w + dir
      if (newW < 0) return 0
      if (newW >= WEEKS.length) return WEEKS.length - 1
      return newW
    })
  }

  const handleUpcomingClick = (u) => {
    setSelectedUpcoming(u)
  }

  const closeUpcomingDetail = () => {
    setSelectedUpcoming(null)
  }

  const handleUpcomingAction = (action) => {
    const actionLabels = { confirm: 'confirmé', cancel: 'annulé', noshow: 'marqué no-show' }
    showToast(`${selectedUpcoming.name} a été ${actionLabels[action]}`, action === 'cancel' ? 'warning' : 'success')
    setSelectedUpcoming(null)
  }

  const occupation = 78
  const circumference = 2 * Math.PI * 50
  const offset = circumference - (occupation / 100) * circumference

  return (
    <div className="dashboard">
      {/* SCATTERED STARS */}
      <span className="star-deco" style={{ position: 'absolute', top: 120, right: 120 }}></span>
      <span className="star-deco sm" style={{ position: 'absolute', top: 200, left: 60 }}></span>
      <span className="star-deco lg" style={{ position: 'absolute', bottom: 300, right: 40 }}></span>

      {toast && (
        <div className={`dash-toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : toast.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-exclamation'}`}></i>
          {toast.msg}
        </div>
      )}

      {/* HEADER */}
      <div className="dash-header">
        <div className="dash-header-left">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=40&h=40&fit=crop"
            alt="BookEase"
            className="dash-salon-img"
          />
          <div className="dash-date">
            <i className="fa-regular fa-calendar"></i>
            Samedi 27 Juin 2026
          </div>
        </div>
        <div className="dash-header-right">
          <div className="dash-stat total">
            <span className="stat-dot"></span>
            <i className="fa-solid fa-check-circle"></i>
            8 RDV aujourd'hui
          </div>
          <div className="dash-stat pending">
            <span className="stat-dot"></span>
            <i className="fa-solid fa-hourglass-half"></i>
            3 en attente
          </div>
        </div>
      </div>

      {/* LEGEND */}
      <div className="dash-legend">
        <span className="legend-label">Coiffeurs</span>
        {Object.entries(COIFFEUR_COLORS).map(([key, val]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: val.border }}></span>
            {val.name}
          </div>
        ))}
      </div>

      <div className="dash-layout">
        {/* MAIN CALENDAR */}
        <div className="dash-main">
          <div className="cal-controls">
            <h2 className="cal-week-title">{weekData.label}</h2>
            <div className="cal-nav-btns">
              <button
                className="cal-nav-btn"
                disabled={currentWeek === 0}
                onClick={() => handleWeekNav(-1)}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="cal-nav-btn"
                disabled={currentWeek === WEEKS.length - 1}
                onClick={() => handleWeekNav(1)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="week-grid">
            <div className="week-header-cell"></div>
            {weekData.days.map((d, i) => (
              <div key={i} className={`week-header-cell ${i === 5 ? 'today' : ''}`}>{d}</div>
            ))}

            {hours.map((h, hi) => (
              <div key={h} className="time-row">
                <div className="time-label">{h}</div>
                {weekData.days.map((_, di) => {
                  const blocks = weekAppointments.filter(a => {
                    const si = timeToIdx(a.start)
                    const ei = timeToIdx(a.end)
                    return a.day === di && hi >= si && hi < ei
                  })
                  return (
                    <div key={di} className="time-cell">
                      {blocks.map((a, ai) => {
                        const si = timeToIdx(a.start)
                        const isStart = hi === si
                        if (!isStart) return null
                        const ei = timeToIdx(a.end)
                        const height = (ei - si) * 26
                        const c = COIFFEUR_COLORS[a.who]
                        return (
                          <div
                            key={ai}
                            className={`cal-block status-${a.status}`}
                            style={{
                              background: c.bg,
                              color: c.text,
                              borderLeftColor: c.border,
                              height: height + 'px',
                            }}
                            onClick={() => openPopup(a)}
                            title={`${a.name} — ${a.service} — ${a.status === 'confirmed' ? 'Confirmé' : 'En attente'}`}
                          >
                            <div className="block-name">{a.name}</div>
                            <div className="block-service">{a.service}</div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="dash-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <i className="fa-solid fa-clock"></i>
              Prochaines 2h
            </h3>
            <p className="sidebar-sub">RDV à venir jusqu'à 13h00</p>

            {UPCOMING.map((u, i) => (
              <div
                key={i}
                className={`upcoming-card ${u.highlight ? 'highlight' : ''} ${selectedUpcoming === u ? 'selected' : ''}`}
                onClick={() => handleUpcomingClick(u)}
              >
                <img className="upcoming-avatar" src={u.img} alt={u.name} />
                <div className="upcoming-info">
                  <div className="upcoming-name">{u.name}</div>
                  <div className="upcoming-service">{u.service}</div>
                </div>
                <div className="upcoming-time-col">
                  <div className="upcoming-time">{u.time}</div>
                  <div className="upcoming-countdown">{u.countdown}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-section stats-section">
            <h3 className="stats-label">
              <i className="fa-solid fa-chart-simple"></i>
              Stats du jour
            </h3>
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-card-info">
                  <span className="stat-card-label">Revenus</span>
                  <span className="stat-card-value">485 €</span>
                </div>
                <i className="fa-solid fa-euro-sign stat-card-icon"></i>
              </div>
              <div className="stat-card">
                <div className="stat-card-info">
                  <span className="stat-card-label">Taux occupation</span>
                  <span className="stat-card-value green">78%</span>
                </div>
                <i className="fa-solid fa-chart-pie stat-card-icon"></i>
              </div>
            </div>

            <div className="gauge-container">
              <div className="gauge">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle className="gauge-bg" cx="60" cy="60" r="50" />
                  <circle
                    className="gauge-fill"
                    cx="60" cy="60" r="50"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="gauge-text">
                  <div className="gauge-pct">78%</div>
                  <div className="gauge-label">occupation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPCOMING DETAIL MODAL */}
      {selectedUpcoming && (
        <div className="popup-overlay" onClick={closeUpcomingDetail}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">
                <i className="fa-solid fa-circle-info"></i>
                Détail du rendez-vous
              </h3>
              <button className="popup-close" onClick={closeUpcomingDetail}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="popup-body">
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-user"></i> Client</span>
                <span className="popup-value">{selectedUpcoming.name}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-scissors"></i> Service</span>
                <span className="popup-value">{selectedUpcoming.service}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-regular fa-clock"></i> Heure</span>
                <span className="popup-value">{selectedUpcoming.time}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-hourglass-half"></i> Countdown</span>
                <span className="popup-value countdown-value">{selectedUpcoming.countdown}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-flag"></i> Statut</span>
                <span className="popup-status confirmed">
                  <i className="fa-solid fa-circle-check"></i> En attente
                </span>
              </div>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm" onClick={() => handleUpcomingAction('confirm')}>
                <i className="fa-solid fa-check"></i> Confirmer
              </button>
              <button className="popup-btn cancel" onClick={() => handleUpcomingAction('cancel')}>
                <i className="fa-solid fa-xmark"></i> Annuler
              </button>
              <button className="popup-btn noshow" onClick={() => handleUpcomingAction('noshow')}>
                <i className="fa-solid fa-user-slash"></i> No-show
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR BLOCK POPUP */}
      {popup && !selectedUpcoming && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">
                <i className="fa-solid fa-circle-info"></i>
                Détail du rendez-vous
              </h3>
              <button className="popup-close" onClick={closePopup}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="popup-body">
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-user"></i> Client</span>
                <span className="popup-value">{popup.name}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-scissors"></i> Service</span>
                <span className="popup-value">{popup.service}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-user-tie"></i> Coiffeur</span>
                <span className="popup-value">{COIFFEUR_COLORS[popup.who]?.full}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-regular fa-clock"></i> Durée</span>
                <span className="popup-value">{(timeToIdx(popup.end) - timeToIdx(popup.start)) * 30} min</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-regular fa-calendar"></i> Heure</span>
                <span className="popup-value">{popup.start} — {popup.end}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label"><i className="fa-solid fa-flag"></i> Statut</span>
                <span className={`popup-status ${popup.status === 'confirmed' ? 'confirmed' : 'pending'}`}>
                  <i className={`fa-solid ${popup.status === 'confirmed' ? 'fa-circle-check' : 'fa-hourglass-half'}`}></i>
                  {popup.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm" onClick={() => handlePopupAction('confirm')}>
                <i className="fa-solid fa-check"></i> Confirmer
              </button>
              <button className="popup-btn cancel" onClick={() => handlePopupAction('cancel')}>
                <i className="fa-solid fa-xmark"></i> Annuler
              </button>
              <button className="popup-btn noshow" onClick={() => handlePopupAction('noshow')}>
                <i className="fa-solid fa-user-slash"></i> No-show
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
