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

  const handleViewReservation = () => {
    setShowViewModal(true)
  }

  const handleCancelClick = () => {
    setShowCancelModal(true)
  }

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

  const handleManageNotifications = () => {
    showToast('Gestion des notifications ouverte', 'success')
  }

  const handlePrivacyPolicy = () => {
    showToast('Politique de confidentialité ouverte', 'success')
  }

  return (
    <div className="email-page">
      {/* SCATTERED STARS */}
      <span className="star-deco" style={{ position: 'absolute', top: 100, left: '10%' }}></span>
      <span className="star-deco sm" style={{ position: 'absolute', top: 180, right: '12%' }}></span>
      <span className="star-deco lg" style={{ position: 'absolute', bottom: 200, left: '5%' }}></span>
      <span className="star-deco" style={{ position: 'absolute', bottom: 120, right: '8%' }}></span>

      {toast && (
        <div className={`email-toast ${toast.type}`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : toast.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}`}></i>
          {toast.msg}
        </div>
      )}

      <div className="email-preview-label">
        <i className="fa-solid fa-eye"></i>
        Aperçu du template email
      </div>

      <div className="email-wrapper">
        {/* HEADER */}
        <div className="email-header">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=200&fit=crop"
            alt="Salon"
            className="email-header-bg-img"
          />
          <div className="email-header-bg">
            <div className="email-header-circle c1"></div>
            <div className="email-header-circle c2"></div>
          </div>
          <div className="email-logo">
            <i className="fa-solid fa-scissors"></i>
            Book<span>Ease</span>
          </div>
          <div className="email-badge">
            <i className="fa-solid fa-circle-check"></i>
            Réservation confirmée
          </div>
          <div className="email-header-deco">
            <span className="star-deco lg" style={{ position: 'absolute', top: 15, right: 30 }}></span>
          </div>
        </div>

        {/* BODY */}
        <div className="email-body">
          <p className="email-greeting">
            <span className="script" style={{ fontSize: '1.3em', color: 'var(--primary)', display: 'block', marginBottom: 8, transform: 'rotate(-1deg)' }}>Bienvenue !</span>
            Bonjour <strong>Camille</strong>,
            <br />
            Votre rendez-vous est bien confirmé. Nous avons hâte de vous accueillir !
          </p>

          {/* RECAP CARD */}
          <div className="email-recap">
            <h3 className="email-recap-title">
              <i className="fa-regular fa-calendar"></i>
              Détails de votre réservation
            </h3>

            <div className="email-recap-row">
              <div className="recap-icon service">
                <i className="fa-solid fa-scissors"></i>
              </div>
              <div className="recap-detail">
                <div className="recap-detail-label">Service</div>
                <div className="recap-detail-value">Coupe + Brushing</div>
                <div className="recap-detail-sub">Durée : 45 min — 38 €</div>
              </div>
            </div>

            <div className="email-recap-row">
              <div className="recap-icon barber">
                <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=72&h=72&fit=crop&crop=face" alt="Sarah" />
              </div>
              <div className="recap-detail">
                <div className="recap-detail-label">Votre coiffeur</div>
                <div className="recap-detail-value">Sarah Benali</div>
                <div className="recap-detail-sub">Spécialiste Coupe & Coloration</div>
              </div>
            </div>

            <div className="email-recap-row">
              <div className="recap-icon date">
                <i className="fa-regular fa-calendar-check"></i>
              </div>
              <div className="recap-detail">
                <div className="recap-detail-label">Date & Heure</div>
                <div className="recap-detail-value">Samedi 28 Juin 2026 — 11:00</div>
                <div className="recap-detail-sub">Arrivée prévue à 10:55</div>
              </div>
            </div>

            <div className="email-recap-row last">
              <div className="recap-icon address">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="recap-detail">
                <div className="recap-detail-label">Adresse du salon</div>
                <div className="recap-detail-value address-value">
                  <i className="fa-solid fa-map-pin"></i>
                  42 Rue de la Paix, 75002 Paris
                </div>
                <div className="recap-detail-sub">
                  <button className="maps-link" onClick={handleGoogleMaps}>
                    Ouvrir dans Google Maps <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* REMINDERS */}
          <div className="email-reminders">
            <h4 className="reminders-title">
              <i className="fa-solid fa-bell"></i>
              Rappels importants
            </h4>
            <div className="reminder-item">
              <div className="reminder-num">1</div>
              <div>Arrivez <strong>5 minutes avant</strong> votre créneau pour un accueil serein.</div>
            </div>
            <div className="reminder-item">
              <div className="reminder-num">2</div>
              <div>Annulation gratuite jusqu'à <strong>24h à l'avance</strong>. Au-delà, 50% du service sera facturé.</div>
            </div>
            <div className="reminder-item">
              <div className="reminder-num">3</div>
              <div>Besoin de modifier ? Contactez-nous directement au{' '}
                <button className="phone-link" onClick={handleContactSalon}>
                  01 42 00 00 00
                </button>
              </div>
            </div>
          </div>

          {/* QR CODE */}
          <div className="email-qr">
            <p className="qr-label">Présentez ce QR code à l'accueil pour un check-in rapide</p>
            <div className="qr-box">
              <div className="qr-placeholder">
                <div className="qr-grid">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`qr-cell ${Math.random() > 0.45 ? 'filled' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="qr-ref">Réf. #BK-2026-0628-1100</p>
          </div>

          {/* BUTTONS */}
          <div className="email-actions">
            <button className="email-btn primary" onClick={handleViewReservation}>
              <i className="fa-solid fa-eye"></i>
              Voir ma réservation
            </button>
            <button className="email-btn outline" onClick={handleCancelClick}>
              <i className="fa-solid fa-xmark"></i>
              Annuler
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="email-footer">
          <div className="social-links">
            <button className="social-link" onClick={() => handleSocial('twitter')} title="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </button>
            <button className="social-link" onClick={() => handleSocial('instagram')} title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <button className="social-link" onClick={() => handleSocial('facebook')} title="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button className="social-link" onClick={() => handleSocial('tiktok')} title="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </button>
          </div>
          <div className="footer-text">
            <strong>BookEase</strong> — Salon de coiffure<br />
            42 Rue de la Paix, 75002 Paris ·{' '}
            <button className="footer-phone" onClick={handleContactSalon}>
              01 42 00 00 00
            </button>
            <br /><br />
            <button className="footer-link" onClick={handleManageNotifications}>Gérer mes notifications</button>
            {' · '}
            <button className="footer-link" onClick={handlePrivacyPolicy}>Politique de confidentialité</button>
            <br />
            © 2026 BookEase. Tous droits réservés.
          </div>
        </div>
      </div>

      {/* VIEW RESERVATION MODAL */}
      {showViewModal && (
        <div className="email-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="email-modal" onClick={e => e.stopPropagation()}>
            <div className="email-modal-header">
              <h3>
                <i className="fa-solid fa-calendar-check"></i>
                Ma réservation
              </h3>
              <button className="email-modal-close" onClick={() => setShowViewModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="email-modal-body">
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-scissors"></i> Service</span>
                <span className="modal-value">Coupe + Brushing</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-user"></i> Coiffeur</span>
                <span className="modal-value">Sarah Benali</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-regular fa-calendar"></i> Date</span>
                <span className="modal-value">Samedi 28 Juin 2026</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-regular fa-clock"></i> Heure</span>
                <span className="modal-value">11:00</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-location-dot"></i> Adresse</span>
                <span className="modal-value">42 Rue de la Paix, 75002 Paris</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-receipt"></i> Référence</span>
                <span className="modal-value modal-ref">#BK-2026-0628-1100</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-euro-sign"></i> Prix</span>
                <span className="modal-value modal-price">38 €</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-label"><i className="fa-solid fa-flag"></i> Statut</span>
                <span className="modal-status confirmed">
                  <i className="fa-solid fa-circle-check"></i> Confirmé
                </span>
              </div>
            </div>
            <div className="email-modal-actions">
              <button className="email-btn primary" onClick={() => {
                setShowViewModal(false)
                showToast('Réservation partagée !', 'success')
              }}>
                <i className="fa-solid fa-share-nodes"></i> Partager
              </button>
              <button className="email-btn outline" onClick={() => setShowViewModal(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="email-modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="email-modal cancel-modal" onClick={e => e.stopPropagation()}>
            <div className="email-modal-header">
              <h3>
                <i className="fa-solid fa-triangle-exclamation"></i>
                Annuler la réservation
              </h3>
              <button className="email-modal-close" onClick={() => setShowCancelModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="email-modal-body">
              <p className="cancel-warning">
                Êtes-vous sûr de vouloir annuler votre réservation du <strong>Samedi 28 Juin 2026 à 11:00</strong> ?
              </p>
              <div className="cancel-info">
                <i className="fa-solid fa-circle-info"></i>
                <span>Annulation gratuite. Aucun frais ne sera appliqué.</span>
              </div>
            </div>
            <div className="email-modal-actions">
              <button className="email-btn outline" onClick={() => setShowCancelModal(false)}>
                <i className="fa-solid fa-arrow-left"></i> Garder ma réservation
              </button>
              <button className="email-btn danger" onClick={handleConfirmCancel}>
                <i className="fa-solid fa-xmark"></i> Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
