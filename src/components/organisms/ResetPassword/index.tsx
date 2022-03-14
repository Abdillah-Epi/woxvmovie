import React, { useEffect } from 'react';
import Cover from '../../atoms/Cover';
import Nav from '../../molecules/Nav';
import cover from '../../../assets/images/cover.webp';
import Forms from '../../molecules/Forms';
import { InputAtomFamily } from '../../../store/inputs';
import { isClickedAtomFamily } from '../../../store/button';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useResetPasssword from '../../../hooks/useResetPasssword';

const FormsData = {
    title: 'Create a new password',
    inputs: [
        {
            placeHolder: 'New password',
            type: 'password',
            id: 'password-new'
        },
        {
            placeHolder: 'Confirm password',
            type: 'password',
            id: 'password-confirm'
        }
    ],
    btn: 'Validate'
};

const OResetPassword: React.FC = () => {
    const [passNew, setPassNew] = useRecoilState(InputAtomFamily('password-new'));
    const [passConf, setPassConf] = useRecoilState(InputAtomFamily('password-confirm'));

    const [isClicked, setClick] = useRecoilState(isClickedAtomFamily('Validate'));

    const { updatePassword } = useResetPasssword();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isClicked) return;
        setClick(() => false);
        if (passNew.value !== passConf.value) {
            setPassConf(() => ({ value: '', error: `This password is not the same as the other one.` }));
            return;
        }
        updatePassword(passNew.value).then(res => {
            if (typeof res !== 'number' && res.success) {
                setPassNew(() => ({ value: '', error: '' }));
                setPassConf(() => ({ value: '', error: '' }));
                navigate('/signin');
            } else {
                setPassNew(() => ({ value: '', error: 'Fail to reset password.' }));
                setPassConf(() => ({ value: '', error: 'Fail to reset password.' }));
            }
        });
    }, [isClicked]);

    return (
        <section className='relative h-screen w-screen'>
            <div className='absolute inset-0'>
                <Cover img={cover} />
            </div>
            <div className='absolute top-0 h-full w-full p-10'>
                <div className='h-[20%]'>
                    <Nav hideRightSide={true} />
                </div>
                <div className='flex h-[80%] w-full justify-center'>
                    <div className='flex h-[75%] items-center bg-black/75 px-16 pt-16 xl:w-[30%]'>
                        <Forms {...FormsData} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OResetPassword;
