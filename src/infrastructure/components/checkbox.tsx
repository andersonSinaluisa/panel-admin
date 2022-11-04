import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  label: string;
  value?: string | undefined;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <fieldset>
      <div className="checkbox">
        <input
          type="checkbox"
          id={props.name}
          className="checkbox-input"
          onChange={props.onChange}
          name={props.name}
          checked={props.checked}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </div>
    </fieldset>
  );
};

export default Checkbox;
