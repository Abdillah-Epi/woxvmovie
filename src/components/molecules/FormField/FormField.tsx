import Typography from '../../atoms/Typography';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    containerClassName?: string;
    labelClassName?: string;
    type: string;
};

const FormField: React.FC<FormFieldProps> = ({
    label,
    containerClassName,
    labelClassName,
    className,
    ...otherProps
}) => {
    return (
        <div>
            <label className={otc(`h-full w-full ${containerClassName}`)}>
                {label ?? <Typography className={labelClassName}>{label}</Typography>}
                <input
                    className={otc(`h-full w-full appearance-none border focus:outline-none ${className}`)}
                    {...otherProps}
                />
            </label>
        </div>
    );
};

export default FormField;
