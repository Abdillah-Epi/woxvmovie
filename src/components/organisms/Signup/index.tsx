import React, { useEffect } from 'react';
import Cover from '../../atoms/Cover';
import Nav from '../../molecules/Nav';
import cover from '../../../assets/images/cover.webp';
import Forms from '../../molecules/Forms';
import Link from '../../atoms/Link';
import google from '../../../assets/images/google.svg';
import { useRecoilState } from 'recoil';
import { InputAtomFamily } from '../../../store/inputs';
import { isClickedAtomFamily } from '../../../store/button';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useHref, useLinkClickHandler } from 'react-router-dom';
import { variantBodyUp } from './motion';
import { motion } from 'framer-motion';

type Link1Props = {
    onClick?: any;
    replace: boolean;
    state?: any;
    target?: React.HTMLAttributeAnchorTarget;
    to: string;
};
const Link1 = React.forwardRef(({ onClick, replace = false, state, target, to, ...rest }: Link1Props) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
        replace,
        state,
        target
    });

    return (
        <a
            className='h-96 w-96 bg-red-500'
            {...rest}
            href={href}
            onClick={(event: any) => {
                onClick?.(event);
                if (!event.defaultPrevented) {
                    handleClick(event);
                }
            }}
            target={target}
        />
    );
});

const FormsData = {
    title: 'Créez un mot de passe pour démarrer votre abonnement',
    inputs: [
        {
            placeHolder: 'E-mail',
            type: 'email',
            id: 'email-signup'
        },
        {
            placeHolder: 'Ajouter un mot de passe',
            type: 'password',
            id: 'password-signup'
        }
    ],
    btn: 'Continue'
};

const OSignup: React.FC = () => {
    const [email, setEmail] = useRecoilState(InputAtomFamily('email-signup'));
    const [password, setPassword] = useRecoilState(InputAtomFamily('password-signup'));

    const navigate = useNavigate();

    const [isClicked, setClick] = useRecoilState(isClickedAtomFamily('Continue'));
    const { oauth, signupWithGoogle, setOAuth } = useAuth();

    const { signup } = useAuth();

    useEffect(() => {
        if (!isClicked) return;
        setClick(() => false);
        setEmail(c => ({ ...c, error: '' }));
        setPassword(c => ({ ...c, error: '' }));
        email.value === '' && setEmail(c => ({ ...c, error: "l'email est requis." }));
        password.value === '' && setPassword(c => ({ ...c, error: 'the password is required.' }));
        if (email.value === '' || password.value === '') return;

        signup({ email: email.value, password: password.value }).then(res => {
            if (res === 403) {
                setOAuth(() => null);
                return;
            }
            if (res.success) {
                setEmail(() => ({ value: '', error: null }));
                setPassword(() => ({ value: '', error: null }));
                navigate('/genres');
                return;
            }
            if (typeof res.error === 'string') {
                let err = res.error;
                setEmail(c => ({ ...c, error: err }));
                return;
            }
            res.error.map(e => {
                if ('VALIDATOR_EMAIL_EMAIL' in e) {
                    setEmail(c => ({ ...c, error: 'this is not an email, please enter an email.' }));
                }
                if ('VALIDATOR_PASSWORD_MIN' in e) {
                    setPassword(c => ({ ...c, error: 'a minimum of 4 characters is required.' }));
                }
            });
        });
    }, [isClicked, oauth]);

    const [isClick, resetClick] = useRecoilState(isClickedAtomFamily('google-signup'));

    useEffect(() => {
        if (!isClick) return;
        resetClick(() => false);
        signupWithGoogle();
    }, [isClick, oauth]);
    return (
        <section className='relative h-screen w-screen'>
            <motion.div layoutId='cover' className='absolute inset-0'>
                <Cover img={cover} />
            </motion.div>
            <div className='absolute top-0 h-full w-full p-5 lg:p-10'>
                <div className='h-[10%]'>
                    <Nav hideRightSide={true} />
                </div>
                <div className='flex h-full w-full justify-center lg:h-[80%]'>
                    <motion.div
                        variants={variantBodyUp}
                        initial='hidden'
                        animate='show'
                        exit='exit'
                        className='h-full bg-black/75 px-8 pt-8 lg:h-[90%] lg:px-16 lg:pt-16 xl:w-[30%]'
                    >
                        <Forms {...FormsData} />
                        <div className='my-6'>
                            <Link
                                path='/signup'
                                id='google-signup'
                                styles='font-light text-xs lg:text-base'
                                text='register with Google'
                                color='text-white'
                                icon={{ icon: google, pos: 'left', styles: 'w-4 h-4' }}
                            />
                            <div className='flex flex-col pt-4 lg:flex-row lg:items-center lg:space-x-2'>
                                <p className='text-xs font-light text-white lg:text-base'>
                                    Already have an account with Woxvmovie?
                                </p>
                                <span>
                                    <Link
                                        styles='text-xs lg:text-base'
                                        id='to-signup'
                                        path='/signin'
                                        text='Login'
                                        color='text-white'
                                    />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OSignup;
