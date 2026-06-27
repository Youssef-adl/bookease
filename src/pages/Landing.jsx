import { useState } from 'react'
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

export default function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i)
  }

  const today = new Date().getDay()
  const dayIndex = today === 0 ? 6 : today - 1

  return (
    <div className="landing">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-circle c1"></div>
          <div className="hero-circle c2"></div>
          <div className="hero-circle c3"></div>
        </div>
        <div className="hero-content">
          <span className="hero-badge">
            <i className="fa-solid fa-scissors"></i> Salon de coiffure
          </span>
          <h1 className="hero-title">
            Votre salon,<br />
            <span className="script" style={{ color: 'var(--primary)', fontSize: '1.1em' }}>réservé en un clic.</span>
          </h1>
          <p className="hero-sub">
            BookEase simplifie la gestion de vos rendez-vous. Réservez, gérez et payez en ligne — tout est pensé pour vous.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/booking')}>
              <i className="fa-solid fa-calendar-plus"></i> Réserver maintenant
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/dashboard')}>
              <i className="fa-solid fa-chart-line"></i> Voir le dashboard
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">2,400+</div>
              <div className="hero-stat-label">Clients satisfaits</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <div className="hero-stat-num">15,000+</div>
              <div className="hero-stat-label">Rendez-vous gérés</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <div className="hero-stat-num">4.9/5</div>
              <div className="hero-stat-label">Note moyenne</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-phone">
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
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <span className="section-tag">À propos</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Un salon d'exception<br />
              <span className="script" style={{ color: 'var(--primary)' }}>depuis 2015.</span>
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

      {/* SERVICES */}
      <section className="services-section">
        <div className="section-header">
          <span className="section-tag">Nos Services</span>
          <h2 className="section-title">
            Des soins adaptés<br />
            <span className="script" style={{ color: 'var(--primary)' }}>à chaque besoin.</span>
          </h2>
          <p className="section-sub">Découvrez notre gamme complète de services de coiffure professionnelle.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">
                <i className={s.icon}></i>
              </div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-footer">
                <span className="service-duration">
                  <i className="fa-regular fa-clock"></i> {s.duration}
                </span>
                <span className="service-price">{s.price} €</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <div className="section-header">
          <span className="section-tag">Notre Équipe</span>
          <h2 className="section-title">
            Des professionnels<br />
            <span className="script" style={{ color: 'var(--primary)' }}>passionnés.</span>
          </h2>
        </div>
        <div className="team-grid">
          {TEAM.map((t, i) => (
            <div key={i} className="team-card">
              <div className="team-img-wrap">
                <img className="team-img" src={t.img} alt={t.name} />
                <div className="team-rating">
                  {[1,2,3,4,5].map(s => (
                    <i key={s} className={`fa-${s <= t.rating ? 'solid' : 'regular'} fa-star`}></i>
                  ))}
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{t.name}</h3>
                <div className="team-role">{t.role}</div>
                <div className="team-spec">{t.spec}</div>
                <p className="team-bio">{t.bio}</p>
                <div className="team-exp">
                  <i className="fa-solid fa-briefcase"></i> {t.experience} d'expérience
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/booking')}>
                Réserver
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="schedule-section">
        <div className="section-header">
          <span className="section-tag">Horaires</span>
          <h2 className="section-title">
            Quand nous<br />
            <span className="script" style={{ color: 'var(--primary)' }}>trouver ?</span>
          </h2>
        </div>
        <div className="schedule-card">
          <div className="schedule-list">
            {SCHEDULE.map((s, i) => (
              <div key={i} className={`schedule-row ${i === dayIndex ? 'today' : ''}`}>
                <div className="schedule-day">
                  {i === dayIndex && <span className="today-dot"></span>}
                  {s.day}
                </div>
                <div className={`schedule-hours ${s.hours === 'Fermé' ? 'closed' : ''}`}>
                  {s.hours}
                </div>
              </div>
            ))}
          </div>
          <div className="schedule-contact">
            <div className="schedule-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <div className="schedule-contact-label">Adresse</div>
                <div className="schedule-contact-value">42 Rue de la Paix, 75002 Paris</div>
              </div>
            </div>
            <div className="schedule-contact-item">
              <i className="fa-solid fa-phone"></i>
              <div>
                <div className="schedule-contact-label">Téléphone</div>
                <div className="schedule-contact-value">01 42 00 00 00</div>
              </div>
            </div>
            <div className="schedule-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <div className="schedule-contact-label">Email</div>
                <div className="schedule-contact-value">contact@bookease.fr</div>
              </div>
            </div>
            <div className="schedule-contact-item">
              <i className="fa-solid fa-train"></i>
              <div>
                <div className="schedule-contact-label">Accès</div>
                <div className="schedule-contact-value">Métro Opéra (L3, L7, L8)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">Témoignages</span>
          <h2 className="section-title">
            Ce que disent<br />
            <span className="script" style={{ color: 'var(--primary)' }}>nos clients.</span>
          </h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(s => (
                  <i key={s} className={`fa-${s <= t.rating ? 'solid' : 'regular'} fa-star`}></i>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <span>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">
            Questions<br />
            <span className="script" style={{ color: 'var(--primary)' }}>fréquentes.</span>
          </h2>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(i)}>
                <span>{f.q}</span>
                <i className={`fa-solid fa-chevron-${openFaq === i ? 'up' : 'down'}`}></i>
              </button>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Prêt à simplifier votre salon ?
          </h2>
          <p className="cta-sub">
            Rejoignez des milliers de salons qui font déjà confiance à BookEase.
          </p>
          <div className="cta-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/booking')}>
              <i className="fa-solid fa-rocket"></i> Commencer maintenant
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/email')}>
              <i className="fa-solid fa-envelope"></i> Voir l'email
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fa-solid fa-scissors"></i>
              <span>BookEase</span>
            </div>
            <p className="footer-tagline">La réservation de salon, simplifiée.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="footer-social"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="footer-social"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="footer-social"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <button className="footer-link" onClick={() => navigate('/')}>Accueil</button>
            <button className="footer-link" onClick={() => navigate('/booking')}>Réservation</button>
            <button className="footer-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="footer-link" onClick={() => navigate('/email')}>Email</button>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <span className="footer-text-item">Coupe Classique — 25 €</span>
            <span className="footer-text-item">Coupe + Barbe — 38 €</span>
            <span className="footer-text-item">Coloration — 65 €</span>
            <span className="footer-text-item">Brushing — 30 €</span>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <span className="footer-text-item"><i className="fa-solid fa-location-dot"></i> 42 Rue de la Paix, 75002</span>
            <span className="footer-text-item"><i className="fa-solid fa-phone"></i> 01 42 00 00 00</span>
            <span className="footer-text-item"><i className="fa-solid fa-envelope"></i> contact@bookease.fr</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BookEase. Tous droits réservés.</span>
          <div className="footer-bottom-links">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
