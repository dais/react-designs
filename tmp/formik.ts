import React, { FC, InputHTMLAttributes } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Formik, Form, Field } from 'formik'
import { string, boolean } from 'yup'
import { generateSchema } from 'libs'
import { Button, ErrorMessage } from 'components'
import clsx from 'clsx'
import styles from './index.module.scss'

type Props = {
  className?: string
}

const validationSchema = generateSchema({
  loginId: string().email().required(),
  password: string().min(8).max(20).required(),
  preservation: boolean().required(),
})

// TODO: TextField、PasswordField, Checkboxコンポーネントは別途実装する。
const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = props => (
  <input type="text" {...props} />
)

const PasswordField: FC<InputHTMLAttributes<HTMLInputElement>> = props => (
  <input type="password" {...props} />
)

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = props => (
  <input type="checkbox" {...props} />
)

// TODO: デザインは適当
const LoginForm: FC<Props> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{ loginId: '', password: '', preservation: false }}
      validationSchema={validationSchema}
      onSubmit={async (values, data) => {
        console.log(values, data)
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className={clsx(className, styles.root)}>
          <label className={styles.loginId}>
            <p>{t("login:loginIDLabel")}</p>
            <Field
              as={TextField}
              name="loginId"
              placeholder={t("login:loginIDPlaceholder")}
            />
            <ErrorMessage error={errors.loginId} touched={touched.loginId} />
          </label>
          <label className={styles.password}>
            <p>{t("login:passwordLabel")}</p>
            <Field
              as={PasswordField}
              name="password"
              placeholder={t("login:passwordPlaceholder")}
            />
          </label>
          <ErrorMessage error={errors.password} touched={touched.password} />
          <div>
            <a>{t("login:forgotPasswordLabel")}</a>
            <label className={styles.preservation}>
              <span>{t("login:passwordPreservationLabel")}</span>
              <Field
                as={Checkbox}
                name="preservation"
              />
            </label>
            <ErrorMessage error={errors.preservation} touched={touched.preservation} />
          </div>
          <Button type="submit" disabled={!isValid}>{t("login:loginButtonLabel")}</Button>
          <a>{t("login:withoutLoginLabel")}</a>
        </Form>
      )}
    </Formik>
  )
} 


export default LoginForm

