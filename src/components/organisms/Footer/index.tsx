import Select from '../../atoms/Select';
import Regular from '../../atoms/Typography/Regular';
import FooterLinks from '../../molecules/FooterLinks';
import drop from '../../../assets/images/drop.svg';

const Footer = () => {
    return (
        <div className='flex flex-col items-center bg-white py-10'>
            <div className='w-[80%] space-y-6'>
                <Regular color='' text='Any questions? Contact us' />
                <FooterLinks />
                <div className='w-[40%] sm:w-[30%] xl:w-[10%]'>
                    <Select
                        styles='rounded-full'
                        placeHolder={'Language'}
                        icon={{ icon: drop, pos: 'in:right' }}
                        list={['Anglais']}
                    />
                </div>
                <Regular color='' text='Woxvmoie France' />
            </div>
        </div>
    );
};

export default Footer;
