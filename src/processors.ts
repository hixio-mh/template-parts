import type {TemplatePart} from './types.js'
import {AttributeTemplatePart} from './attribute-template-part.js'

export function propertyIdentity(parts: Iterable<TemplatePart>, params: Record<string, unknown>): void {
  for (const part of parts) {
    part.value = String(params[part.expression] ?? '')
  }
}

export function propertyIdentityOrBooleanAttribute(
  parts: Iterable<TemplatePart>,
  params: Record<string, unknown>
): void {
  for (const part of parts) {
    const value: unknown = params[part.expression] ?? ''
    if (typeof value === 'boolean' && part instanceof AttributeTemplatePart) {
      if (part.booleanValue && value === false) {
        part.booleanValue = false
      } else {
        part.value = part.attributeName
      }
    } else {
      part.value = String(value)
    }
  }
}
