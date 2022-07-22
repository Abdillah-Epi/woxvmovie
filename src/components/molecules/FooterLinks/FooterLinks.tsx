const links = [
    'FAQ',
    'Investor Relations',
    'Confidentiality',
    'Speed test',
    'Helpdesk',
    'Recruitment',
    'Cookie preferences',
    'Legal information',
    'Account',
    'Reading modes',
    'Legal information',
    'Original programmes Woxvmovie',
    'Presse',
    'Terms of use',
    'Contact us'
];
const FooterLinks = () => {
    return (
        <div className='grid w-full grid-cols-3 gap-x-4 gap-y-2 sm:grid-cols-4'>
            {links.map((link, key) => {
                return (
                    <a key={key} href='/signin' className='text-grey hover:text-grey-dark text-xs'>
                        {link}
                    </a>
                );
            })}
        </div>
    );
};

export default FooterLinks;
