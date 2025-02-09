/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToasterContext } from '@/contexts/ToasterContext'
import styles from './Toaster.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { ToasterType } from '@/types/toaster.type'

const toasterVariant: any = {
    success: {
        title: 'Success',
        icon: 'bx-check-circle',
        color: '#a3d9a5',
        barColor: '#3f9242'
    },
    danger: {
        title: 'Error',
        icon: 'bx-x-circle',
        color: '#f8b4b4',
        barColor: '#f15b5b'
    },
    warning: {
        title: 'Warning',
        icon: 'bx-error-circle',
        color: '#f8e3a2',
        barColor: '#e9b949'
    }
}
const Toaster = () => {
    const { toaster, setToaster }: ToasterType = useContext(ToasterContext)
    const [lengthBar, setlengthBar] = useState(100)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const timerStart = () => {
        timerRef.current = setInterval(() => {
            setlengthBar(prevLength => prevLength - 0.16)
        }, 1)
    }

    useEffect(() => {
        timerStart()
        return () => clearInterval(timerRef.current!)
    }, [])

    useEffect(() => {
        if (lengthBar <= 0) {
            setToaster({})
        }
    }, [lengthBar, setToaster])

    return (
        <div
            className={`${styles.toaster} ${styles[`toaster--${toaster.variant}`]}`}
        >
            <div className={styles.toaster__main}>
                <div className={styles.toaster__main__icon}>
                    <i
                        className={`bx ${toasterVariant[`${toaster.variant}`].icon}`}
                        style={{
                            color: toasterVariant[`${toaster.variant}`].color
                        }}
                    />
                </div>
                <div className={styles.toaster__main__text}>
                    <p className={styles.toaster__main__text__title}>
                        {toasterVariant[`${toaster.variant}`].title}
                    </p>
                    <p className={styles.toaster__main__text__message}>
                        {toaster.message}
                    </p>
                </div>
                <i
                    className={`bx bx-x ${styles.toaster__main__close}`}
                    onClick={() => setToaster({})}
                />
            </div>
            <div
                className={styles.toaster__timer}
                style={{
                    backgroundColor: toasterVariant[`${toaster.variant}`].color
                }}
            >
                <div
                    style={{
                        width: `${lengthBar}%`,
                        height: '100%',
                        backgroundColor:
                            toasterVariant[`${toaster.variant}`].barColor
                    }}
                />
            </div>
        </div>
    )
}

export default Toaster
