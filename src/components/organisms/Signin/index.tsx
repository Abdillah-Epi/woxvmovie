import React, { useEffect } from 'react';
import Cover from '../../atoms/Cover';
import Nav from '../../molecules/Nav';
import cover from '../../../assets/images/cover.webp';
import Forms from '../../molecules/Forms';
import Checkbox from '../../atoms/Checkbox';
import Link from '../../atoms/Link';
import google from '../../../assets/images/google.svg';
import { InputAtomFamily } from '../../../store/inputs';
import { useRecoilState } from 'recoil';
import useAuth from '../../../hooks/useAuth';
import { isClickedAtomFamily } from '../../../store/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { variantBodyIn } from './motion';

const FormsData = {
    title: 'Login',
    inputs: [
        {
            placeHolder: 'E-mail',
            type: 'email',
            id: 'email-signin'
        },
        {
            placeHolder: 'Mot de passe',
            type: 'password',
            id: 'password-signin'
        }
    ],
    btn: 'Login'
};

const OSignin: React.FC = () => {
    const [email, setEmail] = useRecoilState(InputAtomFamily('email-signin'));
    const [password, setPassword] = useRecoilState(InputAtomFamily('password-signin'));

    const [isClicked, setClick] = useRecoilState(isClickedAtomFamily('Login'));
    const { oauth } = useAuth();

    const navigate = useNavigate();

    const { signin, setOAuth, signinWithGoogle } = useAuth();
    useEffect(() => {
        if (!isClicked) return;
        setEmail(c => ({ ...c, error: '' }));
        setPassword(c => ({ ...c, error: '' }));
        email.value === '' && setEmail(c => ({ ...c, error: "l'email est requis." }));
        password.value === '' && setPassword(c => ({ ...c, error: 'le mot de passe est requis.' }));
        if (email.value === '' || password.value === '') return;

        signin(email.value, password.value).then(res => {
            if (res === 403) {
                setOAuth(() => null);
                return;
            }
            if (res.success) {
                setClick(() => false);
                navigate('/');
                setEmail(() => ({ value: '', error: null }));
                setPassword(() => ({ value: '', error: null }));
                return;
            }
            if (typeof res.error === 'string') {
                setEmail(c => ({ ...c, error: "l'email ou le mot de passe n'est pas valide." }));
                setPassword(c => ({ ...c, error: "l'email ou le mot de passe n'est pas valide." }));
                return;
            }
            res.error.map(e => {
                if ('VALIDATOR_EMAIL_EMAIL' in e) {
                    setEmail(c => ({ ...c, error: "ceci n'est pas un email, veuillez entrer un email." }));
                }
            });
        });
    }, [isClicked, oauth]);

    const [isClick, resetClick] = useRecoilState(isClickedAtomFamily('google-signin'));

    useEffect(() => {
        if (!isClick) return;
        resetClick(() => false);
        signinWithGoogle();
    }, [isClick, oauth]);
    return (
        <section className='relative h-screen w-screen'>
            <motion.div layoutId='cover' className='absolute inset-0'>
                <Cover img={cover} />
            </motion.div>
            <div className='absolute top-0 h-full w-full p-5 lg:p-10'>
                <div className='h-[20%]'>
                    <Nav hideRightSide={true} />
                </div>
                <div className='flex h-full w-full justify-center lg:h-[80%]'>
                    <motion.div
                        variants={variantBodyIn}
                        initial='hidden'
                        animate='show'
                        exit='exit'
                        className='h-full w-full bg-black/75 px-8 pt-8 lg:h-[85%] lg:px-16 lg:pt-16 xl:w-[30%]'
                    >
                        <Forms {...FormsData} />
                        <div className='flex items-center justify-between py-4'>
                            <Checkbox
                                styles='font-light text-xs lg:text-base'
                                span='Remember me'
                                spanColor='text-white'
                                color='accent-woxvmovie-2'
                            />
                            <p
                                onClick={() => navigate('/reset-password')}
                                className='cursor-pointer text-xs font-light text-white lg:text-base'
                            >
                                forget password ?
                            </p>
                        </div>
                        <Link
                            path='/signin'
                            id='google-signin'
                            styles='font-light text-xs lg:text-base'
                            text='Sign in with Google'
                            color='text-white'
                            icon={{ icon: google, pos: 'left', styles: 'w-4 h-4' }}
                        />
                        <div className='flex space-x-2 pt-4'>
                            <p className='text-xs font-light text-white lg:text-base'>First visit to Woxvmovie?</p>
                            <span>
                                <Link
                                    styles='text-xs lg:text-base'
                                    id='to-signup'
                                    path='/signup'
                                    text='Register'
                                    color='text-white'
                                />
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OSignin;
