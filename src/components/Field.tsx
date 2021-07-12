import React from "react";

type FieldProps = {name: string, value: string | number | undefined, className?: string
  handler?: (e: React.ChangeEvent) => void,
  type? : 'string' | 'number'
}
export function Field({name, value, className, handler, type }: FieldProps) {
  const t = type ?? 'string';
  return(
    <label className={className}>
      {name}:
      <input type="text" value={value} readOnly={(!handler)} onChange={handler}
        name={name.toLowerCase()}
        data-t={t}
      />
    </label>
  );
}

type FieldLProps = {label?: string, name: string, value: string | number | undefined, className?: string
  handler?: (e: React.ChangeEvent) => void,
  type? : 'string' | 'number'
}
export function FieldL({label, name, value, className, handler, type}: FieldLProps) {
  const t = type ?? 'string';
  const l = label + ':';
  return(
    <label className={className}>
      { (label) && l }
      <input type="text" value={value} readOnly={(!handler)} onChange={handler}
             name={name}
             data-t={t}
      />
    </label>
  );
}