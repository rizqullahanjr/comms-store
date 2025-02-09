/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Select.module.scss'
type Option = {
    value: string
    label: string
    selected?: boolean
}

type PropTypes = {
    label?: string
    name: string
    defaultValue?: string
    disabled?: boolean
    options: Option[] | any
}

const Select = (props: PropTypes) => {
    const { label, name, defaultValue, disabled, options } = props
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                defaultValue={defaultValue}
                disabled={disabled}
                className={styles.container__select}
            >
                {options.map((option: Option) => (
                    <option
                        key={option.label}
                        value={option.value}
                        selected={option.selected}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
