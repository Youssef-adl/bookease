import { useState } from 'react'
import './EmailPreview.css'

export default function EmailPreview() {
  const [toast, setToast] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleViewReservation = () => setShowViewModal(true)
  const handleCancelClick = () => setShowCancelModal(true)
  const handleConfirmCancel = () => {
    setShowCancelModal(false)
    showToast('Réservation annulée avec succès', 'warning')
  }
  const handleContactSalon = () => {
    window.open('tel:+33142000000', '_self')
    showToast('Ouverture du téléphone...', 'info')
  }
  const handleGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/42+Rue+de+la+Paix+75002+Paris', '_blank')
  }
  const handleSocial = (platform) => {
    const urls = {
      twitter: 'https://twitter.com/bookease',
      instagram: 'https://instagram.com/bookease',
      facebook: 'https://facebook.com/bookease',
      tiktok: 'https://tiktok.com/@bookease',
    }
    window.open(urls[platform], '_blank')
    showToast(`Ouverture de ${platform}...`, 'info')
  }
  const handleManageNotifications = () => showToast('Gestion des notifications ouverte', 'success')
  const handlePrivacyPolicy = () => showToast('Politique de confidentialité ouverte', 'success')

  return (
    <div className="em-page">
      {toast && (
        <div className={`em-toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : toast.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}`}></i>
          {toast.msg}
        </div>
      )}

      <div className="em-label">
        <i className="fa-solid fa-eye"></i>
        Aperçu du template email
      </div>

      <div className="em-wrapper">
        {/* HEADER */}
        <div className="em-header">
          <div className="em-header-bg"></div>
          <img src="/image.png" alt="BookEase" className="em-logo" />
          <div className="em-badge">
            <i className="fa-solid fa-circle-check"></i>
            Réservation confirmée
          </div>
        </div>

        {/* BODY */}
        <div className="em-body">
          <p className="em-greeting">
            <span className="em-greeting-script">Bienvenue !</span>
            Bonjour <strong>Camille</strong>,
            <br />
            Votre rendez-vous est bien confirmé. Nous avons hâte de vous accueillir !
          </p>

          {/* RECAP CARD */}
          <div className="em-card">
            <h3 className="em-card-title">
              <i className="fa-regular fa-calendar"></i>
              Détails de votre réservation
            </h3>

            <div className="em-row">
              <div className="em-row-icon service"><i className="fa-solid fa-scissors"></i></div>
              <div className="em-row-body">
                <span className="em-row-label">Service</span>
                <span className="em-row-value">Coupe + Brushing</span>
                <span className="em-row-sub">Durée : 45 min — 38 €</span>
              </div>
            </div>

            <div className="em-row">
              <div className="em-row-icon avatar">
                <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=72&h=72&fit=crop&crop=face" alt="Sarah" />
              </div>
              <div className="em-row-body">
                <span className="em-row-label">Votre coiffeur</span>
                <span className="em-row-value">Sarah Benali</span>
                <span className="em-row-sub">Spécialiste Coupe & Coloration</span>
              </div>
            </div>

            <div className="em-row">
              <div className="em-row-icon date"><i className="fa-regular fa-calendar-check"></i></div>
              <div className="em-row-body">
                <span className="em-row-label">Date & Heure</span>
                <span className="em-row-value">Samedi 28 Juin 2026 — 11:00</span>
                <span className="em-row-sub">Arrivée prévue à 10:55</span>
              </div>
            </div>

            <div className="em-row last">
              <div className="em-row-icon address"><i className="fa-solid fa-location-dot"></i></div>
              <div className="em-row-body">
                <span className="em-row-label">Adresse du salon</span>
                <span className="em-row-value">
                  <i className="fa-solid fa-map-pin"></i>
                  42 Rue de la Paix, 75002 Paris
                </span>
                <span className="em-row-sub">
                  <button className="em-link" onClick={handleGoogleMaps}>
                    Ouvrir dans Google Maps <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* REMINDERS */}
          <div className="em-card em-card-dark">
            <h4 className="em-card-title-sm">
              <i className="fa-solid fa-bell"></i>
              Rappels importants
            </h4>
            <div className="em-reminder">
              <div className="em-reminder-num">1</div>
              <div>Arrivez <strong>5 minutes avant</strong> votre créneau pour un accueil serein.</div>
            </div>
            <div className="em-reminder">
              <div className="em-reminder-num">2</div>
              <div>Annulation gratuite jusqu'à <strong>24h à l'avance</strong>. Au-delà, 50% du service sera facturé.</div>
            </div>
            <div className="em-reminder">
              <div className="em-reminder-num">3</div>
              <div>Besoin de modifier ? Contactez-nous au{' '}
                <button className="em-phone-link" onClick={handleContactSalon}>01 42 00 00 00</button>
              </div>
            </div>
          </div>

          {/* QR CODE */}
          <div className="em-qr">
            <p className="em-qr-label">Présentez ce QR code à l'accueil</p>
            <div className="em-qr-box">
              <div className="em-qr-grid">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`em-qr-cell ${Math.random() > 0.45 ? 'filled' : ''}`}></div>
                ))}
              </div>
            </div>
            <p className="em-qr-ref">#BK-2026-0628-1100</p>
          </div>

          {/* ACTIONS */}
          <div className="em-actions">
            <button className="em-btn primary" onClick={handleViewReservation}>
              <i className="fa-solid fa-eye"></i> Voir ma réservation
            </button>
            <button className="em-btn outline" onClick={handleCancelClick}>
              <i className="fa-solid fa-xmark"></i> Annuler
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="em-footer">
          <div className="em-socials">
            <button className="em-social" onClick={() => handleSocial('twitter')}><i className="fa-brands fa-twitter"></i></button>
            <button className="em-social" onClick={() => handleSocial('instagram')}><i className="fa-brands fa-instagram"></i></button>
            <button className="em-social" onClick={() => handleSocial('facebook')}><i className="fa-brands fa-facebook-f"></i></button>
            <button className="em-social" onClick={() => handleSocial('tiktok')}><i className="fa-brands fa-tiktok"></i></button>
          </div>
          <div className="em-footer-text">
            <strong>BookEase</strong> — Salon de coiffure<br />
            42 Rue de la Paix, 75002 Paris ·{' '}
            <button className="em-footer-phone" onClick={handleContactSalon}>01 42 00 00 00</button>
          </div>
          <div className="em-footer-links">
            <button onClick={handleManageNotifications}>Gérer mes notifications</button>
            <span>·</span>
            <button onClick={handlePrivacyPolicy}>Politique de confidentialité</button>
          </div>
          <p className="em-footer-copy">© 2026 BookEase. Tous droits réservés.</p>
        </div>
      </div>

      {/* VIEW MODAL */}
      {showViewModal && (
        <div className="em-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="em-modal" onClick={e => e.stopPropagation()}>
            <div className="em-modal-head">
              <h3><i className="fa-solid fa-calendar-check"></i> Ma réservation</h3>
              <button className="em-modal-close" onClick={() => setShowViewModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="em-modal-body">
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-scissors"></i> Service</span><span className="em-modal-val">Coupe + Brushing</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-user"></i> Coiffeur</span><span className="em-modal-val">Sarah Benali</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-regular fa-calendar"></i> Date</span><span className="em-modal-val">Samedi 28 Juin 2026</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-regular fa-clock"></i> Heure</span><span className="em-modal-val">11:00</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-location-dot"></i> Adresse</span><span className="em-modal-val">42 Rue de la Paix, 75002 Paris</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-receipt"></i> Référence</span><span className="em-modal-val em-mono">#BK-2026-0628-1100</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-euro-sign"></i> Prix</span><span className="em-modal-val em-price">38 €</span></div>
              <div className="em-modal-row"><span className="em-modal-label"><i className="fa-solid fa-flag"></i> Statut</span><span className="em-status-badge"><i className="fa-solid fa-circle-check"></i> Confirmé</span></div>
            </div>
            <div className="em-modal-foot">
              <button className="em-btn primary" onClick={() => { setShowViewModal(false); showToast('Réservation partagée !', 'success') }}>
                <i className="fa-solid fa-share-nodes"></i> Partager
              </button>
              <button className="em-btn outline" onClick={() => setShowViewModal(false)}>Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="em-modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="em-modal em-modal-cancel" onClick={e => e.stopPropagation()}>
            <div className="em-modal-head em-modal-head-warn">
              <h3><i className="fa-solid fa-triangle-exclamation"></i> Annuler la réservation</h3>
              <button className="em-modal-close" onClick={() => setShowCancelModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="em-modal-body">
              <p className="em-cancel-text">
                Êtes-vous sûr de vouloir annuler votre réservation du <strong>Samedi 28 Juin 2026 à 11:00</strong> ?
              </p>
              <div className="em-cancel-info">
                <i className="fa-solid fa-circle-info"></i>
                <span>Annulation gratuite. Aucun frais ne sera appliqué.</span>
              </div>
            </div>
            <div className="em-modal-foot">
              <button className="em-btn outline" onClick={() => setShowCancelModal(false)}>
                <i className="fa-solid fa-arrow-left"></i> Garder ma réservation
              </button>
              <button className="em-btn danger" onClick={handleConfirmCancel}>
                <i className="fa-solid fa-xmark"></i> Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
