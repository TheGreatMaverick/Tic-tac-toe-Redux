import React from "react";
import { Field } from "../../types";

interface FieldsProps {
    fields: Field[];
    onClick: (index: number) => void;
    winCombo: number[] | null;
}

export const Fields: React.FC<FieldsProps> = ({
    fields,
    onClick,
    winCombo,
}) => {
    return (
        <div className="fields">
        {fields.map((field, index) => (
          <div onClick={() => onClick(index)} className={
            "field " + (winCombo && winCombo.includes(index) ? "active" : "")} key={index}>
            {field}
          </div>
        ))}
      </div>
    );
};