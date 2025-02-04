/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Input.module.scss'

type PropTypes = {
    label?: string
    name: string
    type: string
    placeholder?: string
    defaultValue?: string | number
    disabled?: boolean
    onChange?: (e:any) => void
    className?: string
    required?: boolean
    minLength?: number
}

const Input = (props: PropTypes) => {
    const { label, name, type, placeholder, defaultValue, disabled, onChange, className, required, minLength } = props
    return (
        <div className={`${styles.container} ${className}`}>
            {label && <label htmlFor={name}>{label} </label>}
            <input
                name={name}
                id={name}
                type={type}
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

export default Input
