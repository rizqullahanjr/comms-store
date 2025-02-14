/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react'
import styles from './InputFile.module.scss'

type Proptypes = {
    uploadedImage: File | null
    name: string
    setUploadedImage: Dispatch<SetStateAction<File | null>>
}

const InputFile = (props: Proptypes) => {
    const { uploadedImage, setUploadedImage, name } = props
    return (
        <div className={styles.file}>
            <label className={styles.file__label} htmlFor={name}>
                {uploadedImage?.name ? (
                    <p>{uploadedImage.name}</p>
                ) : (
                    <>
                        <p>
                            Upload a new Image, larger image will be resized
                            automatically
                        </p>
                        <p>
                            Max size allowed <b>1MB</b>
                        </p>
                    </>
                )}
            </label>
            <input
                className={styles.file__input}
                type='file'
                name={name}
                id={name}
                onChange={(e: any) => {
                    e.preventDefault()
                    setUploadedImage(e.currentTarget.files[0])
                }}
            />
        </div>
    )
}

export default InputFile
