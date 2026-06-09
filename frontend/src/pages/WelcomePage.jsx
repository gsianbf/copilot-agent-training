import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { user, clearSession } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.nav}>
        <span className={styles.navBrand}>
          <span className={styles.brandDot} />
          JWT Auth
        </span>
        <button className={styles.navButton} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Sesión activa
        </div>

        <h1 className={styles.heading}>
          Bienvenido, {user}.
        </h1>

        <p className={styles.body}>
          Has iniciado sesión correctamente. Tu token JWT está almacenado en la
          sesión del navegador y será válido durante 300 segundos.
        </p>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Usuario autenticado</p>
          <p className={styles.cardValue}>{user}</p>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </main>
    </div>
  );
}
