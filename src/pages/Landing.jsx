import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const SERVICES = [
  { icon: 'fa-solid fa-scissors', name: 'Coupe Classique', duration: '30 min', price: 25, desc: 'Coupe homme ou femme avec finition au choix.' },
  { icon: 'fa-solid fa-user-tie', name: 'Coupe + Barbe', duration: '45 min', price: 38, desc: 'Coupe complète avec taille de barbe soignée.' },
  { icon: 'fa-solid fa-palette', name: 'Coloration', duration: '90 min', price: 65, desc: 'Coloration professionnelle avec produits premium.' },
  { icon: 'fa-solid fa-wind', name: 'Brushing', duration: '40 min', price: 30, desc: 'Mise en forme et coiffage professionnel.' },
  { icon: 'fa-solid fa-wand-magic-sparkles', name: 'Mécaniques', duration: '120 min', price: 85, desc: 'Mécaniques, ondulations, boucles naturelles.' },
  { icon: 'fa-solid fa-droplet', name: 'Soin Profond', duration: '50 min', price: 45, desc: 'Soin capillaire hydratant et réparateur.' },
]

const TEAM = [
  { name: 'Sarah Benali', role: 'Coiffeuse Senior', spec: 'Coupe & Coloration', rating: 5, experience: '8 ans', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop&crop=face', bio: 'Spécialiste des colorations modernes et des coupes tendance.' },
  { name: 'Thomas Moreau', role: 'Barbier Expert', spec: 'Homme & Barbe', rating: 4, experience: '6 ans', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop&crop=face', bio: 'Maître barbier, spécialiste des coupes classiques et modernes.' },
  { name: 'Léa Dubois', role: 'Coiffeuse Créative', spec: 'Mécaniques & Brushing', rating: 5, experience: '10 ans', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', bio: 'Experte en mécaniques et coiffages événementiels.' },
  { name: 'Karim Hadj', role: 'Coiffeur Talent', spec: 'Dégradé & Tresses', rating: 4, experience: '5 ans', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', bio: 'Spécialiste des dégradés et des tresses africaines.' },
]

const FAQ = [
  { q: 'Comment réserver un rendez-vous ?', a: 'Cliquez sur "Réserver maintenant", choisissez votre service, votre coiffeur, puis le créneau qui vous convient. C\'est simple et rapide !' },
  { q: 'Puis-je annuler ou modifier ma réservation ?', a: 'Oui, annulation gratuite jusqu\'à 24h avant le rendez-vous. Au-delà, 50% du service sera facturé.' },
  { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les cartes bancaires (Visa, Mastercard) via notre partenaire Stripe, ainsi que le paiement en espèces au salon.' },
  { q: 'Combien de temps avant dois-je arriver ?', a: 'Nous vous recommandons d\'arriver 5 minutes avant votre créneau pour un accueil serein.' },
  { q: 'Proposez-vous des services pour enfants ?', a: 'Oui, nous accueillons les enfants à partir de 5 ans avec des services adaptés et des tarifs préférentiels.' },
  { q: 'Comment puis-je laisser un avis ?', a: 'Après votre visite, vous recevrez un email vous invitant à laisser un avis. Vous pouvez aussi nous trouver sur Google.' },
]

const TESTIMONIALS = [
  { name: 'Camille M.', text: 'Super pratique ! J\'ai réservé mon rendez-vous en 30 secondes. Le salon m\'a envoyé un rappel la veille.', rating: 5 },
  { name: 'Youssef A.', text: 'Interface très intuitive. J\'ai pu choisir mon coiffeur et voir les créneaux disponibles en temps réel.', rating: 5 },
  { name: 'Inès T.', text: 'Le paiement en ligne m\'a fait gagner du temps. Plus besoin de retirer du cash. Je recommande !', rating: 4 },
  { name: 'Omar B.', text: 'Excellent service, ambiance top et résultat toujours impeccable. Merci Karim !', rating: 5 },
  { name: 'Sophie D.', text: 'La coloration de Sarah est parfaite. Je suis cliente fidèle depuis 2 ans.', rating: 5 },
  { name: 'Mehdi R.', text: 'Le meilleur salon du quartier. Les mécaniques de Léa sont un régal.', rating: 4 },
]

const SCHEDULE = [
  { day: 'Lundi', hours: '09:00 - 19:00' },
  { day: 'Mardi', hours: '09:00 - 19:00' },
  { day: 'Mercredi', hours: '09:00 - 19:00' },
  { day: 'Jeudi', hours: '09:00 - 20:00' },
  { day: 'Vendredi', hours: '09:00 - 20:00' },
  { day: 'Samedi', hours: '09:00 - 18:00' },
  { day: 'Dimanche', hours: 'Fermé' },
]

const SALONS = [
  {
    id: 1,
    name: 'BookEase Opéra',
    address: '42 Rue de la Paix, 75002 Paris',
    coords: { lat: 48.8698, lng: 2.3303 },
    status: 'habité',
    coiffeurs: ['Sarah Benali', 'Thomas Moreau', 'Léa Dubois', 'Karim Hadj'],
    phone: '01 42 00 00 00',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'BookEase Bastille (Non Habité)',
    address: '12 Rue de Lappe, 75011 Paris',
    coords: { lat: 48.8529, lng: 2.3732 },
    status: 'non habité',
    coiffeurs: [],
    phone: '01 45 00 00 01',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'BookEase Saint-Germain',
    address: '26 Rue du Four, 75006 Paris',
    coords: { lat: 48.8525, lng: 2.3331 },
    status: 'habité',
    coiffeurs: ['Sarah Benali', 'Thomas Moreau'],
    phone: '01 43 00 00 02',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'BookEase Montmartre',
    address: '85 Rue Lepic, 75018 Paris',
    coords: { lat: 48.8872, lng: 2.3353 },
    status: 'habité',
    coiffeurs: ['Léa Dubois', 'Karim Hadj'],
    phone: '01 48 00 00 03',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'BookEase Rabat Souissi',
    address: '54 Avenue Mehdi Ben Barka, Rabat Souissi',
    coords: { lat: 33.9782, lng: -6.8285 },
    status: 'habité',
    coiffeurs: ['Karim Hadj'],
    phone: '+212 537 00 00 00',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  }
]

export default function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const [userLocation, setUserLocation] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [simulatedName, setSimulatedName] = useState('')

  const detectLocation = () => {
    setLoadingLocation(true)
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError("Géolocalisation non supportée par votre navigateur.")
      setLoadingLocation(false)
      setUserLocation({ lat: 48.8606, lng: 2.3376 })
      setSimulatedName('Paris Centre (défaut)')
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setSimulatedName('Ma position réelle')
        setLoadingLocation(false)
      },
      (error) => {
        let msg = "Accès à la position refusé."
        if (error.code === error.TIMEOUT) msg = "Délai d'attente dépassé."
        setLocationError(`${msg} Utilisation d'une position par défaut.`)
        setUserLocation({ lat: 48.8606, lng: 2.3376 }) // Default to Paris Centre
        setSimulatedName('Paris Centre (défaut)')
        setLoadingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }

  useEffect(() => {
    detectLocation()
  }, [])

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const activeSalons = useMemo(() => SALONS.filter(s => s.status === 'habité'), [])

  const salonsWithDistance = useMemo(() => {
    if (!userLocation) return []
    return activeSalons
      .map(salon => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          salon.coords.lat,
          salon.coords.lng
        )
        return { ...salon, distance }
      })
      .sort((a, b) => a.distance - b.distance)
  }, [userLocation, activeSalons])

  const nearestSalon = salonsWithDistance[0]

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i)
  }

  const today = new Date().getDay()
  const dayIndex = today === 0 ? 6 : today - 1

  return (
    <div className="landing">
      {/* HERO — Newspaper / Paper Style */}
      <section className="hero">
        {/* Paper texture background */}
        <div className="hero-paper-bg"></div>
        
        {/* Torn paper edge top */}
        <div className="torn-edge-top"></div>

        {/* Newspaper masthead */}
        <div className="hero-masthead">
          <div className="masthead-date">Paris, le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div className="masthead-line"></div>
          <div className="masthead-title">LE BOOKEASE</div>
          <div className="masthead-subtitle">Journal du salon de coiffure</div>
          <div className="masthead-line"></div>
        </div>

        {/* Hero main content — 3 column newspaper layout */}
        <div className="hero-newspaper">
          
          {/* Left column — Main headline */}
          <div className="hero-col-left">
            <div className="newspaper-block headline-block">
              <h1 className="hero-headline">
                Votre salon
                <span className="headline-highlight">réservé</span>
                en un clic.
              </h1>
              <div className="headline-underline"></div>
            </div>

            <div className="newspaper-block">
              <p className="hero-lead">
                BookEase simplifie la gestion de vos rendez-vous. 
                <span className="text-highlight">Réservez, gérez et payez en ligne</span> — 
                tout est pensé pour vous.
              </p>
            </div>

            <div className="newspaper-block actions-block">
              <div className="tape-strip tape-tilted-left">
                <button className="btn-newspaper btn-primary-news" onClick={() => navigate('/booking')}>
                  <i className="fa-solid fa-calendar-plus"></i> Réserver maintenant
                </button>
              </div>
              <button className="btn-newspaper btn-outline-news" onClick={() => navigate('/dashboard')}>
                <i className="fa-solid fa-chart-line"></i> Dashboard
              </button>
            </div>

            {/* Handwritten annotation */}
            <div className="hand-note hero-hand-note">
              <span className="hand-arrow"><i className="fa-solid fa-arrow-right"></i></span> c'est gratuit !
            </div>

            {/* Nearest Salon Section */}
            <div className="newspaper-block nearest-salon-block">
              <h3 className="nearest-salon-title">
                <span className="nearest-salon-icon">📍</span> LE SALON LE PLUS PROCHE :
              </h3>
              
              {loadingLocation ? (
                <div className="nearest-salon-loading">
                  <span className="loading-spinner"><i className="fa-solid fa-spinner fa-spin"></i></span>
                  <span className="loading-text">Recherche du salon le plus proche...</span>
                </div>
              ) : nearestSalon ? (
                <div className="nearest-salon-card">
                  <div className="nearest-salon-name-wrap">
                    <h4 className="nearest-salon-name">{nearestSalon.name}</h4>
                    <span className="nearest-salon-status"><i className="fa-solid fa-users"></i> habité</span>
                  </div>
                  
                  <div className="nearest-salon-distance">
                    <i className="fa-solid fa-route"></i> à <strong>{nearestSalon.distance.toFixed(1)} km</strong> de votre position ({simulatedName})
                  </div>
                  
                  <p className="nearest-salon-address"><i className="fa-solid fa-location-dot"></i> {nearestSalon.address}</p>
                  <p className="nearest-salon-phone"><i className="fa-solid fa-phone"></i> {nearestSalon.phone}</p>
                  <p className="nearest-salon-staff"><i className="fa-solid fa-scissors"></i> Coiffeurs : {nearestSalon.coiffeurs.join(', ')}</p>
                  
                  <button 
                    className="btn-newspaper btn-salon-booking" 
                    onClick={() => navigate('/booking', { state: { salonId: nearestSalon.id } })}
                  >
                    Réserver dans ce salon
                  </button>
                </div>
              ) : (
                <div className="nearest-salon-error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>Aucun salon actif trouvé à proximité.</span>
                </div>
              )}

              {/* Simulation panel */}
              <div className="salon-simulator">
                <span className="simulator-label">Simuler une autre position :</span>
                <div className="simulator-buttons">
                  <button 
                    className={`sim-btn ${simulatedName === 'Ma position réelle' ? 'active' : ''}`}
                    onClick={detectLocation}
                    disabled={loadingLocation}
                  >
                    📡 Réelle
                  </button>
                  <button 
                    className={`sim-btn ${simulatedName === 'Opéra' ? 'active' : ''}`}
                    onClick={() => {
                      setUserLocation({ lat: 48.8698, lng: 2.3303 })
                      setSimulatedName('Opéra')
                    }}
                  >
                    🗼 Opéra
                  </button>
                  <button 
                    className={`sim-btn ${simulatedName === 'Rabat Souissi' ? 'active' : ''}`}
                    onClick={() => {
                      setUserLocation({ lat: 33.9782, lng: -6.8285 })
                      setSimulatedName('Rabat Souissi')
                    }}
                  >
                    🇲🇦 Rabat
                  </button>
                  <button 
                    className={`sim-btn ${simulatedName === 'St-Germain' ? 'active' : ''}`}
                    onClick={() => {
                      setUserLocation({ lat: 48.8525, lng: 2.3331 })
                      setSimulatedName('St-Germain')
                    }}
                  >
                    🍷 St-Germain
                  </button>
                </div>
                {locationError && (
                  <p className="simulator-error-msg">
                    <i className="fa-solid fa-triangle-exclamation"></i> {locationError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Center column — Phone mockup */}
          <div className="hero-col-center">
            <div className="phone-newspaper">
              <div className="tape-top"></div>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="phone-header">
                    <i className="fa-solid fa-scissors"></i>
                    <span>BookEase</span>
                  </div>
                  <div className="phone-card">
                    <div className="phone-card-title">Prochain RDV</div>
                    <div className="phone-card-service">Coupe + Brushing</div>
                    <div className="phone-card-date">Sam. 28 Juin — 11:00</div>
                    <div className="phone-card-barber">
                      <div className="phone-avatar"></div>
                      Sarah Benali
                    </div>
                  </div>
                  <div className="phone-card small">
                    <div className="phone-card-row">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>42 Rue de la Paix</span>
                    </div>
                    <div className="phone-card-row">
                      <i className="fa-solid fa-euro-sign"></i>
                      <span>38 €</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sticky note on phone */}
              <div className="sticky-note-phone">
                <span className="sticky-text">facile, non ?</span>
                <div className="sticky-tape"></div>
              </div>
            </div>
          </div>

          {/* Right column — Stats & extras */}
          <div className="hero-col-right">
            <div className="newspaper-block stats-block">
              <div className="stats-headline">EN CHIFFRES</div>
              <div className="stat-item">
                <div className="stat-number">2,400+</div>
                <div className="stat-label">Clients satisfaits</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">15,000+</div>
                <div className="stat-label">RDV gérés</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Note moyenne</div>
              </div>
            </div>

            <div className="newspaper-block quote-block">
              <div className="quote-mark">"</div>
              <p className="quote-text">Super pratique ! J'ai réservé en 30 secondes.</p>
              <div className="quote-author">— Camille M.</div>
            </div>

            {/* Yellow highlight badge */}
            <div className="highlight-badge">
              <span><i className="fa-solid fa-star"></i> Top salon Paris</span>
            </div>
          </div>
        </div>

        {/* Bottom handwritten strip */}
        <div className="hero-bottom-strip">
          <span className="strip-text">✦ ouvert du lundi au samedi ✦ 42 rue de la paix, paris ✦</span>
        </div>

        {/* Torn paper edge bottom */}
        <div className="torn-edge-bottom"></div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <span className="section-tag">À propos</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              UN SALON<br />
              <span className="accent">d'exception depuis 2015.</span>
            </h2>
            <p className="about-desc">
              Situé au cœur de Paris, le salon BookEase est un espace dédié à votre beauté et à votre bien-être.
              Notre équipe de professionnels passionnés vous offre des services de coiffure haut de gamme
              dans un cadre chaleureux et moderne.
            </p>
            <p className="about-desc">
              Nous utilisons exclusivement des produits de qualité professionnelle, respectueux de vos cheveux
              et de l'environnement. Chaque visite est une expérience unique, pensée pour sublimer votre style.
            </p>
            <div className="about-values">
              <div className="about-value">
                <i className="fa-solid fa-heart"></i>
                <span>Passion</span>
              </div>
              <div className="about-value">
                <i className="fa-solid fa-gem"></i>
                <span>Qualité</span>
              </div>
              <div className="about-value">
                <i className="fa-solid fa-leaf"></i>
                <span>Éco-responsable</span>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-img-stack">
              <div className="about-img-card">
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop" alt="Salon" />
                <span className="about-img-label">Notre espace</span>
              </div>
              <div className="about-img-card offset">
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop" alt="Coiffure" />
                <span className="about-img-label">Nos créations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — Notebook / Checklist Style */}
      <section className="services-section">
        {/* Paper texture */}
        <div className="services-paper-bg"></div>

        {/* Notebook holes on left */}
        <div className="notebook-holes">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>

        {/* Red margin line */}
        <div className="margin-line"></div>

        <div className="services-content">
          {/* Header */}
          <div className="services-header">
            <div className="services-title-area">
                <span className="notebook-tab"><i className="fa-solid fa-scissors"></i> MENU</span>
              <h2 className="services-title">
                Nos Services
              </h2>
              <p className="services-subtitle">
                Des soins adaptés <span className="hand-underline-css">à chaque besoin.</span>
              </p>
            </div>
            {/* Handwritten note top right */}
            <div className="services-note">
              <span className="note-pin">📌</span>
              <span className="note-text">réservez maintenant !</span>
            </div>
          </div>

          {/* Services as notebook list */}
          <div className="services-list">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-row">
                <div className="service-row-left">
                  <div className="service-check">
                    <span className="check-mark">✓</span>
                  </div>
                  <div className="service-row-icon">
                    <i className={s.icon}></i>
                  </div>
                </div>
                <div className="service-row-center">
                  <div className="service-row-header">
                    <h3 className="service-row-name">{s.name}</h3>
                    {i === 1 && <span className="popular-tag"><i className="fa-solid fa-fire"></i> populaire</span>}
                    {i === 2 && <span className="new-tag">nouveau</span>}
                  </div>
                  <p className="service-row-desc">{s.desc}</p>
                </div>
                <div className="service-row-right">
                  <span className="service-row-duration">
                    <i className="fa-regular fa-clock"></i> {s.duration}
                  </span>
                  <span className="service-row-price">{s.price} €</span>
                </div>
                {/* Doodle underline */}
                <div className="service-doodle-line"></div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="services-footer-note">
            <span className="footer-arrow">↓</span>
            <span className="footer-text">tous nos prix sont nets, sans surprise</span>
            <span className="footer-check">✓</span>
          </div>
        </div>

        {/* Coffee stain decoration */}
        <div className="coffee-stain-deco"></div>

        {/* Scattered doodles */}
        <span className="doodle-star" style={{ top: '15%', right: '8%', transform: 'rotate(15deg)' }}>✦</span>
        <span className="doodle-star" style={{ bottom: '20%', left: '5%', transform: 'rotate(-10deg)' }}>✧</span>
      </section>

      {/* TEAM — Polaroid / Scrapbook Style */}
      <section className="team-section">
        {/* Cork board texture */}
        <div className="cork-bg"></div>

        {/* Push pins decoration */}
        <div className="push-pin" style={{ top: '60px', left: '15%' }}></div>
        <div className="push-pin" style={{ top: '80px', right: '20%' }}></div>
        <div className="push-pin" style={{ bottom: '100px', left: '25%' }}></div>

        {/* String lights */}
        <div className="string-lights">
          <div className="light-bulb"></div>
          <div className="light-bulb"></div>
          <div className="light-bulb"></div>
          <div className="light-bulb"></div>
          <div className="light-bulb"></div>
        </div>

        <div className="team-content">
          {/* Header */}
          <div className="team-header">
            <div className="team-title-area">
              <span className="tape-label">NOTRE ÉQUIPE</span>
              <h2 className="team-title">
                Des professionnels
                <span className="team-title-accent">passionnés.</span>
              </h2>
            </div>
            <div className="team-hand-note">
              <span className="note-arrow">←</span>
              <span>rencontrer l'équipe !</span>
            </div>
          </div>

          {/* Polaroid grid */}
          <div className="polaroid-grid">
            {TEAM.map((t, i) => (
              <div key={i} className={`polaroid-card polaroid-${i}`}>
                {/* Tape on top */}
                <div className={`polaroid-tape tape-${i}`}></div>
                
                {/* Photo */}
                <div className="polaroid-photo-wrap">
                  <img className="polaroid-photo" src={t.img} alt={t.name} />
                  {/* Handwritten rating */}
                  <div className="polaroid-rating">
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className={`fa-${s <= t.rating ? 'solid' : 'regular'} fa-star`}></i>
                    ))}
                  </div>
                </div>
                
                {/* Caption area */}
                <div className="polaroid-caption">
                  <div className="polaroid-name">{t.name}</div>
                  <div className="polaroid-role">{t.role}</div>
                </div>

                {/* Info card below */}
                <div className="polaroid-info">
                  <div className="polaroid-spec">{t.spec}</div>
                  <p className="polaroid-bio">{t.bio}</p>
                  <div className="polaroid-exp">
                    <span className="exp-badge">{t.experience}</span>
                  </div>
                  <button className="btn-polaroid" onClick={() => navigate('/booking')}>
                    Réserver <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

                {/* Handwritten note on some cards */}
                {i === 0 && (
                  <div className="card-note" style={{ top: '-12px', right: '-8px', transform: 'rotate(8deg)' }}>
                    la meilleure !
                  </div>
                )}
                {i === 2 && (
                  <div className="card-note" style={{ bottom: '80px', left: '-12px', transform: 'rotate(-6deg)' }}>
                    10 ans d'exp !
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom scribble */}
          <div className="team-scribble">
            <span className="scribble-line">~~~~~~~~~~</span>
            <span className="scribble-text">une équipe qui vous accueille avec le sourire</span>
            <span className="scribble-line">~~~~~~~~~~</span>
          </div>
        </div>
      </section>

      {/* SCHEDULE — Chalkboard Style */}
      <section className="schedule-section">
        {/* Chalk dust texture */}
        <div className="chalk-dust"></div>

        {/* Chalk scribbles decoration */}
        <div className="chalk-scribble" style={{ top: '40px', left: '5%' }}></div>
        <div className="chalk-scribble" style={{ bottom: '60px', right: '8%' }}></div>

        <div className="schedule-content">
          {/* Header */}
          <div className="schedule-header">
            <div className="chalk-title-wrap">
              <span className="chalk-subtitle">nos horaires</span>
              <h2 className="chalk-title">
                Quand nous
                <span className="chalk-accent"> trouver ?</span>
              </h2>
              <div className="chalk-underline"></div>
            </div>
            <div className="chalk-note">
              <span className="chalk-note-icon"><i className="fa-solid fa-pencil"></i></span>
              <span className="chalk-note-text">ouvert du lundi au samedi</span>
            </div>
          </div>

          {/* Main content */}
          <div className="schedule-board">
            {/* Left: Calendar */}
            <div className="chalk-calendar">
              <div className="calendar-header">
                <span className="calendar-month">
                  <span className="month-arrow"><i className="fa-solid fa-chevron-left"></i></span>
                  {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  <span className="month-arrow"><i className="fa-solid fa-chevron-right"></i></span>
                </span>
              </div>
              
              <div className="calendar-grid">
                {SCHEDULE.map((s, i) => (
                  <div key={i} className={`calendar-day ${i === dayIndex ? 'is-today' : ''} ${s.hours === 'Fermé' ? 'is-closed' : ''}`}>
                    <div className="day-name">{s.day.slice(0, 3)}</div>
                    <div className="day-number">{10 + i}</div>
                    <div className="day-hours">{s.hours === 'Fermé' ? '✕' : s.hours.split(' - ')[0]}</div>
                    {i === dayIndex && <div className="today-marker">aujourd'hui</div>}
                  </div>
                ))}
              </div>

              {/* Today highlight */}
              <div className="today-highlight">
                <div className="today-label">Aujourd'hui</div>
                <div className="today-value">
                  {SCHEDULE[dayIndex].hours === 'Fermé' ? 'Fermé' : SCHEDULE[dayIndex].hours}
                </div>
                {SCHEDULE[dayIndex].hours !== 'Fermé' && (
                  <div className="today-note"><i className="fa-solid fa-arrow-right"></i> venez nous voir !</div>
                )}
              </div>
            </div>

            {/* Right: Contact info */}
            <div className="chalk-contact">
              <div className="contact-header">
                <span className="contact-title">Nous trouver</span>
                <span className="contact-doodle">~</span>
              </div>

              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Adresse</div>
                    <div className="contact-value">42 Rue de la Paix, 75002 Paris</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Téléphone</div>
                    <div className="contact-value">01 42 00 00 00</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">contact@bookease.fr</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-train"></i>
                  </div>
                  <div className="contact-info">
                    <div className="contact-label">Accès</div>
                    <div className="contact-value">Métro Opéra (L3, L7, L8)</div>
                  </div>
                </div>
              </div>

              {/* Map hint */}
              <div className="chalk-map-hint">
                <span className="map-pin"><i className="fa-solid fa-location-dot"></i></span>
                <span className="map-text">à 2 min de la station</span>
              </div>
            </div>
          </div>

          {/* Bottom doodle */}
          <div className="schedule-bottom">
            <span className="doodle-wave"><i className="fa-solid fa-wave-square"></i></span>
            <span className="bottom-text">nous vous attendons avec impatience !</span>
            <span className="doodle-heart"><i className="fa-solid fa-heart"></i></span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Post-it / Wall of Love */}
      <section className="testimonials-section">
        {/* Wall texture */}
        <div className="wall-texture"></div>

        {/* Decorative pins */}
        <div className="wall-pin" style={{ top: '50px', left: '10%' }}></div>
        <div className="wall-pin" style={{ top: '70px', right: '15%' }}></div>
        <div className="wall-pin" style={{ bottom: '80px', left: '20%' }}></div>

        {/* String decorations */}
        <div className="photo-string" style={{ top: '30px', left: '5%', width: '90%' }}></div>

        <div className="testimonials-content">
          {/* Header */}
          <div className="testimonials-header">
            <div className="testimonials-title-area">
              <span className="tape-label-dark">AVIS CLIENTS</span>
              <h2 className="testimonials-title">
                Ce que disent
                <span className="testimonials-accent"> nos clients.</span>
              </h2>
            </div>
            <div className="testimonials-badge">
              <span className="badge-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="badge-text">4.9/5 sur Google</span>
            </div>
          </div>

          {/* Post-it grid */}
          <div className="postit-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`postit-card postit-color-${i % 4}`}>
                {/* Pin on top */}
                <div className={`postit-pin pin-${i % 3}`}></div>
                
                {/* Quote mark */}
                <div className="postit-quote">"</div>
                
                {/* Stars */}
                <div className="postit-stars">
                  {[1,2,3,4,5].map(s => (
                    <i key={s} className={`fa-${s <= t.rating ? 'solid' : 'regular'} fa-star`}></i>
                  ))}
                </div>
                
                {/* Text */}
                <p className="postit-text">{t.text}</p>
                
                {/* Author */}
                <div className="postit-author">
                  <div className="postit-avatar">{t.name[0]}</div>
                  <div className="postit-author-info">
                    <span className="postit-name">{t.name}</span>
                    <span className="postit-source">via Google</span>
                  </div>
                </div>

                {/* Tape effect */}
                <div className={`postit-tape tape-pos-${i % 4}`}></div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="testimonials-bottom">
            <div className="love-meter">
              <span className="love-label">Niveau d'amour client</span>
              <div className="love-bar">
                <div className="love-fill" style={{ width: '98%' }}></div>
              </div>
              <span className="love-percent">98%</span>
            </div>
            <div className="testimonials-note">
              <span className="note-hand"><i className="fa-solid fa-heart"></i></span>
              <span className="note-text">merci pour votre confiance !</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Carnet de notes / Notepad */}
      <section className="faq-section">
        {/* Notebook background */}
        <div className="notebook-bg"></div>

        <div className="faq-content">
          {/* Header */}
          <div className="faq-header">
            <div className="notebook-tab">FAQ</div>
            <div className="faq-title-area">
              <h2 className="faq-title">
                Questions
                <span className="faq-accent"> fréquentes.</span>
              </h2>
              <p className="faq-subtitle">on répond à tout !</p>
            </div>
            {/* Handwritten note */}
            <div className="faq-scribble">
              <span className="scribble-text">besoin d'aide ?</span>
              <svg className="scribble-arrow" viewBox="0 0 60 30" fill="none">
                <path d="M5 15 Q 20 5, 40 18 Q 45 22, 55 12" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M48 8 L 55 12 L 48 16" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Notepad items */}
          <div className="notepad-list">
            {FAQ.map((f, i) => (
              <div key={i} className={`notepad-item ${openFaq === i ? 'open' : ''}`}>
                {/* Checkbox style */}
                <button className="notepad-question" onClick={() => toggleFaq(i)}>
                  <div className="notepad-checkbox">
                    <div className="checkbox-tick">
                      {openFaq === i && (
                        <svg viewBox="0 0 24 24" fill="none" className="tick-svg">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="notepad-q-text">{f.q}</span>
                  <div className={`notepad-arrow ${openFaq === i ? 'rotated' : ''}`}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="notepad-answer">
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="faq-bottom">
            <div className="faq-bottom-note">
              <span className="note-icon"><i className="fa-solid fa-pencil"></i></span>
              <span className="note-text-hand">encore des questions ? écrivez-nous !</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Invitation / Papier déchiré */}
      <section className="cta-section">
        {/* Torn paper top edge */}
        <div className="cta-tear-top"></div>

        {/* Doodles */}
        <svg className="cta-doodle cta-doodle-1" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4"/>
        </svg>
        <svg className="cta-doodle cta-doodle-2" viewBox="0 0 80 80" fill="none">
          <path d="M10 40 Q 40 10, 70 40 Q 40 70, 10 40" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Stamp effect */}
        <div className="cta-stamp">
          <div className="stamp-inner">
            <span className="stamp-text">BOOK</span>
            <span className="stamp-sub">EASE</span>
            <span className="stamp-year">2026</span>
          </div>
        </div>

        {/* Handwritten annotation */}
        <div className="cta-scribble-top">
          <span className="scribble-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
          <span>dernière chance !</span>
        </div>

        {/* Main content */}
        <div className="cta-content">
          <div className="cta-label">
            <span className="label-line"></span>
            <span className="label-text">OFFRE LIMITÉE</span>
            <span className="label-line"></span>
          </div>
          <h2 className="cta-title">
            Prêt à simplifier<br />
            <span className="cta-title-accent">votre salon ?</span>
          </h2>
          <p className="cta-sub">
            Rejoignez des milliers de salons qui font déjà confiance à BookEase.
          </p>
          <div className="cta-actions">
            <button className="cta-btn cta-btn-primary" onClick={() => navigate('/booking')}>
              <span className="btn-icon"><i className="fa-solid fa-rocket"></i></span>
              <span className="btn-content">
                <span className="btn-main">Commencer maintenant</span>
                <span className="btn-sub">c'est gratuit</span>
              </span>
            </button>
            <button className="cta-btn cta-btn-secondary" onClick={() => navigate('/email')}>
              <span className="btn-icon"><i className="fa-solid fa-envelope"></i></span>
              <span className="btn-content">
                <span className="btn-main">Voir l'email</span>
                <span className="btn-sub">démo gratuite</span>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom doodle */}
        <div className="cta-bottom-note">
          <svg className="cta-heart" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="cta-bottom-text">merci de votre confiance !</span>
        </div>

        {/* Torn paper bottom edge */}
        <div className="cta-tear-bottom"></div>
      </section>

      {/* FOOTER — Carte Postale */}
      <footer className="landing-footer">
        {/* Torn paper top edge */}
        <div className="footer-tear-top"></div>

        {/* Stamp */}
        <div className="footer-stamp">
          <div className="footer-stamp-inner">
            <span className="footer-stamp-text">BOOK</span>
            <span className="footer-stamp-sub">EASE</span>
            <span className="footer-stamp-year">2026</span>
          </div>
        </div>

        <div className="footer-content">
          {/* Main grid */}
          <div className="footer-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/image.png" alt="BookEase" className="footer-logo-img" />
                <span className="footer-logo-text">BookEase</span>
              </div>
              <p className="footer-tagline">La réservation de salon, simplifiée.</p>
              <div className="footer-socials">
                <a href="#" className="footer-social" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="footer-social" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="footer-social" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="footer-social" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              </div>
              {/* Handwritten note */}
              <div className="footer-handnote">
                <span className="handnote-arrow"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="handnote-text">merci de nous faire confiance !</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-col">
              <div className="footer-col-header">
                <span className="footer-col-dash">—</span>
                <h4 className="footer-col-title">Navigation</h4>
              </div>
              <button className="footer-link" onClick={() => navigate('/')}>
                <span className="link-bullet">•</span> Accueil
              </button>
              <button className="footer-link" onClick={() => navigate('/booking')}>
                <span className="link-bullet">•</span> Réservation
              </button>
              <button className="footer-link" onClick={() => navigate('/dashboard')}>
                <span className="link-bullet">•</span> Dashboard
              </button>
              <button className="footer-link" onClick={() => navigate('/email')}>
                <span className="link-bullet">•</span> Email
              </button>
            </div>

            {/* Services */}
            <div className="footer-col">
              <div className="footer-col-header">
                <span className="footer-col-dash">—</span>
                <h4 className="footer-col-title">Services</h4>
              </div>
              <span className="footer-text-item">Coupe Classique <span className="footer-price">25 €</span></span>
              <span className="footer-text-item">Coupe + Barbe <span className="footer-price">38 €</span></span>
              <span className="footer-text-item">Coloration <span className="footer-price">65 €</span></span>
              <span className="footer-text-item">Brushing <span className="footer-price">30 €</span></span>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <div className="footer-col-header">
                <span className="footer-col-dash">—</span>
                <h4 className="footer-col-title">Contact</h4>
              </div>
              <div className="footer-contact-item">
                <span className="contact-emoji"><i className="fa-solid fa-location-dot"></i></span>
                <span>42 Rue de la Paix, 75002</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-emoji"><i className="fa-solid fa-phone"></i></span>
                <span>01 42 00 00 00</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-emoji"><i className="fa-solid fa-envelope"></i></span>
                <span>contact@bookease.fr</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copyright">© 2026 BookEase — tous droits réservés</span>
            <div className="footer-bottom-links">
              <a href="#">Mentions légales</a>
              <span className="footer-dot">·</span>
              <a href="#">Confidentialité</a>
              <span className="footer-dot">·</span>
              <a href="#">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
