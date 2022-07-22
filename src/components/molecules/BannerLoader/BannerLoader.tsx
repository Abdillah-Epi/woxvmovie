import logo from '../../../assets/images/full-logo.svg';

const BannerLoader = () => {
    return (
        <div className='h-screen w-screen p-10'>
            <div className="h-full w-full flex justify-center items-center">
                <img                
                    src={logo} 
                    width={400} 
                    height={400} 
                />
            </div>
        </div>
    );
};

export default BannerLoader;
