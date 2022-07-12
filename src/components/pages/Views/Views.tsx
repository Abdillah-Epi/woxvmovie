import useViews from '../../../hooks/useViews';
import view from '../../../assets/images/views.svg';
import ListMaker from '../../organisms/ListMaker';

const Views = () => {
    const [views] = useViews();

    return (
        <div className='flex flex-col items-start justify-center space-y-6'>
            {views.length && <ListMaker movies={views} />}
            {!views.length && (
                <div className='flex h-full w-full items-center justify-center'>
                    <img className='w-1/2' src={view} alt='' />
                </div>
            )}
        </div>
    );
};

export default Views;
