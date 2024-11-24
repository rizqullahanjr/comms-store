/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Toaster.module.scss'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type PropTypes = {
    variant: string
    message?: string
    setToaster: Dispatch<SetStateAction<{}>>
}

const toasterVariant: any = {
    success: {
        title: 'Success',
        icon: 'bx-check-circle',
        color: '#a3d9a5',
        barColor: '#3f9242',
    },
    danger: {
        title: 'Error',
        icon: 'bx-x-circle',
        color: '#f8b4b4',
        barColor: '#f15b5b',
    },
    warning: {
        title: 'Warning',
        icon: 'bx-error-circle',
        color: '#f8e3a2',
        barColor: '#e9b949',
    },
}
const Toaster = (props: PropTypes) => {
    const { variant = 'warning', message, setToaster } = props
    const [lengthBar, setlengthBar] = useState(100)
    const timerRef = useRef<any>(null)

    const timerStart = () => {
        timerRef.current = setInterval(() => {
            setlengthBar((prevLength) => prevLength - 0.16)
        }, 1)
    }

    useEffect(() => {
        timerStart()
        return () => clearInterval(timerRef.current)
    }, [])

    return (
        <div className={`${styles.toaster} ${styles[`toaster--${variant}`]}`}>
            <div className={styles.toaster__main}>
                <div className={styles.toaster__main__icon}>
                    <i
                        className={`bx ${toasterVariant[variant].icon}`}
                        style={{ color: toasterVariant[variant].color }}
                    />
                </div>
                <div className={styles.toaster__main__text}>
                    <p className={styles.toaster__main__text__title}>
                        {toasterVariant[variant].title}
                    </p>
                    <p className={styles.toaster__main__text__message}>{message}</p>
                </div>
                <i className={`bx bx-x ${styles.toaster__main__close}`} onClick={() => setToaster({})} />
            </div>
            <div
                className={styles.toaster__timer}
                style={{
                    backgroundColor: toasterVariant[variant].color,
                }}
            >
                <div
                    style={{
                        width: `${lengthBar}%`,
                        height: '100%',
                        backgroundColor: toasterVariant[variant].barColor,
                    }}
                />
            </div>
        </div>
    )
}

export default Toaster
