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
  { time: '09:00', taken: false },
  { time: '09:30', taken: false },
  { time: '10:00', taken: true },
  { time: '10:30', taken: false },
  { time: '11:00', taken: false },
  { time: '11:30', taken: true },
  { time: '14:00', taken: true },
  { time: '14:30', taken: false },
  { time: '15:00', taken: false },
  { time: '15:30', taken: false },
  { time: '16:00', taken: true },
  { time: '16:30', taken: false },
  { time: '17:00', taken: false },
  { time: '17:30', taken: false },
]

const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'coupe', label: 'Coupe' },
  { id: 'homme', label: 'Homme' },
  { id: 'couleur', label: 'Couleur' },
  { id: 'coiffage', label: 'Coiffage' },
  { id: 'soin', label: 'Soin' },
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
    <div className="stepper-page">
      {/* SCATTERED STARS */}
      <span className="star-deco" style={{ top: 80, left: '5%' }}></span>
      <span className="star-deco sm" style={{ top: 160, right: '8%' }}></span>
      <span className="star-deco lg" style={{ top: 340, left: '2%' }}></span>
      <span className="star-deco" style={{ top: 520, right: '3%' }}></span>
      <span className="star-deco sm" style={{ bottom: 200, left: '10%' }}></span>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
          {toast.msg}
        </div>
      )}

      <div className="stepper-header">
        <div className="stepper-track">
          {STEP_LABELS.map((label, i) => {
            const num = i + 1
            const isActive = num === step
            const isDone = num < step
            return (
              <div key={num} className="stepper-step-group">
                <div
                  className={`stepper-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => num <= step && goStep(num)}
                >
                  <div className="step-circle">
                    {isDone ? <i className="fa-solid fa-check"></i> : num}
                  </div>
                  <span className="step-label">{label}</span>
                </div>
                {i < 3 && <div className={`step-connector ${isDone ? 'done' : ''}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="stepper-content">
        {/* STEP 1: Services */}
        {step === 1 && !completed && (
          <div className="step-panel" key="step1">
            <div className="step-header-row">
              <div>
                <h2 className="step-title">
                  <i className="fa-solid fa-scissors step-title-icon"></i>
                  Choisissez votre service
                </h2>
                <p className="step-sub">Sélectionnez le soin qui vous convient parmi notre catalogue complet.</p>
              </div>
              <div className="step-summary-mini">
                <div className="summary-mini-label">6 services</div>
                <div className="summary-mini-sub">disponibles</div>
              </div>
            </div>

            <div className="category-filters">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  className={`category-btn ${activeCategory === c.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="services-grid">
              {filteredServices.map(s => (
                <div
                  key={s.id}
                  className={`service-card ${selectedService === s.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(s.id)}
                >
                  {s.popular && <span className="service-popular-badge"><i className="fa-solid fa-fire"></i> Populaire</span>}
                  <div className="service-img-wrap">
                    <img src={s.img} alt={s.name} className="service-img" />
                    <div className="service-img-overlay">
                      <i className={s.icon}></i>
                    </div>
                  </div>
                  <div className="service-info">
                    <div className="service-name">{s.name}</div>
                    <div className="service-desc">{s.desc}</div>
                    <div className="service-meta">
                      <span><i className="fa-regular fa-clock"></i> {s.duration}</span>
                      <span className="service-price">{s.price} €</span>
                    </div>
                  </div>
                  {selectedService === s.id && (
                    <div className="service-check"><i className="fa-solid fa-check"></i></div>
                  )}
                </div>
              ))}
            </div>

            {selectedService && (
              <div className="selected-service-preview">
                <div className="preview-icon"><i className={service?.icon}></i></div>
                <div className="preview-info">
                  <div className="preview-name">{service?.name}</div>
                  <div className="preview-meta">{service?.duration} — {service?.price} €</div>
                </div>
                <button className="btn btn-primary" onClick={() => goStep(2)}>
                  Continuer <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}

            <div className="step-actions">
              <div></div>
              <button
                className="btn btn-primary"
                disabled={!selectedService}
                onClick={() => goStep(2)}
              >
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Coiffeurs */}
        {step === 2 && !completed && (
          <div className="step-panel" key="step2">
            <div className="step-header-row">
              <div>
                <h2 className="step-title">
                  <i className="fa-solid fa-user-group step-title-icon"></i>
                  Choisissez votre coiffeur
                </h2>
                <p className="step-sub">Sélectionnez le professionnel de votre choix. Voir les profils pour plus de détails.</p>
              </div>
              <div className="step-summary-mini">
                <div className="summary-mini-label">{COIFFEURS.filter(c => c.available).length} disponibles</div>
                <div className="summary-mini-sub">aujourd'hui</div>
              </div>
            </div>

            <div className="coiffeurs-list">
              {COIFFEURS.map(c => (
                <div key={c.id} className={`coiffeur-wrapper ${selectedCoiffeur === c.id ? 'selected' : ''} ${!c.available ? 'unavailable-card' : ''}`}>
                  <div
                    className="coiffeur-card"
                    onClick={() => c.available && setSelectedCoiffeur(c.id)}
                  >
                    <img className="coiffeur-avatar" src={c.img} alt={c.name} />
                    <div className="coiffeur-info">
                      <div className="coiffeur-name">{c.name}</div>
                      <div className="coiffeur-spec">{c.spec}</div>
                      <div className="coiffeur-stars">
                        {[1,2,3,4,5].map(i => (
                          <i key={i} className={`fa-${i <= c.rating ? 'solid' : 'regular'} fa-star`}></i>
                        ))}
                        <span className="coiffeur-reviews">({c.reviews} avis)</span>
                      </div>
                    </div>
                    <span className={`coiffeur-badge ${c.available ? 'available' : 'unavailable'}`}>
                      <i className={`fa-solid ${c.available ? 'fa-circle-check' : 'fa-clock'}`}></i>
                      {c.available ? 'Disponible' : 'Complet'}
                    </span>
                    <button
                      className="coiffeur-expand-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedCoiffeur(expandedCoiffeur === c.id ? null : c.id)
                      }}
                    >
                      <i className={`fa-solid fa-chevron-${expandedCoiffeur === c.id ? 'up' : 'down'}`}></i>
                    </button>
                    <div className="coiffeur-radio">
                      {selectedCoiffeur === c.id && <div className="radio-dot"></div>}
                    </div>
                  </div>

                  {expandedCoiffeur === c.id && (
                    <div className="coiffeur-details">
                      <p className="coiffeur-bio">{c.bio}</p>
                      <div className="coiffeur-meta-row">
                        <div className="coiffeur-meta-item">
                          <i className="fa-solid fa-briefcase"></i>
                          <span>{c.experience}</span>
                        </div>
                        <div className="coiffeur-meta-item">
                          <i className="fa-solid fa-star"></i>
                          <span>{c.rating}/5</span>
                        </div>
                        <div className="coiffeur-meta-item">
                          <i className="fa-solid fa-comment"></i>
                          <span>{c.reviews} avis</span>
                        </div>
                      </div>
                      <div className="coiffeur-specialties">
                        <span className="specialties-label">Spécialités :</span>
                        {c.specialties.map((s, i) => (
                          <span key={i} className="specialty-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button className="btn btn-secondary" onClick={() => goStep(1)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedCoiffeur}
                onClick={() => goStep(3)}
              >
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Créneau */}
        {step === 3 && !completed && (
          <div className="step-panel" key="step3">
            <div className="step-header-row">
              <div>
                <h2 className="step-title">
                  <i className="fa-solid fa-calendar-day step-title-icon"></i>
                  Choisissez votre créneau
                </h2>
                <p className="step-sub">Sélectionnez la date et l'horaire qui vous conviennent.</p>
              </div>
              <div className="step-summary-mini">
                <div className="summary-mini-label">{availableSlots} créneaux</div>
                <div className="summary-mini-sub">libres</div>
              </div>
            </div>

            <div className="slots-legend">
              <div className="legend-item"><span className="legend-dot available"></span> Disponible</div>
              <div className="legend-item"><span className="legend-dot taken"></span> Occupé</div>
              <div className="legend-item"><span className="legend-dot selected-dot"></span> Sélectionné</div>
            </div>

            <div className="calendar-card">
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={() => changeMonth(-1)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="cal-title">{MONTH_NAMES[calMonth]} {calYear}</div>
                <button className="cal-nav-btn" onClick={() => changeMonth(1)}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <div className="cal-grid">
                {DAY_NAMES.map(d => (
                  <div key={d} className="cal-day-name">{d}</div>
                ))}
                {calendarDays.map(d => (
                  <div
                    key={d.key}
                    className={`cal-day ${d.isPast ? 'disabled' : ''} ${d.isToday ? 'today' : ''} ${selectedDate === d.day ? 'selected' : ''} ${d.isSunday ? 'sunday' : ''}`}
                    onClick={() => d.day && !d.isPast && !d.isSunday && setSelectedDate(d.day)}
                  >
                    {d.day}
                    {d.isToday && <span className="today-badge">Auj.</span>}
                  </div>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="selected-date-info">
                <i className="fa-solid fa-calendar-check"></i>
                <span>Votre date : <strong>{formatFullDate()}</strong></span>
              </div>
            )}

            <div className="slots-section">
              <div className="slots-header">
                <i className="fa-regular fa-clock"></i>
                <span>Horaires disponibles — <strong>{formatDate()}</strong></span>
              </div>
              <div className="slots-grid">
                {SLOTS.map((s, i) => (
                  <div
                    key={i}
                    className={`slot-pill ${s.taken ? 'taken' : ''} ${selectedSlot === s.time ? 'selected' : ''}`}
                    onClick={() => !s.taken && setSelectedSlot(s.time)}
                  >
                    {s.time}
                    {s.taken && <i className="fa-solid fa-xmark slot-icon"></i>}
                    {!s.taken && selectedSlot !== s.time && <i className="fa-solid fa-check slot-icon available-icon"></i>}
                  </div>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="selected-slot-info">
                <i className="fa-solid fa-clock"></i>
                <span>Créneau : <strong>{selectedSlot}</strong></span>
                <span className="slot-duration">Durée estimée : {service?.duration}</span>
              </div>
            )}

            <div className="step-actions">
              <button className="btn btn-secondary" onClick={() => goStep(2)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedDate || !selectedSlot}
                onClick={() => goStep(4)}
              >
                Continuer <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation */}
        {step === 4 && !completed && (
          <div className="step-panel" key="step4">
            <h2 className="step-title">
              <i className="fa-solid fa-clipboard-check step-title-icon"></i>
              Récapitulatif
            </h2>
            <p className="step-sub">Vérifiez les détails de votre réservation avant de payer.</p>

            <div className="recap-layout">
              <div className="recap-main">
                <div className="recap-card">
                  <div className="recap-card-header">
                    <i className="fa-solid fa-receipt"></i>
                    <span>Détails de la réservation</span>
                  </div>
                  <div className="recap-row">
                    <div className="recap-label"><i className="fa-solid fa-bag-shopping"></i> Service</div>
                    <div className="recap-value">{service?.name || '—'}</div>
                  </div>
                  <div className="recap-row">
                    <div className="recap-label"><i className="fa-solid fa-user"></i> Coiffeur</div>
                    <div className="recap-value">{coiffeur?.name || '—'}</div>
                  </div>
                  <div className="recap-row">
                    <div className="recap-label"><i className="fa-regular fa-calendar"></i> Date & Heure</div>
                    <div className="recap-value">{formatFullDate()} — {selectedSlot || '—'}</div>
                  </div>
                  <div className="recap-row">
                    <div className="recap-label"><i className="fa-regular fa-clock"></i> Durée</div>
                    <div className="recap-value">{service?.duration || '—'}</div>
                  </div>
                  <div className="recap-row">
                    <div className="recap-label"><i className="fa-solid fa-location-dot"></i> Adresse</div>
                    <div className="recap-value">42 Rue de la Paix, 75002 Paris</div>
                  </div>
                  <div className="recap-total">
                    <span className="total-label">Total à payer</span>
                    <div className="total-right">
                      {promoApplied && <span className="total-discount">-{discount * 100}%</span>}
                      <span className="total-amount">{totalPrice} €</span>
                    </div>
                  </div>
                </div>

                <div className="loyalty-card">
                  <div className="loyalty-icon"><i className="fa-solid fa-coins"></i></div>
                  <div className="loyalty-info">
                    <div className="loyalty-title">Points de fidélité</div>
                    <div className="loyalty-desc">Vous gagnerez <strong>{loyaltyPoints} points</strong> avec cette réservation</div>
                  </div>
                </div>
              </div>

              <div className="recap-sidebar">
                <div className="promo-card">
                  <div className="promo-title"><i className="fa-solid fa-tag"></i> Code promo</div>
                  <div className="promo-input-row">
                    <input
                      className="promo-input"
                      type="text"
                      placeholder="Entrez votre code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button
                      className="promo-btn"
                      onClick={handlePromo}
                      disabled={promoApplied || !promoCode}
                    >
                      {promoApplied ? <i className="fa-solid fa-check"></i> : 'Appliquer'}
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="promo-success">
                      <i className="fa-solid fa-circle-check"></i> Code BOOKEASE10 appliqué (-10%)
                    </div>
                  )}
                </div>

                <div className="info-card">
                  <div className="info-card-title"><i className="fa-solid fa-circle-info"></i> Informations</div>
                  <ul className="info-list">
                    <li><i className="fa-solid fa-check"></i> Annulation gratuite 24h avant</li>
                    <li><i className="fa-solid fa-check"></i> Paiement sécurisé Stripe</li>
                    <li><i className="fa-solid fa-check"></i> Email de confirmation immédiat</li>
                    <li><i className="fa-solid fa-check"></i> Rappel SMS 24h avant</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="form-section-title">
              <i className="fa-solid fa-pen-to-square"></i> Vos informations
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nom complet *</label>
                <input
                  className={`form-input ${formErrors.name ? 'error' : ''}`}
                  type="text"
                  placeholder="Jean Dupont"
                  value={form.name}
                  onChange={e => handleForm('name', e.target.value)}
                />
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Téléphone *</label>
                <input
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={form.phone}
                  onChange={e => handleForm('phone', e.target.value)}
                />
                {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                type="email"
                placeholder="jean@exemple.fr"
                value={form.email}
                onChange={e => handleForm('email', e.target.value)}
              />
              {formErrors.email && <span className="form-error">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Notes (optionnel)</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Demandes spéciales, allergies, etc."
                rows={3}
                value={form.notes}
                onChange={e => handleForm('notes', e.target.value)}
              />
            </div>

            <button
              className="btn-stripe"
              disabled={paying}
              onClick={handlePay}
            >
              {paying ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <i className="fa-brands fa-stripe"></i>
                  Payer avec Stripe — {totalPrice} €
                </>
              )}
            </button>
            <div className="stripe-badge">
              <i className="fa-solid fa-lock"></i>
              Paiement sécurisé par Stripe
            </div>

            <div className="step-actions" style={{ marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={() => goStep(3)}>
                <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <div></div>
            </div>
          </div>
        )}

        {/* COMPLETED */}
        {completed && (
          <div className="step-panel completed-panel">
            <div className="completed-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 className="step-title" style={{ justifyContent: 'center' }}>
              Réservation confirmée !
            </h2>
            <p className="step-sub" style={{ textAlign: 'center', maxWidth: 420, margin: '0 auto 28px' }}>
              Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
              Vous recevrez un rappel 24h avant votre rendez-vous.
            </p>

            <div className="completed-timeline">
              <div className="timeline-item active">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Réservation confirmée</div>
                  <div className="timeline-desc">Paiement reçu</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Email envoyé</div>
                  <div className="timeline-desc">Confirmation à {form.email}</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Rappel SMS</div>
                  <div className="timeline-desc">24h avant le rendez-vous</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Votre visite</div>
                  <div className="timeline-desc">{formatFullDate()} — {selectedSlot}</div>
                </div>
              </div>
            </div>

            <div className="recap-card" style={{ marginBottom: 28 }}>
              <div className="recap-card-header">
                <i className="fa-solid fa-receipt"></i>
                <span>Récapitulatif</span>
              </div>
              <div className="recap-row">
                <div className="recap-label"><i className="fa-solid fa-bag-shopping"></i> Service</div>
                <div className="recap-value">{service?.name}</div>
              </div>
              <div className="recap-row">
                <div className="recap-label"><i className="fa-solid fa-user"></i> Coiffeur</div>
                <div className="recap-value">{coiffeur?.name}</div>
              </div>
              <div className="recap-row">
                <div className="recap-label"><i className="fa-regular fa-calendar"></i> Date & Heure</div>
                <div className="recap-value">{formatFullDate()} — {selectedSlot}</div>
              </div>
              <div className="recap-row">
                <div className="recap-label"><i className="fa-solid fa-location-dot"></i> Adresse</div>
                <div className="recap-value">42 Rue de la Paix, 75002 Paris</div>
              </div>
              <div className="recap-row">
                <div className="recap-label"><i className="fa-solid fa-receipt"></i> Référence</div>
                <div className="recap-value" style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>
                  #BK-{calYear}-{String(calMonth+1).padStart(2,'0')}{String(selectedDate).padStart(2,'0')}-{selectedSlot?.replace(':','')}
                </div>
              </div>
              <div className="recap-total">
                <span className="total-label">Montant payé</span>
                <span className="total-amount">{totalPrice} €</span>
              </div>
            </div>

            <div className="completed-actions">
              <button className="btn btn-primary" onClick={handleNewReservation}>
                <i className="fa-solid fa-plus"></i> Nouvelle réservation
              </button>
              <button className="btn btn-secondary" onClick={() => showToast('Lien de partage copié !', 'success')}>
                <i className="fa-solid fa-share-nodes"></i> Partager
              </button>
              <button className="btn btn-secondary" onClick={() => showToast('Ajouté au calendrier !', 'success')}>
                <i className="fa-solid fa-calendar-plus"></i> Ajouter au calendrier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
