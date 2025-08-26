import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    jobListings: 'Job Listings',
    login: 'Login',
    signUp: 'Sign Up',
    welcomeTitle: 'Find Your Transportation Solution',
    welcomeSubtitle: 'Reliable transportation for workers and community members. Choose your role to get started.',
    employee: 'Employee',
    employer: 'Employer',
    generalPublic: 'General Public',
    employeeDesc: 'Schedule rides to your job site with predictable pricing',
    employerDesc: 'Manage workforce logistics and transportation solutions',
    generalDesc: 'Community transportation from Point A to Point B',
    continue: 'Continue',
    continueEmployee: 'Continue as Employee',
    continueEmployer: 'Continue as Employer',
    continueRider: 'Continue as Rider',
    driverPortal: 'Driver Portal',
    driverPortalDesc: 'Are you a driver? Access your dedicated portal:',
    footerText: 'Bridging transportation gaps for Memphis workers and community members',
    employeeFeatures: {
      feature1: '• Schedule rides around your shifts',
      feature2: '• Access to job site pickup hubs',
      feature3: '• No surge pricing',
      feature4: '• Workforce-focused features'
    },
    employerFeatures: {
      feature1: '• View workforce transportation',
      feature2: '• Manage scheduled routes',
      feature3: '• Employee ride summaries',
      feature4: '• Administrative dashboard'
    },
    generalFeatures: {
      feature1: '• Request rides anywhere',
      feature2: '• Flat-fee subscription model',
      feature3: '• Schedule future trips',
      feature4: '• Community-friendly pricing'
    }
  },
  es: {
    home: 'Inicio',
    jobListings: 'Ofertas de Trabajo',
    login: 'Iniciar Sesión',
    signUp: 'Registrarse',
    welcomeTitle: 'Encuentra Tu Solución de Transporte',
    welcomeSubtitle: 'Transporte confiable para trabajadores y miembros de la comunidad. Elige tu rol para comenzar.',
    employee: 'Empleado',
    employer: 'Empleador',
    generalPublic: 'Público General',
    employeeDesc: 'Programa viajes a tu lugar de trabajo con precios predecibles',
    employerDesc: 'Gestiona la logística y soluciones de transporte de la fuerza laboral',
    generalDesc: 'Transporte comunitario del Punto A al Punto B',
    continue: 'Continuar',
    continueEmployee: 'Continuar como Empleado',
    continueEmployer: 'Continuar como Empleador',
    continueRider: 'Continuar como Pasajero',
    driverPortal: 'Portal del Conductor',
    driverPortalDesc: '¿Eres conductor? Accede a tu portal dedicado:',
    footerText: 'Cerrando brechas de transporte para trabajadores y miembros de la comunidad de Memphis',
    employeeFeatures: {
      feature1: '• Programa viajes según tus turnos',
      feature2: '• Acceso a centros de recogida en sitios de trabajo',
      feature3: '• Sin precios dinámicos',
      feature4: '• Funciones enfocadas en la fuerza laboral'
    },
    employerFeatures: {
      feature1: '• Ver transporte de la fuerza laboral',
      feature2: '• Gestionar rutas programadas',
      feature3: '• Resúmenes de viajes de empleados',
      feature4: '• Panel administrativo'
    },
    generalFeatures: {
      feature1: '• Solicitar viajes a cualquier lugar',
      feature2: '• Modelo de suscripción de tarifa plana',
      feature3: '• Programar viajes futuros',
      feature4: '• Precios amigables con la comunidad'
    }
  },
  fr: {
    home: 'Accueil',
    jobListings: 'Offres d\'Emploi',
    login: 'Connexion',
    signUp: 'S\'inscrire',
    welcomeTitle: 'Trouvez Votre Solution de Transport',
    welcomeSubtitle: 'Transport fiable pour les travailleurs et les membres de la communauté. Choisissez votre rôle pour commencer.',
    employee: 'Employé',
    employer: 'Employeur',
    generalPublic: 'Public Général',
    employeeDesc: 'Planifiez des trajets vers votre site de travail avec des prix prévisibles',
    employerDesc: 'Gérez la logistique et les solutions de transport de la main-d\'œuvre',
    generalDesc: 'Transport communautaire du Point A au Point B',
    continue: 'Continuer',
    continueEmployee: 'Continuer comme Employé',
    continueEmployer: 'Continuer comme Employeur',
    continueRider: 'Continuer comme Passager',
    driverPortal: 'Portail Conducteur',
    driverPortalDesc: 'Êtes-vous conducteur? Accédez à votre portail dédié:',
    footerText: 'Combler les lacunes de transport pour les travailleurs et les membres de la communauté de Memphis',
    employeeFeatures: {
      feature1: '• Planifiez des trajets selon vos horaires',
      feature2: '• Accès aux centres de ramassage sur site',
      feature3: '• Pas de tarification dynamique',
      feature4: '• Fonctionnalités axées sur la main-d\'œuvre'
    },
    employerFeatures: {
      feature1: '• Voir le transport de la main-d\'œuvre',
      feature2: '• Gérer les itinéraires programmés',
      feature3: '• Résumés des trajets des employés',
      feature4: '• Tableau de bord administratif'
    },
    generalFeatures: {
      feature1: '• Demander des trajets partout',
      feature2: '• Modèle d\'abonnement à tarif fixe',
      feature3: '• Planifier des voyages futurs',
      feature4: '• Tarification communautaire'
    }
  },
  de: {
    home: 'Startseite',
    jobListings: 'Stellenanzeigen',
    login: 'Anmelden',
    signUp: 'Registrieren',
    welcomeTitle: 'Finden Sie Ihre Transportlösung',
    welcomeSubtitle: 'Zuverlässiger Transport für Arbeiter und Gemeindemitglieder. Wählen Sie Ihre Rolle zum Starten.',
    employee: 'Angestellter',
    employer: 'Arbeitgeber',
    generalPublic: 'Allgemeine Öffentlichkeit',
    employeeDesc: 'Planen Sie Fahrten zu Ihrem Arbeitsplatz mit vorhersagbaren Preisen',
    employerDesc: 'Verwalten Sie Arbeitsplatzlogistik und Transportlösungen',
    generalDesc: 'Gemeinschaftstransport von Punkt A zu Punkt B',
    continue: 'Weiter',
    continueEmployee: 'Als Angestellter fortfahren',
    continueEmployer: 'Als Arbeitgeber fortfahren',
    continueRider: 'Als Fahrer fortfahren',
    driverPortal: 'Fahrer Portal',
    driverPortalDesc: 'Sind Sie Fahrer? Greifen Sie auf Ihr dediziertes Portal zu:',
    footerText: 'Überbrückung von Transportlücken für Memphis-Arbeiter und Gemeindemitglieder',
    employeeFeatures: {
      feature1: '• Planen Sie Fahrten um Ihre Schichten',
      feature2: '• Zugang zu Arbeitsplatz-Abholzentren',
      feature3: '• Keine Stoßzeitenpreise',
      feature4: '• Arbeitsplatz-fokussierte Funktionen'
    },
    employerFeatures: {
      feature1: '• Arbeitsplatztransport anzeigen',
      feature2: '• Geplante Routen verwalten',
      feature3: '• Mitarbeiterfahrt-Zusammenfassungen',
      feature4: '• Verwaltungs-Dashboard'
    },
    generalFeatures: {
      feature1: '• Fahrten überall anfordern',
      feature2: '• Pauschaltarif-Abonnementmodell',
      feature3: '• Zukünftige Reisen planen',
      feature4: '• Gemeinschaftsfreundliche Preise'
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): any => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      result = result?.[k];
    }
    
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};