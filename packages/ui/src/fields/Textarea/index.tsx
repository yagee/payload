/* eslint-disable react/destructuring-assignment */
'use client'
import type { ClientValidate } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import React, { useCallback } from 'react'

import type { TextAreaInputProps, TextareaFieldProps } from './types.js'

import { Label as LabelComp } from '../../forms/Label/index.js'
import { useField } from '../../forms/useField/index.js'
import { withCondition } from '../../forms/withCondition/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { isFieldRTL } from '../shared/index.js'
import { TextareaInput } from './Input.js'
import './index.scss'

export { TextAreaInputProps, TextareaFieldProps, TextareaInput }

const TextareaField: React.FC<TextareaFieldProps> = (props) => {
  const {
    name,
    AfterInput,
    BeforeInput,
    Description,
    Error,
    Label: LabelFromProps,
    className,
    label,
    locale,
    localized,
    maxLength,
    minLength,
    path: pathFromProps,
    placeholder,
    required,
    rows,
    rtl,
    style,
    validate,
    width,
  } = props

  const Label = LabelFromProps || <LabelComp label={label} required={required} />

  const { i18n } = useTranslation()

  const { localization } = useConfig()

  const isRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate: ClientValidate = useCallback(
    (value, options) => {
      if (typeof validate === 'function')
        return validate(value, { ...options, maxLength, minLength, required })
    },
    [validate, required, maxLength, minLength],
  )

  const { path, readOnly, setValue, showError, value } = useField<string>({
    path: pathFromProps || name,
    validate: memoizedValidate,
  })

  return (
    <TextareaInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      Description={Description}
      Error={Error}
      Label={Label}
      className={className}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      path={path}
      placeholder={getTranslation(placeholder, i18n)}
      readOnly={readOnly}
      required={required}
      rows={rows}
      rtl={isRTL}
      showError={showError}
      style={style}
      value={value}
      width={width}
    />
  )
}

export const Textarea = withCondition(TextareaField)