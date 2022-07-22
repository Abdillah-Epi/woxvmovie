import { useRecoilValue } from 'recoil';

import { movieHoveredAtom } from '../../../store/movies';
import { TVMovie } from '../../../store/types';
import Average from '../../atoms/Average';
import { overrideTailwindClasses as otc } from 'tailwind-override';
import Typography from '../../atoms/Typography';

type PosterHoveredProps = React.HTMLAttributes<HTMLDivElement> & {
    movie: TVMovie;
    on: string;
    title: string;
};
const PosterHovered: React.FC<PosterHoveredProps> = ({ children, movie, on, title, className, ...otherProps }) => {
    const isHovered = useRecoilValue(movieHoveredAtom);

    if (isHovered !== `${title}-${movie.id}`)
        return (
            <div {...otherProps} className={otc(`xl:hidden ${className}`)}>
                <div className='flex w-full items-end justify-center space-x-6'></div>
            </div>
        );

    return (
        <div {...otherProps} className={otc(`bg-black/80 ${className}`)}>
            <div className='w-[70%]'>
                <Typography className='text-center text-lg text-white sm:text-xl' title={movie.title} />
            </div>
            <Average average={movie.vote_average} />
            <div className='w-[80%]'>
                <Typography className='text-justify text-xs text-white hidden xl:[display:block]' title={movie.overview} />
            </div>
            <div className='flex w-[80%] items-center justify-center space-x-6'>{children}</div>
        </div>
    );
};
export default PosterHovered;
