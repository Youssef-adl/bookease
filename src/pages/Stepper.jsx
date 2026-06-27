import { useState, useMemo } from 'react'
import './Stepper.css'

const SERVICES = [
  { id: 'coupe', name: 'Coupe Classique', icon: 'fa-solid fa-scissors', duration: '30 min', price: 25, img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop', desc: 'Coupe homme ou femme avec finition au choix. Shampoing inclus.', popular: true, category: 'coupe' },
  { id: 'coupe-barbe', name: 'Coupe + Barbe', icon: 'fa-solid fa-user-tie', duration: '45 min', price: 38, img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop', desc: 'Coupe complète avec taille de barbe soignée et huile de barbe.', popular: true, category: 'homme' },
  { id: 'coloration', name: 'Coloration', icon: 'fa-solid fa-palette', duration: '90 min', price: 65, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', desc: 'Coloration professionnelle avec produits premium sans ammoniaque.', popular: false, category: 'couleur' },
  { id: 'brushing', name: 'Brushing', icon: 'fa-solid fa-wind', duration: '40 min', price: 30, img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop', desc: 'Mise en forme et coiffage professionnel pour un look impeccable.', popular: false, category: 'coiffage' },
  { id: 'mecaniques', name: 'Mécaniques', icon: 'fa-solid fa-wand-magic-sparkles', duration: '120 min', price: 85, img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop', desc: 'Mécaniques, ondulations ou boucles naturelles. Résultat longue durée.', popular: false, category: 'couleur' },
  { id: 'soin', name: 'Soin Profond', icon: 'fa-solid fa-droplet', duration: '50 min', price: 45, img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&fit=crop', desc: 'Soin capillaire hydratant et réparateur pour cheveux abîmés.', popular: false, category: 'soin' },
]

const COIFFEURS = [
  { id: 1, name: 'Sarah Benali', spec: 'Coupe & Coloration', rating: 5, available: true, img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=128&h=128&fit=crop&crop=face', bio: '8 ans d\'expérience. Passionnée par les colorations modernes et les coupes tendance.', experience: '8 ans', specialties: ['Coloration', 'Coupe Femme', 'Balayage'], reviews: 247 },
  { id: 2, name: 'Thomas Moreau', spec: 'Homme & Barbe', rating: 4, available: true, img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=128&h=128&fit=crop&crop=face', bio: 'Maître barbier. Spécialiste des coupes classiques et modernes pour homme.', experience: '6 ans', specialties: ['Barbe', 'Coupe Homme', 'Dégradé'], reviews: 189 },
  { id: 3, name: 'Léa Dubois', spec: 'Mécaniques & Brushing', rating: 5, available: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face', bio: '10 ans d\'expérience. Experte en mécaniques et coiffages événementiels.', experience: '10 ans', specialties: ['Mécaniques', 'Brushing', 'Événementiel'], reviews: 312 },
  { id: 4, name: 'Karim Hadj', spec: 'Dégradé & Tresses', rating: 4, available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face', bio: '5 ans d\'expérience. Spécialiste des dégradés et des tresses africaines.', experience: '5 ans', specialties: ['Dégradé', 'Tresses', 'Coupe Homme'], reviews: 156 },
]

const STEP_LABELS = ['Service', 'Coiffeur', 'Créneau', 'Confirmation']
const MONTH_NAMES = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAY_NAMES = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

const SLOTS = [
  { time: '09:00', taken: false }, { time: '09:30', taken: false },
  { time: '10:00', taken: true }, { time: '10:30', taken: false },
  { time: '11:00', taken: false }, { time: '11:30', taken: true },
  { time: '14:00', taken: true }, { time: '14:30', taken: false },
  { time: '15:00', taken: false }, { time: '15:30', taken: false },
  { time: '16:00', taken: true }, { time: '16:30', taken: false },
  { time: '17:00', taken: false }, { time: '17:30', taken: false },
]

const CATEGORIES = [
  { id: 'all', label: 'Tous', icon: 'fa-solid fa-grip' },
  { id: 'coupe', label: 'Coupe', icon: 'fa-solid fa-scissors' },
  { id: 'homme', label: 'Homme', icon: 'fa-solid fa-user' },
  { id: 'couleur', label: 'Couleur', icon: 'fa-solid fa-palette' },
  { id: 'coiffage', label: 'Coiffage', icon: 'fa-solid fa-wind' },
  { id: 'soin', label: 'Soin', icon: 'fa-solid fa-droplet' },
]

export default function Stepper() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedCoiffeur, setSelectedCoiffeur] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [calMonth, setCalMonth] = useState(5)
  const [calYear, setCalYear] = useState(2026)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [formErrors, setFormErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [paying, setPaying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [expandedCoiffeur, setExpandedCoiffeur] = useState(null)

  const service = SERVICES.find(s => s.id === selectedService)
  const coiffeur = COIFFEURS.find(c => c.id === selectedCoiffeur)

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory)

  const discount = promoApplied ? 0.1 : 0
  const totalPrice = service ? Math.round(service.price * (1 - discount)) : 0
  const loyaltyPoints = service ? Math.floor(service.price / 5) : 0

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay()
    const offset = (firstDay + 6) % 7
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
    const today = new Date()
    const days = []
    for (let i = 0; i < offset; i++) days.push({ day: null, key: `empty-${i}` })
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calYear, calMonth, d)
      const isPast = date < today && !(date.toDateString() === today.toDateString())
      const isToday = date.toDateString() === today.toDateString()
      const isSunday = date.getDay() === 0
      days.push({ day: d, isPast, isToday, isSunday, key: d })
    }
    return days
  }, [calMonth, calYear])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const goStep = (n) => {
    if (n > step + 1) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const changeMonth = (dir) => {
    setCalMonth(m => {
      const newM = m + dir
      if (newM > 11) { setCalYear(y => y + 1); return 0 }
      if (newM < 0) { setCalYear(y => y - 1); return 11 }
      return newM
    })
  }

  const formatDate = () => {
    if (!selectedDate) return 'Sélectionnez une date'
    return `${selectedDate} ${MONTH_NAMES[calMonth]} ${calYear}`
  }

  const formatFullDate = () => {
    if (!selectedDate) return ''
    const date = new Date(calYear, calMonth, selectedDate)
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return `${dayNames[date.getDay()]} ${selectedDate} ${MONTH_NAMES[calMonth]} ${calYear}`
  }

  const handleForm = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (formErrors[field]) setFormErrors(e => ({ ...e, [field]: null }))
  }

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'BOOKEASE10') {
      setPromoApplied(true)
      showToast('Code promo appliqué ! -10%', 'success')
    } else {
      showToast('Code promo invalide', 'error')
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Le nom est requis'
    if (!form.phone.trim()) errors.phone = 'Le téléphone est requis'
    else if (!/^[\d\s+\-]{8,}$/.test(form.phone.trim())) errors.phone = 'Numéro invalide'
    if (!form.email.trim()) errors.email = 'L\'email est requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Email invalide'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePay = () => {
    if (!validateForm()) {
      showToast('Veuillez remplir tous les champs correctement', 'error')
      return
    }
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setCompleted(true)
      showToast('Paiement réussi ! Réservation confirmée.', 'success')
    }, 2000)
  }

  const handleNewReservation = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedCoiffeur(null)
    setSelectedSlot(null)
    setSelectedDate(null)
    setForm({ name: '', email: '', phone: '', notes: '' })
    setFormErrors({})
    setCompleted(false)
    setPromoCode('')
    setPromoApplied(false)
    setActiveCategory('all')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const availableSlots = SLOTS.filter(s => !s.taken).length

  return (
    <div className="bk-page">
      {toast && (
        <div className={`bk-toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          {toast.msg}
        </div>
      )}

      {/* PROGRESS BAR */}
      <div className="bk-progress">
        <div className="bk-progress-track">
          {STEP_LABELS.map((label, i) => {
            const num = i + 1
            const isActive = num === step
            const isDone = num < step
            return (
              <div key={num} className="bk-progress-step">
                <button
                  className={`bk-step-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => num <= step && goStep(num)}
                  disabled={num > step}
                >
                  <span className="bk-step-num">
                    {isDone ? <i className="fa-solid fa-check"></i> : num}
                  </span>
                  <span className="bk-step-text">{label}</span>
                </button>
                {i < 3 && <div className={`bk-step-line ${isDone ? 'done' : ''}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bk-content">
        {/* ===== STEP 1: SERVICES ===== */}
        {step === 1 && !completed && (
          <div className="bk-panel" key="step1">
            <div className="bk-panel-header">
              <div className="bk-panel-icon"><i className="fa-solid fa-scissors"></i></div>
              <div>
                <h2 className="bk-title">Choisissez votre service</h2>
                <p className="bk-sub">Sélectionnez le soin qui vous convient.</p>
              </div>
            </div>

            <div className="bk-filters">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className={`bk-filter ${activeCategory === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  <i className={c.icon}></i>
                  {c.label}
                </button>
              ))}
            </div>

            <div className="bk-grid-2">
              {filteredServices.map(s => (
                <div
                  key={s.id}
                  className={`bk-service ${selectedService === s.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(s.id)}
                >
                  {s.popular && <span className="bk-badge-popular"><i className="fa-solid fa-fire"></i> Populaire</span>}
                  <div className="bk-service-img">
                    <img src={s.img} alt={s.name} />
                    <div className="bk-service-overlay">
                      <span className="bk-service-price">{s.price} €</span>
                    </div>
                  </div>
                  <div className="bk-service-body">
                    <div className="bk-service-top">
                      <h3 className="bk-service-name">{s.name}</h3>
                      <span className="bk-service-dur"><i className="fa-regular fa-clock"></i> {s.duration}</span>
                    </div>
                    <p className="bk-service-desc">{s.desc}</p>
                  </div>
                  {selectedService === s.id && (
                    <div className="bk-check"><i className="fa-solid fa-check"></i></div>
                  )}
                </div>
              ))}
            </div>

            {selectedService && (
              <div className="bk-float-bar">
                <div className="bk-float-info">
                  <div className="bk-float-icon"><i className={service?.icon}></i></div>
                  <div>
                    <div className="bk-float-name">{service?.name}</div>
                    <div className="bk-float-meta">{service?.duration} — {service?.price} €</div>
                  </div>
                </div>
                <button className="bk-btn bk-btn-primary" onClick={() => goStep(2)}>
                  Continuer <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}

            <div className="bk-actions">
              <div></div>
              <button className="bk-btn bk-btn-primary" disabled={!selectedService} onClick={() => goStep(2)}>
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 2: COIFFEURS ===== */}
        {step === 2 && !completed && (
          <div className="bk-panel" key="step2">
            <div className="bk-panel-header">
              <div className="bk-panel-icon"><i className="fa-solid fa-user-group"></i></div>
              <div>
                <h2 className="bk-title">Choisissez votre coiffeur</h2>
                <p className="bk-sub">Sélectionnez le professionnel de votre choix.</p>
              </div>
            </div>

            <div className="bk-coiffeurs">
              {COIFFEURS.map(c => (
                <div key={c.id} className={`bk-coiffeur ${selectedCoiffeur === c.id ? 'selected' : ''} ${!c.available ? 'disabled' : ''}`}>
                  <div className="bk-coiffeur-main" onClick={() => c.available && setSelectedCoiffeur(c.id)}>
                    <div className="bk-coiffeur-avatar-wrap">
                      <img className="bk-coiffeur-avatar" src={c.img} alt={c.name} />
                      <span className={`bk-coiffeur-status ${c.available ? 'on' : 'off'}`}></span>
                    </div>
                    <div className="bk-coiffeur-info">
                      <h3 className="bk-coiffeur-name">{c.name}</h3>
                      <p className="bk-coiffeur-spec">{c.spec}</p>
                      <div className="bk-coiffeur-rating">
                        {[1,2,3,4,5].map(i => (
                          <i key={i} className={`fa-${i <= c.rating ? 'solid' : 'regular'} fa-star`}></i>
                        ))}
                        <span>{c.rating}.0</span>
                        <span className="bk-coiffeur-reviews">({c.reviews} avis)</span>
                      </div>
                    </div>
                    <div className="bk-coiffeur-right">
                      <span className={`bk-status-badge ${c.available ? 'available' : 'unavailable'}`}>
                        {c.available ? 'Disponible' : 'Complet'}
                      </span>
                      <button
                        className="bk-expand-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedCoiffeur(expandedCoiffeur === c.id ? null : c.id)
                        }}
                      >
                        <i className={`fa-solid fa-chevron-${expandedCoiffeur === c.id ? 'up' : 'down'}`}></i>
                      </button>
                    </div>
                  </div>

                  {expandedCoiffeur === c.id && (
                    <div className="bk-coiffeur-expand">
                      <p className="bk-coiffeur-bio">{c.bio}</p>
                      <div className="bk-coiffeur-stats">
                        <div className="bk-stat"><i className="fa-solid fa-briefcase"></i> {c.experience}</div>
                        <div className="bk-stat"><i className="fa-solid fa-star"></i> {c.rating}/5</div>
                        <div className="bk-stat"><i className="fa-solid fa-comment"></i> {c.reviews} avis</div>
                      </div>
                      <div className="bk-tags">
                        {c.specialties.map((s, i) => <span key={i} className="bk-tag">{s}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bk-actions">
              <button className="bk-btn bk-btn-outline" onClick={() => goStep(1)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <button className="bk-btn bk-btn-primary" disabled={!selectedCoiffeur} onClick={() => goStep(3)}>
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: CRENEAU ===== */}
        {step === 3 && !completed && (
          <div className="bk-panel" key="step3">
            <div className="bk-panel-header">
              <div className="bk-panel-icon"><i className="fa-solid fa-calendar-day"></i></div>
              <div>
                <h2 className="bk-title">Choisissez votre créneau</h2>
                <p className="bk-sub">Sélectionnez la date et l'horaire qui vous conviennent.</p>
              </div>
            </div>

            <div className="bk-calendar">
              <div className="bk-cal-header">
                <button className="bk-cal-nav" onClick={() => changeMonth(-1)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h3 className="bk-cal-month">{MONTH_NAMES[calMonth]} {calYear}</h3>
                <button className="bk-cal-nav" onClick={() => changeMonth(1)}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <div className="bk-cal-weekdays">
                {DAY_NAMES.map(d => <div key={d} className="bk-cal-wd">{d}</div>)}
              </div>
              <div className="bk-cal-grid">
                {calendarDays.map(d => (
                  <button
                    key={d.key}
                    className={`bk-cal-day ${d.isPast || d.isSunday || !d.day ? 'disabled' : ''} ${d.isToday ? 'today' : ''} ${selectedDate === d.day ? 'selected' : ''}`}
                    onClick={() => d.day && !d.isPast && !d.isSunday && setSelectedDate(d.day)}
                    disabled={d.isPast || d.isSunday || !d.day}
                  >
                    {d.day || ''}
                    {d.isToday && <span className="bk-today-dot"></span>}
                  </button>
                ))}
              </div>
              <div className="bk-cal-legend">
                <span><span className="bk-legend-dot today-dot"></span> Aujourd'hui</span>
                <span><span className="bk-legend-dot selected-dot"></span> Sélectionné</span>
              </div>
            </div>

            {selectedDate && (
              <div className="bk-date-banner">
                <i className="fa-solid fa-calendar-check"></i>
                <span>{formatFullDate()}</span>
              </div>
            )}

            <div className="bk-slots">
              <h3 className="bk-slots-title">
                <i className="fa-regular fa-clock"></i>
                Horaires disponibles
              </h3>
              <div className="bk-slots-grid">
                {SLOTS.map((s, i) => (
                  <button
                    key={i}
                    className={`bk-slot ${s.taken ? 'taken' : ''} ${selectedSlot === s.time ? 'selected' : ''}`}
                    onClick={() => !s.taken && setSelectedSlot(s.time)}
                    disabled={s.taken}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
              <div className="bk-slots-legend">
                <span><span className="bk-legend-dot avail-dot"></span> Disponible</span>
                <span><span className="bk-legend-dot taken-dot"></span> Occupé</span>
                <span><span className="bk-legend-dot selected-dot"></span> Sélectionné</span>
              </div>
            </div>

            {selectedSlot && (
              <div className="bk-date-banner">
                <i className="fa-solid fa-clock"></i>
                <span>Créneau : <strong>{selectedSlot}</strong> — Durée estimée : {service?.duration}</span>
              </div>
            )}

            <div className="bk-actions">
              <button className="bk-btn bk-btn-outline" onClick={() => goStep(2)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <button className="bk-btn bk-btn-primary" disabled={!selectedDate || !selectedSlot} onClick={() => goStep(4)}>
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: CONFIRMATION ===== */}
        {step === 4 && !completed && (
          <div className="bk-panel" key="step4">
            <div className="bk-panel-header">
              <div className="bk-panel-icon"><i className="fa-solid fa-clipboard-check"></i></div>
              <div>
                <h2 className="bk-title">Récapitulatif</h2>
                <p className="bk-sub">Vérifiez les détails de votre réservation avant de payer.</p>
              </div>
            </div>

            <div className="bk-recap-grid">
              <div className="bk-recap-main">
                <div className="bk-recap-card">
                  <div className="bk-recap-row">
                    <span className="bk-recap-label"><i className="fa-solid fa-bag-shopping"></i> Service</span>
                    <span className="bk-recap-val">{service?.name || '—'}</span>
                  </div>
                  <div className="bk-recap-row">
                    <span className="bk-recap-label"><i className="fa-solid fa-user"></i> Coiffeur</span>
                    <span className="bk-recap-val">{coiffeur?.name || '—'}</span>
                  </div>
                  <div className="bk-recap-row">
                    <span className="bk-recap-label"><i className="fa-regular fa-calendar"></i> Date & Heure</span>
                    <span className="bk-recap-val">{formatFullDate()} — {selectedSlot || '—'}</span>
                  </div>
                  <div className="bk-recap-row">
                    <span className="bk-recap-label"><i className="fa-regular fa-clock"></i> Durée</span>
                    <span className="bk-recap-val">{service?.duration || '—'}</span>
                  </div>
                  <div className="bk-recap-row">
                    <span className="bk-recap-label"><i className="fa-solid fa-location-dot"></i> Adresse</span>
                    <span className="bk-recap-val">42 Rue de la Paix, 75002 Paris</span>
                  </div>
                  <div className="bk-recap-total">
                    <span>Total à payer</span>
                    <div className="bk-recap-total-right">
                      {promoApplied && <span className="bk-discount-tag">-{discount * 100}%</span>}
                      <span className="bk-total-price">{totalPrice} €</span>
                    </div>
                  </div>
                </div>

                <div className="bk-loyalty">
                  <i className="fa-solid fa-coins"></i>
                  <div>
                    <strong>Points de fidélité</strong>
                    <p>Vous gagnerez <strong className="bk-orange">{loyaltyPoints} points</strong> avec cette réservation</p>
                  </div>
                </div>
              </div>

              <div className="bk-recap-side">
                <div className="bk-promo">
                  <h4><i className="fa-solid fa-tag"></i> Code promo</h4>
                  <div className="bk-promo-row">
                    <input
                      className="bk-promo-input"
                      type="text"
                      placeholder="Votre code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button className="bk-promo-btn" onClick={handlePromo} disabled={promoApplied || !promoCode}>
                      {promoApplied ? <i className="fa-solid fa-check"></i> : 'Appliquer'}
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="bk-promo-ok">
                      <i className="fa-solid fa-circle-check"></i> BOOKEASE10 appliqué (-10%)
                    </div>
                  )}
                </div>

                <div className="bk-info-box">
                  <h4><i className="fa-solid fa-shield-halved"></i> Informations</h4>
                  <ul>
                    <li><i className="fa-solid fa-check"></i> Annulation gratuite 24h avant</li>
                    <li><i className="fa-solid fa-check"></i> Paiement sécurisé Stripe</li>
                    <li><i className="fa-solid fa-check"></i> Email de confirmation immédiat</li>
                    <li><i className="fa-solid fa-check"></i> Rappel SMS 24h avant</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bk-form-section">
              <h3 className="bk-form-title"><i className="fa-solid fa-pen-to-square"></i> Vos informations</h3>
              <div className="bk-form-grid">
                <div className="bk-field">
                  <label>Nom complet *</label>
                  <input className={formErrors.name ? 'error' : ''} type="text" placeholder="Jean Dupont" value={form.name} onChange={e => handleForm('name', e.target.value)} />
                  {formErrors.name && <span className="bk-field-error">{formErrors.name}</span>}
                </div>
                <div className="bk-field">
                  <label>Téléphone *</label>
                  <input className={formErrors.phone ? 'error' : ''} type="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={e => handleForm('phone', e.target.value)} />
                  {formErrors.phone && <span className="bk-field-error">{formErrors.phone}</span>}
                </div>
              </div>
              <div className="bk-field">
                <label>Email *</label>
                <input className={formErrors.email ? 'error' : ''} type="email" placeholder="jean@exemple.fr" value={form.email} onChange={e => handleForm('email', e.target.value)} />
                {formErrors.email && <span className="bk-field-error">{formErrors.email}</span>}
              </div>
              <div className="bk-field">
                <label>Notes (optionnel)</label>
                <textarea placeholder="Demandes spéciales, allergies, etc." rows={3} value={form.notes} onChange={e => handleForm('notes', e.target.value)} />
              </div>
            </div>

            <button className="bk-pay-btn" disabled={paying} onClick={handlePay}>
              {paying ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Traitement en cours...</>
              ) : (
                <><i className="fa-brands fa-stripe"></i> Payer avec Stripe — {totalPrice} €</>
              )}
            </button>
            <p className="bk-pay-secure"><i className="fa-solid fa-lock"></i> Paiement sécurisé par Stripe</p>

            <div className="bk-actions" style={{ marginTop: 16 }}>
              <button className="bk-btn bk-btn-outline" onClick={() => goStep(3)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <div></div>
            </div>
          </div>
        )}

        {/* ===== COMPLETED ===== */}
        {completed && (
          <div className="bk-panel bk-completed">
            <div className="bk-done-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 className="bk-title bk-title-center">Réservation confirmée !</h2>
            <p className="bk-sub bk-sub-center">
              Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
              Vous recevrez un rappel 24h avant votre rendez-vous.
            </p>

            <div className="bk-timeline">
              <div className="bk-tl-item active">
                <div className="bk-tl-dot"></div>
                <div className="bk-tl-content">
                  <strong>Réservation confirmée</strong>
                  <span>Paiement reçu</span>
                </div>
              </div>
              <div className="bk-tl-item">
                <div className="bk-tl-dot"></div>
                <div className="bk-tl-content">
                  <strong>Email envoyé</strong>
                  <span>Confirmation à {form.email}</span>
                </div>
              </div>
              <div className="bk-tl-item">
                <div className="bk-tl-dot"></div>
                <div className="bk-tl-content">
                  <strong>Rappel SMS</strong>
                  <span>24h avant le rendez-vous</span>
                </div>
              </div>
              <div className="bk-tl-item">
                <div className="bk-tl-dot"></div>
                <div className="bk-tl-content">
                  <strong>Votre visite</strong>
                  <span>{formatFullDate()} — {selectedSlot}</span>
                </div>
              </div>
            </div>

            <div className="bk-recap-card" style={{ marginBottom: 24, textAlign: 'left' }}>
              <div className="bk-recap-row">
                <span className="bk-recap-label"><i className="fa-solid fa-bag-shopping"></i> Service</span>
                <span className="bk-recap-val">{service?.name}</span>
              </div>
              <div className="bk-recap-row">
                <span className="bk-recap-label"><i className="fa-solid fa-user"></i> Coiffeur</span>
                <span className="bk-recap-val">{coiffeur?.name}</span>
              </div>
              <div className="bk-recap-row">
                <span className="bk-recap-label"><i className="fa-regular fa-calendar"></i> Date & Heure</span>
                <span className="bk-recap-val">{formatFullDate()} — {selectedSlot}</span>
              </div>
              <div className="bk-recap-row">
                <span className="bk-recap-label"><i className="fa-solid fa-receipt"></i> Référence</span>
                <span className="bk-recap-val bk-mono bk-orange">
                  #BK-{calYear}-{String(calMonth+1).padStart(2,'0')}{String(selectedDate).padStart(2,'0')}-{selectedSlot?.replace(':','')}
                </span>
              </div>
              <div className="bk-recap-total">
                <span>Montant payé</span>
                <span className="bk-total-price">{totalPrice} €</span>
              </div>
            </div>

            <div className="bk-done-actions">
              <button className="bk-btn bk-btn-primary" onClick={handleNewReservation}>
                <i className="fa-solid fa-plus"></i> Nouvelle réservation
              </button>
              <button className="bk-btn bk-btn-outline" onClick={() => showToast('Lien de partage copié !', 'success')}>
                <i className="fa-solid fa-share-nodes"></i> Partager
              </button>
              <button className="bk-btn bk-btn-outline" onClick={() => showToast('Ajouté au calendrier !', 'success')}>
                <i className="fa-solid fa-calendar-plus"></i> Calendrier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
