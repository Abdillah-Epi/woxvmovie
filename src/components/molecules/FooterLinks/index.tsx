const links = [
    "FAQ",
    "Relations Investisseurs",
    "Confidentialité",
    "Test de vitesse",
    "Centre d'aide",
    "Recrutement",
    "Préférences de cookies",
    "Informations légales",
    "Compte",
    "Modes de lecture",
    "Mentions légales",
    "Programmes originaux Woxvmoie",
    "Presse",
    "Conditions d'utilisation",
    "Nous contacter"
];
const FooterLinks = () => {
    return (
        <div className='grid w-full grid-cols-3 gap-x-4 gap-y-2 sm:grid-cols-4'>
            {links.map((link, key) => {
                return (
                    <a key={key} href='/' className='text-grey hover:text-grey-dark text-xs'>
                        {link}
                    </a>
                );
            })}
        </div>
    );
};

export default FooterLinks;
