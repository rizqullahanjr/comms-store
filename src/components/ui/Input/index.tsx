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
}

const Input = (props: PropTypes) => {
    const { label, name, type, placeholder, defaultValue, disabled, onChange } = props
    return (
        <div className={styles.container}>
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
            />
        </div>
    )
}

export default Input
