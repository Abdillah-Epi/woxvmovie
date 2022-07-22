import Typography from '../../atoms/Typography';
import FooterLinks from '../../molecules/FooterLinks';

const Footer = () => {
    return (
        <div className='flex flex-col items-center bg-white py-10'>
            <div className='w-[80%] space-y-6'>
                <Typography title='Any questions? Contact us' />
                <FooterLinks />
                <div className='w-[40%] sm:w-[30%] xl:w-[10%]'></div>
                <Typography title='WOXVFLIX France' />
            </div>
        </div>
    );
};

export default Footer;
