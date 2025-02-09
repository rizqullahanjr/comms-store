/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Textarea.module.scss'

type PropTypes = {
    label?: string
    name: string
    placeholder?: string
    defaultValue?: string | number
    disabled?: boolean
    onChange?: (e: any) => void
    className?: string
    required?: boolean
    minLength?: number
}

const TextArea = (props: PropTypes) => {
    const {
        label,
        name,
        placeholder,
        defaultValue,
        disabled,
        onChange,
        className,
        required,
        minLength
    } = props
    return (
        <div className={`${styles.container} ${className}`}>
            {label && <label htmlFor={name}>{label} </label>}
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                className={styles.container__input}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={onChange}
                required={required}
                minLength={minLength}
            />
        </div>
    )
}

export default TextArea
