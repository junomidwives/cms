import {useFormValue} from 'sanity'
import type {ObjectInputProps} from 'sanity'

type GeopointValue = {
  lat?: number
  lng?: number
}

export function GeopointWithPreview(props: ObjectInputProps) {
  const {renderDefault} = props
  const geopoint = useFormValue(props.path) as GeopointValue | undefined

  return (
    <div>
      {renderDefault(props)}
      {geopoint?.lat !== undefined && geopoint?.lng !== undefined && (
        <p style={{marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--card-muted-fg-color)'}}>
          {geopoint.lat.toFixed(6)}, {geopoint.lng.toFixed(6)}
        </p>
      )}
    </div>
  )
}
